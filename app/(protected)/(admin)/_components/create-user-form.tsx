"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/extension/file-uploader";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { File as FileIcon, Loader2 } from "lucide-react";
import { PhoneInput } from "@/components/ui/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { FormEvent, useState } from "react";
import { signUpUser } from "@/actions/signup";
import { getSignedURL } from "@/actions/bucket";
import { computeSHA256 } from "@/lib/encrypt";
import { useRouter } from "next/navigation";

const userSchema = z.object({
  email: z.string().email(),
  officeName: z.string().min(1, {message: "Office name is required"}).max(100, {message: "Office name is too long"}),
  officeAddress: z.string().min(1, {message: "Office address is required"}).max(150, {message: "Office address is too long"}),
  officeGoogleMapLink: z.string().min(1, {message: "Google map link is required"}),
  phoneNo:z
  .string()
  .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  accountsEmail: z.string().email(),
  accountsPhone: z
  .string()
  .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  role: z.enum(["ADMIN", "USER", "EMPLOYEE"]),
  passportFront: z
    .array(
      z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
        message: "File size must be less than 4MB",
      })
    )
    .max(1, {
      message: "Maximum 1 files are allowed",
    })
    .nullable(),
  passportBack: z
    .array(
      z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
        message: "File size must be less than 4MB",
      })
    )
    .max(1, {
      message: "Maximum 1 file is allowed",
    })
    .nullable(),
  tradeLicense: z
    .array(
      z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
        message: "File size must be less than 4MB",
      })
    )
    .max(1, {
      message: "Maximum 1 file is allowed",
    })
    .nullable(),
  emiratesId: z
    .array(
      z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
        message: "File size must be less than 4MB",
      })
    )
    .max(1, {
      message: "Maximum 1 file is allowed",
    })
    .nullable(),
});

const passwordSchema = z.object({
    password: z
    .string()
    .min(8, 'The password must be at least 8 characters long')
    .max(32, 'The password must be a maximun 32 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"]
  })

  const formSchema = z.intersection(passwordSchema, userSchema)
  
  export function UserForm() {
      
      const [loading, setLoading] = useState<Boolean>(false)

      const { toast } = useToast();
      
      const router = useRouter()
  
      const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      officeName: "",
      officeAddress: "",
      officeGoogleMapLink: "",
      accountsEmail: "",
      passportFront: null,
      passportBack: null,
      tradeLicense: null,
      emiratesId: null,
    },
  });
  type FormValues = z.infer<typeof formSchema>;


  const putFile = async(file:File, url: string) => {
    try {
      await fetch(url, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      })    
      return url.split('?')[0]
    } catch (error) {
      console.log(error);
      throw new Error("Failed to upload file");
    }
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    
        setLoading(true)
    
        if(!values.passportFront || !values.passportBack || !values.tradeLicense || !values.emiratesId){
          alert('Please upload all the files');
          setLoading(false)
          return
        }
    
        let passportFrontUrl, passportBackUrl, tradeLicenseUrl, emiratesIdUrl
        try {
    
         passportFrontUrl = await getSignedURL(values.passportFront[0].type, values.passportFront[0].size, await computeSHA256(values.passportFront[0]))
         passportBackUrl = await getSignedURL(values.passportBack[0].type, values.passportBack[0].size, await computeSHA256(values.passportBack[0]))
         tradeLicenseUrl = await getSignedURL(values.tradeLicense[0].type, values.tradeLicense[0].size, await computeSHA256(values.tradeLicense[0]))
         emiratesIdUrl = await getSignedURL(values.emiratesId[0].type, values.emiratesId[0].size, await computeSHA256(values.emiratesId[0]))
        
    
    
        const form = new FormData();
        form.append("email", values.email);
        form.append("password", values.password);
        form.append("confirmPassword", values.confirmPassword);
        form.append("officeName", values.officeName);
        form.append("officeAddress", values.officeAddress);
        form.append("officeGoogleMapLink", values.officeGoogleMapLink);
        form.append("phoneNo", values.phoneNo);
        form.append("accountsEmail", values.accountsEmail);
        form.append("accountsPhone", values.accountsPhone);
        form.append("passportFront", await putFile(values.passportFront[0], passportFrontUrl.success.url));
        form.append("passportBack", await putFile(values.passportBack[0], passportBackUrl.success.url));
        form.append("tradeLicense", await putFile(values.tradeLicense[0], tradeLicenseUrl.success.url));
        form.append("emiratesId", await putFile(values.emiratesId[0], emiratesIdUrl.success.url));
    
          const res = await signUpUser(form)
    
          // Redirect to login page after successful signup
    
          if (res.status === 200) {
            setLoading(false)
            router.push('/admin/users')
            return toast({
              title: "user created successfully",
              duration: 3000,
              variant:"default"
            })
          }
    
        } catch (error: any) {
          setLoading(false)
          toast({
            title: "Signup Failed",
            description: error.message,
            duration: 3000,
            variant:"destructive"
          })
          console.log(error.message);
        }
  }

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };


  return (
    <div className="w-full gap-4 flex flex-col h-full">
      <div>
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0" className="h-full">
                  <CardHeader>
                    <CardTitle>Required Fields</CardTitle>
                    <CardDescription>
                      These fields are required to create a airline
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Email</FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the email address
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="officeName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Office Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Example ltd" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the name of the office
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="officeAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Office Address
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main Street, Anytown, USA 12345" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the office address
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="officeGoogleMapLink"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Office Google Map Link
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="https://www.google.com/maps/...." {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the office google map link
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Phone Number
                          </FormLabel>
                          <FormControl>
                            <PhoneInput
                              {...field}
                              defaultCountry="AE"
                              placeholder="Enter a phone number"
                            />
                            
                          </FormControl>
                          <FormDescription>
                            Enter the phone number
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    
                    <FormField
                      control={form.control}
                      name="accountsEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Accounts Email
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="email@example.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter the accounts email
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="accountsPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Accounts Phone
                          </FormLabel>
                          <FormControl>
                          <PhoneInput
                              {...field}
                              defaultCountry="AE"
                              placeholder="Enter a phone number"
                            />
                          </FormControl>
                          <FormDescription>
                            Enter the accounts phone
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Role Fields</CardTitle>
                    <CardDescription>
                      These are the role fields which are required to create a user
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Role
                          </FormLabel>
                          <FormControl>
                            <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="USER">
                                USER
                              </SelectItem>
                              <SelectItem value="ADMIN">ADMIN</SelectItem>
                              <SelectItem value="EMPOLOYEE">EMPOLOYEE</SelectItem>
                            </SelectContent>
                          </Select>
                          </FormControl>
                          <FormDescription>
                            Upload the back side of your passport
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                  </CardContent>
                </Card>
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Secutiry Fields</CardTitle>
                    <CardDescription>
                      These are the security fields which are required to create a user
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="********"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Upload the back side of your passport
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="********"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Upload the front side of your passport
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Required Files</CardTitle>
                    <CardDescription>
                      These fields are for uploading required files
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="passportFront"
                      render={({ field }) => (
                        <FormItem className="lg:w-[250px] lg:h-[250px] justify-center items-center">
                          <FormLabel className="font-semibold">
                            Passport Front
                          </FormLabel>

                          <FileUploader
                            value={field.value}
                            onValueChange={field.onChange}
                            dropzoneOptions={dropZoneConfig}
                            className="relative bg-background rounded-lg p-2"
                          >
                            {field.value && field.value.length > 0 && (
                              <FileUploaderContent>
                                <FileUploaderItem
                                  key={0}
                                  index={0}
                                  className="h-full w-full flex flex-col"
                                >
                                  {field.value[0] && (
                                    <>
                                      {field.value[0].type.split("/")[0] ===
                                      "image" ? (
                                        <Image
                                          alt="Product image"
                                          className="aspect-square w-full rounded-md object-cover"
                                          height="200"
                                          src={URL.createObjectURL(
                                            field.value[0]
                                          )}
                                          width="200"
                                        />
                                      ) : (
                                        <FileIcon className="aspect-square w-full rounded-md object-cover h-full" />
                                      )}
                                    </>
                                  )}
                                </FileUploaderItem>
                              </FileUploaderContent>
                            )}
                            {field.value?.length === 0 || !field.value ? (
                              <FileInput className="outline-dashed outline-1 outline-white">
                                <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                                  <FileSvgDraw />
                                </div>
                              </FileInput>
                            ) : null}
                          </FileUploader>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="passportBack"
                      render={({ field }) => (
                        <FormItem className="lg:w-[250px] lg:h-[250px] justify-center items-center mt-5">
                          <FormLabel className="font-semibold">
                            Passport Back
                          </FormLabel>

                          <FileUploader
                            value={field.value}
                            onValueChange={field.onChange}
                            dropzoneOptions={dropZoneConfig}
                            className="relative bg-background rounded-lg p-2"
                          >
                            {field.value && field.value.length > 0 && (
                              <FileUploaderContent>
                                <FileUploaderItem
                                  key={0}
                                  index={0}
                                  className="h-full w-full flex flex-col"
                                >
                                  {field.value[0] && (
                                    <>
                                      {field.value[0].type.split("/")[0] ===
                                      "image" ? (
                                        <Image
                                          alt="Product image"
                                          className="aspect-square w-full rounded-md object-cover"
                                          height="200"
                                          src={URL.createObjectURL(
                                            field.value[0]
                                          )}
                                          width="200"
                                        />
                                      ) : (
                                        <FileIcon className="aspect-square w-full rounded-md object-cover h-full" />
                                      )}
                                    </>
                                  )}
                                </FileUploaderItem>
                              </FileUploaderContent>
                            )}
                            {field.value?.length === 0 || !field.value ? (
                              <FileInput className="outline-dashed outline-1 outline-white">
                                <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                                  <FileSvgDraw />
                                </div>
                              </FileInput>
                            ) : null}
                          </FileUploader>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="tradeLicense"
                      render={({ field }) => (
                        <FormItem className="lg:w-[250px] lg:h-[250px] justify-center items-center mt-5">
                          <FormLabel className="font-semibold">
                            Trade License
                          </FormLabel>

                          <FileUploader
                            value={field.value}
                            onValueChange={field.onChange}
                            dropzoneOptions={dropZoneConfig}
                            className="relative bg-background rounded-lg p-2"
                          >
                            {field.value && field.value.length > 0 && (
                              <FileUploaderContent>
                                <FileUploaderItem
                                  key={0}
                                  index={0}
                                  className="h-full w-full flex flex-col"
                                >
                                  {field.value[0] && (
                                    <>
                                      {field.value[0].type.split("/")[0] ===
                                      "image" ? (
                                        <Image
                                          alt="Product image"
                                          className="aspect-square w-full rounded-md object-cover"
                                          height="200"
                                          src={URL.createObjectURL(
                                            field.value[0]
                                          )}
                                          width="200"
                                        />
                                      ) : (
                                        <FileIcon className="aspect-square w-full rounded-md object-cover h-full" />
                                      )}
                                    </>
                                  )}
                                </FileUploaderItem>
                              </FileUploaderContent>
                            )}
                            {field.value?.length === 0 || !field.value ? (
                              <FileInput className="outline-dashed outline-1 outline-white">
                                <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                                  <FileSvgDraw />
                                </div>
                              </FileInput>
                            ) : null}
                          </FileUploader>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emiratesId"
                      render={({ field }) => (
                        <FormItem className="lg:w-[250px] lg:h-[250px] justify-center items-center mt-5">
                          <FormLabel className="font-semibold">
                            Emirates ID
                          </FormLabel>

                          <FileUploader
                            value={field.value}
                            onValueChange={field.onChange}
                            dropzoneOptions={dropZoneConfig}
                            className="relative bg-background rounded-lg p-2"
                          >
                            {field.value && field.value.length > 0 && (
                              <FileUploaderContent>
                                <FileUploaderItem
                                  key={0}
                                  index={0}
                                  className="h-full w-full flex flex-col"
                                >
                                  {field.value[0] && (
                                    <>
                                      {field.value[0].type.split("/")[0] ===
                                      "image" ? (
                                        <Image
                                          alt="Product image"
                                          className="aspect-square w-full rounded-md object-cover"
                                          height="200"
                                          src={URL.createObjectURL(
                                            field.value[0]
                                          )}
                                          width="200"
                                        />
                                      ) : (
                                        <FileIcon className="aspect-square w-full rounded-md object-cover h-full" />
                                      )}
                                    </>
                                  )}
                                </FileUploaderItem>
                              </FileUploaderContent>
                            )}
                            {field.value?.length === 0 || !field.value ? (
                              <FileInput className="outline-dashed outline-1 outline-white">
                                <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                                  <FileSvgDraw />
                                </div>
                              </FileInput>
                            ) : null}
                          </FileUploader>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
              <Button type="submit" className="mt-5 mx-auto mb-36 flex justify-center md:col-span-2 w-full">
                Submit
                {loading&&<Loader2 className="w-4 h-4 animate-spin ml-2" />}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        SVG, PNG, JPG or GIF
      </p>
    </>
  );
};

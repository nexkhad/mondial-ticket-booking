"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/extension/file-uploader";

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
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { ChevronLeft, Paperclip, Upload } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { AddAirline } from "@/actions/addAirline";
import { useToast } from "@/components/ui/use-toast";
const formSchema = z.object({
  name: z.string().min(1).max(255),
  logoUrl: z
    .array(
      z.instanceof(File).refine((file) => file.size < 4 * 1024 * 1024, {
        message: "File size must be less than 4MB",
      })
    )
    .max(1, {
      message: "Maximum 1 files are allowed",
    }).nullable(),
  country: z.string().min(0).max(255).optional(),
  headquarters: z.string().min(0).max(255).optional(),
  website: z.string().min(0).max(255).optional(),
});

export function FlightForm() {
  const {toast} = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      logoUrl: null,
      country: "",
      headquarters: "",
      website: "",
    },
  });
  type FormValues = z.infer<typeof formSchema>;
  const allowedKeys: (keyof FormValues)[] = ['name', 'country', 'headquarters', 'website'];

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const file = form.getValues("logoUrl");
    if (!file || file?.length === 0) {
      alert('Please upload a logo');
      return;
    }


    const data = new FormData()

    for (const key of allowedKeys) {
      if (key !== 'logoUrl') {
        data.append(key, values[key] || '');
      }
    }

    data.append('logoUrl', file[0]);

    let res = await AddAirline(data);
    console.log(res);
    
    if (res.success) {
      toast({
        description: res.success.message
      })
    }else if(res.error){
      toast({
        description: res.error.message
      })
    }else{
      toast({
        description: 'Something went wrong'
      })
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
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Airline Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg: Emirates Airline"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the name of the airline company
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="logoUrl"
                    render={({ field }) => (
                      <FormItem className="lg:w-[250px] lg:h-[250px] flex justify-center items-center">
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
                                <Image
                                  alt="Product image"
                                  className="aspect-square w-full rounded-md object-cover"
                                  height="200"
                                  src={URL.createObjectURL(field.value[0])}
                                  width="200"
                                />
                              </FileUploaderItem>
                            </FileUploaderContent>
                          )}
                          {field.value?.length === 0 || !field.value ? (
                            <FileInput className="outline-dashed outline-1 outline-white">
                            <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                              <FileSvgDraw />
                            </div>
                          </FileInput>):null}
                        </FileUploader>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">

              <Card x-chunk="dashboard-07-chunk-0">
                <CardHeader>
                  <CardTitle>Optional Fields</CardTitle>
                  <CardDescription>
                    These fields are optional and can be left blank
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Country</FormLabel>
                        <FormControl>
                          <Input placeholder="U.A.E" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the country where this airline company is based
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="headquarters"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Headquarters</FormLabel>
                        <FormControl>
                          <Input placeholder="Abu Dhabi" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the place of the airline company
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Website</FormLabel>
                        <FormControl>
                          <Input placeholder="Placeholder" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the website of the airline company
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
        </div>

              <Button type="submit" className="mt-10 mb-36">Submit</Button>
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

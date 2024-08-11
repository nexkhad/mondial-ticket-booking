'use client'
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import React, { FormEvent, useState } from "react";
import Logo from '../assets/logo.png'; 
import { deleteObject, getSignedURL } from "@/actions/bucket";
import { computeSHA256 } from "@/lib/encrypt";
import { signUpUser } from "@/actions/signup";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
const SignUp = () => {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    officeName: "",
    officeAddress: "",
    officeGoogleMapLink: "",
    phoneNo: "",
    landlineNo: "",
    accountsEmail: "",
    accountsPhone: ""
  });
  const [passportFront, setPassportFront] = useState<File|null>(null); // File object for Passport Front
  const [passportBack, setPassportBack] = useState<File|null>(null); // File object for Passport Back
  const [tradeLicense, setTradeLicense] = useState<File|null>(null); // File object for Passport Back
  const [emiratesId, setEmiratesID] = useState<File | null>(null); // File object for Passport Back
  const [loading, setLoading] = useState<Boolean>(false)

  const router = useRouter()

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
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true)

    if(!passportFront || !passportBack || !tradeLicense || !emiratesId){
      alert('Please upload all the files');
      throw new Error('Please upload all the files');
    }

    let passportFrontUrl, passportBackUrl, tradeLicenseUrl, emiratesIdUrl
    try {
     passportFrontUrl = await getSignedURL(passportFront.type, passportFront.size, await computeSHA256(passportFront))
     passportBackUrl = await getSignedURL(passportBack.type, passportBack.size, await computeSHA256(passportBack))
     tradeLicenseUrl = await getSignedURL(tradeLicense.type, tradeLicense.size, await computeSHA256(tradeLicense))
     emiratesIdUrl = await getSignedURL(emiratesId.type, emiratesId.size, await computeSHA256(emiratesId))
    


    const form = new FormData();
    form.append("email", formData.email);
    form.append("password", formData.password);
    form.append("confirmPassword", formData.confirmPassword);
    form.append("officeName", formData.officeName);
    form.append("officeAddress", formData.officeAddress);
    form.append("officeGoogleMapLink", formData.officeGoogleMapLink);
    form.append("phoneNo", formData.phoneNo);
    form.append("landlineNo", formData.landlineNo);
    form.append("accountsEmail", formData.accountsEmail);
    form.append("accountsPhone", formData.accountsPhone);
    form.append("passportFront", await putFile(passportFront, passportFrontUrl.success.url));
    form.append("passportBack", await putFile(passportBack, passportBackUrl.success.url));
    form.append("tradeLicense", await putFile(tradeLicense, tradeLicenseUrl.success.url));
    form.append("emiratesId", await putFile(emiratesId, emiratesIdUrl.success.url));

      const res = await signUpUser(form)

      // Redirect to login page after successful signup

      if (res.status === 200) {
        setLoading(false)
        router.push('/login')
        return toast({
          title: "Signup successful",
          description: "Please login to continue",
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
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-left">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-16 w-auto"
          src="https://www.mondial.ae/img/logo232.png"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up for a new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm leading-6 text-gray-900 font-semibold"
            >
              Email address
            </label>
            <div className="mt-2">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="false"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="officeName"
              className="block text-sm leading-6 text-gray-900 font-semibold"
            >
              Office Name
            </label>
            <div className="mt-2">
              <Input
                id="officeName"
                name="officeName"
                type="text"
                autoComplete="false"
                required
                value={formData.officeName}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="officeAddress"
              className="block text-sm leading-6 text-gray-900 font-semibold"
            >
              Office Address
            </label>
            <div className="mt-2">
              <Textarea
                id="officeAddress"
                name="officeAddress"
                autoComplete="false"
                required
                value={formData.officeAddress}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              ></Textarea>
            </div>
          </div>
          <div>
            <label
              htmlFor="officeAddress"
              className="block text-sm leading-6 text-gray-900 font-semibold"
            >
              Office Google Map Link
            </label>
            <div className="mt-2">
              <input
                id="officeGoogleMapLink"
                name="officeGoogleMapLink"
                autoComplete="false"
                required
                value={formData.officeGoogleMapLink}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="phoneNo"
              className="block text-sm leading-6 text-gray-900 font-semibold"
            >
              Phone No
            </label>
            <div className="mt-2">
              <Input
                id="phoneNo"
                name="phoneNo"
                type="text"
                autoComplete="false"
                required
                value={formData.phoneNo}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="landlineNo"
              className="block text-sm leading-6 text-gray-900 font-semibold"
            >
              Landline No
            </label>
            <div className="mt-2">
              <Input
                id="landlineNo"
                name="landlineNo"
                type="text"
                autoComplete="false"
                required
                value={formData.landlineNo}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="accountsEmail"
              className="block text-sm leading-6 text-gray-900 font-semibold"
            >
              Accounts Email
            </label>
            <div className="mt-2">
              <Input
                id="accountsEmail"
                name="accountsEmail"
                type="email"
                autoComplete="false"
                required
                value={formData.accountsEmail}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="accountsEmail"
              className="block text-sm leading-6 text-gray-900 font-semibold"
            >
              Accounts Phone
            </label>
            <div className="mt-2">
              <Input
                id="accountsPhone"
                name="accountsPhone"
                type="number"
                autoComplete="false"
                required
                value={formData.accountsPhone}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm leading-6 text-gray-900 font-semibold"
            >
              Password
            </label>
            <div className="mt-2">
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="false"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm leading-6 text-gray-900 font-semibold"
            >
              Confirm password
            </label>
            <div className="mt-2">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="false"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="tradingLicense"
              className="block text-sm leading-6 text-gray-900 font-semibold mb-2"
            >
              Trading Licensing
            </label>
            <input
            onChange={(e) => setTradeLicense(e.target.files && e.target.files[0])}
              type="file"
              name="emiratesId"
              id="emiratesId"
              className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
              file:border-0
              file:bg-gray-100 file:me-4
              file:py-2 file:px-4
               "
            />
          </div>

          <div>
            <label
              htmlFor="emiratesId"
              className="block text-sm leading-6 text-gray-900 font-semibold  mb-2"
            >
              Emirates ID
            </label>
            <input
            onChange={(e) => setEmiratesID(e.target.files && e.target.files[0])}
              type="file"
              name="emiratesId"
              id="emiratesId"
              className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
              file:border-0
              file:bg-gray-100 file:me-4
              file:py-2 file:px-4
               "
            />
          </div>

          <div>
            <label
              htmlFor="small-file-input"
              className="block text-sm leading-6 text-gray-900 font-semibold mb-2"
            >
              Passport (front side)
            </label>
            <input
            onChange={(e) => setPassportFront(e.target.files && e.target.files[0])}
              type="file"
              id="passportFront"
              className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none 
               file:border-0
              file:bg-gray-100 file:me-4
              file:py-2 file:px-4"
            />
          </div>

          <div>
            <label
              htmlFor="small-file-input"
              className="block text-sm leading-6 text-gray-900 font-semibold mb-2"
            >
              Passport (back side)
            </label>
            <input
            onChange={(e) => setPassportBack(e.target.files && e.target.files[0])}
              type="file"
              id="passportBack"
              className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
              file:border-0
              file:bg-gray-100 file:me-4
              file:py-2 file:px-4"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 gap-2 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up

              {loading&&<Loader2 className="w-4 h-4 animate-spin my-auto"/>}
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

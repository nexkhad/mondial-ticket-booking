"use client"
import { FormEvent, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { loginUser } from "@/actions/login"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const Login = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
    const handleSubmit = async(event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        setLoading(true)
        try {
            const formData = new FormData(event.currentTarget)            
            let response = await loginUser(formData)

            if(response?.error === "Invalid email or password"){ 
                return toast({
                  title: 'Login failed',
                  description: "Invalid email or password",
                  variant: "destructive",
                })
              }

            if(response?.error === "Something went wrong"){ 
                return toast({
                  title: 'Login failed',
                  description: "Something went wrong",
                  variant: "destructive",
                })
              }


              toast({
                title: 'Login successful',
                description: "You have successfully logged in",
                variant: "default",
              })

              setLoading(false)
        } catch (error: any) {
          toast({
            title: 'Login failed',
            description: error?.response?.data.message,
            variant: "destructive",
          })
            console.log(error?.response?.data.message);
          }
          setLoading(false)
    }

    
    return(
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 text-left mt-24 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-16 w-auto"
            src={'https://www.mondial.ae/img/logo232.png'}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm  leading-6 text-gray-900 font-semibold">
                Email address
              </label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md pl-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a3915a] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm leading-6 text-gray-900 font-semibold">
                  Password
                </label>
                <div className="text-sm">
                  <a href="/forgot-password" className="font-semibold text-[#a3915a] hover:text-[#A39150]">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md pl-4 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#a3915a] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#a3915a] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#A39150] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a3915a]"
              >
                Sign in
                {loading&&<Loader2 className="ml-2 h-4 w-4 animate-spin my-auto" />}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-semibold leading-6 text-[#a3915a] hover:text-[#A39150]">
              Create an account
            </Link>
          </p>
        </div>
      </div>

    )
}

export default Login
"use client"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { loginUser } from "@/actions/login"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

const Login = () => {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("email", values.email)
      formData.append("password", values.password)
      
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

    } catch (error: any) {
      toast({
        title: 'Login failed',
        description: error?.response?.data.message,
        variant: "destructive",
      })
      console.log(error?.response?.data.message);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <img
            className="h-16 w-auto"
            src={'https://www.mondial.ae/img/logo232.png'}
            alt="Your Company"
          />
        </div>
        <Card>
          <CardTitle className="text-center mt-5">Sign in to your account</CardTitle>
          <CardContent className="space-y-6 pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                >
                  Sign in
                  {loading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/auth/register" className="font-medium text-primary hover:underline">
              Create an account
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Login
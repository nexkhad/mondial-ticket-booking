"use server";
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

export async function loginUser(formData: FormData) {
    
    
    try {
        await signIn("credentials",{
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if(error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {error: "Invalid email or password"}
            
                default:
                    return {error: "Something went wrong"}                
            }
        }

        throw error
    }
}
  
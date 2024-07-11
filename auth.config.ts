import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import bcrypt from "bcryptjs"
import { getUserByEmail } from "./data/user"
export default { 
  providers: [
    Credentials({
        async authorize(credentials) {
            const { email, password } = credentials as any
            
            console.log(email, password)
            if (!email || !password) {
                throw new Error("Email and password required")
            }

            const user = await getUserByEmail(email)
            if (!user || !user.password) return null
            
            const isMatch = await bcrypt.compare(password, user.password)


            if (isMatch) {
                console.log(user);
                return user
            }

            return null
        }
    })
    ]
 } satisfies NextAuthConfig
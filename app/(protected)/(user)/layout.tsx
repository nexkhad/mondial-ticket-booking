import Header from "@/components/custom/header"
import { getCurrentRole, getCurrentUser } from "@/lib/auth"
import { UserRole } from "@prisma/client"
import { redirect } from "next/navigation"

interface ProtectedLayoutProps {
    children: React.ReactNode
}

const ProtectedLayout = async ({children}: ProtectedLayoutProps) => {

    const user = await getCurrentUser()
    const role = await getCurrentRole()

    if(!user){
        return redirect("/auth/login")
    }

    return(
        <div className="w-full h-[100dvh] flex flex-col gap-y-10 items-center justify-center ">
            <Header />
            {children}
        </div>
    )
 }
 
 export default ProtectedLayout
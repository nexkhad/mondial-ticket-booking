import { getCurrentRole, getCurrentUser } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import Unauthrized from "../_components/Unauthrized";
import { redirect } from "next/navigation";
import MobileSidebar from "../_components/sidebar";
import Sidebar from "../_components/mobile-sidebar";
interface AdminLayoutProps {
    children: React.ReactNode
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
    const user = await getCurrentUser()
    const role = await getCurrentRole()
    if(!user){
        return redirect("/auth/login")
    }

    if( role !== UserRole.ADMIN){
        console.log('redirect needed')
        return (
            <Unauthrized/>
        )
    }

    return(
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <MobileSidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 h-full min-h-screen">
        <Sidebar />
    { children }
      </div>
        </div>
    )
 }
 
 export default AdminLayout
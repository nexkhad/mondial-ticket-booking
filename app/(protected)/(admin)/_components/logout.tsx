"use client"
import { logout } from "@/actions/logout"

const Logout = () => {
    const Logout = async() => {
        await logout()
    }
    return(
        <button onClick={Logout}>Logout</button>
    )
}

export default Logout
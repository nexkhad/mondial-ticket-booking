"use client"
import React,{ FunctionComponent, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

interface UnauthrizedProps {
    
}
 
const Unauthrized: FunctionComponent<UnauthrizedProps> = () => {
    const {toast} = useToast()
    const router = useRouter()
    useEffect(() => {
        toast({
            title: "Unauthrized",
            description: "You are not authorized to access this page",
            variant: "destructive",
        })
        router.push("/")
    },[])
    return (
        <>
        Unauthrized
        </>
    );
}
 
export default Unauthrized;



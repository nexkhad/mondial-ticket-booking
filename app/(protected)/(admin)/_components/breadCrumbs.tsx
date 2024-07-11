"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const BreadCrumbs = () => {
  const [mounted, setMounted] = useState(false);
    const path = usePathname()
    
    useEffect(() => {
      setMounted(true);
  }, []);
  
  if (!mounted) return null;
    
    
    
    const segments = path.split('/').filter(Boolean)
    segments.shift()
    segments.map((segment, index) => {
        segments[index] = segment.charAt(0).toUpperCase() + segment.slice(1)
    })



    return(
        <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1
            const href = `/admin/${segments.slice(0, index + 1).join('/').toLocaleLowerCase()}`

            return (
              <BreadcrumbItem key={index}>
                {!isLast ? (
                  <>
                    <BreadcrumbLink asChild>
                      <Link href={href}>{segment}</Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <BreadcrumbPage>{segment}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    )
}

export default BreadCrumbs


"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export const SectionNav = () => {
    const active = 'bg-blue-800 text-white border-blue-800'
    const path = usePathname()
  return (
    <div  className="display w-4/5 felx my-5 gap-2">
        <Link href={"/flight"} className={`px-4 py-1 rounded-full font-semibold  ${path === '/'? active : 'border-black border-2 text-black bg-white'}`}>Flights</Link>
        <Link href={""} className={`px-4 py-1 rounded-full font-semibold  ml-1 ${path === '/visa'? active : 'border-black border-2 text-black bg-white'}`}>Visa</Link>
      </div>
  )
}
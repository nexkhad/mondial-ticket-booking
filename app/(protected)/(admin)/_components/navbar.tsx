"use client"
import { User2, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { logout } from '@/actions/logout';
import { usePathname } from 'next/navigation';
function Navigation() {
  
  const [isAdminRoute, setIsAdminRoute] = useState(false)
  const pathName = usePathname()
  console.log(pathName);
  
  const LogOut = async() => {
    await logout()
  }
  const active = '!text-blue-600'
  const path = '/'

  const isApplicationsTab = false;
  const isDashboard = path === '/';
  const isFamilyApplication = false
  
  return (
<>
<div className="navbar bg-base-100">
  <div className="navbar-start">
     <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
     
      <li><Link className={`font-medium text-gray-500   ${isDashboard ? active : ''}`} href="/" aria-current="page">Dashboard</Link></li>
      {/* <li><Link className={`font-medium text-gray-500   ${path.includes('application') ? active : ''}`} href="/pricing" aria-current="page">Pricing</Link></li> */}
      <li><Link className={`font-medium text-gray-500   ${isApplicationsTab ? active : ''}`} href={{pathname: "/", search:"?tab=applications"}} aria-current="page">Applications</Link></li>
      <li><Link className={`font-medium text-gray-500    ${path.includes('application') ? active : ''}`} href="/application">New Application</Link></li>
      <li><Link className={`font-medium text-gray-500    ${path.includes('contact-us') ? active : ''}`} href="/contact-us">Contact Us</Link></li>
      <li><Link className={`font-medium text-gray-500    ${path.includes('about') ? active : ''}`} href="/about">About Us</Link></li>
      <li className='font-medium text-gray-500'>

      </li>
       
        
      <li><Link className={`font-medium text-gray-500 hover:text-gray-400 ${path.includes('application') ? active : ''}`} href="/admin/dashboard/applications" aria-current="page">Recent Application</Link></li>
      <li><Link className={`font-medium text-gray-500 hover:text-gray-400 ${isFamilyApplication ? active : ''}`} href="/admin/dashboard/familyApplications" aria-current="page">Family Application</Link></li>
      <li><Link className={`font-medium text-gray-500 hover:text-gray-400 ${path.includes('users') ? active : ''}`} href="/admin/dashboard/users">Recent Signups</Link></li>
      <li><Link className={`font-medium text-gray-500    ${path.includes('pricing') ? active : ''}`} href="/pricing" aria-current="page">Pricing</Link></li>
      <li className='font-medium text-gray-500'>
      <Button onClick={LogOut}>Log Out</Button>
      </li>
   
      </ul>
    </div>
    <Link href={'/'}  className="btn btn-ghost text-xl max-w-[170px] md:max-w-xs hover:bg-gray-400/10"><img src="" alt="" className='w-full h-full hover:opacity-60'/></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
   <ul className="menu menu-horizontal gap-2">
     
    
      <li><Link className={`font-medium text-gray-500 hover:text-gray-400 ${path.includes('application') ? active : ''}`} href="/admin/dashboard/applications" aria-current="page">Application</Link></li>
      <li><Link className={`font-medium text-gray-500 hover:text-gray-400 ${isFamilyApplication ? active : ''}`} href="/admin/dashboard/familyApplications" aria-current="page">Family Application</Link></li>
      <li><Link className={`font-medium text-gray-500 hover:text-gray-400 ${path.includes('users') ? active : ''}`} href="/admin/dashboard/users">Recent Signups</Link></li>
      <li><Link className={`font-medium text-gray-500  ${path.includes('pricing') ? active : ''}`} href="/pricing" aria-current="page">Pricing</Link></li>
      <li className='font-medium text-gray-500'><Button className='bg-transparent text-gray-500 hover:text-gray-400 hover:bg-slate-200/50' onClick={()=> LogOut()}>Log Out</Button>

      </li>

    </ul>
  </div>
  <div className="navbar-end mr-5">

    <div className="dropdown dropdown-end">
      {/* <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className={`w-10 rounded-full ${user.logo ? '':'flex justify-center items-center'}`}>
          {user.logo && <img alt="Tailwind CSS Navbar component" src={createFileUrl(user.logo, token)} />}
          {!user.logo && <User2 className='mx-auto mt-2'/>}
        </div>
      </div> */}
      <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
       {/* {isAuth &&  <li><button onClick={LogOut}>Logout</button></li>} */}
       {/* {isAuth && role === "USER" &&  <li><Link href="/pricing/transactions">Transactions</Link></li>} */}
       {/* {isAuth && role === "ADMIN" &&  <li><Link href="/admin/manage-wallets">Transactions</Link></li>} */}
       {/* {!isAuth &&  <li><Link href={"/login"}>Login</Link></li>} */}
      </ul>
    </div>
  </div>
</div>
</>
  );
}


export default Navigation
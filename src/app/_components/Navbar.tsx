import React from "react";
import { getSession } from "../_lib/session";
import ProfileDropdown from "./ProfileDropdown";
import AppLogo from "./AppLogo";
import Link from "next/link";

const Navbar = async () => {
    const session = await getSession();
    
    return (
    <nav className="bg-white shadow-sm">
        <div className="container mx-auto p-4 flex justify-between items-center ">
            <AppLogo />
            <div className="flex items-center space-x-4">
                {session ? (
                    <>
                       <Link href="/contact" className="text-blue-600 hover:text-blue-700 transition-colors">
                           Contacts
                        </Link>
                        <ProfileDropdown user={session} />
                    </>
                  ) : (
                    <>
                        <Link href="/login" className="text-blue-600 hover:text-blue-700 transition-colors">
                           Login
                        </Link>
                        <Link href="/register" className="text-gray-700 hover:text-blue-600 transition-colors">
                           Register
                        </Link>
                    </>

                )}
            </div>
        </div>
    </nav>
  );

};
export default Navbar;
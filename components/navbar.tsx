import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
    const {userId} = auth()

    if(!userId)     redirect("/sign-in")

    const store = await prismadb.store.findMany({
        where:{
            userId:userId,
        }
    })
    
    return ( 
        <div className="border-b border-gray-300">
            <div className="flex items-center h-16 px-4">
                <StoreSwitcher items={store}/>
                <MainNav className=""/>
                <div className="flex items-center space-x-5 ml-auto">
                    <UserButton afterSignOutUrl="/"/>
                </div>
            </div>
        </div>
     );
}
 
export default Navbar;
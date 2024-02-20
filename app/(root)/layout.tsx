import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
    children,
} :{
    children:React.ReactNode
} ) {
    const {userId }  = auth(); 

    if(!userId) redirect('/sign-in');
    else console.log("user");
    

    // we have to find the first active store the currently logged in user has 
    const store = await prismadb.store.findFirst({
        where:{
            userId : userId
        }
    })

    //if that rqd store exist 
    if(store)
    {
        console.log(store)
        redirect(`/${store.id}`);
    }else {
        console.log("this store doesnt exist ");  
    };

    return (
        <>
            {children}
        </>
    );
}
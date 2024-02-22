import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
    req:Request,
){
    try{
        const {userId} = auth()
        const body = await req.json()

        const {name} = body

        if(!userId)  return new NextResponse("Unauthorized",{status : 401});
        
        if(!name) return new NextResponse("Name is required" , {status:400} );

        const prevStore = await prismadb.store.findFirst({
            where:{
                name:name,
                userId
            },
        })

        if(prevStore) return new NextResponse("Store Name already taken ",{status:401})
        
        //now we have all the neccesaary details to create a store api
        const store = await prismadb.store.create({
            data:{
                name,
                userId
            }
        });

        return  NextResponse.json(store);

    }catch(error){
        console.log('[STORES_POST]',error);
        return new NextResponse("Internal error",{status:500});
    } 
}



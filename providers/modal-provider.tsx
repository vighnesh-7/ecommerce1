'use client'


import { useEffect,useState } from "react"

import { StoreModal } from "@/components/modals/store-modal"

export const ModalProvider = () => {
    const [isMounted,setIsMounted] = useState(false)

    //to overcome any Hydration error b/w server-side rendering and Client-side rendering
    useEffect(()=>{
        setIsMounted(true);
    },[])

    //when the modal is in server-side rendering , we'll just return null to the server as this is a client-side component till the above useEffect cycle is compeleted 
    if(!isMounted){
        return null
    }
    

    // we 'll return when we are in client-side
    return(
        <>
            <StoreModal/>
        </>
    )
}
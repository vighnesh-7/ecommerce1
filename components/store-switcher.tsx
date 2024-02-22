"use client"

import { Store } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"
import {  useState } from "react"
import { BiSolidStore } from "react-icons/bi";
import { RiArrowDropUpLine } from "react-icons/ri";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineStore } from "react-icons/md";
import { IoIosCheckmark } from "react-icons/io";
import { MdOutlineAddBusiness } from "react-icons/md";


import { useStoreModal } from "@/hooks/user-store-modal"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { 
    Command, 
    CommandEmpty, 
    CommandGroup, 
    CommandInput, 
    CommandItem, 
    CommandList, 
    CommandSeparator
} from "./ui/command";

type PopoverProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverProps{
    items:Store[]
}



export default function StoreSwitcher({
    className,
    items= []
}:StoreSwitcherProps) {

    const storeModal = useStoreModal()
    const router = useRouter()
    const params = useParams()

    const formattedItems = items.map((item)=>({
        label:item.name,
        value:item.id
    }))


    const currentStore = formattedItems.find((item) => item.value === params.storeId  )

    const [open ,setOpen ] = useState(false)
    
    const storeSelect = (store:{value:string,label:string}) => {
        setOpen(false);
        router.push(`/${store.value}`)
    }

    return(
        <Popover open={open} onOpenChange={setOpen}  > 
            <PopoverTrigger asChild>
                <Button className="p-2 flex justify-between w-[250px] "
                    variant='outline'
                    size='sm'
                    role="popover"
                    aria-label="Select a Store"
                    aria-expanded={open}
                >
                    <BiSolidStore className="h-6 mr-2 w-6 p-0 m-0" />
                    {currentStore?.label}
                    {
                        open?(
                            <RiArrowDropUpLine className="h-5 w-5 m-0 opacity-65  p-0"  />
                        ):(
                            <RiArrowDropDownLine className="h-5 w-5 opacity-65 m-0 p-0"  />
                        )
                    }
                </Button>   
            </PopoverTrigger>
            <PopoverContent className="w-[250px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search Store... "  />
                        <CommandEmpty>
                            No Store found.
                        </CommandEmpty>
                        <CommandGroup heading='Stores'>
                            {
                                formattedItems.map((storeItem) => (
                                    <CommandItem
                                        className=" text-sm "
                                        key= {storeItem.value}
                                        onSelect={() => storeSelect(storeItem) }
                                    >
                                        <MdOutlineStore className="mr-2 opacity-90 h-5 w-5" />
                                        {storeItem.label}
                                        {
                                            currentStore?.value === storeItem.value?
                                            (
                                                <IoIosCheckmark className="text-gray-700 opacity-100 h-5 w-5 ml-auto" />
                                            ):(
                                                <IoIosCheckmark className="opacity-0" />
                                            )
                                        }
                                    </CommandItem>
                                ) )
                            }
                        </CommandGroup>
                    </CommandList>
                    {/* to create a new store at the combobox itself */}
                    <CommandSeparator/>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false)
                                    storeModal.onOpen();
                                }}
                            >
                                <MdOutlineAddBusiness className="mr-4 opacity-85 h-5 w-5 " />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
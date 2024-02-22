'use client'
3:10
import { Store } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";


import { Button } from "./ui/button";
import { FaRegTrashCan } from "react-icons/fa6";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";


interface SettingsFormProps{
    initialData : Store 
}

const formSchema = z.object({
    name : z.string().min(1)
})

type SettingsFormValues = z.infer<typeof formSchema> 


export const SettingsForm : React.FC<SettingsFormProps> = ({
    initialData
}) => {
    const params = useParams()
    const router = useRouter()
    const [open,setOpen] = useState(false);
    const [loading,setLoading] = useState(false);
    
    const form = useForm<SettingsFormValues>({
        resolver : zodResolver(formSchema),
        defaultValues : initialData
    })

    const onSubmit = async  (data : SettingsFormValues ) => {
        try {
            setLoading(true)
            
            await axios.patch(`/api/store/${params.storeId}`,data)
            router.refresh()
            toast.success("Store updated successfully")
        } catch(error) {
            toast.error("Something went wrong.")
        } finally{
            setLoading (false)
        }
    }
    
    return ( 
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className=" text-3xl font-bold">Settings</h2>
                    <p className="text-sm" >Manage store preferences</p>
                </div>
                <Button
                disabled={loading}
                className="p-3 bg-red-600"
                variant='destructive'
                size='icon'
                onClick={()=>{}}
                >
                    <FaRegTrashCan className="h-4 w-4" />
                </Button>
            </div>
            <hr />

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className=" w-full space-y-8" >
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name='name'
                            render = {({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input  disabled={loading} placeholder="Store Name" {...field}   />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button variant='outline' disabled= {loading} className="ml-auto bg-gray-700 text-white font-semibold hover:bg-gray-600 hover:text-white " type='submit'  >
                        Save Changes
                    </Button>
                </form>
            </Form>
        </>
    );
}

export default SettingsForm;
'use client'

import * as z from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios'
import {toast} from 'react-hot-toast';

import { useStoreModal } from "@/hooks/user-store-modal"
import { Modal } from "../ui/modal"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const formSchema = z.object({
    name : z.string().min(1),
})


export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading ,setLoading] = useState(false)
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:"",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            setLoading(true)

            //removing empty spaces
            if(!values.name)
            {
                console.log("Null store found");
                throw new Error("Store name cant be empty");
            }
            values.name = values.name.trim()
            const response = await axios.post('/api/store',values)

            window.location.assign(`${response.data.id}`)
            console.log(response.data);
        }catch(error){
            toast.error("Something went wrong")
        }finally{
            setLoading(false)
        }
    } 
    
    return (

        <Modal
            title = 'Create Store'
            description = "Add a new Store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose = {storeModal.onClose}
            >
                <div>
                    <div className=' space-y-4 py-4 pb-4'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField control={form.control} name='name' render={({field}) =>(
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input disabled={loading} placeholder='Ecommerce' {...field}  />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                    )}
                                />
                                <div className=' space-x-2 pt-5 flex items-center justify-end'>
                                    <Button onClick={storeModal.onClose} disabled={loading} variant='secondary' className='border hover:bg-slate-200 border-zinc-200'  >
                                        Cancel
                                    </Button>
                                    <Button disabled={loading} className=' bg-zinc-900' >
                                        Continue
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
        </Modal>
    )
} 


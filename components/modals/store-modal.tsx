"use client"

import { Modal } from "@/components/ui/modal"
import { useStoreModal } from "@/hooks/use-store-modal"
import { useForm } from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"

import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useState } from "react"

import axios from "axios"
import { toast } from "react-hot-toast"


const formSchema = z.object ({
    name: z.string().min(1),
})

export const StoreModal = () => {
    const storeModal = useStoreModal()
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: " ",
        },
    });

    const onSubmit =  async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            const response = await axios.post('/api/stores', values)

            // this line of code takes us to the exact store's page location 
            window.location.assign(`/${response.data.id}`)
            
        } catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories" 
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField 
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                placeholder="E-Commerce"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            /> 
                            <div className="flex justify-end gap-2 items-center space-x-2 pt-6">
                                <Button
                                    disabled={loading} 
                                    variant="outline"
                                    onClick={storeModal.onClose}
                                >
                                    Cancel
                                </Button>

                                <Button 
                                    type="submit"
                                    disabled={loading}
                                >
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
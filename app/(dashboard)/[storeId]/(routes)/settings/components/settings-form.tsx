"use client"

import { Button } from '@/components/ui/button'
import { Store } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Separator } from '@/components/ui/separator'
import { useParams, useRouter } from 'next/navigation'
import { AlertModal } from '@/components/modals/alert-modal'
import { ApiAlert } from '@/components/ui/api-alert'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { useOrigin } from '@/hooks/use-origin'


import Heading from '@/components/ui/heading'
import * as z from 'zod'
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form'

import toast from 'react-hot-toast'
import axios from 'axios'


interface SettingsFormProps {
  initialData: Store
}

const formSchema = z.object({
  name: z.string().min(1)
})


//this code makes it is easier to input data into the form or delete data from the form, it makes the code cleaner
type SettingsFormValues = z.infer<typeof formSchema>

const SettingsForm: React.FC<SettingsFormProps> = ({initialData}) => {
  
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  })


  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()
  

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      await axios.patch(`/api/stores/${params.storeId}`, data)
      toast.success("Store Updated")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push("/")
      toast.success("Store Deleted")
    } catch (error) {
      toast.error("Make sure you removed all products and categories")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  };

  return (
    <>
    <AlertModal 
      isOpen={open}
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
      <div className='flex items-center justify-between '>
        <Heading
          title='Settings'
          description='Manage store preference'
        />
        <Button
          disabled={loading}
          variant="destructive"
          size="icon"
          onClick={() => {setOpen(true)}}
        >
          <Trash className='h-4 w-4' />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='grid grid-cols-3 gap-8'>
            <FormField 
              control={form.control}
              name='name'
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Store name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button
              disabled={loading}
              type='submit'
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
      <Separator />
      <ApiAlert
          title='NEXT_PUBLIC_API_URL'
          description={`${origin}/api/${params.storeId}`}
          variant="public"
        />
    </>
  )
}

export default SettingsForm
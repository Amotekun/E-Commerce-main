import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import Navbar from "@/components/navbar"
import prismadb from "@/lib/prismadb"

// this is the dashboard page that contains the content of the store

export default async function DashboardLayout({
    children, 
    params
}: {
    children: React.ReactNode
    params: {storeId: string}
}) {
    const {userId} = auth()

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: userId
        }
    });

    if (!store) {
        redirect('/')
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
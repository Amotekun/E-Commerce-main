import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

// this is the root page, which the application is first referred to when the store is open, if the user had a unique ID then this will be redirected to the dashboard folder page. 

export default async function SetupPage({
    children
}: {
    children: React.ReactNode;
}) {
    const {userId} = auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    })

    if(store) {
        redirect(`/${store.id}`)
    }

    return (
        <>
            {children}
        </>
    )
}
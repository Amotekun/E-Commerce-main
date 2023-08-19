import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"


//this code adds store from the database
export async function PATCH (
    req: Request,
    {params}: {params: {storeId: string}}
) {
    try {
        const {userId} = auth();
        const body = await req.json();

        const {name} = body;

        if (!userId) {
            return new NextResponse ("Unthenticated", {status: 401})
        };

        if (!name) {
            return new NextResponse ("enter a name", {status: 400})
        };

        if (!params.storeId) {
            return new NextResponse ("storeId is required", {status: 400})
        };

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId
            },
            data: {
                name
            }
        });

        return NextResponse.json(store);
    } catch (error) {
        console.log("STORE_PATCH", error);
        return new NextResponse ("internal error", {status: 500});
    };
};


// this code deletes stores from the database
export async function DELETE (
    req: Request,
    {params}: {params: {storeId: string}}
) {
    try {
        const {userId} = auth()

        if (!userId) {
            return new NextResponse ("Unauthorizes", {status: 401})
        }

        if (!params.storeId) {
            return new NextResponse("storeId is required", {status: 400})
        }

        // we use deleteMany because the userId is not unique
        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId
            }
        })

        return NextResponse.json(store)
    } catch (error) {
        console.log("[STORE_DELETE]", error);
        return new NextResponse("Internal error", {status: 500})
    }
}
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// this function allows users with a storeId and a billboard create categories 
export async function POST(
    req: Request,
    {params}: {params: {storeId: string}}
) {
    try {
        const {userId} = auth()
        const body = await req.json()

        const {name, billboardId} = body

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401});
        };

        if (!name) {
            return new NextResponse("Label is required", {status: 400})
        };

        if (!billboardId) {
            return new NextResponse("Billboard Id is required", {status:400})
        };

        if (!params.storeId) {
            return new NextResponse("StORE ID is required", {status: 400})
        };

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403})
        }

        const category = await prismadb.category.create ({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        });

        return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGORIES_ERROR]', error);
        return new NextResponse("Internal error", {status: 500});
    } 
}


// this function gets all the stores with billboards listed with category from the database 
export async function GET (
    req: Request,
    {params}: {params: {storeId: string}}
) {
    try {
        if (!params.storeId) {
            return new NextResponse("storeId is required", {status: 400})
        };

        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId
            }
        });

        return NextResponse.json(categories)
    } catch (error) {
        console.log('[CATEGORIES_ERROR]', error)
        return new NextResponse("Internal error", {status: 500})
    }
}
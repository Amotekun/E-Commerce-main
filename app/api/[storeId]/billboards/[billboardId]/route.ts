import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

import prismadb from "@/lib/prismadb";

//this code allows us find a specific billboard in the  database
export async function GET(
    req: Request,
    {params}: {params: {billboardId: string}}
) {
    try {
        if (!params.billboardId) {
            return new NextResponse ("Billboard Id is required", {status: 400})
        };

        const billboard = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId
            }
        });

        return NextResponse.json(billboard)
    } catch (error) {
        console.log("[BILLBOARD_GET]", error)
        return new NextResponse ("Internal Server Error", {status: 500})
    }
}

//this code allows us to update the billboards in the  database
export async function PATCH(
    req: Request,
    {params}: {params: {billboardId: string, storeId: string }}
) {
    try {
        const {userId} = auth();
        const body = await req.json();

        const {label, imageUrl} = body;

        if (!userId) {
            return new NextResponse ("Unauthenticated", {status: 401})
        };

        if (!label) {
            return new NextResponse ("enter a label", {status: 400})
        };

        if (!imageUrl) {
            return new NextResponse("enter an image url", {status: 400})
        }

        if (!params.billboardId) {
            return new NextResponse ("billboard id is required", {status: 400})
        };

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse ("Unauthorized", {status: 403})
        }

        const billboard = await prismadb.billboard.updateMany({
            where: {
                id: params.billboardId
            }, 
            data: {
                label,
                imageUrl
            }
        });

        return NextResponse.json(billboard)
    } catch (error) {
        console.log("[BILLBOARD_PATCH]", error)
        return new NextResponse ("Internal error", {status: 500})
    }
};

// this code deletes billboards from the database
export async function DELETE(
    req: Request,
    {params}: {params: {storeId: string, billboardId: string}}
) {
    try {
        const {userId} = auth()

        if (!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        };

        if (!params.billboardId) {
            return new NextResponse("Billboard Id is required", {status: 400})
        };

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if(!storeByUserId) {
            return new NextResponse("Unauthorized", {status: 403})
        };
        
        const billboard = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId
            }
        });

        return NextResponse.json(billboard)
    } catch (error) {
        console.log("[BILLBOARD_DELETE]", error)
        return new NextResponse ("Internal error", {status: 500})
    }
}
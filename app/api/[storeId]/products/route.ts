import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// this function allows users with a storeId create products 
export async function POST (
    req: Request,
    {params}: {params: {storeId: string}}
) {
    try {
        const {userId} = auth()
        const body = await req.json()

        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId, 
            images,
            isFeatured,
            isArchived,
        } = body 

        if(!userId) {
            return new NextResponse("Unauthenticated", {status: 401});
        }

        if (!name) {
            return new NextResponse ("name is required", {status: 400})
        }

        if (!images || !images.length) {
            return new NextResponse ("Images are required", {status: 400})
        }

        if (!price) {
            return new NextResponse ("price is required", {status: 400})
        }

        if (!categoryId) {
            return new NextResponse ("category id is required", {status: 400})
        }

        if (!colorId) {
            return new NextResponse ("color id is required", {status: 400})
        }

        if (!sizeId) {
            return new NextResponse ("size id is required", {status: 400})
        }

        if(!params.storeId) {
            return new NextResponse ("store id is required", {status: 400})
        }

        const storeByUserId =  await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse ("unauthorized", {status: 403})
        };

        const products = await prismadb.product.create({
            data: {
                name, 
                price,
                categoryId,
                colorId,
                sizeId,
                isFeatured,
                isArchived,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: {url:string}) => image)
                        ]
                    }
                }
            }
        });

        return NextResponse.json(products)
    } catch (error) {
        console.log("[PRODUCT_POST]", error);
        return new NextResponse("Internal error", {status: 500})
    }
};

// this function gets all the stores listed with products from the database 
export async function GET(
    req: Request,
    {params}: {params: {storeId: string}}
) {
    try {
        const {searchParams} = new URL(req.url)
        const categoryId = searchParams.get("categoryId") || undefined;
        const colorId = searchParams.get("colorId") || undefined;
        const sizeId = searchParams.get("sizeId") || undefined;
        const isFeatured = searchParams.get("isFeatured");

        if (!params.storeId) {
            return new NextResponse("store id is required", {status: 400})
        };

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        return NextResponse.json(products)
    } catch (error) {
        console.log("[PRODUCT__ERROR]", error) 
        return new NextResponse("Internal error", {status: 500})
    }
}
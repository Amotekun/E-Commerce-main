import prismadb from "@/lib/prismadb"

export const availableInventory = async (storeId: string) => {
    const inventoryCount = await prismadb.product.count({
        where: {
            storeId,
            isArchived: false,
        }
    });

    return inventoryCount; 
}
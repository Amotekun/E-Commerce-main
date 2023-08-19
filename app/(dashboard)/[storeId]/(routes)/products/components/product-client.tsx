"use client"

import { ProductColumn, columns } from "./columns"
import { useParams, useRouter } from "next/navigation"
import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ApiList } from "@/components/ui/api-list"
import { DataTable } from "@/components/ui/data-table"

interface ProductClientProps {
    data: ProductColumn[]
}

const ProductClient: React.FC<ProductClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
  return (
    <>
        <div className="flex items-center justify-between ">
            <Heading
                title={`Products(${data.length})`}
                description="This is a list of your products"
            />
            <Button
                onClick={() => router.push(`/${params.storeId}/products/new`)}
            >
                <Plus className="h-4 w-4 mr-2"/>
                Add New
            </Button>
        </div>
        <Separator/>
        <DataTable
            columns={columns}
            data={data}
            searchKey="name"
        />
        <Heading 
            title="API List"
            description="This is a list of API calls for billboards"
        />
        <Separator />
        <ApiList
            entityName="products"
            entityIdName="productsId"
        />

    </>
  )
}

export default ProductClient
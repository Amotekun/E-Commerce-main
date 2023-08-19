"use client"

import { useParams, useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./columns"
import Heading from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface CategoryClientProps {
  data: CategoryColumn[]
}

const CategoryClient: React.FC<CategoryClientProps> = ({data}) => {

  const router = useRouter()
  const params = useParams()

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
          title={`categories(${data.length})`}
          description="Manage your business category"
        />
        <Button
          onClick={()=> router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 h-4 w-4"/>
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable 
        columns={columns}
        data={data}
        searchKey="name"
      />
      <Heading 
        title="API"
        description="This is a list of Api calls for categories"
      />
      <Separator />
      <ApiList 
        entityName="categories"
        entityIdName="categoryId"
      />


    </>
  )
}

export default CategoryClient
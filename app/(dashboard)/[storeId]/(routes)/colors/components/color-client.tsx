"use client"

import { useParams, useRouter } from "next/navigation"
import { ColorColumn, columns } from "./columns"
import Heading from "@/components/ui/heading"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ColorClientProps {
    data: ColorColumn[]
};

const ColorClient: React.FC<ColorClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()

  return (
    <>
        <div className="flex items-center justify-between mb-8 ">
            <Heading
                title={`Color (${data.length})`}
                description="Select a color"
            />
            <Button
                onClick={() => router.push(`/${params.storeId}/colors/${params.colorId}`)}
            >
                <Plus className="h-4 w-4"/>
                Add new
            </Button>
        </div>
        <Separator/>
        <DataTable 
            
            columns={columns}
            data={data}
            searchKey="name"
        />
        <Heading 
            title="API list"
            description="This is a list of API calls for colors"
        />
        <Separator/> 
        <ApiList 
            entityName = "colors"
            entityIdName = "colorId"
        />
    </>
  )
}

export default ColorClient
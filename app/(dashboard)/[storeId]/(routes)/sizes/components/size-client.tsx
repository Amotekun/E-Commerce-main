"use client"

import { ApiList } from "@/components/ui/api-list";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SizeColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface SizeClientProps {
    data: SizeColumn[]
}

const SizeClient: React.FC<SizeClientProps> = ({data}) => {
    const router = useRouter()
    const params = useParams()
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Sizes (${data.length})`}
                    description="Select you size to display"
                />
                <Button
                    onClick={() => router.push(`/${params.storeId}/sizes/new`)}
                >
                    <Plus className="h-4 w-4"/>
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable
                searchKey="name"
                columns={columns}
                data={data}
            />
            <Heading
                title="API list"
                description="This is a list of API calls for sizes"
            />
            <Separator/>
            <ApiList
                entityName="sizes"
                entityIdName="sizeId"
            />
        </>
    )
}

export default SizeClient;
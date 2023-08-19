import { OrderColumn, columns } from "./columns"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"

import Heading from "@/components/ui/heading"


interface OrderClientProps {
    data: OrderColumn[]
}

const OrderClient: React.FC<OrderClientProps> = ({data}) => {

  return (
    <>
        <Heading
            title={`Orders(${data.length})`}
            description="Manage your orders"
        />
        <Separator />
        <DataTable
            searchKey="products" 
            columns={columns}
            data={data}
            
        />
    </>
  )
}

export default OrderClient
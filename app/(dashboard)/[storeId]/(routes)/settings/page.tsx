import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import SettingsForm from "./components/settings-form";
import { Store } from "lucide-react";

interface SettingsPageProps {
    params: {storeId: string}
}

const SettingsPage: React.FC<SettingsPageProps> = async ({params}) => {
    const {userId} = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    })

    //since we will get an error if we do not have this code in place, this makes it a typescript protection and a userExperience protection
    if (!store) {
        redirect("/")
    }

  return (
    <div className="flex-col">
        <div className="space-y-4 p-8 pt-6 flex-1">

            {/* this will be to prefill and input the name for our store incase we choose to expand in the future */}
            <SettingsForm initialData={store} />
        </div>
    </div>
  )
}

export default SettingsPage;
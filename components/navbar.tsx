import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ThemeToggle } from "./theme-toggle";

// This will be a store switcher, inside this we are creating a routing system that will be used to manage different stores

const Navbar = async () => {
    const {userId} = auth()

    if (!userId) {
        redirect("/sign-in")
    }

    // this code uses findMany to find all the stores in the database created by the currentUser Id 
    const stores = await prismadb.store.findMany({
        where: {
            userId
        }
    })
  return (
    <div className="border-b">
        <div className="flex items-center px-4 h-16 ">
            <div>
            <StoreSwitcher items={stores} />
            </div>
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
                <ThemeToggle />
                <UserButton afterSignOutUrl="/" />
            </div>
        </div>
    </div>
  )
}

export default Navbar;
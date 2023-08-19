"use client"

import { Store } from "@prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
    Command, 
    CommandEmpty, 
    CommandGroup,
    CommandInput, 
    CommandItem, 
    CommandList, 
    CommandSeparator 
} from "@/components/ui/command";
import { useStoreModal } from "@/hooks/use-store-modal";


type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: Store[];
};

export default function StoreSwitcher({className, items = []}: StoreSwitcherProps) {

    const params = useParams()
    const router = useRouter()
    const [open, setOpen] = useState(false)
    const storeModal = useStoreModal()

    // we are iterating over the store in my prisma path database 
    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }));
    
    // like the name implies, this code demonstrates the current page we are on by checking of the storeId is equal to the url id of the current page
    const currentStore = formattedItems.find((item) => item.value === params.storeId)

    //this line of code will help in the redirection of the page to the [storeId] endpoint, this will happen when we click on another store to change the page
    const onStoreSelect = (store: {value: string, label: string}) => {
        setOpen(false)
        router.push(`/${store.value}`);
    }


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Seleect a Store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="mr-2 h-4 w-4"/>
                    {currentStore?.label}
                   <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search store" />
                        <CommandEmpty>No store found</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => {onStoreSelect(store)}}
                                    className="text-sm"
                                >
                                    <StoreIcon className="mr-2 h-4 w-4"/>
                                    {store.label}
                                    <Check 
                                        className={cn(
                                            "ml-auto h-4 w-4", 
                                            currentStore?.value === store.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator/>
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    setOpen(false);
                                    storeModal.onOpen()
                                }}
                            >
                                <PlusCircle className="mr-2 h-5 w-5" />
                                Create store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
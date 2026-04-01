"use server"

import { createClient } from "@/lib/supabaseServer";
import SignOutButton from "./components/SignOutButton";
import ChangeNameButtonDialog from "./components/ChangeNameButtonDialog";
import ItemCard from "./components/ItemCard";
import getAllItems from "./actions/getItems";
import UndoDialog from "./components/UndoDialog";
import Image from "next/image";

export default async function LoggerContainer() {

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const { data: booth_data } = await supabase.from("booths").select("name").eq("access_key", user?.user_metadata?.access_key).single();
    const displayName = user?.user_metadata?.display_name;
    const allItems = await getAllItems();

    return (
        <div className="my-10 m-5 flex gap-y-5 flex-col font-[Inter]">
            <div key="header">
                <h1 className="font-bold text-2xl">
                    Matsuri Logger - {booth_data?.name}
                </h1>
                <p className="pt-1 text-sm">
                    Good evening, <b>{displayName}</b>. Please use this tool under the discretion of the instructions provided.
                </p>
                <ul className="pt-1 list-inside list-disc text-red-700 font-bold text-sm">
                    <li>Do not enter FAKE logs.</li>
                    <li>Do not enter SHARE PHONES.</li>
                    <li>LOG OUT OF SYSTEM WHEN DONE!</li>
                    <li>GREEN TICKET is worth $1. YELLOW TICKET is worth $1. </li>
                    <li>WHITE TICKET is ONE PORTION.</li>
                    <li>Use equivilency to determine COST. Reload page if price changes mid-night.</li>
                </ul>
                <a href="tel:+14245423061" className="pt-1 text-md text-blue-500 font-bold"> 
                    CALL KENNY @ (424) 542-3061 FOR LOGGER ISSUES ASAP.
                </a>
            </div>
            <UndoDialog />
            <div className="flex flex-col gap-8 my-5">
                {allItems.map(item => (
                    <ItemCard key={item.id} item={item} />
                ))}
            </div>

            <ChangeNameButtonDialog />
            <SignOutButton />
            
            
        </div>
    )
}
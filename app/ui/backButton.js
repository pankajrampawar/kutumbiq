'use client'
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button className="min-w-10 min-h-10 z-10 rounded-full flex justify-center  itmes-center max-w-10 max-h-10 items-center" onClick={() => { router.back() }}>
            <ChevronLeftIcon className="-translate-x-[1px]" />
        </button>
    )
}
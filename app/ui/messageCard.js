import { lato } from "./fonts";

export default function MessageCard({ message, className }) {
    return (
        <div className="absolute -top-20 right-0">
            <div className="flex gap-3 bg-white/5 p-1 rounded-t-full rounded-br-full text-sm min-w-[60px] justify-between relative overflow-hidden max-w-[140px] min-h-fit shadow-xl">
                <div className="absolute blur-3xl  bg-primary min-w-10 min-h-20 left-0"></div>
                <div className="absolute blur-3xl  bg-rustOrange min-w-10 min-h-20 right-0"></div>
                <p className={`text-left p-3 ${lato.className} text-base font-semibold`}>{message}!</p>
            </div>
        </div>
    )
}
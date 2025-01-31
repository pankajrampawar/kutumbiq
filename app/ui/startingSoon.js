import { lato, montserrat } from "./fonts";

export default function StartingSoon() {
    return (
        <div className="h-screen relative flex ">
            <div className="flex min-w-10 max-w-10 min-h-10 bg-rustOrange absolute left-1/2 -translate-x-1/2 top-28 blur-[46px]"></div>
            <div className="flex min-w-10 max-w-10 min-h-10 bg-brightYellow absolute left-1/2 -translate-x-1/2 top-60 blur-[46px]"></div>

            <div className="text-center space-y-4">
                <h1 className={`text-3xl font-medium text-center mt-36 tracking-wide ${montserrat.className}`}>This service will start soon.</h1>
                <p className={`${lato.className} tracking-wider`}>Till then enjoy our tiffin services!</p>
                <div className="flex justify-center w-full">
                    <button className={`${montserrat.className} font-semibold text-xl bg-primary text-white relative z-40 p-2 px-3 rounded-xl mt-4`}>Go Back</button>
                </div>
            </div>
        </div>
    )
}
import Navbar from "../ui/components/navbar";

export const metadata = {
    title: "Kutumbiq Services",
    description: "Kutumbiq aims at solving problems faced by students in their day to day life. An initiative by the students for the students",
};

export default function Layout({ children }) {
    return (
        <div>
            <div className="relative w-full z-50">
                <Navbar />
            </div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}
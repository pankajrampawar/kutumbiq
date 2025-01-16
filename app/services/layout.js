import Navbar from "../ui/components/navbar";

export const metadata = {
    title: "Kutumbiq Services",
    description: "Kutumbiq solves daily problems of the common men",
};

export default function Layout({ children }) {
    return (
        <div>
            <div className="relative z-50">
                <Navbar />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
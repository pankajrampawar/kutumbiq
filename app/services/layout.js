import Navbar from "../ui/components/navbar";

export const metadata = {
    title: "Kutumbiq Services",
    description: "Kutumbiq solves daily problems of the common men",
};

export default function Layout({ children }) {
    return (
        <div>
            <div>
                <Navbar />
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}
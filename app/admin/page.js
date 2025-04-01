'use client';
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminPage() {
    const router = useRouter();

    // Navigation options array for easier mapping
    const navOptions = [
        { label: "Add New Vendor", path: "/admin/addVendor" },
        { label: "Update Existing Vendor", path: "/admin/updateVendor" },
        { label: "View All Orders", path: "/admin/allOrders" },
        { label: "Users", path: "/admin/users" },
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl mx-auto"
            >
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
                <p className="text-gray-600 mb-8">Select an option to manage the platform.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {navOptions.map((option, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.03 }}
                            className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
                        >
                            <button
                                onClick={() => router.push(option.path)}
                                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-300 text-lg font-medium"
                            >
                                {option.label}
                            </button>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
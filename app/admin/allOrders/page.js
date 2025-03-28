'use client';
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function AllOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nonUser, setNonUser] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const { data: session } = useSession();

    // Fetch orders based on selected date
    const fetchOrders = async (date) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/tiffin/getAllOrders?date=${date}`);
            const data = await response.json();
            setOrders(data.data || []);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    // Authorization and initial fetch
    useEffect(() => {
        if (session) {
            if (
                session.user.email === "rohangotnochil@gmail.com" ||
                session.user.email === "sujalpakhale1@gmail.com" ||
                session.user.email === "pankajpawars123@gmail.com" ||
                session.user.email === "2022.pankaj.pawar@ves.ac.in"
            ) {
                setNonUser(false);
                fetchOrders(selectedDate);
            } else {
                console.error("Unauthorized access");
                setNonUser(true);
                setLoading(false);
            }
        } else {
            setLoading(false);
            setNonUser(true);
        }
    }, [session, selectedDate]);

    // Calculate KPIs when orders change
    useEffect(() => {
        if (orders.length > 0) {
            const total = orders.reduce((acc, order) => {
                return acc + order.items.reduce((sum, item) => sum + item.quantity, 0);
            }, 0);
            setTotalOrders(total);

            const revenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);
            setTotalRevenue(revenue);
        } else {
            setTotalOrders(0);
            setTotalRevenue(0);
        }
    }, [orders]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-lg text-gray-600">Loading orders...</p>
            </div>
        );
    }

    // Unauthorized state
    if (nonUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <button
                    onClick={() => signIn('google')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md"
                >
                    Log in with Google
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-gray-800">All Orders</h1>
                    <p className="text-gray-600 mt-2">Manage and view orders for the selected date.</p>
                </motion.header>

                {/* Date Picker */}
                <div className="mb-8">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                        Select Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full max-w-xs p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    />
                </div>

                {/* KPIs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
                >
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Orders (Dishes)</h2>
                        <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Total Revenue</h2>
                        <p className="text-3xl font-bold text-green-600">₹{totalRevenue}</p>
                    </div>
                </motion.div>

                {/* Orders List */}
                <div className="space-y-6">
                    {orders.length > 0 ? (
                        orders.map((order) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                            >
                                <h2 className="text-xl font-semibold text-gray-800 mb-3">{order.vendorId}</h2>
                                <div className="space-y-3">
                                    <div>
                                        <strong className="text-gray-700">Items:</strong>
                                        <ul className="list-disc list-inside text-gray-600 mt-1">
                                            {order.items.map((item, index) => (
                                                <li key={index}>
                                                    {item.quantity} x {item.title}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <p className="text-gray-700 ">
                                            <strong className="bg-red-100">Coupon</strong> {order.coupon ? order.coupon : "None"}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Total Price:</strong> ₹{order.totalPrice}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Status:</strong> {order.status}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Name:</strong> {order.name}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Phone:</strong> {order.phoneNumber}
                                        </p>
                                        <p className="text-gray-700 sm:col-span-2">
                                            <strong>Address:</strong> {order.address}
                                        </p>
                                        {order.user && (
                                            <p className="text-gray-700">
                                                <strong>Email:</strong> {order.user.email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <p className="text-gray-600 text-center py-4">No orders found for this date.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
'use client'
import { useEffect, useState } from "react";

export default function AllOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await fetch("/api/tiffin/getAllOrders"); // Assuming your API route is `/api/orders`
                const data = await response.json();
                console.log(data)
                setOrders(data.data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, []);

    if (loading) {
        return <div>Loading orders...</div>;
    }

    return (
        <div>
            <h1>All Orders</h1>
            <ul className="flex flex-col gap-20">
                {orders && orders.map((order) => (
                    <li key={order._id}>
                        <h2 className="text-3xl font-bold">{order.vendorId}</h2>
                        <div><strong>Item:</strong>
                            {
                                order.items.map((item) => {
                                    return (
                                        <div key={item.id} className="flex gap-2">
                                            <span>{item.quantity}</span>
                                            <span>{item.title}</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {order.user ? (
                            <div>
                                <h3>User Details</h3>
                                <p><strong>Name:</strong> {order.user.name}</p>
                                <p><strong>Email:</strong> {order.user.email}</p>
                                <p><strong>Phone:</strong> {order.user.phoneNumber}</p>
                                <p><strong>Address:</strong> {order.user.address}</p>
                            </div>
                        ) : (
                            <p>User details not found</p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
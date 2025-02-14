'use client'
import { useRouter } from "next/navigation";

export default function AdminPage() {

    const router = useRouter();

    return (
        <div>
            <div>
                <button onClick={() => router.push('/admin/addVendor')}>Add New Vendor</button>
            </div>
            <div>
                <button onClick={() => router.push('/admin/updateVendor')}>Update Existing Vendor</button>
            </div>
            <div>
                <button>Orders</button>
            </div>
            <div>
                <button>Users</button>
            </div>
        </div>
    )
}
'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { signIn, signOut } from 'next-auth/react'
import { useCustomUser } from '@/app/context/customUserContext'

export default function FormForMobile() {
    const router = useRouter();
    const [mobileNumber, setMobileNumber] = useState('')
    const [isValid, setIsValid] = useState(true)
    const [loading, setLoading] = useState(false)
    const { data: session, status, update } = useSession()
    const { userData, fetchUserData } = useCustomUser();

    const handleMobileChange = (e) => {
        const value = e.target.value
        setMobileNumber(value)
        const regex = /^[0-9]{10}$/
        setIsValid(regex.test(value))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // First, save the phone number
            let userId;
            if (session?.user?._id) {
                userId = session.user._id
            } else if (userData?._id) {
                userId = userData._id
            } else if (session?.user?.email) {
                const user = await fetchUserData(session.user.email)
                if (user?._id) {
                    userId = user._id;
                }
            } else {
                signIn("google")
            }

            const response = await fetch('/api/user/addUserPhoneNumber', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phoneNumber: mobileNumber,
                    _id: userId
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add phone number');
            }
            router.push('/services/tiffin/confirmOrder')
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
            router.push('/services/tiffin/confirmOrder')
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-900">Enter Your Mobile Number</h1>
                <p className="text-center text-gray-500">Please provide your mobile number for verification.</p>
                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="mobileNumber" className="block text-lg font-medium text-gray-700">
                            Mobile Number
                        </label>
                        <input
                            type="tel"
                            id="mobileNumber"
                            name="mobileNumber"
                            pattern="[0-9]{10}"
                            required
                            value={mobileNumber}
                            onChange={handleMobileChange}
                            placeholder="Enter 10-digit number"
                            className="mt-2 block w-full px-4 py-2 text-lg border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        {!isValid && mobileNumber !== '' && (
                            <p className="text-xs text-red-500 mt-1">
                                Please enter a valid 10-digit number.
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={!isValid || loading}
                        className={`w-full py-3 text-lg font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isValid && !loading
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                            }`}
                    >
                        {loading ? 'Saving...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    )
}
'use client'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function FormForMobile() {

    const router = useRouter();
    const [mobileNumber, setMobileNumber] = useState('')
    const [isValid, setIsValid] = useState(true)
    const [pageLoading, setPageLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    const { data: session, status } = useSession();
    console.log('Session:', session)

    useEffect(() => {
        if (status === "unauthenticated") {
            signIn('google');
        } if (status === "authenticated") {
            if (session.user.phoneNumber) {
                router.push('/services/tiffin')
            }
            setPageLoading(false);
        }
    }, [status])


    const handleMobileChange = (e) => {
        const value = e.target.value
        setMobileNumber(value)

        const regex = /^[0-9]{10}$/
        setIsValid(regex.test(value))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true);
        try {
            const response = await fetch('/api/user/addUserPhoneNumber', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: session.user._id,
                    phoneNumber: mobileNumber,
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'failed to add phone number');
            }

            const data = await response.json();
            localStorage.setItem("phoneNumber", "true");
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
            router.back()
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-900">Enter Your Mobile Number</h1>
                <p className="text-center text-gray-500">Please provide your mobile number for verification.</p>

                <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="mobileNumber" className="block text-lg font-medium text-gray-700">Mobile Number</label>
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
                        {/* Conditionally display error message */}
                        {!isValid && mobileNumber !== '' && (
                            <p className="text-xs text-red-500 mt-1">Please enter a valid 10-digit number.</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!isValid && !loading}
                        className={`w-full py-3 text-lg font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isValid && !loading ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                    >
                        Submit
                    </button>
                </form>
            </div>

            {
                pageLoading &&
                <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center text-white'>
                    Loading
                </div>
            }
        </div>
    )
}
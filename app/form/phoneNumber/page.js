'use client'
import { useState } from 'react'

export default function FormForMobile() {
    const [mobileNumber, setMobileNumber] = useState('')
    const [isValid, setIsValid] = useState(true)

    const handleMobileChange = (e) => {
        const value = e.target.value
        setMobileNumber(value)

        // Validate the mobile number (10 digits)
        const regex = /^[0-9]{10}$/
        setIsValid(regex.test(value))
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-900">Enter Your Mobile Number</h1>
                <p className="text-center text-gray-500">Please provide your mobile number for verification.</p>

                <form className="mt-6 space-y-6">
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
                        disabled={!isValid} // Disable button if invalid
                        className={`w-full py-3 text-lg font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${isValid ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
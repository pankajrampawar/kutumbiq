'use client'
import { useEffect, useState } from "react"

export default function Vendors() {

    useEffect(() => {
        const fetchAllVendors = async () => {
            try {
                const response = await fetch("api/tiffin/getAllVendors");
                const data = await response.json();
                console.log(data)
                return;
            } catch (error) {
                throw new Error("Error occured: ", error)
            }
        }

        fetchAllVendors();
    }, [])
    return (
        <div>
            Vendors list page
        </div>
    )
}
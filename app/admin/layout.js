'use client';

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import BackButton from "../ui/backButton";


export default function AdminLayout({ children }) {

    const { data: session, status } = useSession();
    const [loadingUserSession, setLoadingUserSession] = useState(true);
    const [nonUser, setNonUser] = useState();

    useEffect(() => {

        if (session) {
            if (
                session.user.email === "rohangotnochil@gmail.com" ||
                session.user.email === "sujalpakhale1@gmail.com" ||
                session.user.email === "2022.pankaj.pawar@ves.ac.in"
            ) {
                setNonUser(false)
            } else {
                console.error("Unauthorized access");
                setNonUser(true)
                setLoadingUserSession(false)
            }
        } else {
            setLoadingUserSession(false)
            setNonUser(true)
        }
    }, [session])



    if (loadingUserSession) {
        return <div>Checking credentials</div>
    }


    if (!loadingUserSession && nonUser) {
        return (
            <div>
                <h1 className="bg-red-700">Unauthorized</h1>
                <p>Either you are not signed in or you are not an admin if. Action further action on this page will tracked and legal actions will be taken if the actions are found to Unauthorized</p>
            </div>
        )
    }

    if (!loadingUserSession && !nonUser) {
        return (
            <div>
                <div> <BackButton /> </div>
                {children}
            </div>
        )
    }
}
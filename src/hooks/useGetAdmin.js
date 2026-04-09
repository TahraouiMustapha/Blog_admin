import { useState, useEffect } from "react";

// helpers
import refreshToken from "../api/auth";


const getUser = async (accessToken, signal) => {
    return await fetch('/api/users/me', {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`
        },
        signal: signal
    })

}

const useGetAdmin = () => {
    const [admin, setAdmin] = useState(null)
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'))

    useEffect(() => {
        if (!accessToken) return;

        const controller = new AbortController()

        async function fetchAdmin() {
            try {
                const response = await getUser(accessToken, controller.signal)

                if (!response.ok) {
                    if (response.status == 401) {
                        const data = await response.json()
                        if (data.error === "Token expired") {
                            // refresh token
                            const newAccesstoken = await refreshToken()

                            if (!newAccesstoken) return;

                            sessionStorage.setItem('accessToken', newAccesstoken)
                            setAccessToken(newAccesstoken)

                            const retryRes = await getUser(accessToken, controller.signal)

                            if (retryRes.ok) {
                                const retryData = await retryRes.json()
                                setAdmin(retryData.data.user)
                            }
                        }
                    } else {
                        throw new Error('failed to fetch admin')
                    }
                } else {
                    const data = await response.json()
                    setAdmin(data.data.user)
                }


            } catch (err) {
                if (err.name === 'AbortError') {
                    // avoid the warning of abort 
                    return;
                }
                console.error(err)
            }
        }

        fetchAdmin()

        return () => controller.abort()
    }, [])

    return { admin, setAdmin }
}

export default useGetAdmin;
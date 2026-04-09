import { useState, useEffect } from "react";


const useGetAdmin = () => {
    const [admin, setAdmin] = useState(null)
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('accessToken'))

    useEffect(() => {
        if (!accessToken) return;

        const controller = new AbortController()

        async function fetchAdmin() {
            try {
                const response = await fetch('/api/users/me', {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    },
                    signal: controller.signal
                })

                if (!response.ok) {
                    throw new Error('failed to fetch admin')
                }

                const data = await response.json()
                setAdmin(data.data.user)

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
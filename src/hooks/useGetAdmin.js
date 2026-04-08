import { useEffect, useState } from "react";


const useGetAdmin = () => {
    const [admin, setAdmin] = useState(null)

    const accessToken = sessionStorage.getItem('accessToken')

    if (accessToken) {
        useEffect(() => {

            const fetchAdmin = async () => {
                try {
                    const res = await fetch('http://localhost:3000/api/users/me', {
                        method: "POST",
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        },
                    })

                    if (!res.ok) {
                        if (res.status == 401) {
                            const response = await res.json()
                            const errorMsg = response.error
                            console.log('error: ', errorMsg)
                            if (errorMsg == "Token expired") {
                                // refresh token
                                const refreshRes = await fetch('http://localhost:3000/api/auth/refresh', {
                                    method: "POST",
                                    credentials: "include"
                                })

                                if (refreshRes.ok) {
                                    console.log('good')
                                    // store the accessTokenin sessionStorage

                                    // getAdmin user (fetchAdmin)

                                } else {
                                    //  just for making refresh token stored 
                                    console.log('refresh failed')
                                }
                            }

                        }
                    } else {
                        const response = await res.json()
                        const { user } = response.data
                        setAdmin(user)
                    }


                } catch (err) {
                    console.log('err ', err)
                } finally {
                    console.log('fin')
                }
            }

            fetchAdmin()

        }, [])
    }


    return { admin, setAdmin }
}


export default useGetAdmin;
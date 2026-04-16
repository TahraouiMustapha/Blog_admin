import { API_URL } from "./api_url"

const refreshToken = async () => {
    try {
        const response = await fetch(`${API_URL}/api/auth/refresh`, {
            method: "POST",
            credentials: 'include'
        })

        if (!response.ok) {
            const data = await response.json()
            console.error('token refreshing failed: ', data)
            return null
        }

        const data = await response.json()
        return data.data.accessToken;


    } catch (err) {
        console.error('token refreshing failed: ', err)
        return null
    }

}

export default refreshToken;
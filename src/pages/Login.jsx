import { useState } from "react";
import { useNavigate } from "react-router";


const Login = ({ setAdmin }) => {
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = {
            username: e.target.elements.username.value,
            password: e.target.elements.password.value
        }

        try {
            const res = await fetch('/api/admin/auth', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
            })

            if (!res.ok) {
                // handle bad request responses
                if (res.status == 400) {
                    const errResponse = await res.json()
                    throw new Error(errResponse.error)
                }

                if (res.status == 403) {
                    throw new Error(`Forbidden`)
                }
                throw new Error(`Http status ! ${res.status}`)
            }

            const response = await res.json()

            // store access token in session storage
            const { accessToken } = response.data;
            sessionStorage.setItem('accessToken', accessToken)


            // get Admin 
            const resGetAdmin = await fetch('/api/users/me', {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
            })

            if (resGetAdmin.ok) {
                const responseGetAdmin = await resGetAdmin.json()
                const { user } = responseGetAdmin.data
                setAdmin(user)
                navigate('/')
            }


        } catch (err) {
            console.error(err)
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex-1 flex justify-center mt-32 mb-14">
            <div className="flex flex-col items-center gap-4">
                <p className="text-2xl text-txtClr font-semibold">Login</p>
                <p>and create your <span className="text-primary">Blog!</span> to the <span className="text-primary">communty</span>!</p>
                <form
                    className="form"
                    onSubmit={handleSubmit}
                    method="POST"
                >
                    <p>
                        <label htmlFor="username">
                            Username <span className="text-red-600">*</span>
                        </label>
                        <input
                            className="border-transition"
                            id="username"
                            name="username"
                            type="email"
                            required
                        />
                    </p>

                    <p>
                        <label htmlFor="password">
                            Password <span className="text-red-600">*</span>
                        </label>
                        <input
                            className="border-transition"
                            id="password"
                            name="password"
                            type="password"
                            required
                            minLength={8}
                            maxLength={16}
                        />
                    </p>

                    <button className="submitBtn">
                        {loading ? 'Submiting...' : 'Login'}
                    </button>

                    {error && <p className="text-sm text-red-500"> {error}</p>}

                </form>
            </div>
        </div>
    )
}

export default Login;
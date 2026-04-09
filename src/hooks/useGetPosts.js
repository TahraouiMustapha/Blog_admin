import { useState, useEffect } from "react"

const useGetPosts = () => {
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const controller = new AbortController()

        setLoading(true)
        setError(null)

        const fetchPosts = async () => {
            try {
                const response = await fetch('/api/posts', { signal: controller.signal })

                if (!response.ok) {
                    throw new Error('Failed to fetch posts')
                }

                const data = await response.json()

                setPosts(data?.data?.posts || [])

            } catch (err) {
                if (err.name !== 'AbortError') {
                    setError(err.message)
                }
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()

        return () => controller.abort()
    }, [])


    return { posts, error, loading }
}

export default useGetPosts;
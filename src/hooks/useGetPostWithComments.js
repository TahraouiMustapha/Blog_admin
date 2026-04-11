import { useEffect, useState } from "react";

const useGetPostWithComments = ({ postId }) => {
    const [postWithComments, setPostWithComments] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const controller = new AbortController()

        const fetchPost = async () => {

            setLoading(true)
            setError(null)

            try {
                const response = await fetch(`/api/posts/${postId}`, { signal: controller.signal })

                if (!response.ok) {
                    throw new Error('Failed to fetch post')
                }

                const data = await response.json()
                setPostWithComments({ post: data.data.post, comments: data.data.post.comments })

            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.log(err)
                    setError(err)
                }

            } finally {
                setLoading(false)
            }
        }

        fetchPost()

        return () => controller.abort()
    }, [])


    return { postWithComments, setPostWithComments, loading, error }
}

export default useGetPostWithComments;
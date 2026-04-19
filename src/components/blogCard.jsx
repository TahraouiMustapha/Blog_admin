import { format } from 'date-fns'

// hooks
import { useState } from 'react'
import { useNavigate } from 'react-router'

import { API_URL } from '../api/api_url'

const BlogCard = ({ post }) => {
    const navigate = useNavigate()
    const [publishedState, setPublishedState] = useState(post.published)
    const [loading, setLoading] = useState(false)

    const date = format(post.date, "do LLL yyyy")

    const handleChangePublishedState = async (e) => {
        // to stop navigate post page
        e.stopPropagation()

        const accessToken = sessionStorage.getItem('accessToken')
        if (!accessToken) return;

        setLoading(true)
        try {
            const response = await fetch(`${API_URL}/api/admin/posts/${post.postId}`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ published: !publishedState })
            })

            if (!response.ok) {
                throw new Error("Failed in change post state")
            }

            const data = await response.json()
            const updatedPost = data.data.post
            setPublishedState(updatedPost.published)

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div onClick={() => navigate(`/post/${post.postId}`)} className="cursor-pointer border border-brdClr rounded-lg shadow-xl flex flex-col border-transition hover:border-primary overflow-hidden">
            <div
                style={{ backgroundImage: `url(${post.thumbnailUrl})` }}
                className="h-[50%] w-full bg-cover bg-center bg-no-repeat"
            >
            </div>

            <div className="flex-1 p-6 flex flex-col gap-2">
                <div className="text-lg font-semibold">{post.title}</div>
                <div className='flex justify-between'>
                    <p className='dateTag'>{date}</p>
                    <button
                        disabled={loading}
                        onClick={handleChangePublishedState}
                        className="bg-primary text-white p-2 rounded-sm hover:bg-darkerPrimary transition duration-300 ease cursor-pointer mr-8"
                    >
                        {publishedState ? 'Unpublish' : 'Publish'}
                    </button>
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: post?.text }}
                    className="text-sm/4.5 text-txtClr/70 line-clamp-5" />
            </div>
        </div >
    )
}

export default BlogCard
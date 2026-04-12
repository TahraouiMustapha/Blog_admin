import useGetPostWithComments from "../hooks/useGetPostWithComments"

import { format } from "date-fns"

// hooks
import { useParams } from "react-router"
import { useState } from "react"

const Comment = ({ comment, setPostWithComments }) => {
    const [loading, setLoading] = useState(false)
    const date = format(comment.date, "do LLL yyyy")


    const handleDeleteClick = async () => {
        const accessToken = sessionStorage.getItem('accessToken')
        if (!accessToken) return;

        try {
            setLoading(true)
            const response = await fetch(`/api/posts/${comment.postId}/comments/${comment.commentId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })

            if (!response.ok) {
                throw new Error("Failed to delete comment")
            }

            setPostWithComments((prev) => ({
                ...prev,
                comments: prev.comments.filter((currentComment) => currentComment.commentId !== comment.commentId)
            }))

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }

    }



    return (
        <div className="border border-brdClr rounded-md p-3">
            <div className="flex justify-between items-center gap-5 mb-2">
                <p className="text-primary text-lg">{comment.username}</p>
                <p className="dateTag  mr-2">{date}</p>
                <button
                    disabled={loading}
                    onClick={handleDeleteClick}
                    className="bg-primary text-white p-2 w-20 rounded-sm hover:bg-darkerPrimary transition duration-300 ease cursor-pointer mr-8"
                >
                    delete
                </button>
            </div>

            <div>
                {comment.text}
            </div>
        </div>
    )
}

const PostPage = () => {
    const { id } = useParams()
    const { postWithComments, setPostWithComments, loading, error } = useGetPostWithComments({ postId: id })

    if (loading) return <p className="text-center">...Loading</p>
    if (error) return <p>A network error was encountered</p>

    const { post = null, comments = null } = postWithComments || {}
    const date = format(post?.date || new Date(), "do LLL yyyy")


    return (
        <div className="flex-1 flex flex-col md:mx-14 xl:mx-96">
            <div
                className="h-76 md:mx-9 rounded-b-xl"
                style={{ backgroundImage: post?.thumbnailUrl ? `url(${post.thumbnailUrl})` : 'none' }}>
                image
            </div>

            <div className="text-4xl/11 font-bold text-txtClr px-9 pt-9 pb-4">{post?.title}</div>

            <div>
                <div className="dateTag ml-9">{date}</div>
            </div>

            <div className="p-9">
                <p className="text-lg/6 text-txtClr">{post?.text}</p>
            </div>

            <div className="p-5 md:px-8 lg:px-24 xl:px-9 flex flex-col gap-6 border-t border-t-brdClr">
                <p className="text-3xl font-semibold text-txtClr ">Comments({comments?.length})</p>
                <div className="flex flex-col gap-4">
                    {comments?.map(comment => <Comment key={comment.commentId} comment={comment} setPostWithComments={setPostWithComments} />)}
                </div>
            </div>

        </div>
    )
}

export default PostPage
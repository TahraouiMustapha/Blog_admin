import { format } from 'date-fns'
import { Link } from 'react-router'


const BlogCard = ({ post }) => {
    const date = format(post.date, "do LLL yyyy")

    return (
        <Link to={`/post/${post.postId}`} className="cursor-pointer border border-brdClr rounded-lg shadow-xl flex flex-col border-transition hover:border-primary overflow-hidden">
            <div
                style={{ backgroundImage: `url(${post.thumbnailUrl})` }}
                className="h-[50%] w-full bg-cover bg-center bg-no-repeat"
            >
            </div>

            <div className="flex-1 p-6 flex flex-col gap-2">
                <div className="text-lg font-semibold">{post.title}</div>
                <p className='dateTag'>{date}</p>
                <p className="text-sm/4.5 text-txtClr/70 line-clamp-5">
                    {post.text}
                </p>
            </div>
        </Link >
    )
}

export default BlogCard
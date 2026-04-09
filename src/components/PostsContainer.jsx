import { useState } from "react"
import useGetPosts from "../hooks/useGetPosts";
import BlogCard from "./blogCard";


const Posts = ({ posts, loading, error }) => {

    if (error) return <p>Something went wrong while loading the data.</p>
    if (loading) return <p>... Loading</p>

    return (
        <div className="w-[60%] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] auto-rows-[400px] gap-8">
            {/* cards (divs) */}
            {posts.map(post => (
                <BlogCard key={post.postId} post={post} />
            ))}
        </div>
    )
}

const SearchBar = ({ setSearchValue }) => {
    return (
        <input
            type="text"
            placeholder="Search By Title"
            onChange={(e) => {
                setSearchValue(e.target.value)
            }}
            className="outline-none border border-brdClr w-3xs h-10 pl-2.5 rounded-sm border-transition focus:border-primary"
        />
    )
}

const PostsContainer = () => {
    const { posts, error, loading } = useGetPosts()
    const [searchValue, setSearchValue] = useState('')

    // '' is a falsy value
    const searchedPost = !searchValue ? posts : posts.filter(post => post.title.includes(searchValue));


    return (
        <div className="pt-12 pb-12 flex flex-col items-center gap-8 text-txtClr">
            <h1 className="text-5xl font-bold text-center">Your <span className="text-primary">TOP</span> blog articles</h1>
            <SearchBar setSearchValue={setSearchValue} />
            <Posts posts={searchedPost} loading={loading} error={error} />
        </div>
    )
}

export default PostsContainer
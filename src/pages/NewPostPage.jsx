import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
// api_url
import { API_URL } from '../api/api_url';

const NewPostPage = () => {
    const editorRef = useRef(null);
    const [loading, setLoading] = useState(false)
    // for empty the inputs when submit
    const titleRef = useRef(null);
    const fileInputRef = useRef(null);


    const handleCreateNewPost = async (e) => {
        e.preventDefault()

        const accessToken = sessionStorage.getItem('accessToken')
        if (!accessToken) return;

        const formData = new FormData(e.target)

        if (editorRef.current) {
            formData.append('text', editorRef.current.getContent());
        }

        try {
            setLoading(true)
            const response = await fetch(`${API_URL}/api/posts`, {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                },
                body: formData
            })

            if (!response.ok) {
                console.log(response)
                throw new Error('Failed to create post')
            }

            const data = await response.json()
            // console.log(data)

        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)

            titleRef.current.value = ''
            fileInputRef.current.value = ''
            editorRef.current.setContent('')
        }


    };

    const myApiKey = `${import.meta.env.VITE_TINYMCE_API_KEY}`



    return (
        <div className='flex-1 mt-5 flex flex-col gap-4'>
            <h1 className="text-5xl font-bold text-center"> <span className="text-primary">New</span> Post</h1>
            <div
                className='flex-1 flex'
            >
                <form
                    onSubmit={handleCreateNewPost}
                    className='flex-1 grid grid-cols-[60%_1fr] grid-rows-[20%_1fr_20%] bigDiv'
                >
                    <p className='flex flex-col gap-2 p-2'>
                        <label className='text-lg font-semibold' htmlFor="title">Title</label>
                        <input
                            ref={titleRef}
                            required
                            className='outline-none border border-brdClr h-13 w-[70%] pl-2.5 rounded-sm focus:border-primary'
                            type="text"
                            id="title"
                            name="title"
                        />
                    </p>

                    <div className='row-span-2 flex flex-col justify-center items-center'>

                        <fieldset className='flex flex-col gap-2 text-lg font-semibold'>
                            <legend className='mb-6'>Publish now?</legend>

                            <label>
                                <input className='mr-1' type="radio" name="published" value="true" required />
                                Yes
                            </label>

                            <label>
                                <input className='mr-1' type="radio" name="published" value="false" />
                                No
                            </label>
                        </fieldset>

                        <label className="mt-6 ml-4 inline-block cursor-pointer bg-primary text-white px-4 py-2 rounded-md hover:bg-darkerPrimary transition">
                            <input type="file" name='image' required ref={fileInputRef} />
                        </label>

                    </div>

                    <p className='row-span-2'>
                        <Editor
                            ref={editorRef}
                            onInit={(_evt, editor) => editorRef.current = editor}
                            apiKey={myApiKey}
                            init={{
                                plugins: [
                                    // Core editing features
                                    'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 'link', 'lists', 'media', 'searchreplace', 'table', 'visualblocks', 'wordcount',
                                    // Your account includes a free trial of TinyMCE premium features
                                    // Try the most popular premium features until Apr 27, 2026:
                                    'checklist', 'mediaembed', 'casechange', 'formatpainter', 'pageembed', 'a11ychecker', 'tinymcespellchecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'advtemplate', 'tinymceai', 'uploadcare', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown', 'importword', 'exportword', 'exportpdf'
                                ],
                                toolbar: 'undo redo | tinymceai-chat tinymceai-quickactions tinymceai-review | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                tinycomments_mode: 'embedded',
                                tinycomments_author: 'Author name',
                                mergetags_list: [
                                    { value: 'First.Name', title: 'First Name' },
                                    { value: 'Email', title: 'Email' },
                                ],
                                tinymceai_token_provider: async () => {
                                    await fetch(`https://demo.api.tiny.cloud/1/7ncvn80q0tr3nfy37khz94gqvueus02zfkqnp9j31i8cxdsn/auth/random`, { method: "POST", credentials: "include" });
                                    return { token: await fetch(`https://demo.api.tiny.cloud/1/7ncvn80q0tr3nfy37khz94gqvueus02zfkqnp9j31i8cxdsn/jwt/tinymceai`, { credentials: "include" }).then(r => r.text()) };
                                },
                                uploadcare_public_key: '537e10f88af7e2e2a42b',
                            }}
                            initialValue="Welcome to TinyMCE!"
                        />
                    </p>


                    <p className='flex justify-center items-start'>
                        <button
                            disabled={loading}
                            className='createPostBtn w-20 ml-4'
                        >
                            {loading ? 'Saving ..' : 'Save'}
                        </button>
                    </p>
                </form>
            </div>



        </div>
    )
}

export default NewPostPage;
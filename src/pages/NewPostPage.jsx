import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';


const NewPostPage = () => {
    const editorRef = useRef(null);

    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    const myApiKey = `${import.meta.env.VITE_TINYMCE_API_KEY}`

    return (
        <>
            <Editor
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
            <button onClick={log}>Log editor content</button>
        </>
    )
}

export default NewPostPage;
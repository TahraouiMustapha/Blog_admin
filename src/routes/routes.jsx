import App from "../App";
import Home from "../pages/home";
import NewPostPage from "../pages/NewPostPage";
import PostPage from "../pages/PostPage";
import ErrorPage from "../pages/ErrorElement";
import Login from "../pages/Login"


const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Home /> },
            { path: "/newpost", element: <NewPostPage /> },
            { path: "/post", element: <PostPage /> },
            { path: "/login", element: <Login /> }
        ]
    },
];

export default routes;

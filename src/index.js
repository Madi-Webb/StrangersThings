import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./components/general/App";
import ErrorPage from "./components/general/ErrorPage";
import Home from "./components/general/Home"
import AllPosts from "./components/posts/AllPosts";
import NewPost from "./components/posts/NewPost";
import Profile from "./components/profile/Profile";
import DetailedPostView from "./components/posts/DetailedPostView";
import RegisterForm from "./components/profile/RegisterForm";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/posts",
                element: <AllPosts />,
            },
            {
                path: "/posts/add",
                element: <NewPost />
            },
            {
                path: "/posts/:id",
                element: <DetailedPostView />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/profile/:id",
                element: <DetailedPostView />
            },
            {
                path: "/profile/register",
                element: <RegisterForm />
            }
        ]
    }
]);

const root = createRoot( document.getElementById("app"));
root.render( <RouterProvider router={router} /> );

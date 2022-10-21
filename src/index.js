import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./components/Homepage";
import ErrorPage from "./components/ErrorPage";
import Index from "./components/Index"
import AllPosts from "./components/AllPosts";
import NewPost from "./components/NewPost";
import Profile from "./components/Profile";
import DetailedPostView from "./components/DetailedPostView";
import Logout from "./components/Logout";
import RegisterForm from "./components/RegisterForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Index />
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
                path: "/profile/logout",
                element: <Logout />
            },
            {
                path: "/profile/register",
                element: <RegisterForm />
            }
        ]
    }
])

const root = createRoot( document.getElementById("app"));
root.render( <RouterProvider router={router} /> );

import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Homepage from "./components/Homepage";
import ErrorPage from "./components/ErrorPage";
import Index from "./components/Index"
import AllPosts from "./components/AllPosts";
import NewPost from "./components/NewPost";

import Profile from "./components/Profile";

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
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/posts/add",
                element: <NewPost />
            }
        ]
    }
])

const root = createRoot( document.getElementById("app"));
root.render( <RouterProvider router={router} /> );

import Root from './Root/Root'
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Pages/Home/Home';

export default function App() {
 const router = createBrowserRouter([
  {
    path: '/',
    element:<Root/>,
    children:[
      {
        index: true,
        element:<Home/>,
      }
    ]
  }
 ]);
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

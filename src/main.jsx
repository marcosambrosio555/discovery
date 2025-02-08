import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { Movies } from './pages/Movies.jsx'
import { Search } from './pages/Search.jsx'
import { Movie } from './pages/Movie.jsx'
import { Series } from './pages/Series.jsx'
import { ErrorPage } from './pages/ErrorPage.jsx'
import { Serie } from './pages/Serie.jsx'
import { Home } from './pages/Home.jsx'
import { Person } from './pages/Person.jsx'

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  errorElement: <ErrorPage />,
  children: [
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/home",
      element: <Navigate to={"/"} />
    },
    {
      path: "/movies",
      element: <Movies />
    },
    {
      path: "/movie",
      element: <Movie />
    },
    {
      path: "/series",
      element: <Series />
    },
    {
      path: "/serie",
      element: <Serie />
    },
    {
      path: "/person",
      element: <Person />
    },
    {
      path: "/search",
      element: <Search />
    },

  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

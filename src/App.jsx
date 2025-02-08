import './App.css'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import {
  BiMoviePlay,
  BiSearch,
  BiTv,
  BiFilm,
  BiHome
} from 'react-icons/bi'

import { Preloader } from './components/Preloader'

function App() {

  const [preloading, setPreloading] = useState(true)

  useEffect(() => {

    setTimeout(() => {
      setPreloading(false)
    }, 2400)

  }, [])

  return (
    <>
      {preloading && <Preloader />}
      <header className="header">
        <div className="container">
          <h1>
            <Link to={"/"}>
              <BiMoviePlay /> Discovery
            </Link>
          </h1>
        </div>
      </header>
      <main className="main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <nav>
            <Link to={"/"}>
              <BiHome />
              inicio
            </Link>
            <Link to={"/movies"}>
              <BiFilm />
              filmes
            </Link>
            <Link to={"/search"}>
              <BiSearch />
              pesquisar
            </Link>
            <Link to={"/series"}>
              <BiTv />
              séries
            </Link>
          </nav>
        </div>
      </footer>
    </>
  )
}

export default App

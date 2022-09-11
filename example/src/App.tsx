import React, { Suspense } from 'react'
import { Routes, Route, NavLink, Link } from 'react-router-dom'

import router from './routes/_router'
import './index.css'

const routes = Object.entries(router)

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            {routes.map(([name, element]) => (
              <Route path={name} element={element} key={name} />
            ))}
          </Routes>
        </Suspense>
      </main>
    </>
  )
}

function Header() {
  return (
    <header>
      <h1>
        <Link to='/'>React Table UI</Link>
      </h1>
      <nav>
        <li>
          <NavLink to='/'>Examples</NavLink>
        </li>
        <li>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://react-table-ui.js.org'
          >
            Docs
          </a>
        </li>
        <li>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://www.npmjs.com/package/react-table-ui'
          >
            NPM
          </a>
        </li>
        <li>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://github.com/GuptaSiddhant/react-table-ui'
          >
            Github
          </a>
        </li>
      </nav>
    </header>
  )
}

function Home() {
  return (
    <div id='homepage'>
      <h2>Examples</h2>
      <ul>
        {routes.map(([name]) => (
          <li key={name}>
            <NavLink to={name}>{name}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <header className="navLinks">
          <Link to="/">
              <h3>Home</h3>
          </Link>
          <Link to="/scrap">
              <h3>Scrap</h3>
          </Link>
    </header>
  )
}

export default NavBar
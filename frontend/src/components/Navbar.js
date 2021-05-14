import React from 'react'
import {Link} from 'react-router-dom'


export const Navbar = () => (

  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Poll Me Up</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto" >
              <li className="nav-item">
                <Link className="nav-link" to="/About">about</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Inicio">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Users">Registrarse</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/LogIn">Ingresar</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
)
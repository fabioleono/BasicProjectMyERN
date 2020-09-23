import React from 'react' 
import { NavLink } from 'react-router-dom'
const NavMenu = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/Users">
            Usuarios
          </NavLink>
        </li>
        <li></li>
        <li>
          <NavLink to="/Test">
            Test
          </NavLink>
        </li>
      </ul>
    </div>
  )
}
export default NavMenu  

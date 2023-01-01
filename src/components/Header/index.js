import {FaHome} from 'react-icons/fa'
import {IoBriefcase} from 'react-icons/io5'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = () => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
  }

  return (
    <nav className="nav-bar">
      <div className="nav-bar-content-container">
        <img
          className="nav-bar-logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <ul className="menu-options-desktop-container">
          <li className="home-menu-desktop-option">Home</li>
          <li className="jobs-menu-desktop-option">Jobs</li>
        </ul>
        <button
          onClick={onClickLogout}
          className="logout-button-desktop"
          type="button"
        >
          Logout
        </button>
        <ul className="menu-options-and-logout-icon-container">
          <li>
            <FaHome size={26} color="#ffffff" />
          </li>
          <li>
            <IoBriefcase size={26} color="#ffffff" />
          </li>
          <li>
            <button
              onClick={onClickLogout}
              className="logout-button-mobile"
              type="button"
            >
              <FiLogOut size={26} color="#ffffff" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header

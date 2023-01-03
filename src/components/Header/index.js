import {Link, withRouter} from 'react-router-dom'

import {FaHome} from 'react-icons/fa'
import {IoBriefcase} from 'react-icons/io5'
import {FiLogOut} from 'react-icons/fi'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <div className="nav-bar-content-container">
        <Link to="/" className="nav-link-item">
          <img
            className="nav-bar-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>

        <ul className="menu-options-desktop-container">
          <li className="home-menu-desktop-option">
            <Link to="/" className="nav-link-item">
              Home
            </Link>
          </li>
          <li className="jobs-menu-desktop-option">
            <Link to="/jobs" className="nav-link-item">
              Jobs
            </Link>
          </li>
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
            <Link to="/" className="nav-link-item">
              <FaHome size={26} color="#ffffff" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-link-item">
              <IoBriefcase size={26} color="#ffffff" />
            </Link>
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

export default withRouter(Header)

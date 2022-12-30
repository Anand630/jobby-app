import './index.css'

const Header = () => (
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
      <button className="logout-button-desktop" type="button">
        Logout
      </button>
    </div>
  </nav>
)

export default Header

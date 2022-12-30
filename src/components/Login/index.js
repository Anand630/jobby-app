import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {username: '', password: ''}

  onUsernameInputChange = e => {
    this.setState({username: e.target.value})
  }

  onPasswordInputChange = e => {
    this.setState({password: e.target.value})
  }

  submitForm = e => {
    e.preventDefault()
  }

  render() {
    const {username, password} = this.state
    console.log(this.state)
    return (
      <div className="login-page-container">
        <form className="login-form">
          <div className="form-instruments-container">
            <img
              className="login-form-logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
            />
            <div className="label-input-container">
              <label className="label" htmlFor="username">
                USERNAME
              </label>
              <input
                className="text-input"
                id="username"
                type="text"
                placeholder="Username"
                onChange={this.onUsernameInputChange}
                value={username}
              />
            </div>
            <div className="label-input-container">
              <label className="label" htmlFor="password">
                PASSWORD
              </label>
              <input
                className="text-input"
                id="password"
                type="password"
                placeholder="Password"
                onChange={this.onPasswordInputChange}
                value={password}
              />
            </div>
            <button
              onClick={this.submitForm}
              type="submit"
              className="login-button"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login

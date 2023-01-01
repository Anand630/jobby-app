import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {username: '', password: ''}

  onUsernameInputChange = e => {
    this.setState({username: e.target.value})
  }

  onPasswordInputChange = e => {
    this.setState({password: e.target.value})
  }

  submitForm = async e => {
    const {username, password} = this.state
    e.preventDefault()
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 15})
      history.replace('/')
    }
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

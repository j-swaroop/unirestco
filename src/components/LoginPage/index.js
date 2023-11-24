import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const url = 'https://apis.ccbp.in/login'
    const obj = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(obj),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSucsess(data)
    } else {
      this.onSubmitFailure(data)
    }
  }

  onSubmitSucsess = data => {
    const {history} = this.props

    Cookies.set('jwt_token', data.jwt_token, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = data => {
    this.setState({errorMsg: data.error_msg, showSubmitError: true})
  }

  render() {
    const {showSubmitError, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page">
        <div className="login-page-responsive">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <h1 className="restaurent-heading"> UNI Resto Cafe </h1>
            <div className="username-container">
              <label className="label" htmlFor="username">
                {' '}
                USERNAME{' '}
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your Username"
                className="input"
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="username-container">
              <label className="label" htmlFor="password">
                {' '}
                PASSWORD{' '}
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your Password"
                className="input"
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="login-btn">
              {' '}
              Login{' '}
            </button>
            {showSubmitError && <p className="err-msg"> {errorMsg} </p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage

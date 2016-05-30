import React, { Component } from 'react'
import { RegistrationForm, LoginLink } from 'react-stormpath'

export default class RegistrationPage extends Component {
  render() {
    return (
      <RegistrationForm>
        <div spIf="account.created">
          <span spIf="!account.enabled">To verify your account, click the verification link that we sent to your email then proceed to login by going to <LoginLink />.</span>
        </div>
        <div spIf="!account.created">
          <p>
            <label htmlFor="firstName">First name</label><br />
            <input id="firstName" type="text" name="givenName" />
          </p>
          <p>
            <label htmlFor="lastName">Last name</label><br />
            <input id="lastName" type="text" name="surname" />
          </p>
          <p>
            <label htmlFor="email">Email</label><br />
            <input id="email" type="text" name="email" />
          </p>
          <p>
            <label htmlFor="password">Password</label><br />
            <input id="password" type="password" name="password" />
          </p>
          <p spIf="form.error">
            <strong>Error:</strong><br />
            <span spBind="form.errorMessage" />
          </p>
          <p>
            <input type="submit" value="Register" />
          </p>
        </div>
      </RegistrationForm>
    )
  }
}

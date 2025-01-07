import React from 'react'

function LogInPage({loginHandler}) {
  return (
    <form onSubmit={loginHandler}>
      <input name="email" type="text" placeholder="Enter your email" />
      <input name="password" type="password" placeholder="Enter your password" />
      <button>Login</button>
    </form>
  )
}

export default LogInPage
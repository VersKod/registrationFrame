import React, { useState } from 'react';

function SignUpPage({ signupHandler }) {
  return (
    <form onSubmit={signupHandler}>
      <input name="email" type="text" placeholder="Enter your email" />
      <input name="password" type="password" placeholder="Enter your password" />
      <input name="name" type="text" placeholder="Enter your name" />
      <button>Sign Up</button>
    </form>
  );
}

export default SignUpPage;

// import React from 'react';
// import './Auth.css';

// const Login = () => {
//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <h2>Login</h2>
//         <form>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input type="email" id="email" placeholder="Enter your email" required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input type="password" id="password" placeholder="Enter your password" required />
//           </div>
//           <button type="submit" className="auth-btn">Login</button>
//           <p className="auth-text">
//             Don't have an account? <a href="/signup">Sign Up</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;






import React, { useState } from 'react';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //https://aiapigate.pythonanywhere.com/api/v1/

    try {
      const response = await fetch('http://127.0.0.1:3388/api/v1/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Login successful!');
        setError(null);
        // Optionally, redirect the user or save the token
        // For example: localStorage.setItem('token', data.token);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn">Login</button>
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
          <p className="auth-text">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

// import React from 'react';
// import './Auth.css';


// const Signup = () => {
//   return (
//     <div className="auth-container">
//       <div className="auth-form">
//         <h2>Sign Up</h2>
//         <form>
//           <div className="form-group">
//             <label htmlFor="name">Name</label>
//             <input type="text" id="name" placeholder="Enter your name" required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="email">Email</label>
//             <input type="email" id="email" placeholder="Enter your email" required />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password</label>
//             <input type="password" id="password" placeholder="Create a password" required />
//           </div>
//           <button type="submit" className="auth-btn">Sign Up</button>
//           <p className="auth-text">
//             Already have an account? <a href="/login">Login</a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;






import React, { useState } from 'react';
import './Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:3388/api/v1/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess('Signup successful!');
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="auth-btn">Sign Up</button>
          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}
          <p className="auth-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

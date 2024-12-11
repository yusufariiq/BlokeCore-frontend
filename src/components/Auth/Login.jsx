import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { API_URL } from '../../config/apiConfig';
import GoogleButton from './GoogleButton';

const Login = () => {
  const { login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [ showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const renderError = (fieldName) => {
    const error = errors[fieldName];
    if (!error) return null;
    
    return (
      <label className="label">
        <span className="label-text-alt text-error">
          {Array.isArray(error) ? error.join(', ') : error}
        </span>
      </label>
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData
        }),
      });

      const data = await response.json();

      if(!response.ok) {
        if (data.errors){
          setErrors(data.errors)
        } else if (data.error) {
          setErrors({ general: data.error});
        }
        throw new Error('Login failed')
      }

      login(data.user, data.token);
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error: ', err);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100">
        <div className="card-body">
          
          <h2 className="text-center text-3xl font-semibold mb-8">
            Sign in to your account
          </h2>

          {errors.general && (
            <div role="alert" className="alert alert-error border-primary border-2 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-sm/6 font-semibold text-black">Email address</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='example@email.com'
                required
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              />
              {renderError('email')}
            </div>

            <div className="form-control w-full">
              <div className="flex justify-between items-center">
                <label className="label">
                  <span className="label-text text-sm/6 font-semibold text-black">Password</span>
                </label>
                <NavLink to="/forgot-password" className="label-text-alt text-primary hover:text-primary-focus">
                  Forgot password?
                </NavLink>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='**********'
                  required
                  className={`input input-bordered w-full pr-10 ${errors.password ? 'input-error' : ''}`}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
                    <FontAwesomeIcon icon={faEyeSlash} className='h-5 w-5'/>
                    ) : (
                    <FontAwesomeIcon icon={faEye} className='h-5 w-5'/>
                  )}
                </button>
              </div>
              {renderError('password')}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[3rem] border rounded-md bg-primary text-white font-semibold hover:bg-hover-primary ease-in-out duration-200">
              {loading ? ( <span className="loading loading-dots loading-lg"></span> ) : 'Sign in'}
            </button>
          </form>

          <div className="divider">Or continue with</div>

          <GoogleButton type="login"/>

          <p className="text-center text-sm text-base-content/70 mt-6">
            Not a having an account?{' '}
            <NavLink to="/signup" className="text-primary hover:text-primary-focus font-medium underline">
              Sign up here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
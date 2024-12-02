import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Field, Switch } from '@headlessui/react'
import googleIcon from '../../assets/icons/Google.svg'
import toast from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

const Register = () => {
  const navigate = useNavigate();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: ''
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    if (!agreed) {
      setErrors({ policy: 'Please agree to the privacy policy' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API}/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          agreedToPolicy: agreed
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else if (data.error) {
          setErrors({ general: data.error });
        }
        throw new Error('Registration failed');
      }

      toast.success("Your account successfully registered");
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
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

  return (
    <div className="min-h-screen flex items-center py-12 sm:py-20 justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-3xl font-semibold mb-8">
            Create a new account
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
            <div className="form-control flex flex-row gap-2 w-full">
              <div>
                <label className="label">
                  <span className="label-text text-sm/6 font-semibold text-black">First name</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className={`input input-bordered w-full ${errors.firstName ? 'input-error' : ''}`}
                />
                {renderError('firstName')}
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-sm/6 font-semibold text-black">Last name</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className={`input input-bordered w-full ${errors.lastName ? 'input-error' : ''}`}
                />
                {renderError('lastName')}
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-sm/6 font-semibold text-black">Email address</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
              />
              {renderError('email')}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-sm/6 font-semibold text-black">Password</span>
              </label>
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

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-sm/6 font-semibold text-black">Phone number</span>
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                required
                className={`input input-bordered w-full ${errors.phoneNumber ? 'input-error' : ''}`}
              />
              {renderError('phoneNumber')}
            </div>
            
            <div className="form-control w-full">
              <Field className="flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className={`group flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                      agreed ? 'bg-primary' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out ${
                        agreed ? 'translate-x-3.5' : 'translate-x-0'
                      }`}
                    />
                  </Switch>
                </div>
                <div className="text-sm/6 text-gray-600">
                  By selecting this, you agree to our{' '}
                  <NavLink to="/policy" className="font-semibold text-primary hover:underline">
                    privacy&nbsp;policy
                  </NavLink>
                </div>
              </Field>
              {renderError('policy')}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full min-h-[3rem] border rounded-md bg-primary text-white font-semibold hover:bg-hover-primary ease-in-out duration-200 disabled:opacity-50"
            >
              {loading ? ( <span className="loading loading-dots loading-lg"></span> ) : 'Sign up'}
            </button>
          </form>

          <div className="divider">Or continue with</div>

          <button className="btn hover:bg-hover-white w-full">
            <img src={googleIcon} alt="Google" className="h-5 w-5" />
            <span className="ml-2">Sign in with Google</span>
          </button>

          <p className="text-center text-sm text-base-content/70 mt-6">
            Already have an account?{' '}
            <NavLink to="/login" className="text-primary hover:text-hover-primary font-medium underline">
              Sign in here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
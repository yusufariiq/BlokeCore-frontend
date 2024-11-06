import React from 'react';
import { NavLink } from 'react-router-dom';
import googleIcon from '../../assets/icons/Google.svg'


const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100">
        <div className="card-body">
          
          <h2 className="text-center text-3xl font-semibold mb-8">
            Sign in to your account
          </h2>

          <form className="space-y-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text text-sm/6 font-semibold text-black">Email address</span>
              </label>
              <input
                type="email"
                placeholder='example@email.com'
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <div className="flex justify-between items-center">
                <label className="label">
                  <span className="label-text text-sm/6 font-semibold text-black">Password</span>
                </label>
                <NavLink href="#" className="label-text-alt text-primary hover:text-primary-focus">
                  Forgot password?
                </NavLink>
              </div>
              <input
                type="password"
                placeholder='**********'
                required
                className="input input-bordered w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full min-h-[3rem] border rounded-md bg-primary text-white font-semibold hover:bg-hover-primary ease-in-out duration-200">
              Sign in
            </button>
          </form>

          <div className="divider">Or continue with</div>

          <button className="btn hover:bg-hover-white w-full">
              <img src={googleIcon} alt="Google" className="h-5 w-5" />
              <span className="ml-2">Sign in with Google</span>
          </button>

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
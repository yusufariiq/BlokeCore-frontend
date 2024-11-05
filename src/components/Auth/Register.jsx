import React from 'react'
import { NavLink } from 'react-router-dom';
import googleIcon from '../../assets/icons/Google.svg'

const Register = () => {
  return (
    <div className="min-h-screen flex items-center my-4 justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100">
        <div className="card-body">
          
          <h2 className="text-center text-3xl font-semibold mb-8">
            Create a new account
          </h2>

          <form className="space-y-5">
            <div className="form-control flex flex-row gap-2 w-full">
                <div>
                    <label className="label">
                        <span className="label-text">First name</span>
                    </label>
                    <input
                        type="text"
                        placeholder='John'
                        required
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="label">
                        <span className="label-text">Last name</span>
                    </label>
                    <input
                        type="text"
                        placeholder='Doe'
                        required
                        className="input input-bordered w-full"
                    />
                </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email address</span>
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
                  <span className="label-text">Password</span>
                </label>
              </div>
              <input
                type="password"
                placeholder='**********'
                required
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Phone number</span>
              </label>
              <input
                type="text"
                placeholder='08xxxxxxxxxx'
                required
                className="input input-bordered w-full"
              />
            </div>
            
            <div className="form-control">
                <label className="label cursor-pointer">
                    <input type="checkbox" className="checkbox" />
                    <p className="label-text ml-5">
                        I agree to the{' '} 
                        <NavLink to="/terms-condition" className="text-primary underline font-medium">Terms</NavLink> 
                        {' '}and{' '} 
                        <NavLink to="/policy" className="text-primary underline font-medium">Privacy Policy</NavLink>
                    </p>
                </label>
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
            Already have an account?{' '}
            <NavLink to="/login" className="text-primary hover:text-hover-primary font-medium underline">
              Sign in here
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
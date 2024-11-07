import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { Field, Label, Switch } from '@headlessui/react'
import googleIcon from '../../assets/icons/Google.svg'

const Register = () => {
  const [agreed, setAgreed] = useState(false)

  return (
    <div className="min-h-screen flex items-center py-12 sm:py-20 justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100">
        <div className="card-body">
          
          <h2 className="text-center text-3xl font-semibold mb-8">
            Create a new account
          </h2>

          <form className="space-y-5">
            <div className="form-control flex flex-row gap-2 w-full">
                <div>
                    <label className="label">
                        <span className="label-text text-sm/6 font-semibold text-black">First name</span>
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
                        <span className="label-text text-sm/6 font-semibold text-black">Last name</span>
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
                <span className="label-text text-sm/6 font-semibold text-black">Phone number</span>
              </label>
              <input
                type="tel"
                placeholder='08xxxxxxxxxx'
                required
                className="input input-bordered w-full"
              />
            </div>
            
            <div className="form-control w-full">
              <Field className=" flex gap-x-4 sm:col-span-2">
                <div className="flex h-6 items-center">
                  <Switch
                    checked={agreed}
                    onChange={setAgreed}
                    className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary data-[checked]:bg-primary"
                  >
                    <span
                      aria-hidden="true"
                      className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                    />
                  </Switch>
                </div>
                <div className="text-sm/6 text-gray-600">
                  By selecting this, you agree to our{' '}
                  <NavLink href="/policy" className="font-semibold text-primary">
                    privacy&nbsp;policy
                  </NavLink>
                </div>
              </Field>
            </div>

            <button
              type="submit"
              className="w-full min-h-[3rem] border rounded-md bg-primary text-white font-semibold hover:bg-hover-primary ease-in-out duration-200">
              Sign in
            </button>
          </form>

          <div className="divider ">Or continue with</div>

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
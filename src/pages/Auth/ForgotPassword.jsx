import React, { useState } from 'react'
import { API_URL } from '../../config/apiConfig';
import { toast } from 'react-hot-toast';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const response = await fetch(`${API_URL}/api/user/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            toast.success("Reset link has been sent to your email account")
        } catch (error) {
            toast.error(error.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-md bg-base-100">
                <div className="card-body">
                
                <h2 className="text-center text-3xl font-semibold">
                    Forgot password?
                </h2>

                <p className='text-center text-sm my-3'>Please enter your email address to receive a reset link</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="form-control w-full">

                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='example@email.com'
                        required
                        className={`input input-bordered w-full`}
                    />
                    </div>

                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full min-h-[3rem] border rounded-md bg-primary text-white font-semibold hover:bg-hover-primary ease-in-out duration-200">
                    {loading ? ( 
                        <span className="ml-2 loading loading-dots loading-lg"></span>
                    ) : 'Send Reset Link'}
                    </button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
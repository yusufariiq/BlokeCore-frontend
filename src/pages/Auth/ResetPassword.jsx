import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_URL } from '../../config/apiConfig';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams()
    const navigate = useNavigate();
    const token = searchParams.get('token');

    useEffect(() => {
        if(!token) {
            toast.error('Invalid token');
            navigate('/forgot-password');
        }
    }, [token, navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/user/reset-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            toast.success('Password reset successfully. Please log in.');
            navigate('/login');
        } catch (error) {
            toast.error(error.message || 'Failed to reset password.');
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-md bg-base-100">
                <div className="card-body">
                    <h2 className="text-center text-3xl font-semibold mb-4">
                        Reset password
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text text-sm/6 font-semibold text-black">New Password</span>
                            </label>
                            <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                            className="input input-bordered w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn bg-primary text-white hover:bg-hover-primary"
                        >
                            {loading ? 'ml-2 loading loading-dots loading-lg' : 'Reset Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
  )
}

export default ResetPassword
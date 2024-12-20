import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { API_URL } from '../../config/apiConfig'
import { toast } from 'react-hot-toast'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const VerifyAccount = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [status, setStatus] = useState('verifying')
    const token = searchParams.get('token')
    
    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                toast.error('Invalid verification link')
                setStatus('error')
                return
            }

            try {
                const response = await fetch(`${API_URL}/api/user/verify-email?token=${token}`)
                const data = await response.json()
                
                if (response.ok) {
                    setStatus('success')
                    toast.success('Email verified successfully! You can now login.')
                    // setTimeout(() => navigate('/login'), 3000)
                } else {
                    setStatus('error')
                    toast.error(data.message || 'Verification failed')
                }
            } catch (error) {
                console.error('Verification error:', error)
                setStatus('error')
                toast.error('Verification failed. Please try again.')
            }
        }

        verifyEmail()
    }, [token, navigate])

    const renderContent = () => {
        switch (status) {
            case 'verifying':
                return (
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                        <p className="mt-4 text-lg">Verifying your email...</p>
                    </div>
                )
            case 'success':
                return (
                    <div className="text-center">
                        <FontAwesomeIcon icon={faCheckCircle} className="mx-auto h-16 w-16 text-green-500" />
                        <h2 className="mt-4 text-4xl font-bold">Email Verified Successfully!</h2>
                        <ul className="mt-4 space-y-2">
                            <li className="flex items-center justify-center">
                                <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500 mr-2" />
                                <span>Email confirmation complete</span>
                            </li>
                            <li className="flex items-center justify-center">
                                <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500 mr-2" />
                                <span>Account activated</span>
                            </li>
                            <li className="flex items-center justify-center">
                                <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4 text-green-500 mr-2" />
                                <span>Ready to login</span>
                            </li>
                        </ul>
                        <p className="mt-4 text-gray-600">Redirecting to login page in 3 seconds...</p>
                    </div>
                )
            case 'error':
                return (
                    <Error />
                )
            default:
                return null
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 w-full">
                {renderContent()}
            </div>
        </div>
    )
}

export default VerifyAccount


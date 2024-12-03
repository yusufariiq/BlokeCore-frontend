import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { API_URL, GOOGLE_CLIENT } from '../../config/apiConfig';

const GoogleButton = ({ type = '' }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleSignIn = async (googleResponse) => {
    try {
      const response = await fetch(`${API_URL}/api/user/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: googleResponse.credential }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Google authentication failed');
      }

      login(data.user, data.token);
      
      if (type === 'login') {
        navigate('/');
        toast.success("Login successfully");
      } else {
        toast.success("Account created successfully");
        navigate('/');
      }
    } catch (error) {
      console.error('Google Auth Error:', error);
      toast.error(error.message || 'Authentication failed');
    }
  };

  const initializeGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT,
        callback: handleGoogleSignIn
      });

      window.google.accounts.id.renderButton(
        document.getElementById(`googleSignIn-${type}`),
        { 
          theme: "outline", 
          size: "large", 
          text: type === 'login' ? "signin_with" : "signup_with",
          width: "100%",
          shape: "pill",
        }
      );
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogleSignIn;
    document.body.appendChild(script);

    return () => {
      if (window.google) {
        window.google.accounts.id.cancel();
      }
    };
  }, []);

  return (
    <div 
      id={`googleSignIn-${type}`}
      key={`googleSignIn-${type}`}
      className="w-full flex justify-center"
    />
  );
};

export default GoogleButton;
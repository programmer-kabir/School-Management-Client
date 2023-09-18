import React from 'react';
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../Component/Hooks/useAuth';

const SocialLogin = () => {
  const navigate = useNavigate()
    const {googleSingIn} = useAuth()
    const handleGoogleLogin = () =>{
        googleSingIn()
        .then((result) => {
            const LoggedUser = result.user;
            console.log(LoggedUser);

            const saveUser = {name:LoggedUser.displayName, email:LoggedUser.email, photo:LoggedUser.pho}
            console.log("update done");
            navigate('/')
            // ...
          }).catch((error) => {
            console.log(error);
            const errorMessage = error.message;
          });
    }
    return (
        <div>
            
              <div className="flex mt-4 gap-x-2">
                <button
                onClick={handleGoogleLogin}
                  type="button"
                  className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 hover:bg-cyan-500 focus:ring-offset-1 hover:border-cyan-800 focus:ring-cyan-600 transition-colors duration-300"
                >
                  <FaGoogle className="w-5 h-5 fill-current"></FaGoogle>
                </button>
                <button className="flex items-center justify-center w-full p-2 border border-gray-600 rounded-md focus:ring-2 hover:bg-cyan-500 hover:border-cyan-800 focus:ring-offset-1 focus:ring-cyan-600 transition-colors duration-300">
                  <FaGithub  className="w-5 h-5 fill-current"></FaGithub>
                </button>
              </div>
        </div>
    );
};

export default SocialLogin;
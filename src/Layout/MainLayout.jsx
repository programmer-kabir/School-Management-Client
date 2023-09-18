import React from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';
import { Outlet } from 'react-router-dom';
import useAuth from '../Component/Hooks/useAuth';
import Loader from '../Component/Loader/Loader';

const MainLayout = () => {
    const {loading} = useAuth()
    if (loading) {
        return <Loader />;
      }
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;
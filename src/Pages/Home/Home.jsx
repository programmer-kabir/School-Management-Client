import React from 'react';
import Banner from '../../Component/Home/Banner/Banner';
import Reviews from '../../Component/Home/Review/Reviews';
import TopClass from '../../Component/Home/TopClass/TopClass';
import Contact from '../../Component/Home/Contact/Contact';
import Faq from '../../Component/Home/Faq/Faq';
import Benefit from '../../Component/Home/Benifit/Benifit';
import AppDownload from '../../Component/Home/AppDownload/AppDownload';
import Chose from '../../Component/Home/Chose/Chose';

const Home = () => {
    return (
        <div>
            <Banner />
            <TopClass />
            <Benefit />
            <AppDownload />
            <Faq />
            <Chose />
            <Reviews />
            <Contact />
   
        </div>
    );
};

export default Home;
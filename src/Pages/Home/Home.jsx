import React from 'react';
import Banner from '../../Component/Home/Banner/Banner';
import Reviews from '../../Component/Home/Review/Reviews';
import TopClass from '../../Component/Home/TopClass/TopClass';
import Contact from '../../Component/Home/Contact/Contact';

const Home = () => {
    return (
        <div>
            <Banner />
            <Reviews />
            <TopClass />
            <Contact />
        </div>
    );
};

export default Home;
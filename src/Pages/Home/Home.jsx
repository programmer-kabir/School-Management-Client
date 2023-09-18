import React from 'react';
import Banner from '../../Component/Home/Banner/Banner';
import Reviews from '../../Component/Home/Review/Reviews';
import TopClass from '../../Component/Home/TopClass/TopClass';

const Home = () => {
    return (
        <div>
            <Banner />
            <Reviews />
            <TopClass />
        </div>
    );
};

export default Home;
import React from 'react';
import HomeBackground from './HomeBackground';
import HomeOwlCarousel from './HomeOwlCarousel';
import HomeFindout from './HomeFindout';
const index = () => {
    return (
        <>
            <HomeBackground />
            <div className="container">
                <HomeOwlCarousel />
                <HomeFindout />
            </div>
        </>
    );
};

export default index;

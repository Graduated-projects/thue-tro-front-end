import React, { useEffect } from 'react';
import HomeBackground from './HomeBackground';
import HomeOwlCarousel from './HomeOwlCarousel';
import HomeFindout from './HomeFindout';
import OwlRoom from '@/components/owl-room/OwlRoom';
import { useRoomStore } from '@/app/store';
import { useAppDispatch } from '@/app/hooks';
import { roomAction } from '@/app/action/room.action';
import HomeFindout2 from './HomeFindout2';
const IndexPage = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {}, [dispatch]);

    return (
        <>
            <HomeBackground />
            <div className="container">
                {/* <OwlRoom
                    rooms={rooms}
                    isLoadingRooms={isLoadingRooms}
                    title="Phòng trọ đánh giá cao"
                /> */}
                {/* <OwlRoom rooms={rooms} isLoadingRooms={isLoadingRooms} title="Gợi ý cho bạn" /> */}
                <HomeOwlCarousel />
            </div>
            <HomeFindout />
            <HomeFindout2 />
        </>
    );
};

export default IndexPage;

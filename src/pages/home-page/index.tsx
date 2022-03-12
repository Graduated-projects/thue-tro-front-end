import React, { useEffect } from 'react';
import HomeBackground from './HomeBackground';
import HomeOwlCarousel from './HomeOwlCarousel';
import HomeFindout from './HomeFindout';
import OwlRoom from '@/components/owl-room/OwlRoom';
import { useRoomStore } from '@/app/store';
import { useAppDispatch } from '@/app/hooks';
import { roomAction } from '@/app/action/room.action';
const Index = () => {
    const { rooms, isLoadingRooms } = useRoomStore();
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(roomAction.getAll(0));
    }, [dispatch]);
    console.log(rooms);

    return (
        <>
            <HomeBackground />
            <div className="container">
                <OwlRoom
                    rooms={rooms}
                    isLoadingRooms={isLoadingRooms}
                    title="Phòng trọ đánh giá cao"
                />
                <OwlRoom rooms={rooms} isLoadingRooms={isLoadingRooms} title="Gợi ý cho bạn" />
                <HomeOwlCarousel />
                <HomeFindout />
            </div>
        </>
    );
};

export default Index;

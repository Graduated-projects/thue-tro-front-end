import { path } from './path';
import NotFound from '@/pages/NotFound';
import HomePage from '@/pages/home-page/Index';
import FindingPage from '@/pages/finding-page/index';
import Login from '@/pages/auth-page/Login';
import Register from '@/pages/auth-page/Register';
import UserInfo from '@/pages/info-page/UserInfo';
import OwnerRegister from '@/pages/owner-page/OwnerRegister';
import ApartmentPost from '@/pages/apartment-page/ApartmentPost';
import MyApartment from '@/pages/apartment-page/MyApartment';
import ApartmentById from '@/pages/apartment-page/ApartmentById';
import RoomCreate from '@/pages/room-page/RoomCreate';
import RoomByDepartmentId from '@/pages/room-page/RoomByDepartmentId';
import RoomContract from '@/pages/room-page/RoomContract';
import RoomContractSuccess from '@/pages/room-page/RoomContractSuccess';

const routes = [
    //notFound & Exception
    { path: path.main.home, component: HomePage, exact: true },
    { path: path.main.finding, component: FindingPage, exact: false },
    { path: path.auth.login, component: Login, exact: true },
    { path: path.auth.register, component: Register, exact: true },
    { path: path.main.userInfo, component: UserInfo, exact: true },
    { path: path.main.owner, component: OwnerRegister, exact: true },
    { path: path.apartment.post, component: ApartmentPost, exact: true },
    { path: path.apartment.my, component: MyApartment, exact: true },
    { path: path.apartment.byId, component: ApartmentById, exact: true },
    { path: path.apartment.byId + path.room.byId, component: RoomByDepartmentId, exact: true },
    { path: path.room.create, component: RoomCreate, exact: true },
    { path: path.room.contract, component: RoomContract, exact: true },
    { path: path.room.success, component: RoomContractSuccess, exact: true },
    { path: '*', component: NotFound, exact: true },

    //Note: Page not Found need stay last of array.
];
export default routes;

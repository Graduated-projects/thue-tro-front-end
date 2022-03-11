import NotFound from '@/pages/NotFound';
import HomePage from '@/pages/home-page/index';
import FindingPage from '@/pages/finding-page/index';
import { path } from './path';
import Login from '@/pages/auth-page/Login';
import Room from '@/pages/room-page/Room';
import Register from '@/pages/auth-page/Register';
import UserInfo from '@/pages/info-page/UserInfo';

const routes = [
    //notFound & Exception
    { path: path.main.home, component: HomePage, exact: true },
    { path: path.main.finding, component: FindingPage, exact: false },
    { path: path.auth.login, component: Login, exact: true },
    { path: path.room.byId, component: Room, exact: true },
    { path: path.auth.register, component: Register, exact: true },
    { path: path.main.userInfo, component: UserInfo, exact: true },
    { path: '', component: NotFound, exact: true },
    

    //Note: Page not Found need stay last of array.
];
export default routes;

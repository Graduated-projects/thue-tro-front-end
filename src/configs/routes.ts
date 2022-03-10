import NotFound from '@/pages/NotFound';
import HomePage from '@/pages/homePage/index';
import FindingPage from '@/pages/findingPage/index';
import { path } from './path';
import Login from '@/pages/authPage/Login';
import Room from '@/pages/roomPage/Room';
import Register from '@/pages/authPage/Register';

const routes = [
    //notFound & Exception
    { path: path.main.home, component: HomePage, exact: true },
    { path: path.main.finding, component: FindingPage, exact: false },
    { path: path.auth.login, component: Login, exact: true },
    { path: path.room.byId, component: Room, exact: true },
    { path: path.auth.register, component: Register, exact: true },
    { path: '', component: NotFound, exact: true },
    

    //Note: Page not Found need stay last of array.
];
export default routes;

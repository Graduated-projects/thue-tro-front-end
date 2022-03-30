import { path } from './path';
import NotFound from '@/pages/NotFound';
import HomePage from '@/pages/home-page/Index';
import FindingPage from '@/pages/finding-page/index';
import Login from '@/pages/auth-page/Login';
import Register from '@/pages/auth-page/Register';
import UserInfo from '@/pages/info-page/UserInfo';
import OwnerRegister from '@/pages/owner-page/OwnerRegister';
import ApartmentPost from '@/pages/apartment-page/ApartmentPost';

const routes = [
    //notFound & Exception
    { path: path.main.home, component: HomePage, exact: true },
    { path: path.main.finding, component: FindingPage, exact: false },
    { path: path.auth.login, component: Login, exact: true },
    { path: path.auth.register, component: Register, exact: true },
    { path: path.main.userInfo, component: UserInfo, exact: true },
    { path: path.main.owner, component: OwnerRegister, exact: true },
    { path: path.apartment.post, component: ApartmentPost, exact: true },
    { path: '*', component: NotFound, exact: true },
    

    //Note: Page not Found need stay last of array.
];
export default routes;

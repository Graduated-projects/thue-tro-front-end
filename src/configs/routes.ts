import NotFound from '../pages/NotFound';
import HomePage from '../pages/homePage/index';
import FindingPage from '../pages/findingPage/index';
import { path } from './path';
import Login from '../pages/authPage/Login';

const routes = [
    //notFound & Exception
    { path: path.main.home, component: HomePage, exact: true },
    { path: path.main.finding, component: FindingPage, exact: false },
    { path: path.auth.login, component: Login, exact: true },
    { path: '', component: NotFound, exact: true },
    

    //Note: Page not Found need stay last of array.
];
export default routes;

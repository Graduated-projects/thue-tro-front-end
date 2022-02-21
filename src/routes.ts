import NotFound from './pages/NotFound';
import HomePage from './pages/homePage/index';
import FindingPage from './pages/findingPage/index';

const routes = [
    //notFound & Exception
    { path: '/', component: HomePage, exact: true },
    { path: '/finding', component: FindingPage, exact: true },
    { path: '', component: NotFound, exact: true },

    //Note: Page not Found need stay last of array.
];
export default routes;

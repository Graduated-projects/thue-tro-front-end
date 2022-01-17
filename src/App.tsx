import Headers from './components/Headers';
import './assets/scss/styles.scss';
import HomeBackground from './components/homePage/HomeBackground';
import HomeOwlCarousel from './components/homePage/HomeOwlCarousel';
import HomeFindout from './components/homePage/HomeFindout';

function App() {
    return (
        <div className="App">
            <Headers />
            <HomeBackground />
            <div className="container">
                <HomeOwlCarousel />
                <HomeFindout />
            </div>
        </div>
    );
}

export default App;

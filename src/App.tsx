import Headers from './components/Headers';
import './assets/scss/styles.scss';
import HomeBackground from './components/homePage/HomeBackground';
import HomeOwlCarousel from './components/homePage/HomeOwlCarousel';

function App() {
    return (
        <div className="App">
            <Headers />
            <HomeBackground />
            <div className="container">
                <HomeOwlCarousel />
            </div>
        </div>
    );
}

export default App;

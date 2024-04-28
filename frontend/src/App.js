
import './App.css';
import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';
import Banner from './components/custom/Banner';
function App() {
  return (
    <div className='w-screen h-screen'>

      <Navbar/>
      {/* <Header/> */}
      <div className='w-screen mt-10'>
        <Banner/>
      </div>
    </div>

  );
}

export default App;

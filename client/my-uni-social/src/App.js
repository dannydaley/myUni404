import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Home/NavBar';
import HomeGrid from './Components/Home/HomeGrid';
import HomePage from './Pages/HomePage';
import SignInPage from './Pages/SignInPage';

function App() {
  return (
    <div className="App">
      {/* <HomePage /> */}
      <SignInPage />
    </div>
  );
}

export default App;

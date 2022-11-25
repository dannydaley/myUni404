import NavBar from "../Components/Home/NavBar"
import HomeGrid from "../Components/Home/HomeGrid"
import { Outlet } from "react-router-dom";

function HomePage() {
    return(
        <div>
        <NavBar />
        
        <HomeGrid />
        </div>
    )
}


export default HomePage;


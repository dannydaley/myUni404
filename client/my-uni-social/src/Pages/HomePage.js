import NavBar from "../Components/Home/NavBar"
import HomeGrid from "../Components/Home/HomeGrid"
import { unstable_composeClasses } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";


class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            

        }
      }

      loggedInEmail = '';
//COMPONENT DID MOUNT IS BUILT IN AND RUNS WHEN THE COMPONENT MOUNTS
  componentDidMount = async () => {
    // this.setState({ settings: newSettings })   
    //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
    fetch('http://localhost:3001' + '/getPosts', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        
      })    
    })
    //TURN THE RESPONSE INTO A JSON OBJECT
    .then(response => response.json())
    .then(await this.delayFunction())
    // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
    .then(data => {  
      this.loggedInEmail = data.email;  
      this.setState({ 
        loggedInEmail: data.email
      });
    })
  }

render() {
      console.log('from homepage' + this.props.userData.userFirstName) 
    return(
        <div>
        <NavBar />
        
        <HomeGrid  loggedInEmail={this.loggedInEmail} userData={this.props.userData}/>
        </div>
    )
  }
}


export default HomePage;


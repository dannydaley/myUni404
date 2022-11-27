//This component handles the login form and login functionality

import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link, Navigate, Router, useNavigate } from 'react-router-dom';

function SignInForm() {

    let signInEmail;
    
    let signInPassword;

    const navigate = useNavigate();
    //Function controls email in field added to state
    const onEmailChange = (event) => {
        signInEmail = event.target.value
    }
    //Function controls password in field added to state
    const onPasswordChange = (event) => {
        signInPassword = event.target.value
    }
    //Function controls applying session data to global state
    // const applySession = (firstName, lastName, username, profilePicture) => {
    //             this.props.updateSession(firstName, lastName, username, profilePicture)
    //             this.props.onRouteChange('home')  
    // }
    
    // //Function triggers when component is mounted and looks for an active session.
    // componentDidMount() {     
    //     fetch(process.env.SERVER + '/refreshSessionStatus', {
    //       status: 'session-exists'
    //     }).then(response => response.json())
    //       .then(data => data.status === "session-exists" ? this.applySession(data.firstName, data.lastName, data.username, data.profilePicture) :''
    //       )
    //       }

    //Function controls logging in and updates the session on success.
    const onSubmitSignIn = () => {
        fetch('http://localhost:3001'+ '/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'email': signInEmail,
                'password': signInPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.status === 'success') { 
                // let navigate = useNavigate();           
                // this.props.updateSession(data.firstName, data.lastName, data.username, data.profilePicture, data.coverPicture);
             navigate('/home')}
            }
        )
    }
 
            return (
                    <div style={{width: '30%', padding: '10ch',backgroundColor: '#f5c732'}}>
                        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '30ch' } }} noValidate autoComplete="off">
                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} onSubmit={()=> this.onSubmitSignIn()}>
                                <TextField
                                required
                                id="outlined-required"
                                type="email"
                                label="Email Address"
                                placeholder="Email Address"
                                onChange={onEmailChange}
                                sx={{backgroundColor: 'white'}}
                                />
                                <TextField
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={onPasswordChange}
                                sx={{backgroundColor: 'white'}}
                                />
                                
                                <Button variant="contained" sx={{width: '33ch', backgroundColor: '#292929', '&:hover': { backgroundColor: 'gray'}}}        
                                onSubmit={()=> onSubmitSignIn()}                            
                                onClick={()=> onSubmitSignIn()}>
                                    Sign In
                                </Button>
                                
                                <p>Forgotten Password?</p>
                            </div>
                            <Divider variant="middle" style={{marginTop: '20px', marginBottom: '40px'}}/>
                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Link to='/signup' style={{textDecoration: 'none'}}>
                                    <Button variant="contained" sx={{width: '33ch',  backgroundColor: '#292929', '&:hover': { backgroundColor: 'gray'}}}>Sign Up</Button>  
                                </Link>      
                            </div>
                        </Box>
                    </div>
                );
    
}

export default SignInForm;
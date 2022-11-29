import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link, useNavigate } from 'react-router-dom';

function SignUpForm(props) {


      


      let signUpEmail;
      // applies the email to state from the text field
      const onEmailChange = (event) => {
        signUpEmail = event.target.value
      }

      let signUpFirstName;

      //applies first name to state from text field
      const onFirstNameChange = (event) => {
        signUpFirstName = event.target.value
      }
      let signUpLastName;
      //applies last name to state from text field
      const onLastNameChange = (event) => {
        signUpLastName = event.target.value
      }
      let signUpPassword;
      //applies password to state from text field
      const onPasswordChange = (event) => {
        signUpPassword = event.target.value
      }
      let confirmSignUpPassword;
      // applies password confirm to state from text field
      const onPasswordConfirmChange = (event) => {
        confirmSignUpPassword = event.target.value
      }

    // function handles form submission and signup
    const onSubmitSignUp = () => {
        fetch('http://localhost:3001' + '/signUp', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'signUpEmail': signUpEmail,
                'signUpFirstName': signUpFirstName,
                'signUpLastName': signUpLastName,
                'signUpPassword': signUpPassword,
                'confirmSignUpPassword': confirmSignUpPassword   
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {            
                // this.props.updateSession(data.firstName, data.lastName, data.username, data.profilePicture);
                props.changeRoute('signin')
                }
            }
        )
        // .then(this.props.onRouteChange('signin'))
    }


  return (
    
    <div style={{width: '30%', padding: '10ch',backgroundColor: '#f5c732'}}>
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '30ch' } }} noValidate autoComplete="off">
            <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}} >
              <TextField
                required
                name="email"
                id="outlined-required"
                type="email"
                label="Email Address"
                placeholder="Email Address"
                onChange={onEmailChange}
                style={{backgroundColor: 'white'}}
              />  
              <TextField
                required
                name="firstName"
                id="outlined-required"
                type="text"
                label="First name"
                placeholder="first name"
                onChange={onFirstNameChange}
                style={{backgroundColor: 'white'}}
              />
              <TextField
                required
                name="lastName"
                id="outlined-required"
                type="text"
                label="Last name"
                placeholder="last name"
                onChange={onLastNameChange}
                style={{backgroundColor: 'white'}}
              />
              <TextField
                name="password"
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="off"
                placeholder='create password'
                onChange={onPasswordChange}
                style={{backgroundColor: 'white'}}
              />
              <TextField
              name="confirmPassword"
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="off"
                placeholder='repeat password'
                onChange={onPasswordConfirmChange}
                style={{backgroundColor: 'white'}}
              />
              <Link to='/signin' style={{textDecoration: 'none'}}>
                  <Button variant="contained" sx={{width: '33ch',  backgroundColor: '#292929', '&:hover': { backgroundColor: 'gray'}}}
                    onClick={() => onSubmitSignUp()}>
                      Sign Up
                  </Button>  
              </Link>   
  
            </form>
            <Divider variant="middle" style={{marginTop: '20px', marginBottom: '40px'}}/>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>             
                  <Button variant="contained" sx={{width: '33ch',  backgroundColor: '#292929', '&:hover': { backgroundColor: 'gray'}}}
                  onClick={() => props.changeRoute('signin')}>Sign In</Button>                
            </div>
        </Box>
    </div>
  );
}

export default SignUpForm;
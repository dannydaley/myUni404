import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
export default class SignUpForm extends React.Component 
  {
      constructor(props) {
          super(props);
          this.state = {
              signUpEmail: '',
              signUpFirstName: '',
              signUpLastName: '',
              signUpPassword: '',
              confirmSignUpPassword: ''            
          }
      }

      // applies the email to state from the text field
      onEmailChange = (event) => {
        this.setState({signUpEmail: event.target.value})
      }
      //applies first name to state from text field
      onFirstNameChange = (event) => {
        this.setState({signUpFirstName: event.target.value})
      }
      //applies last name to state from text field
      onLastNameChange = (event) => {
        this.setState({signUpLastName: event.target.value})
      }
      //applies password to state from text field
      onPasswordChange = (event) => {
        this.setState({signUpPassword: event.target.value})
      }
      // applies password confirm to state from text field
      onPasswordConfirmChange = (event) => {
        this.setState({confirmSignUpPassword: event.target.value})
      }

    // function handles form submission and signup
    onSubmitSignUp = () => {
        fetch(process.env.REACT_APP_SERVER + '/signUp', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'signUpEmail': this.state.signUpEmail,
                'signUpUserName': this.state.signUpUserName,
                'signUpFirstName': this.state.signUpFirstName,
                'signUpLastName': this.state.signUpLastName,
                'signUpPassword': this.state.signUpPassword,
                'confirmSignUpPassword': this.state.confirmSignUpPassword   
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {            
                this.props.updateSession(data.firstName, data.lastName, data.username, data.profilePicture);
                }
            }
        ).then(this.props.onRouteChange('signin'))
    }

render() {
  const { onRouteChange } = this.props
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
                onChange={this.onEmailChange}
                style={{backgroundColor: 'white'}}
              />  
              <TextField
                required
                name="firstName"
                id="outlined-required"
                type="text"
                label="First name"
                placeholder="first name"
                onChange={this.onFirstNameChange}
                style={{backgroundColor: 'white'}}
              />
              <TextField
                required
                name="lastName"
                id="outlined-required"
                type="text"
                label="Last name"
                placeholder="last name"
                onChange={this.onLastNameChange}
                style={{backgroundColor: 'white'}}
              />
              <TextField
                name="password"
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="off"
                placeholder='create password'
                onChange={this.onPasswordChange}
                style={{backgroundColor: 'white'}}
              />
              <TextField
              name="confirmPassword"
                id="outlined-password-input"
                label="Confirm Password"
                type="password"
                autoComplete="off"
                placeholder='repeat password'
                onChange={this.onPasswordConfirmChange}
                style={{backgroundColor: 'white'}}
              />
              <Link to='/signin' style={{textDecoration: 'none'}}>
                  <Button variant="contained" sx={{width: '33ch',  backgroundColor: '#292929', '&:hover': { backgroundColor: 'gray'}}}
                    onClick={() => this.onSubmitSignUp()}>
                      Sign Up
                  </Button>  
              </Link>   
  
            </form>
            <Divider variant="middle" style={{marginTop: '20px', marginBottom: '40px'}}/>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Link to='/signin' style={{textDecoration: 'none'}}>
                  <Button variant="contained" sx={{width: '33ch',  backgroundColor: '#292929', '&:hover': { backgroundColor: 'gray'}}}>Sign In</Button>  
              </Link>    
            </div>
        </Box>
    </div>
  );

  }


}
import * as React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function HomeLeft() {
  return(
    <Container xs={0} sx={{position: 'fixed',padding: '20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', backgroundColor: '#292929' , width: 1, height: '94vh',   position: 'sticky', top: 0}}>
      <img style={{width: '120px', height: '120px', marginBottom: '50px', border: '1px solid gray', borderRadius: '50%'}} />
      <Link to={'ask'} style={{textDecoration: 'none'}}><Button variant="contained" sx={{backgroundColor: '#f5c732', mb: '50px','&:hover': {backgroundColor: 'gray'}}} size="medium">Ask a question</Button></Link>
      <Stack spacing={2} direction="column" sx={{width: '80%', margin: '0 auto'}}>      
      <Link to={'feed'} style={{textDecoration: 'none'}}>
        <Button variant="contained" sx={{width: '100%', backgroundColor: '#f5c732', '&:hover': { backgroundColor: 'gray'}}} size="medium">Web</Button>
      </Link>      
      <Link to={'feed'} style={{textDecoration: 'none'}}>
        <Button variant="contained" sx={{width: '100%', backgroundColor: '#f5c732', '&:hover': { backgroundColor: 'gray'}}} size="medium">Game Dev</Button>
        </Link> 
      <Link to={'feed'} style={{textDecoration: 'none'}}>
        <Button variant="contained" sx={{width: '100%', backgroundColor: '#f5c732', '&:hover': { backgroundColor: 'gray'}}} size="medium">Systems/OS</Button>
        </Link>
      <Link to={'feed'} style={{textDecoration: 'none'}}>
        <Button variant="contained" sx={{width: '100%', backgroundColor: '#f5c732', '&:hover': { backgroundColor: 'gray'}}} size="medium">Robotics</Button>
        </Link>
      </Stack>
      <a href="https://falmouth.myday.cloud/dashboard/home" target={'_blank'} style={{justifySelf: 'flex-end', alignSelf: 'flex-end', marginTop: 'auto', textDecoration: 'none'}}>
        <Button variant="contained" sx={{width: '100%', backgroundColor: '#f5c732', '&:hover': { backgroundColor: 'gray'}, justifySelf: 'flex-end', alignSelf: 'flex-end', marginTop: 'auto'}} size="medium">Falmouth myday</Button> 
      </a>  
    </Container>        
  );
}
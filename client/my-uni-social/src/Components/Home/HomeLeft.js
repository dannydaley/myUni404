import * as React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function HomeLeft() {
  return(
    <Container xs={0} sx={{position: 'fixed',padding: '20px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', backgroundColor: '#292929' , width: 1, height: '94vh',   position: 'sticky', top: 0}}>
      <img style={{width: '120px', height: '120px', marginBottom: '50px', border: '1px solid gray', borderRadius: '50%'}} />
      <Button variant="contained" sx={{backgroundColor: '#f5c732', mb: '50px','&:hover': {backgroundColor: 'gray'}}} size="medium">Ask a question</Button>
      <Stack spacing={2} direction="column" sx={{width: '80%', margin: '0 auto'}}>      
          <Button variant="contained" sx={{backgroundColor: '#f5c732', '&:hover': { backgroundColor: 'gray'}}} size="medium">Web</Button>      
          <Button variant="contained" sx={{backgroundColor: '#f5c732', '&:hover': { backgroundColor: 'gray'}}} size="medium">Game Dev</Button> 
          <Button variant="contained" sx={{backgroundColor: '#f5c732', '&:hover': { backgroundColor: 'gray'}}} size="medium">Systems/OS</Button> 
          <Button variant="contained" sx={{backgroundColor: '#f5c732', '&:hover': { backgroundColor: 'gray'}}} size="medium">Robotics</Button> 
      </Stack>
      <a href="https://falmouth.myday.cloud/dashboard/home" target={'_blank'} style={{justifySelf: 'flex-end', alignSelf: 'flex-end', marginTop: 'auto', textDecoration: 'none'}}>
        <Button variant="contained" sx={{backgroundColor: '#f5c732', '&:hover': { backgroundColor: 'gray'}, justifySelf: 'flex-end', alignSelf: 'flex-end', marginTop: 'auto'}} size="medium">Falmouth myday</Button> 
      </a>  
    </Container>        
  );
}
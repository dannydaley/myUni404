import * as React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function HomeLeft() {
  return(
        <Container sx={{padding: '20px',  display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', backgroundColor: '#292929' , width: 1, height: '95%'}}>
            <img style={{width: '170px', height: '170px', paddingBottom: '20px'}}/>
            <Stack spacing={2} direction="column" sx={{width: '80%'}}>      
                <Button variant="contained" sx={{backgroundColor: '#f5c732', '&:hover': { backgroundColor: 'gray'}}} size="medium">Module</Button>      
            </Stack>
            <Button variant="contained" sx={{backgroundColor: '#f5c732', '&:hover': { backgroundColor: 'gray'}, justifySelf: 'flex-end', alignSelf: 'flex-end', marginTop: 'auto'}} size="medium">Falmouth myday</Button>   
            </Container>
            
        
  );
}
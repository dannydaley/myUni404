import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import HomeLeft from './HomeLeft';


function HomeGrid() {

    return(
        <Grid container spacing={3} sx={{height: '100vh', backgroundColor: '#333', marginTop: '0px'}}>
            <Grid  width={'225px'}>
                <HomeLeft />
            </Grid>
            <Grid xs={6}>
                <div>xs=6</div>
            </Grid>
            <Grid xs>
                <div>xs</div>
            </Grid>
        </Grid>
    )

}

export default HomeGrid;

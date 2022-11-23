import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import HomeLeft from './HomeLeft';
import Question from './Question';


function HomeGrid() {
    return(
        <Grid container spacing={3} sx={{height: '100vh', backgroundColor: '#333', marginTop: '0px'}}>
            <Grid  width={'225px'}>
                <HomeLeft />
            </Grid>
            <Grid xs={7}>
                <div style={{padding: '20px'}}>
                    <Question posterProfilePicture={'null'} poster={'Danny Daley'} title={'Is this code correct?'} question={'My Docker compose isnt working properly, this is the code: fnsdjnvjsdfnjknsdjk'} number={1} replies={10} date={'23/11/2022'}/>
                    <Question posterProfilePicture={'null'} poster={'Danny Daley'} title={'Is this code correct?'} question={'My Docker compose isnt working properly, this is the code: fnsdjnvjsdfnjknsdjk'} number={1} replies={10} date={'23/11/2022'}/>
                    <Question posterProfilePicture={'null'} poster={'Danny Daley'} title={'Is this code correct?'} question={'My Docker compose isnt working properly, this is the code: fnsdjnvjsdfnjknsdjk'} number={1} replies={10} date={'23/11/2022'}/>
                    <Question posterProfilePicture={'null'} poster={'Danny Daley'} title={'Is this code correct?'} question={'My Docker compose isnt working properly, this is the code: fnsdjnvjsdfnjknsdjk'} number={1} replies={10} date={'23/11/2022'}/>
                </div>
            </Grid>
            <Grid xs>
                <div>xs</div>
            </Grid>
        </Grid>
    )
}

export default HomeGrid;

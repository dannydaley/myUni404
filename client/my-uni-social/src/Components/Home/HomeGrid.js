import Grid from '@mui/material/Grid'; // Grid version 1
import HomeLeft from './HomeLeft';
import QuestionFeed from './QuestionFeed';
import FullQuestion from '../FullQuestion/FullQuestion'
function HomeGrid() {
    return(
        <Grid container spacing={3} sx={{backgroundColor: '#333', marginTop: '60px'}}>
            <Grid width={'225px'}>
                <HomeLeft />
            </Grid>
            <Grid xs={6} sx={{margin: '0 auto'}}>
                {/* <QuestionFeed /> */}
                <FullQuestion />
            </Grid>
            {/* <Grid xs>
                <div>xs</div>
            </Grid> */}
        </Grid>
    )
}

export default HomeGrid;

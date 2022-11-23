import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import CodeBlock from '../CodeBlock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReplyIcon from '@mui/icons-material/Reply';


export default function Question(props) {
  return (
    <div style={{marginBottom: '10px'}}>
          <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <div src={props.posterProfilerPicture} style={{display: 'flex', flexDirection: 'row', alignItems: 'top'}}>
          <img style={{border: '1px solid gray', width: '50px', height: '50px', borderRadius: '50%'}}/>
          <Typography sx={{ fontSize: 15, textAlign: 'center', marginLeft: '7px' }} color="text.secondary">
            {props.poster}  
          </Typography>
        </div>
        <div style={{width: '80%', marginLeft: 'auto'}}>
          <Typography variant="h5" style={{textAlign: 'left'}}component="div">
            {props.title}
          </Typography>
          <Typography variant="body2" sx={{textAlign: 'left'}}>
            {props.question}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <Button size="small">Read More</Button>
        <div style={{marginLeft: 'auto', display: 'flex', flexDirection: 'row', verticalAlign: 'center'}}>
          <VisibilityIcon sx={{color: 'gray'}}/>
            <Typography color="text.secondary" >           
              10
            </Typography>
        </div>
        <ReplyIcon sx={{color: 'gray', paddingLeft: '5px'}}/>
        <Typography color="text.secondary" sx={{paddingRight: '15px'}}>          
          {props.replies}
        </Typography>
      </CardActions>
    </Card>
    <Divider sx={{marginTop: '10px'}} />
    </div>
  );
}
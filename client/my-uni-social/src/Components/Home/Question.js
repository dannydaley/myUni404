import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import CodeBlock from '../CodeBlock';



export default function Question(props) {
  return (
    <div style={{marginBottom: '10px'}}>
          <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <div src={props.posterProfilerPicture} style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
          <img style={{border: '1px solid gray', width: '60px', height: '60px', borderRadius: '50%'}}/>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>

          {props.poster}
          
        </Typography>
        </div>

        <Typography variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" sx={{textAlign: 'left'}}>
          {props.question}
          <CodeBlock codeString={ `<div src={props.posterProfilerPicture} style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
          <img style={{border: '1px solid gray', width: '60px', height: '60px', borderRadius: '50%'}}/>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          <CodeBlock codestring={} />
          {props.poster}
          
        </Typography>
        </div>`} />
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Read More</Button>
        <Typography sx={{ mb: 1.5, marginLeft: 'auto' }} color="text.secondary">
          {props.replies} replies
        </Typography>
      </CardActions>
    </Card>
    <Divider sx={{marginTop: '10px'}} />
    </div>
  );
}
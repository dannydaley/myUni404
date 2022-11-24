import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import CodeBlock from '../CodeBlock';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

export default function Answer(props) {
  return (
    <div style={{marginBottom: '10px'}}>
        <Box sx={{ minWidth: 275 }}>
            <CardContent>
                <div src={props.posterProfilerPicture} style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                    <img style={{border: '1px solid gray', width: '60px', height: '60px', borderRadius: '50%'}}/>
                    <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                        {props.poster} 
                        Replier name 
                    </Typography>
                </div>
                <div>
                    <Typography variant="body2" sx={{textAlign: 'left', marginTop: '30px'}}>
                        {props.text}
                        This could help fix your problem creating and deploying your docker image
                        <CodeBlock codeString={`# syntax=docker/dockerfile:1
                            FROM python:3.7-alpine
                            WORKDIR /code
                            ENV FLASK_APP=app.py
                            ENV FLASK_RUN_HOST=0.0.0.0
                            RUN apk add --no-cache gcc musl-dev linux-headers
                            COPY requirements.txt requirements.txt
                            RUN pip install -r requirements.txt
                            EXPOSE 5000
                            COPY . .
                            CMD ["flask", "run"]`} />
                    </Typography>
                </div>
            </CardContent>
            <CardActions>
                <div style={{marginLeft: 'auto', display: 'flex', flexDirection: 'row', verticalAlign: 'center'}}>
                    <ArrowUpwardIcon sx={{color: 'gray',  cursor: 'pointer',':hover': {color: 'lightGreen'}}}/>   
                    <Typography color="text.secondary" >        
                    10
                    </Typography>
                    <ArrowDownwardIcon sx={{color: 'gray', cursor: 'pointer', ':hover': {color: 'red'}}} />                    
                </div>
            </CardActions>
        </Box>
    </div>
  );
}
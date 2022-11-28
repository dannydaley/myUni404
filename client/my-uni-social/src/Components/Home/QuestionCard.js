import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReplyIcon from '@mui/icons-material/Reply';



export default class Question extends React.Component{
  constructor(props) {
    super(props);
  } 

  goToQuestion = (title, author, question, code, postID, language) => {
    this.props.readyQuestion(title, author, question, code, postID, language);
    this.props.changeRoute('question')
  }  
  render() {  
    return (
      <div style={{marginBottom: '10px'}}>
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <div src={this.props.posterProfilePicture} style={{display: 'flex', flexDirection: 'row', alignItems: 'top'}}>
              <img style={{border: '1px solid gray', width: '50px', height: '50px', borderRadius: '50%'}}/>
              <Typography sx={{ fontSize: 15, textAlign: 'center', marginLeft: '7px' }} color="text.secondary">
                {this.props.poster}  
              </Typography>
            </div>
            <div style={{width: '80%', marginLeft: 'auto'}}>
                    
              <Typography variant="h5" 
                style={{textAlign: 'left'}}
                component="div"
                onClick={() => this.goToQuestion(this.props.title, this.props.poster, this.props.question, this.props.code, this.props.postID, this.props.language)}>                
                {this.props.title}                
              </Typography>
              <Typography variant="body2" sx={{textAlign: 'left'}}>
                {this.props.question}
              </Typography>
            </div>
          </CardContent>
          <CardActions>
              <Button size="small" 
                onClick={() => this.goToQuestion(this.props.title, this.props.poster, this.props.question, this.props.code, this.props.postID, this.props.language)}>
                  Read More
              </Button>           
              <div style={{marginLeft: 'auto', display: 'flex', flexDirection: 'row', verticalAlign: 'center'}}>
              </div>
              <ReplyIcon sx={{color: 'gray', paddingLeft: '5px'}}/>
              <Typography color="text.secondary" sx={{paddingRight: '15px'}}>          
                {this.props.replies}      
              </Typography>
          </CardActions>
        </Card>
        <Divider sx={{marginTop: '10px'}} />
      </div>
    );
  }
}
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import CodeBlock from '../CodeBlock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReplyIcon from '@mui/icons-material/Reply';
import CreateReply from './CreateReply'
import Answer from './Answer';

export default class FullQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contentLoaded: false,
      replyData: []
    }
  }

  replyData = [];

  delayFunction = async () => {
    await this.delay(1000);
  };

  componentDidMount = async () => {
    this.setState({ contentLoaded: false })  
    // this.setState({ settings: newSettings })   
    //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
    fetch('http://localhost:3001' + '/getQuestionReplies', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        postID: this.props.postID
      })    
    })
    //TURN THE RESPONSE INTO A JSON OBJECT
    .then(response => response.json())
    // .then(await this.delayFunction())
    // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
    .then(data => {    
      this.setState({ replyData: data }); 
      this.setState({ contentLoaded: true })
    })
  }
  render() {
    if (!this.state.contentLoaded) {
    return (    
      <div style={{margin: '20px 0'}}>
          <Card sx={{ minWidth: 275 }}>
              <CardContent>
                  <div src={this.props.posterProfilerPicture} style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                      <img style={{border: '1px solid gray', width: '60px', height: '60px', borderRadius: '50%'}}/>
                      <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>                        
                          {this.props.author}                        
                      </Typography>
                      <CardActions sx={{marginLeft: 'auto'}}>
                        <div style={{marginLeft: 'auto', display: 'flex', flexDirection: 'row', verticalAlign: 'center'}}>
                            <VisibilityIcon sx={{color: 'gray'}}/>
                            <Typography color="text.secondary" >           
                                10
                            </Typography>
                        </div>
                        <ReplyIcon sx={{color: 'gray', paddingLeft: '5px'}}/>
                        <Typography color="text.secondary" sx={{paddingRight: '15px'}}>
                            {this.props.replies}
                            
                        </Typography>
                      </CardActions>
                  </div>
                  <Typography variant="h5" component="div" sx={{mb: 2}}>
                      {this.props.title}
                        </Typography>
                  <Typography variant="body2" sx={{textAlign: 'left'}}>
                      {this.props.text}
                      
                      <CodeBlock codeString={this.props.code} />
                  </Typography>
              </CardContent>
          </Card>
          <Divider sx={{marginTop: '10px'}} />  
          <CreateReply />
      </div>
         )
    } else if (this.state.contentLoaded) {
      return (    
        <div style={{margin: '20px 0'}}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <div src={this.props.posterProfilerPicture} style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                        <img style={{border: '1px solid gray', width: '60px', height: '60px', borderRadius: '50%'}}/>
                        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>                        
                            {this.props.author}                        
                        </Typography>
                        <CardActions sx={{marginLeft: 'auto'}}>
                          <div style={{marginLeft: 'auto', display: 'flex', flexDirection: 'row', verticalAlign: 'center'}}>
                              <VisibilityIcon sx={{color: 'gray'}}/>
                              <Typography color="text.secondary" >           
                                  10
                              </Typography>
                          </div>
                          <ReplyIcon sx={{color: 'gray', paddingLeft: '5px'}}/>
                          <Typography color="text.secondary" sx={{paddingRight: '15px'}}>
                              {this.state.replyData.length}                              
                          </Typography>
                        </CardActions>
                    </div>
                    <Typography variant="h5" component="div" sx={{mb: 2}}>                     
                        {this.props.title}
                          </Typography>
                    <Typography variant="body2" sx={{textAlign: 'left'}}>
                        {this.props.text}                        
                        <CodeBlock codeString={this.props.code} language={'html'}/>
                    </Typography>
                </CardContent>
            </Card>
            <Divider sx={{marginTop: '10px'}} />
            <Card>              
              <Typography sx={{ fontSize: 18,  textAlign: 'center', margin: '20px auto 0'}} color="text.secondary" gutterBottom>
                {this.state.replyData.length} answers
              </Typography>              
              { this.state.replyData.map(item => ( 
                <>
                  <Answer author={item.author} text={item.text} code={item.code} score={item.score} language={item.language} />
                  <Divider />
                </>
              ))}
            </Card>       
            <CreateReply />
        </div>
      )
    };
  }

}
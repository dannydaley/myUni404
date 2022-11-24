
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
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/default-highlight';
import CodeEditor from '../CodeEditor'

export default class CreateReply extends React.Component {
    constructor() {
        super();
        this.state={
            expanded: false
        }
    }

    expandAnswer = () => {
        this.setState({expanded: true})
        }
    retractAnswer = () => {
        this.setState({expanded: false})
        }

    input = 'This is the code input'
    render() {
        if (this.state.expanded){
            return(
            <div style={{margin: '10px 0'}}>            
                <Card sx={{ minWidth: 275, pb: 2 }}>        
                    <CardContent>        
                        <div src={this.props.posterProfilerPicture} style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                            <img style={{border: '1px solid gray', width: '60px', height: '60px', borderRadius: '50%'}}/>
                            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                {this.props.poster} 
                                Logged in name
                            </Typography>
                        </div>
                        <Typography variant="h5" component="div" sx={{mb: 2}}>                    
                            Answer this question
                        </Typography>        
                        <div>
                            <textarea spellcheck="true" style={{width: '90%', minHeight: '200px', fontSize: '18pt', padding: '10px', marginBottom: '10px', maxWidth: '90%'}} />                            
                            <Typography variant="h5" component="div" sx={{mb: 2}}>                    
                                Add some code to your answer
                            </Typography>
                            <CodeEditor />
                        </div>        
                    </CardContent>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '0 20px'}}>
                        <ArrowUpwardIcon style={{color: 'blue', cursor: 'pointer', alignSelf: 'flex-start' }}onClick={this.retractAnswer} />
                        <Button variant='contained' >Submit answer</Button>
                        <div style={{width: '30px'}}></div>
                    </div>                
                </Card>        
                <Divider sx={{marginTop: '10px'}} />        
            </div>
        )}  
        else {
            return(
                <div style={{margin: '10px 0'}}>            
                    <Card sx={{ minWidth: 275, pb: 2 }}>        
                        <CardContent>        
                            <div src={this.props.posterProfilerPicture} style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                                <img style={{border: '1px solid gray', width: '60px', height: '60px', borderRadius: '50%'}}/>
                                <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                    {this.props.poster} 
                                    Logged in name
                                </Typography>
                            </div>        
                        </CardContent>
                        <Button variant='contained' onClick={this.expandAnswer}>Answer this question</Button>        
                    </Card>        
                    <Divider sx={{marginTop: '10px'}} />        
                </div>
            )
        }
    }
}
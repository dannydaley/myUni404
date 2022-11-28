
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Divider } from '@mui/material';
import CodeEditor from './CodeEditor';


export default class AskQuestion extends React.Component {
    constructor() {
        super();
        this.state={            
        }
    }

    render() {
        return(
            <div style={{margin: '10px'}}>            
                <Card sx={{ minWidth: 275, pb: 2, margin: '0 auto'}}>
                    <form syle={{margin: '0 auto'}}>
                        <CardContent >                            
                            <div src={this.props.posterProfilerPicture} style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
                                <img src={this.props.userData.userProfilePicture} style={{border: '1px solid gray', width: '60px', height: '60px', borderRadius: '50%'}}/>
                                <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
                                    {this.props.userData.userFirstName} {this.props.userData.userLastName}
                                    
                                </Typography>
                            </div>
                            <Typography variant="h5" component="div" sx={{margin: '30px auto 10px', textAlign: 'center'}} >                    
                                Ask a question
                            </Typography>
                            <Typography variant="h7" component="div" sx={{mb: 2}}>                    
                                Try to include as much detail as possible
                            </Typography>            
                            <div style={{minHeight: '200px', margin: '0 auto',display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <textarea spellcheck="true" style={{width: '90%', minHeight: '200px', fontSize: '18pt', padding: '10px', margin: '0 auto 10px', maxWidth: '90%'}} />                            
                                <Typography variant="h5" component="div" sx={{mb: 2}}>                    
                                    Add any code relevant to your question
                                </Typography>
                                <CodeEditor />                            
                            </div>            
                        </CardContent>
                        <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: '50px'}}>
                            <div>
                                <h3>Category</h3>
                                <select>
                                    <option>Please Select</option>
                                    <option>Web</option>
                                    <option>Game Dev</option>
                                    <option>System/OS</option>
                                    <option>Robotics</option>
                                </select>
                            </div>  
                            <div>
                                <h3>Language</h3>
                                <select>
                                    <option>Please Select</option>
                                    <option>Javascript</option>
                                    <option>C#</option>
                                    <option>C++</option>
                                    <option>HTML</option>
                                </select>
                            </div>
                        </div>
                        <div style={{padding: '0 20px'}}> 
                            <Button variant='contained'>Submit Question</Button>            
                        </div>   
                    </form>             
                </Card>        
                <Divider sx={{marginTop: '10px'}} />        
            </div>
        )
    }
}
import { Divider } from "@mui/material";
import ProfileTop from "./ProfileTop";
import Button from '@mui/material/Button';
import React from "react";
import QuestionCard from '../Home/QuestionCard'


class Profile extends React.Component {
    constructor() {
        super()
        this.state = {
            feed: 'asked'
        }
    }
    switchAsked = () => this.setState({feed: 'asked'})
    switchAnswered = () => this.setState({feed: 'answered'})

    render() {
        return(
            <>
                <ProfileTop />
                <div style={{display: 'flex', justifyContent: 'space-between', width: '300px', margin: '50px auto' }}>
                    <Button variant="contained" sx={{width: '100px'}} onClick={this.switchAsked}>Asked</Button>
                    <Button variant="contained" sx={{width: '100px'}} onClick={this.switchAnswered}>Answered</Button>
                </div>
                <div>
                    {this.state.feed === 'asked' ? 
                            <div>
                                <QuestionCard />
                                <QuestionCard />
                                <QuestionCard />
                                <QuestionCard />
                            </div>
                        : 
                            <div>
                                <QuestionCard />
                            </div>
                    }                 
                </div>            
            </>
        )
    }

}

export default Profile;
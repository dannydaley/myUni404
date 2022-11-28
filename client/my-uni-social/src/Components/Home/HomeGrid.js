import Grid from '@mui/material/Grid'; // Grid version 1
import HomeLeft from './HomeLeft';
import { Outlet, Routes, Route } from 'react-router-dom';
import React from 'react';
import QuestionFeed from './QuestionFeed';
import FullQuestion from '../FullQuestion/FullQuestion';
import AskQuestion from '../AskQuestion';


class HomeGrid extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            route: 'feed',
            questionInfo: {
                title: '',
                author: '',
                text: '',
                code: ''
            }
        }
    }

    changeRoute = (route) => this.setState({ route: route })

    readyQuestion = (title, author, text, code, postID) => {        
        this.setState({ questionInfo: { title: title, author: author, text: text, code: code, postID: postID }})
        }

    render() {  
        console.log('from homegrid' + this.props.userData.userFirstName)       
        return(

            <Grid container spacing={3} sx={{backgroundColor: '#333', marginTop: '60px'}}>
                <Grid width={'225px'}>
                    <HomeLeft 
                        changeRoute={this.changeRoute}
                        userData={ this.props.userData } />
                </Grid>
                <Grid xs={6} sx={{margin: '0 auto'}}>
                    {/* <Routes>
                        <Route path="question"
                        element={
                            <FullQuestion
                            title={this.state.questionInfo.title}
                            author={this.state.questionInfo.author}
                            text={this.state.questionInfo.text}
                            code={this.state.questionInfo.code}
                            postID={this.state.questionInfo.postID}
                        />
                        }
                        />
                        
                    </Routes> */}
                    <h1>{this.props.loggedInEmail}</h1>
                    {this.state.route === 'feed' ?
                        <QuestionFeed
                        userData={ this.props.userData }
                            changeRoute={this.changeRoute}
                            readyQuestion={this.readyQuestion}
                        />
                    :
                        ''}
                    {this.state.route === 'question' ?
                        <FullQuestion
                            userData={ this.props.userData }
                            title={this.state.questionInfo.title}
                            author={this.state.questionInfo.author}
                            text={this.state.questionInfo.text}
                            code={this.state.questionInfo.code}
                            postID={this.state.questionInfo.postID}
                        />
                    :
                         ''}
                    {this.state.route === 'ask' ?
                        <AskQuestion 
                            userData={ this.props.userData }/>
                    :
                        ''}
                    {/* <Outlet {...props}/> */}
                </Grid>
                {/* <Grid xs>
                    <div>xs</div>
                </Grid> */}
            </Grid>
        )
    }

}

export default HomeGrid;
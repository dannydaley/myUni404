import React from "react";
import QuestionCard from "./QuestionCard";

class QuestionFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        feedData: [],
        passedFirstLoad: false
    }
  }
   feedData = ''
    //COMPONENT DID MOUNT IS BUILT IN AND RUNS WHEN THE COMPONENT MOUNTS
  componentDidMount = async () => {
    // this.setState({ settings: newSettings })   
    //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
    fetch('http://localhost:3001' + '/getQuestionFeed', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        feed: 'Web'
      })    
    })
    //TURN THE RESPONSE INTO A JSON OBJECT
    .then(response => response.json())
    // .then(await this.delayFunction())
    // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
    .then(data => {    
      this.setState({ feedData: data }); 
    })
  } 

  render () {
    return(
        <div style={{padding: '20px', margin: '0 auto'}}> 
        {this.state.feedData.map(item => (          
            <QuestionCard
              userData={ this.props.userData }
              readyQuestion={this.props.readyQuestion}
              changeRoute={this.props.changeRoute}
              posterProfilePicture={item.profilePicture}
              poster={item.author}
              title={item.title}
              question={item.text}
              code={item.code}
              postID={item.postID}
              language={item.language}
              number={item.score}
              replies={0}            
            /> 
                                               
        ))}        
    </div>
    )
}
}

export default QuestionFeed;
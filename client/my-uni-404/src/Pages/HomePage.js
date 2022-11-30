import HomeGrid from "../Components/Home/HomeGrid";
import React from "react";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    loggedInEmail = "";
    //COMPONENT DID MOUNT IS BUILT IN AND RUNS WHEN THE COMPONENT MOUNTS
    // componentDidMount = async () => {
    //     // this.setState({ settings: newSettings })
    //     //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
    //     fetch("http://localhost:3001" + "/getPosts", {
    //         method: "post",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({}),
    //     })
    //         //TURN THE RESPONSE INTO A JSON OBJECT
    //         .then((response) => response.json())
    //         .then(await this.delayFunction())
    //         // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
    //         .then((data) => {
    //             this.loggedInEmail = data.email;
    //             this.setState({
    //                 loggedInEmail: data.email,
    //             });
    //         });
    // };

    render() {
        return (
            <div>
                <HomeGrid
                    loggedInEmail={this.loggedInEmail}
                    userData={this.props.userData}
                    userID={this.props.userID}
                    userFirstName={this.props.userFirstName}
                    userLastName={this.props.userLastName}
                />
            </div>
        );
    }
}

export default HomePage;

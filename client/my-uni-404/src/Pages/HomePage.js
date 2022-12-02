import HomeGrid from "../Components/Home/HomeGrid";
import React from "react";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 0,
        };
    }

    changeKey = () => {
        alert("triggered");
        this.setState({ key: this.state.key + 1 });
    };
    loggedInEmail = "";

    render() {
        return (
            <div>
                <HomeGrid
                    updateProfilePicture={this.props.updateProfilePicture}
                    key={this.state.key}
                    changeKey={this.changeKey}
                    userProfilePicture={this.props.userProfilePicture}
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

import React from "react";

class ProfileTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            userID: 1,
            firstName: "",
            lastName: "",
            email: "",
            aboutMe: "",
            course: "",
            year: 0,
            profilePicture: "",
            asked: 0,
            answered: 0,
        };
    }

    componentDidMount = async () => {
        this.setState({ contentLoaded: false });
        // this.setState({ settings: newSettings })
        //FETCH IS A GET REQUEST BY DEFAULT, POINT IT TO THE ENDPOINT ON THE BACKEND
        fetch(process.env.REACT_APP_SERVER + "/getProfile", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userID: this.props.userID,
            }),
        })
            //TURN THE RESPONSE INTO A JSON OBJECT
            .then((response) => response.json())
            // .then(await this.delayFunction())
            // WHAT WE DO WITH THE DATA WE RECEIVE (data => console.log(data)) SHOULD SHOW WHAT WE GET
            .then((data) => {
                this.setState({
                    firstName: data.userData.firstName,
                    lastName: data.userData.lastName,
                    email: data.userData.email,
                    aboutMe: data.userData.aboutMe,
                    course: data.userData.course,
                    year: data.userData.year,
                    profilePicture: data.userData.profilePicture,
                    asked: data.userData.asked,
                    answered: data.userData.answered,
                });
                this.setState({ contentLoaded: true });
            });
    };

    render() {
        return (
            <div
                style={{
                    backgroundColor: "#292929",
                    width: "100%",
                    color: "whitesmoke",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        padding: "0 20px",
                        flexWrap: "wrap",
                    }}
                >
                    <img
                        alt="User profile-pic"
                        src={
                            process.env.REACT_APP_SERVER +
                            "/public/" +
                            this.state.profilePicture
                        }
                        style={{
                            minWidth: "120px",
                            height: "120px",
                            margin: "20px 50px 50px 0",
                            border: "1px solid gray",
                            borderRadius: "50%",
                        }}
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: "80%",
                            flexWrap: "wrap",
                            margin: "0 auto",
                        }}
                    >
                        <h2>
                            {this.state.firstName} {this.state.lastName}
                        </h2>
                        <div
                            style={{
                                marginTop: "70px",
                                minWidth: "200px",
                                maxWidth: "65%",
                                textAlign: "left",
                            }}
                        >
                            <h3>{this.state.aboutMe}</h3>
                        </div>
                        <div>
                            <h3>{this.state.course}</h3>
                            <h3>year: {this.state.year}</h3>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            margin: "0 auto",
                        }}
                    >
                        <h5 style={{ padding: "0 10px" }}>
                            questions asked: {this.state.asked}
                        </h5>
                        <h5 style={{ padding: "0 10px" }}>
                            questions answered: {this.state.answered}
                        </h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileTop;

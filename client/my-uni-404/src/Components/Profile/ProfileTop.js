const ProfileTop = () => {
    return (
        <div
            style={{
                backgroundColor: "#292929",
                width: "100%",
                color: "whitesmoke",
            }}
        >
            <div
                style={{ display: "flex", padding: "0 20px", flexWrap: "wrap" }}
            >
                <img
                    alt="User profile-pic"
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
                    <h2>name</h2>
                    <div
                        style={{
                            marginTop: "70px",
                            minWidth: "200px",
                            maxWidth: "65%",
                            textAlign: "left",
                        }}
                    >
                        <h3>
                            This is my profile about me text, This is my profile
                            about me text, This is my profile about me text,
                            This is my profile about me text
                        </h3>
                    </div>
                    <div>
                        <h3>Web Development</h3>
                        <h3>year: 3</h3>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        margin: "0 auto",
                    }}
                >
                    <h5 style={{ padding: "0 10px" }}>questions asked: 3</h5>
                    <h5 style={{ padding: "0 10px" }}>questions answered: 3</h5>
                </div>
            </div>
        </div>
    );
};

export default ProfileTop;

import { Button } from "@mui/material";
const AccountSettings = () => {
    return(
        <div style={{backgroundColor: '#292929', width: '100%', color: 'whitesmoke'}}>
            <div style={{display: 'flex', padding: '50px 20px 0', flexWrap: 'wrap'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <img style={{minWidth: '120px', height: '120px', margin: '0px 50px 10px 0', border: '1px solid gray', borderRadius: '50%'}} /> 
                    <h6 style={{margin: '0 50px 0 0'}}>Change profile picture</h6>
                </div>

                <div style={{display: 'flex',justifyContent: 'space-between', width: '80%', flexWrap: 'wrap', margin: '0 auto'}}>
                    <h2>name</h2>
                    <div style={{marginTop: '70px', minWidth: '200px', width: '60%', textAlign: 'left'}}>
                    <textarea 
                        spellcheck="true"
                         style={{width: '90%', minHeight: '100px', fontSize: '18pt', padding: '10px', margin: '110px 0 10px', maxWidth: '90%'}}
                         placeholder="About me text goes here" />
                         <Button variant="contained" style={{marginLeft: 'auto'}}>Submit changes</Button>
                    </div>
                    <div>
                        <h3>Web Development</h3>  
                        <h3>year: 3</h3>
                    </div>                    
                </div>    
                        
                <div style={{display: 'flex', flexWrap: 'wrap', margin: '0 auto'}}>
                    <h5 style={{padding: '0 10px'}}>questions asked: 3</h5>
                    <h5 style={{padding: '0 10px'}}>questions answered: 3</h5>
                </div>            
            </div>  
        </div>
    )
}

export default AccountSettings;
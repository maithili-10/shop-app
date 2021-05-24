
import axios from "axios";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Column from "../components/Column";
import Container from "../components/Container";
import ImageWithFallback from "../components/ImageWithFallback";
import ProfileUpload from "../components/ProfileUpload";
import Row from "../components/Row";
import StorageService from "../services/StorageService";
import UserService from "../services/UserService";
type Props = { uploadClick: () => void};
type State = {
  userDetails: any;
  address: any;
  delAddress: any;
  profileImage: any;
  hide:boolean;
  
};
class Profile extends React.Component<Props, State> {
  state: State = { userDetails: [], address:[], delAddress:[],
    profileImage: "",hide:true };
  
  async componentDidMount() {
    try {
      const { data } = await UserService.profile();
      this.setState( {
        userDetails: data,
        address: data.address,
         profileImage: data.profileImage
        
     })
      
    } catch (e) {
      console.log(e);
    }
  } 
  
  async getData () {
    const { data } = await UserService.profile();
    this.setState( {
      address: data.address,
      profileImage: data.profileImage
    })
  }


  getImage =()=>{
    axios.get(`http://localhost:5000/auth/profileImage/${this.state.profileImage}` )
            .then((response) =>
                this.setState({
                    profileImage: response.request.responseURL,
                })
            );
    };
  

  
  iconClicked = () => {
    this.setState({
        hide: false,
    });
};
  render () {
    console.log( this.state.address )
    console.log(this.state.userDetails);
    const RemAddress = async ( e: any ) => {
      let RemAddressId = e.target.value;

      const token = await StorageService.getData("token");
      try {
        await axios.delete(` http://localhost:5000/address/${RemAddressId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.getData();
        console.log("data deleted");
      } catch (err) {
        return console.log(err);
      }
    }
    return (
      <Container>
        <Row>
       <Column size={4} classes={"offset-3 fw-bold bg-light fs-3"}>
            
        <div className="card">
            <div className="card-body">
            <ImageWithFallback
                  source="https://th.bing.com/th/id/OIP.7tlP1ph61ompULJdycVJlQHaHa?pid=ImgDet&rs=1"
                  classes="w-30 h-30"
             />
            </div>
              
            <div className="card-footer">
                
                 Name - {this.state.userDetails.userName}<br/>
                
                Email -{this.state.userDetails.userEmail}<br/>
             
               </div>
               
            </div>
         
      
              </Column>
              
          <Column size={4}>

            <div className="card">
              <div className="card-header">
                <h3> Address</h3>
                </div>
                <div className="card-body">
               
          
                {this.state.address.map((address: any) => (
                  <li className="list-group-item">
                    {" "}
                    Address :<br/>
                    
                      {address.line1} ,<br/>{address.line2},<br/> {address.city},{" "}<br/>
                      {address.state} ,<br/>{address.pincode}.
                   
                    <button
                      type="button"
                      className="btn btn-danger btn-sm ms-5 float-end"
                      value={address.id}
                      onClick={RemAddress}
                    >
                      Remove
                    </button>
                  </li>
                ))}
                    
                </div>
              
            </div>
            </Column>
         
            <Column size={12}>
          
             
          <Link className="btn btn-sm btn-primary mx-auto mt-3" to={"/cart"}>
                My Cart
                </Link>
        
      </Column>
            
          
        </Row>
        <Column size={12}>
          
             
              <Link className="btn btn-sm btn-primary mx-auto mt-3" to={"/address"}>
                      Add Address
                    </Link>
            
          </Column>
          <Column size={12}>
                        <div className="container user text-center">
                            <div className="profileImage" id="profileImage">
                                <img
                                    src={this.state.profileImage}
                                    alt="Profile Image"
                                    className="img-thumbnail"
                                    width="250px"
                                />

                                <i
                                    className="fa fa-upload text-primary"
                                    onClick={this.iconClicked}
                                ></i>
                                {this.state.hide ? null : (
                                    <ProfileUpload
                                     getData={this.getData} />
                                )}
                            </div>
                            <h3>{this.state.userDetails.userName}</h3>
                            <h4>{this.state.userDetails.userEmail}</h4>
                        </div>
                    </Column>
      </Container>
    );
  }
}


export default Profile;
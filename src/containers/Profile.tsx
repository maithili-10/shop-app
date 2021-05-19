
import axios from "axios";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Column from "../components/Column";
import Container from "../components/Container";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";
import StorageService from "../services/StorageService";
import UserService from "../services/UserService";
type Props = {};
type State = {
  userDetails: any;
  address: any;
  delAddress: any;
  
};
class Profile extends React.Component<Props, State> {
  state: State = { userDetails: [], address:[], delAddress:[] };
  
  async componentDidMount() {
    try {
      const { data } = await UserService.profile();
      this.setState( {
        userDetails: data,
        address: data.address,
     })
      
    } catch (e) {
      console.log(e);
    }
  } async getData () {
    const { data } = await UserService.profile();
    this.setState( {
      address: data.address
    })
  }
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
      </Container>
    );
  }
}


export default Profile;
import { profile, timeStamp } from "console";
import React from "react";
import Column from "../components/Column";
import Container from "../components/Container";
import ImageWithFallback from "../components/ImageWithFallback";
import Row from "../components/Row";
import UserService from "../services/UserService";
type Props = {};
type State = {
 userDetails:any
};

class Profile extends React.Component<Props, State> {
  state: State = { userDetails: [] };
  async componentDidMount() {
    try {
      const { data } = await UserService.profile();
      this.setState({
        userDetails:data
      })
      //console.log("success",data);
    } catch (e) {
      console.log(e.response.data);
    }
  }
  render() {
    return (
      <Container>
        <Row>
          <Column  size={4}></Column>
          <Column size={4}>
          <div className="card text-center">
          <div className="card-header bg-secondary">
          <h2 className=" text-light">User Profile</h2>
            </div>
            <div className="card-body">
              <ImageWithFallback  source="https://webstockreview.net/images/profile-icon-png.png" classes={"w-50 h-50 text-center"}></ImageWithFallback>
            </div>
            <div className="card-footer text-center">
            
             <h5 className="mt-4">
              Name-
              <>{this.state.userDetails.userName}</>
            </h5>
            <h5 className="mt-3">
              Email-Id-
              <>{this.state.userDetails.userEmail}</>
            </h5>
            <h5 className="mt-3">
            DOC-
              <>{this.state.userDetails.createdAt}</>
            </h5>{" "}

            </div>
          </div>
          </Column>
          <Column  size={4}></Column>
          
        </Row>
      </Container>
    );
  }
}
export default Profile;



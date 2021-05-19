import axios from "axios";
import React,{Component} from "react";
import { Redirect } from "react-router-dom";
import Column from "../components/Column";
import Container from "../components/Container";
import Row from "../components/Row";



type State={
    email: any;
    name: any;
    password: any;
    cpassword: any;
    redirect: boolean;
}
 class Register extends Component{
    state: State = {
        email: "",
        name: "",
        password: "",
        cpassword: "",
        redirect: false,
    };

    submit = (e: any) => {
        e.preventDefault();
    
        if (this.state.cpassword === this.state.password) {
          const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
          };
          axios
            .post("http://localhost:5000/auth/register", user)
            .then((response) => console.log(response.status === 201));
          this.setState({ redirect: true });
        }
      };

    redirect = () => {
        if (this.state.redirect) {
            return <Redirect to="/login" />;
        }
    };

    onChange =(obj:any) =>{
        this.setState({
           [ obj.target.name]:obj.target.value,
           
        });
    }
     
  render(){
      return(
      <Container>
          {this.redirect()}
         
          <Row>
          <Column size={4}></Column>
              <Column size={4}>
              
               <form onSubmit={this.submit}>
               <h3 className="text-center text-danger">Register</h3><br/><br/>
                   <div className="form-group input-group" >
                       
                           <span className="input-group-text">
                               <i className="fa fa-user fa-lg text-info"></i>
                           </span>
                      
                       <input type="text" className="form-control" placeholder="Enter your name" name="name" value={this.state.name} onChange={this.onChange}/>
                   </div><br/><br/>
                   <div className="form-group input-group" >
                       
                           <span className="input-group-text">
                               <i className="fa fa-envelope fa-lg text-info"></i>
                           </span>
                      
                       <input type="email" className="form-control" placeholder="Enter Email id" name="email"
                                            value={this.state.email}
                                            onChange={this.onChange}/>
                   </div><br/><br/>
                   <div className="form-group input-group" >
                       
                           <span className="input-group-text">
                               <i className="fa fa-lock fa-lg text-info"></i>
                           </span>
                       
                       <input type="password" className="form-control" placeholder="Type Password" name="password"
                                            value={this.state.password}
                                            onChange={this.onChange}/>
                   </div><br/><br/>
                   <div className="form-group input-group" >
                      
                           <span className="input-group-text">
                               <i className="fa fa-lock fa-lg text-info"></i>
                           </span>
                       
                       <input type="password" className="form-control" placeholder="Re-Type password" name="cpassword"
                                            value={this.state.cpassword}
                                    id="message"        onChange={this.onChange}/>

                        {this.state.cpassword ===this.state.password ? null : (
                                            <p style={{"color":'red'}}>* Password Error!</p>
                                        )}
                   </div><br/><br/>

                   <div className="form-group" >
                      
                   <button type="submit" className="btn btn-primary btn-lg w-90">
                Register
              </button> 
                  </div><br/><br/>
               </form>
              
                   
               </Column>
               <Column size={4}></Column>
              
            </Row>
           
      </Container>
      
      )
  }
 }
 export default Register;
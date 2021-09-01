import React, { Component } from "react";

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.logInNow = this.logInNow.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  logInNow() {
    const { email, password } = this.state;
    let storedUserInfo = JSON.parse(localStorage.getItem("userInfo"));
    let errMsg = 0;

    if (email === '' || password === ''){
      alert("Please Enter all fields!");
      return;
    }
    
    for (let i = 0; i < storedUserInfo.length; i++) {
      // console.log(`${i}-->`);
      if (email === storedUserInfo[i].email && password === storedUserInfo[i].password) {
        sessionStorage.setItem("userInfo", JSON.stringify(storedUserInfo[i]));
        this.props.changeUserState();
        // alert(storedUserInfo[i].email)
        errMsg = 0;
        break;
      } else {
        errMsg = 1;
      }
    }

    if(errMsg == 1)
      alert("User is Invalid. Please Enter correct details!");
  }

  onKeyUp(event){
    if (event.charCode === 13){
      this.logInNow();
    }
  }

  render() {
    return (
      <div>
        <h1 className="text-center stylized">
          Welcome to the Exam Portal
        </h1>
        <div className="row">
          <div className="fields-center">
            <label htmlFor="email" className="mt-5 text-white">
              Email:
            </label>
            <input
              type="email"
              name="email"
              onChange={e =>
                this.setState({
                  email: e.target.value
                })
              }
              className="form-control"
              autoComplete="true"
              autoFocus={true}
              placeholder="email"
            />
          {/* </div>
          <div className="col-md-6"> */}
            <label htmlFor="password" className="mt-3 text-white">
              Password:
            </label>
            <input
              type="password"
              onChange={e =>
                this.setState({
                  password: e.target.value
                })
              }
              onKeyPress={this.onKeyUp}
              className="form-control"
              placeholder="password"
            />
          </div>
        </div>
        <br/>
        <div className="row justify-content-center">
            <button className="btn btn-success" onClick={this.logInNow}>
              Sign In <i className="fa fa-sign-in-alt" />
            </button>
        </div>
      </div>
    );
  }
}

export default LogIn;

// onKeyUp(event) {

//   if (event.charCode === 13) {

//     this.setState({ inputValue: event.target.value });

//   }

// }

{/* <InputGroup>

<FormControl placeholder="First name" onKeyPress={this.onKeyUp} />

</InputGroup> */}
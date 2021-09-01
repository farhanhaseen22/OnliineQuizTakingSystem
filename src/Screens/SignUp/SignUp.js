import React, { Component } from "react";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "wer@s.com",
      password: "123"
    };
    this.signUpNow = this.signUpNow.bind(this);
  }

  signUpNow() {
    let { toggleToSignIn } = this.props;
    const { username, email, password } = this.state;
    if (!email.match(/\S+@\S+\.\S+/)) {
      alert("please enter correct email");
    // } else if (!password.match(/(?=.*\d)(?=.*[a-z]).{3,}/)) {
    } else if (!password.match(/(?=.*\d).{3,}/)) {
      alert(
        "Please enter at least 3 characters which contains at least one character and one number"
      );
    } else {
      let storedUsers = JSON.parse(localStorage.getItem('userInfo'));
      let signUpObj = { username, email, password };
      
      if(storedUsers==null){
        // console.log(signUpObj, "**signUpObj**");
        // let s1 = {1:signUpObj};
        let s1 = [];
        s1.push(signUpObj);
        console.log(s1, "**s1**");
        localStorage.setItem("userInfo", JSON.stringify(s1));
        toggleToSignIn(false);  
      }
      else{
        let phase=0;
        storedUsers.every(obj => {
          if(obj.username==username){
            phase=1;
            return false;
          }
        });
        if(phase==0){
          console.log('Milnei')
          storedUsers.push(signUpObj);
          localStorage.setItem("userInfo", JSON.stringify(storedUsers));
          toggleToSignIn(false);
        }
        else{
          alert('Please give a different username!')
        }
      }

      // console.log("T U: ", Object.keys(storedUsers).length);
      // console.log("Tot Users: ", storedUsers);
      // console.log("Tot Users: ", storedUsers.length);
      // console.log("Tot Users: ", typeof(storedUsers));

      // let newObj = Object.assign(storedUsers, signUpObj);
      // console.log(newObj, "**newObj**");

      // localStorage.setItem("userInfo", JSON.stringify(newObj));
    }
  }

  render() {
    // const {  } = this.props;
    return (
      <div>
        <h1 className="text-center stylized">Registration</h1>
        <p className="text-center text-white">
          Please fill up the fields below to register an account!
        </p>
        <br />
        <div className="row">
          <div className="fields-center">
            <label className="text-white" htmlFor="name">Username:</label>
            <input
              type="text"
              name="name"
              onChange={e => {
                this.setState({ username: e.target.value });
              }}
              autoFocus={true}
              className="form-control"
              placeholder="Enter your name"
            />
          {/* </div>
          <div className="col-md-4"> */}
            <label className="mt-2 text-white" htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
              className="form-control"
              placeholder="Enter your email"
            />
          {/* </div>
          <div className="col-md-4"> */}
            <label className="mt-2 text-white" htmlFor="password">password:</label>
            <input
              type="password"
              name="password"
              onChange={e => {
                this.setState({ password: e.target.value });
              }}
              maxLength="8"
              className="form-control"
              placeholder="Enter your password"
            />
          </div>
        </div>
        <br/>
        <div className="row justify-content-center">
            <button className="btn btn-primary" onClick={this.signUpNow}>
              Register <i className="ml-1 fas fa-user-astronaut" />
            </button>
        </div>
      </div>
    );
  }
}

export default SignUp;

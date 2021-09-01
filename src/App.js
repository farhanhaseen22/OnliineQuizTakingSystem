import React, { Component } from "react";
import "./App.css";
import SignUp from "./Screens/SignUp/SignUp";
import LogIn from "./Screens/LogIn/LogIn";
import QuizList from "./Screens/QuizList/QuizList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isUser: false,
      authForms: true,
      userInfo: null
    };
    this.checkUser = this.checkUser.bind(this);
    this.toggleAuthForms = this.toggleAuthForms.bind(this);
    this.changeUserState = this.changeUserState.bind(this);
    this.logout = this.logout.bind(this);
  }

  checkUser() {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    if (!userInfo) {
      console.log("user is NOT logged in");
      this.setState({ isUser: false });
    } else {
      this.setState({ isUser: true });
      this.state.userInfo = userInfo;
      // console.log('UserInfo:');
      // console.log(this.state.userInfo);
      console.log(`${userInfo.username} is logged IN`);
    }
  }

  changeUserState() {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    this.state.userInfo = userInfo;
    this.setState({ isUser: true });
  }

  toggleAuthForms(Show_Hide) {
    this.setState({ authForms: Show_Hide });
  }

  logout() {
    this.setState({ isUser: false });
    sessionStorage.removeItem("userInfo");
  }

  componentDidMount() {
    this.checkUser();
  }

  render() {
    const { isUser, authForms, userInfo } = this.state;
    return (
      <div className="container mt-3">
        {!isUser ? (
          authForms ? (
            <div>
              <SignUp toggleToSignIn={this.toggleAuthForms} />
              <br/>
              <div className="row justify-content-center">
                <label className="txtB4Login">Already have an account? Then</label>

                <button
                  className="btn btn-success"
                  onClick={this.toggleAuthForms.bind(this, false)}
                >
                  Log In <i className="fas fa-sign-in-alt" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <LogIn changeUserState={this.changeUserState} />
              <br/>
              <div className="row justify-content-center">
                <label className="txtB4Login">Don't have an account? Then</label>

                <button
                  className="btn btn-primary"
                  onClick={this.toggleAuthForms.bind(this, true)}
                >
                  Sign Up <i className="fa fa-user-plus" />
                </button>
              </div>
            </div>
          )
        ) : (
          <div>
            <div className="row dash-header">
              <h3 className="stylized2">Welcome, {userInfo ? userInfo.username : ''}</h3>
              <button className="btn btn-danger Logout fa fa-sign-out-alt" onClick={this.logout}></button>
              {/* <i className=""></i> */}
            </div>
            <br />
            <QuizList currUsername={userInfo.username} />
          </div>
        )}
      </div>
    );
  }
}

export default App;

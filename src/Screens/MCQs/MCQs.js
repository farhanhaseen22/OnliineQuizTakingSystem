import React, { Component } from "react";

class MCQs extends Component {
  static defaultProps = {
    currentQuesObj: {},
    currentTestIndex: 0
  };
  constructor(props) {
    super(props);
    const { currentQuesObj, currentTestIndex } = this.props;
    this.state = {
      question: currentQuesObj.tests[currentTestIndex].quiz_questions[0].quiz,
      opt1: currentQuesObj.tests[currentTestIndex].quiz_questions[0].option1,
      opt2: currentQuesObj.tests[currentTestIndex].quiz_questions[0].option2,
      opt3: currentQuesObj.tests[currentTestIndex].quiz_questions[0].option3,
      opt4: currentQuesObj.tests[currentTestIndex].quiz_questions[0].option4,
      i: 0,
      correct: 0,
      score: 0,
      min: null,
      sec: null
    };
    this.minute = Math.ceil(currentQuesObj.tests[currentTestIndex].time / 60);
    this.second = 1;
    this.timeStart = null;
    this.next = this.next.bind(this);
    this.timer = this.timer.bind(this);
  }

  next() {
    const { currentQuesObj, currentTestIndex, currUsername } = this.props;
    var { i, correct, score } = this.state;

    // console.log('questions ', newObj);
    // console.log("value currUsername");
    // console.log(currUsername);
    // Example:          html.test1.quiz_questions
    var quiz_questions = currentQuesObj.tests[currentTestIndex].quiz_questions;

    var radioBtn = document.querySelector("input[name='option']:checked");
    if (radioBtn == null) {
      alert("Select an Option!");
    } else {
      // Check if answer is correct
      if (quiz_questions[i].answer.match(radioBtn.value)) {
        console.log("quiz_questions[i].answer**", quiz_questions[i].answer);
        this.setState({ correct: ++correct });
      }

      // Check if the quiz is over
      if (quiz_questions.length - 1 === i) {
        // console.log(quiz_questions.length);
        clearInterval(this.timeStart);
        score = correct * (100 / quiz_questions.length).toFixed(2);
        this.setState({ score });

        // perfList
        const { quizName } = currentQuesObj;
        const { name, questions, time, pic } = currentQuesObj.tests[currentTestIndex];
        
        let newObj = { username: currUsername, score, quizName, testName: name, questions, time, pic };
        let storedPerfList = JSON.parse(localStorage.getItem('perfList'));
        
        if(storedPerfList==null){
          let s1 = [];
          s1.push(newObj);
          localStorage.setItem("perfList", JSON.stringify(s1));
        }
        else{
          let store = storedPerfList.filter(perfRecord => {
            if(
              perfRecord.username==newObj.username &&
              perfRecord.quizName==newObj.quizName &&
              perfRecord.testName==newObj.testName
            ){
              return false;
            }
            return true;
          });
          store.push(newObj);
          localStorage.setItem("perfList", JSON.stringify(store));
          // console.log(store)
          // console.log('Milnaaaaaaaaaaaaaaaa')
          // if(phase==0){
          //   console.log('Milnei')
          //   storedPerfList.push(signUpObj);
          //   localStorage.setItem("perfList", JSON.stringify(storedPerfList));
          // }
          // else{
          //   alert('Please give a different username!')
          // }
        }

        document.getElementById("quizContainer").style.display = "none";
        document.getElementById("resultContainer").style.display = "block";
      } else {
        // Move to the next question after selection

        // document.querySelector("input[name='option']:checked").checked = false;
        i++;
        const question = quiz_questions[i].quiz;
        const option1 = quiz_questions[i].option1;
        const option2 = quiz_questions[i].option2;
        const option3 = quiz_questions[i].option3;
        const option4 = quiz_questions[i].option4;
        const answer = quiz_questions[i].answer;
        this.setState({
          question,
          opt1: option1,
          opt2: option2,
          opt3: option3,
          opt4: option4,
          i: i
        });
      }
    }
  }

  componentDidMount() {
    this.timer();
  }

  timer() {
    this.timeStart = setInterval(() => {
      this.setState({
        min: this.minute,
        sec: this.second
      });
      this.second--;
      if (this.second === 0) {
        this.second = 60;
        this.minute--;
        this.setState({
          sec: this.second,
          min: this.minute
        });
        if (this.minute < 0) {
          clearInterval(this.timeStart);
          this.setState({
            min: 0,
            sec: 0
          });
          
          const { currentQuesObj, currentTestIndex, currUsername } = this.props;
          const { quizName } = currentQuesObj;
          const { name, questions, time, pic } = currentQuesObj.tests[currentTestIndex];
          let quiz_questions = currentQuesObj.tests[currentTestIndex].quiz_questions;
          
          let { score, correct } = this.state;
          score = correct * (100 / quiz_questions.length).toFixed(2);
          this.setState({ score });
          
          let newObj = { username: currUsername, score, quizName, testName: name, questions, time, pic };
          let storedPerfList = JSON.parse(localStorage.getItem('perfList'));
          
          if(storedPerfList==null){
            let s1 = [];
            s1.push(newObj);
            localStorage.setItem("perfList", JSON.stringify(s1));
          }
          else{
            let store = storedPerfList.filter(perfRecord => {
              if(
                perfRecord.username==newObj.username &&
                perfRecord.quizName==newObj.quizName &&
                perfRecord.testName==newObj.testName
              ){
                return false;
              }
              return true;
            });
            store.push(newObj);
            localStorage.setItem("perfList", JSON.stringify(store));
          }

          document.getElementById("quizContainer").style.display = "none";
          document.getElementById("resultContainer").style.display = "block";
        }
      }
    }, 1000);
  }

  render() {
    const { question, opt1, opt2, opt3, opt4, score, min, sec } = this.state;
    const { currentQuesObj, currentTestIndex } = this.props;
    return (
      <div>
        <div className="col-md-12">
          <div className="col" id="content">
            <div id="quizContainer">
              <div className="modal-header">
                <h5>
                  <i className="fa fa-question-circle" />
                  <span> </span>
                  <span className="label label-warning">{question}</span>
                </h5>
                <h5>
                  {min} : {sec}
                </h5>
              </div>
              <div className="modal-body">
                <div className="quiz" id="quiz" data-toggle="buttons">
                  <label className="btn btn-lg btn-info btn-block">
                    <span className="btn-label">
                      <input type="radio" name="option" value="1" />
                      <br />
                      <i className="fa fa-arrow-right" />
                    </span>
                    <span>{opt1}</span>
                  </label>
                  <label className="btn btn-lg btn-info btn-block">
                    <span className="btn-label">
                      <input type="radio" name="option" value="2" />
                      <br />
                      <i className="fa fa-arrow-right" />
                    </span>
                    <span>{opt2}</span>
                  </label>
                  <label className="btn btn-lg btn-info btn-block">
                    <span className="btn-label">
                      <input type="radio" name="option" value="3" />
                      <br />
                      <i className="fa fa-arrow-right" />
                    </span>
                    <span>{opt3}</span>
                  </label>
                  <label className="btn btn-lg btn-info btn-block">
                    <span className="btn-label">
                      <input type="radio" name="option" value="4" />
                      <br />
                      <i className="fa fa-arrow-right" />
                    </span>
                    <span>{opt4}</span>
                  </label>
                  <button
                    className="btn btn-success pull-right"
                    onClick={this.next.bind(this)}
                  >
                    Next Question <i className="fa fa-angle-double-right" />
                  </button>

                  <br />
                  <br />
                </div>
              </div>
            </div>
            {/* result */}
            <div id="resultContainer" style={{ display: "none" }}>
              <div className="modal-header">
              <h2>{currentQuesObj.quizName} Quiz</h2>
                  <button
                    className="btn btn-secondary pull-right"
                    onClick={() => {
                      this.props.backToDashboard(false);
                    }}
                  >
                    Go Back To Dashboard <i className="fa fa-undo" />
                  </button>
                </div>
                <div className="modal-body">
                  <h3>{currentQuesObj.tests[currentTestIndex].name}</h3>
                  <p>
                    Time:
                    {currentQuesObj.tests[currentTestIndex].time / 60} Minute(s)
                  </p>
                  <p>Questions: {currentQuesObj.tests[currentTestIndex].questions}</p>
                  {score < 70 ? (
                    <h3>You have failed. Your score percentile: {score}%</h3>
                  ) : (
                    <h3>You have passed. Your score percentile: {score}%</h3>
                  )}
                  <hr />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MCQs;

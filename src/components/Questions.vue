<template>
  <div id="addQuestionContainer" class="questions page">
    <div id="addQuestions">
      <h2>Add a question</h2>
      <form @submit.prevent="addQuestion">
        <input
          type="text"
          class="questiontext"
          placeholder="The question"
          v-model="question.text"
          v-validate="'min:10'"
          name="questiontext"
        >
        <transition name="alert-in">
          <div class="alert" v-if="errors.has('questiontext')">
            <p>
              <strong>TIP</strong>: The question text should be longer than 10 characters
            </p>
          </div>
        </transition>
        <input
          type="text"
          class="questionanswer"
          placeholder="Correct: first answer"
          v-model="question.rightAnswer"
          v-validate="'min:1'"
          name="questionanswer1"
        >
        <input
          type="text"
          class="questionanswer"
          placeholder="Wrong: second answer"
          v-model="question.answers[1]"
          v-validate="'min:1'"
          name="questionanswer2"
        >
        <input
          type="text"
          class="questionanswer"
          placeholder="Wrong: third answer"
          v-model="question.answers[2]"
          v-validate="'min:1'"
          name="questionanswer3"
        >
        <div class="submitbutton">
          <input type="submit" value="Add question">
        </div>
      </form>

      <div>
        <h2 v-if="questions.length == 0">There are no questions.</h2>
        <h2 v-if="questions.length > 0">These are all the existing questions.</h2>
        <hr>
        <ul class="questions">
          <transition-group
            name="list"
            enter-active-class="animated bounceInUp"
            leave-active-class="animated bounceOutDown"
          >
            <li v-for="(data, index) in filteredQuestions" :key="index+0">
              <div class="existingQuestion">
                <h5>{{data.text}}</h5>
              </div>
            </li>
          </transition-group>
        </ul>
      </div>
    </div>
    <div id="mobileView">
      <div class="marvel-device iphone8 black">
        <div class="top-bar"></div>
        <div class="sleep"></div>
        <div class="volume"></div>
        <div class="camera"></div>
        <div class="sensor"></div>
        <div class="speaker"></div>
        <div class="screen">
          <div class="tophalf">
            <h2 class="appQuestionNr">Vraag 7</h2>
            <p
              class="appQuestion"
            >{{question.text == ""? "Hoe hoog mag een voertuig maximum zijn?": question.text}}</p>
          </div>
          <div class="bottomhalf">
            <div class="chronoContainer">
              <p class="appChrono">12</p>
            </div>
            <p class="appInstruction">Antwoorden</p>
            <div class="scrollableAnswer">
              <p class="appAnswer">{{question.rightAnswer == ""? "3 meter": question.rightAnswer}}</p>
              <p class="appAnswer">{{question.answers[1] == ""? "2 meter": question.answers[1]}}</p>
              <p class="appAnswer">{{question.answers[2] == ""? "4 meter": question.answers[2]}}</p>
            </div>
            <p class="nextButton">Volgende</p>
          </div>
        </div>
        <div class="home"></div>
        <div class="bottom-bar"></div>
      </div>
      <p>Model of the iPhone:
        <br>Copyright (c) 2014 Marvelapp
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Questions",
  data() {
    return {
      question: {
        text: "",
        answers: ["", "", ""],
        rightAnswer: ""
      },
      questions: []
    };
  },
  computed: {
    filteredQuestions() {
      let questions = this.questions;
      if (this.question.text != "") {
        questions = questions.filter(q => {
          return q.text.indexOf(this.question.text) !== -1;
        });
      }
      return questions;
    }
  },
  methods: {
    addQuestion() {
      this.$validator.validateAll().then(result => {
        if (result) {
          //add the correct answer to the answers array as well
          this.question.answers[0] = this.question.rightAnswer;

          fetch("https://rijquiz-backend.herokuapp.com/api/question",{
            body: JSON.stringify(this.question),
            method: "POST",
            headers: {
              "Content-Type":"application/json",
            }
          })          

          this.questions.push({ question: this.question },0);
          this.question = {
            text: "",
            answers: ["", "", ""],
            rightAnswer: ""
          };
        }
      });
    }
  },
  created: function() {
    fetch("https://rijquiz-backend.herokuapp.com/api/questions")
      .then(res => res.json())
      .then(data => {
        this.questions = data;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
@import "../assets/css/devices.min.css";

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  font-size: 1.3em;
  background-color: #e0edf4;
  border-left: 5px solid #3eb3f6;
  margin-bottom: 2px;
  color: #3e5252;
}
.container {
  box-shadow: 0px 0px 40px lightgray;
}
a {
  color: #42b983;
}
p {
  text-align: center;
  padding: 10px 0;
  color: gray;
}
.alert {
  display: inline-block;
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;
  border-color: #42b983;
  border-left: 10px solid #42b983;
  margin: 10px;
}
.alert-in-enter-active {
  animation: slide-down 0.4s ease;
}
.alert-in-leave-active {
  animation: slide-down 0.4s reverse ease;
}

.questions {
  text-align: left;
}
input {
  border: 0;
  padding: 20px;
  border: 1px solid #323333;
  background-color: #eeeeee;
  transition: 0.4s;
  border-radius: 4px;
  margin-bottom: 5px;
}
textarea:focus,
input:focus {
  outline: none;
}

input.questiontext {
  width: calc(100% - 40px);
  font-size: 1.3em;
  color: #178656;
}

input:invalid {
  border-left: 5px solid red !important;
}
input.questionanswer {
  width: calc(100% - 60px);
  font-size: 1.1em;
  color: #3e6791;
  position: relative;
  left: 20px;
}
textarea.questiontext:focus,
input.questiontext:focus {
  border: 1px solid #178656;
  margin-top: 10px;
  margin-bottom: 10px;
}
textarea.questionanswer:focus,
input.questionanswer:focus {
  border: 1px solid #3e6791;
  margin-top: 10px;
  margin-bottom: 10px;
}
input[type|="submit"] {
  background: #3ab981;
  color: white;
  border: none;
  border-radius: 4px;
  -webkit-box-shadow: 3px 4px 15px -6px rgba(42, 46, 43, 0.77);
  box-shadow: 3px 4px 15px -6px rgba(42, 46, 43, 0.77);
  border-bottom: 0px;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  cursor: pointer;
  margin: 10px 0px;
  width: 30%;
  display: inline-block;
  padding: 10px;
  font-size: 1.1em;
  min-width: 120px;
}
input[type|="submit"]:hover {
  background: #178656;
}
div.submitbutton {
  text-align: right;
}
#addQuestions {
  width: 35%;
  float: left;
  margin-left: 10%;
  margin-right: 10%;
}
#mobileView {
  width: 35%;
  float: left;
}
#addQuestionContainer {
  width: 100%;
  overflow: hidden; /* add this to contain floated children */
}
.tophalf {
  height: 40%;
}
.appQuestionNr {
  text-align: left;
  padding: 10px;
  font-size: 1.8em;
}
.appQuestion {
  text-align: left;
  padding: 10px;
  font-size: 1.3em;
}
.appChrono {
  background: url("../assets/img/chrono.png");
  background-size: cover;
  width: 60px;
  height: 60px;
  padding: 0;
  line-height: 61px;
  float: right;
}
.chronoContainer {
  height: 70px;
  padding-right: 10px;
}
.appInstruction {
  display: block;
  width: 100%;
  background-color: #178656;
  color: white;
  text-align: left;
  font-style: italic;
  padding-left: 10px;
}
.appAnswer {
  display: block;
  width: 80%;
  margin: 10px auto;
  background-color: #3eb3f6;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.4s;
  padding: 10px;
  word-wrap: break-word;
}
.appAnswer:hover {
  background-color: #2a86bb;
}
.nextButton {
  background-color: #32ba80;
  color: white;
  height: 30px;
  position: absolute;
  width: 380px;
  bottom: 0px;
  padding-top: 15px;
  margin: 0;
  cursor: pointer;
  transition: 0.4s;
}
.nextButton:hover {
  background-color: #2b9b6a;
}
.scrollableAnswer {
  overflow-y: scroll;
  height: 190px;
}

.indexNr {
  position: absolute;
  background-color: #2a86bb;
  color: white;
  width: 60px;
  text-align: center;
  border-bottom-right-radius: 50px;
}
.existingQuestion {
  padding: 20px;
}
.existingQuestion p {
  text-align: left;
  font-size: 0.8em;
  padding: 0px;
}
.existingQuestion h5 {
  margin: 0;
}

@keyframes slide-down {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
.iconButton {
  float: right;
  cursor: pointer;
  position: relative;
  top: -10px;
}
.overflow-y {
  overflow-y: scroll;
}
</style>

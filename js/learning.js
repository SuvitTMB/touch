var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var HeadCase = "";
var EidMember = "";
var QuizJson = "";
var sTrue = 0;
var sFalse = 0;
var sQuiz = 0;
var xClickMenu = 0;
var SelectCase = 0;
var dateString = "";

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_touch")==null) { location.href = "index.html"; }
  SelectCase = parseFloat(getParameterByName('id'));
  xClickMenu = getParameterByName('id');
  //alert(xClickMenu);
  var str = "";
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="profile-team1"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
  //CheckPoll();
});


function Connect_DB() {
  var firebaseConfig = {
    apiKey: "AIzaSyDfTJJ425U4OY0xac6jdhtSxDeuJ-OF-lE",
    authDomain: "retailproject-6f4fc.firebaseapp.com",
    projectId: "retailproject-6f4fc",
    storageBucket: "retailproject-6f4fc.appspot.com",
    messagingSenderId: "653667385625",
    appId: "1:653667385625:web:a5aed08500de80839f0588",
    measurementId: "G-9SKTRHHSW9"
  };
  firebase.initializeApp(firebaseConfig);
  dbMember = firebase.firestore().collection("touch_member");
  dbLearning = firebase.firestore().collection("touch_learning");
  CheckScore();
  SelectMeunu();
  CheckLearning();
  //CheckCase();
}


function getParameterByName(name, url) {
  str = '';
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


var CodeSelect = "";
var Game3SumTrue = 0;
var Game3SumFalse = 0;
function CheckScore() {
  var str = "";
  dbMember.where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidMember = doc.id;
      sTimeCount = doc.data().TimeGame3;
      sGame3SumTrue = doc.data().Game3SumTrue;
      sGame3SumFalse = doc.data().Game3SumFalse;
      sGame3SumQuiz = doc.data().Game3SumQuiz;
      sTotalGame3 = doc.data().TotalGame3;
      sTotalScore = doc.data().TotalScore;
      //aSumTrue = doc.data()SumTrue;
      //aSumFalse = doc.data()SumFalse;
      ///aSumAll = doc.data()SumAll;

      xCheck1 = parseFloat(doc.data().SubGame31);
      xCheck2 = parseFloat(doc.data().SubGame32);
      xCheck3 = parseFloat(doc.data().SubGame33);
      xCheck4 = parseFloat(doc.data().SubGame34);
      xCheck5 = parseFloat(doc.data().SubGame35);
      xCheck6 = parseFloat(doc.data().SubGame36);
      xCheck7 = parseFloat(doc.data().SubGame37);
      xCheck8 = parseFloat(doc.data().SubGame38);
      xCheck9 = parseFloat(doc.data().SubGame39);
      //alert("SelectCase="+SelectCase);
      switch(SelectCase) {
        case 1:
          HeadCase = "การเริ่มต้นใช้งาน touch";
          QuizJson = "https://raw.githubusercontent.com/alaa-sufi/json-files/main/question.json";
          document.getElementById('Learning1').style.display='block';
          CodeSelect= xCheck1;
          break;
        case 2:
          HeadCase = "การตั้งค่าแบบเฉพาะคุณ";
          //QuizJson = "https://raw.githubusercontent.com/alaa-sufi/json-files/main/question.json";
          document.getElementById('Learning2').style.display='block';
          CodeSelect= xCheck2;
          break;
        case 3:
          HeadCase = "สิทธิประโยชน์ของฉัน";
          //QuizJson = "https://raw.githubusercontent.com/alaa-sufi/json-files/main/question.json";
          document.getElementById('Learning3').style.display='block';
          CodeSelect= xCheck3;
          break;
        case 4:
          HeadCase = "บริการบัญชีเงินฝาก";
          //QuizJson = "https://raw.githubusercontent.com/alaa-sufi/json-files/main/question.json";
          document.getElementById('Learning4').style.display='block';
          CodeSelect= xCheck4;
          break;
        case 5:
          HeadCase = "บริการบัตรเครดิต";
          //QuizJson = "https://raw.githubusercontent.com/alaa-sufi/json-files/main/question.json";
          document.getElementById('Learning5').style.display='block';
          CodeSelect= xCheck5;
          break;
        case 6:
          HeadCase = "บริการสินเชื่อรถยนต์";
          //QuizJson = "https://raw.githubusercontent.com/alaa-sufi/json-files/main/question.json";
          document.getElementById('Learning6').style.display='block';
          CodeSelect= xCheck6;
          break;
        case 7:
          HeadCase = "บริการกองทุน";
          //QuizJson = "https://raw.githubusercontent.com/alaa-sufi/json-files/main/question.json";
          document.getElementById('Learning7').style.display='block';
          CodeSelect= xCheck7;
          break;
        case 8:
          HeadCase = "บริการประกัน";
          //QuizJson = "https://raw.githubusercontent.com/alaa-sufi/json-files/main/question.json";
          document.getElementById('Learning8').style.display='block';
          CodeSelect= xCheck8;
          break;
        case 9:
          HeadCase = "บริการสินเชื่อ";
          //QuizJson = "https://github.com/SuvitTMB/RSOC/blob/main/question9.json";
          QuizJson = "https://suvittmb.github.io/RSOC/question9.json";
          //QuizJson = "question9.json";
          document.getElementById('Learning9').style.display='block';
          CodeSelect= xCheck9;
          break;
        //default:
        //  HeadCase = "อื่น ๆ...";
      }
      $("#HeaderName").html(HeadCase);  
      $("#HeaderName_Submit").html('<div class="btn-t1" onclick="StartQuiz()" style="margin-bottom: 0px;">เริ่มทำแบบทดสอบ ชุด'+HeadCase+'</div>');  
      document.getElementById('WaitLoadQuiz').style.display='none';
      if(parseFloat(CodeSelect)!=0) {
        document.getElementById('QuizDone').style.display='block';
        document.getElementById('GotoQuiz').style.display='none';
      } else {
        document.getElementById('QuizDone').style.display='none';
        document.getElementById('GotoQuiz').style.display='block';
      }
    });
  });
}


function SelectMeunu() {
  CloseLearning();
  if(xClickMenu!=0) {
    xClickMenu = SelectCase;
    document.getElementById("ClickMenu").value = parseFloat(SelectCase);
  } else {
    SelectCase = parseFloat(document.getElementById("ClickMenu").value);
  }
  xClickMenu = 0;
  document.getElementById('boxQ').style.display='block';
  document.getElementById('QuizGame').style.display='none';
  CheckScore();
}


function CloseLearning() {
  document.getElementById('Learning1').style.display='none';
  document.getElementById('Learning2').style.display='none';
  document.getElementById('Learning3').style.display='none';
  document.getElementById('Learning4').style.display='none';
  document.getElementById('Learning5').style.display='none';
  document.getElementById('Learning6').style.display='none';
  document.getElementById('Learning7').style.display='none';
  document.getElementById('Learning8').style.display='none';
  document.getElementById('Learning9').style.display='none';
}

var uSumTrue = 0;
var uSumFalse = 0;
var uSumTotal = 0;
var EidLearning = "";
function CheckLearning() {
  var str = "";
  dbLearning.where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .where('GroupQuiz','==',parseFloat(SelectCase))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidLearning = doc.id;
      uSumTrue = doc.data().SumTrue;
      uSumFalse = doc.data().SumFalse;
      uSumQuiz = doc.data().SumQuiz;
      str += 'คุณทำคะแนนได้ '+uSumTrue+' คะแนน';
      $("#DisplayPoint").html(str);  
    });
    //if(EidLearning=="") {
    //  alert("Not Found");
    //}
  });
}


function NewDate() {
 var today = new Date();
 var day = today.getDate() + "";
 var month = (today.getMonth() + 1) + "";
 var year = today.getFullYear() + "";
 var hour = today.getHours() + "";
 var minutes = today.getMinutes() + "";
 var seconds = today.getSeconds() + "";
 var ampm = hour >= 12 ? 'PM' : 'AM';
 day = checkZero(day);
 month = checkZero(month);
 year = checkZero(year);
 hour = checkZero(hour);
 minutes = checkZero(minutes);
 seconds = checkZero(seconds);
 dateString = day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds +" "+ ampm;
}


function checkZero(data){
 if(data.length == 1){
   data = "0" + data;
 }
 return data;
}



var pullets = document.querySelector(".pullets-parent .pullets");
var questionArea = document.querySelector(".question-area");
var title = document.querySelector(".question-area h2");
var answers = document.querySelector(".answers");
var submitButton = document.querySelector("button.submit");
var result = document.querySelector(".results");
var timeShow = document.querySelector(".time-down");
var current = 0;
var answerCount = 0;
var duration = "30"; //in second
var timeDownNum;
var statue;

//GET
var myRequist = new XMLHttpRequest();
function StartQuiz() {
  AddUserQuiz();
  document.getElementById('boxQ').style.display='none';
  document.getElementById('QuizGame').style.display='block';

  myRequist.onreadystatechange = function () {
    if (this.status === 200 && this.readyState === 4) {
      //start time-down
      timeDown(duration);

      var questionObj = JSON.parse(this.responseText);
      var questionLength = questionObj.length;

      //set question length
      document.querySelector(".info .count").innerHTML =
        "Questions Count : <span>" + questionLength + "</span>";

      //set pullets
      setPullets(questionLength);

      //set qustions
      setQustion(questionObj, current);
      ////////////////////////////////////////
      ///////////on click submit/////////////
      //////////////////////////////////////
      submitButton.onclick = function () {
        //clear time-down
        clearInterval(timeDownNum);

        //get currect answers count
        CurrectAnswers(questionObj);

        //Color pullets
        colorPullets();
        //change question
        current++;
        if (current < questionLength) {
          //start time-down
          timeDown(duration);
          answers.innerHTML = "";
          setQustion(questionObj, current);
          //add on clsss to pullets
          pullets.querySelectorAll("span")[current].classList.add("on");
        } else {
          //hidden  question-area & pullets-parent
          questionArea.classList.add("finish");
          document
            .querySelector(".pullets-parent .time-down")
            .classList.add("finish");
          //show in results
          result.style.display = "block";
          if (answerCount < Number.parseInt(questionLength / 2)) {
            result.innerHTML = `<span class="bad">Bad</span>,${answerCount} from ${questionLength}`;
          } else if (answerCount == questionLength) {
            result.innerHTML = `<span class="perfect">Perfect</span>,${answerCount} from ${questionLength}`;
          } else {
            result.innerHTML = `<span class="good">Good</span>,${answerCount} from ${questionLength}`;
          }
          sTrue = parseFloat(`${answerCount}`);
          sQuiz = parseFloat(`${questionLength}`);
          sFalse = sQuiz-sTrue;
          dbLearning.doc(EidLearning).update({
             SumTrue : parseFloat(sTrue),
             SumFalse : parseFloat(sFalse),
             SumQuiz : parseFloat(sQuiz)
          });    
          dbMember.doc(EidMember).update({
             TimeGame3 : parseFloat(sTimeCount)+1,
             TotalGame3 : parseFloat(sTotalGame3)+parseFloat(sTrue),
             Game3SumTrue : parseFloat(sGame3SumTrue)+parseFloat(sTrue),
             Game3SumFalse : parseFloat(sGame3SumFalse)+parseFloat(sFalse),
             Game3SumQuiz : parseFloat(sGame3SumQuiz)+parseFloat(sQuiz),
             TotalScore : parseFloat(sTotalScore)+parseFloat(sTrue)
             //SumTrue : parseFloat(aSumTrue)+parseFloat(sTrue),
             //SumFalse : parseFloat(aSumFalse)+parseFloat(sFalse),
             //SumAll : parseFloat(aSumAll)+parseFloat(sQuiz)
          });    
          switch(SelectCase) {
            case 1:
              dbMember.doc(EidMember).update({
                 SubGame31 : parseFloat(sTrue)
              });    
              break;
            case 2:
              dbMember.doc(EidMember).update({
                 SubGame32 : parseFloat(sTrue)
              });    
              break;
            case 3:
              dbMember.doc(EidMember).update({
                 SubGame33 : parseFloat(sTrue)
              });    
              break;
            case 4:
              dbMember.doc(EidMember).update({
                 SubGame34 : parseFloat(sTrue)
              });    
              break;
            case 5:
              dbMember.doc(EidMember).update({
                 SubGame35 : parseFloat(sTrue)
              });    
              break;
            case 6:
              dbMember.doc(EidMember).update({
                 SubGame36 : parseFloat(sTrue)
              });    
              break;
            case 7:
              dbMember.doc(EidMember).update({
                 SubGame37 : parseFloat(sTrue)
              });    
              break;
            case 8:
              dbMember.doc(EidMember).update({
                 SubGame38 : parseFloat(sTrue)
              });    
              break;
            case 9:
              dbMember.doc(EidMember).update({
                 SubGame39 : parseFloat(sTrue)
              });    
              break;
          }
          CheckLearning();
        }
      };
    }
  };
  myRequist.open(
    "GET",
    QuizJson,
    true
  );
  myRequist.send();  
}


function setQustion(questionObj, num) {
  title.innerText = questionObj[num].title;
  for (let i = 1; i <= 4; i++) {
    let li = document.createElement("li");
    let input = document.createElement("input");
    input.type = "radio";
    input.id = `answer_${i}`;
    input.name = "answer";
    input.dataset.answer = questionObj[current][`answer_${i}`];
    //set first input is checked
    if (i == 1) {
      input.checked = true;
    }
    let label = document.createElement("label");
    label.htmlFor = `answer_${i}`;
    label.appendChild(document.createTextNode(questionObj[num][`answer_${i}`]));
    li.appendChild(input);
    li.appendChild(label);
    answers.appendChild(li);
  }
}


function setPullets(length) {
  for (let i = 0; i < length; i++) {
    if (i == 0) {
      pullets.innerHTML += "<span class='on'></span>";
    } else {
      pullets.innerHTML += "<span></span>";
    }
  }
}


function CurrectAnswers(questionObj) {
  statue = false;
  //get the currect answer fr a
  let currectAnswer = questionObj[current]["right_answer"];
  let chooseAnswerArr = document.getElementsByName("answer");
  let chooseAnswer;
  chooseAnswerArr.forEach((input) =>
    input.checked ? (chooseAnswer = input.dataset.answer) : ""
  );
  if (currectAnswer == chooseAnswer) {
    answerCount++;
    statue = true;
  }
}


function timeDown(duration) {
  var minute,
    second,
    currentDuration = duration;
  timeDownNum = setInterval(() => {
    minute = Number.parseInt(currentDuration / 60);
    second = Number.parseInt(currentDuration % 60);
    minute < 10 ? (minute = "0" + minute) : "";
    second < 10 ? (second = "0" + second) : "";
    timeShow.innerHTML = minute + ":" + second;
    currentDuration--;
    if (currentDuration < 0) {
      clearInterval(timeDownNum);
      submitButton.click();
    }
  }, 1000);
}


function colorPullets() {
  if (statue) {
    pullets.querySelectorAll("span")[current].classList.add("correct");
  } else {
    pullets.querySelectorAll("span")[current].classList.add("wrong");
  }
}


function AddUserQuiz() {
  NewDate();
  dbLearning.add({
    EmpID : sessionStorage.getItem("EmpID_touch"),
    GroupQuiz : parseFloat(SelectCase),
    DateQuiz : dateString
  });
  CheckLearning();
}



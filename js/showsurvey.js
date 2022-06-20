var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var dateString = "";
var EidSurvey = "";


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_touch")==null) { location.href = "index.html"; }
  Connect_DB();
  CheckMember();
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
  dbSurvey = firebase.firestore().collection("touch_survey");
}


function CheckMember() {
  dbMember.where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().CheckSurvey!=0) {
        location.href = 'home.html';
      }
      EidSurvey = doc.id;
    });
  });
}


function SubmitSurvey() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);

  //console.log(document.getElementById("Q1").selectedIndex);
  console.log(document.getElementById("Q1").value);
  console.log(document.getElementById("Q2").value);
  console.log(document.getElementById("Q3").value);
  console.log(document.getElementById("Q4").value);
  console.log(sessionStorage.getItem("EmpID_touch"));
/*
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_touch"),
      EmpName : sessionStorage.getItem("EmpName_touch"),
      EmpBR : sessionStorage.getItem("EmpBR_touch"),
      EmpGroup : sessionStorage.getItem("EmpGroup_touch"),
      EmpPhone : sessionStorage.getItem("EmpPhone_touch"),
*/

  dbSurvey.add({
    LineID : sessionStorage.getItem("LineID"),
    LineName : sessionStorage.getItem("LineName"),
    EmpPicture : sessionStorage.getItem("LinePicture"),
    EmpID : sessionStorage.getItem("EmpID_t"),
    EmpName : sessionStorage.getItem("EmpName_t"),
    EmpBr : sessionStorage.getItem("EmpBR_t"),
    Q1 : document.getElementById("Q1").value,
    Q2 : document.getElementById("Q2").value,
    Q3 : document.getElementById("Q3").value,
    Q4 : document.getElementById("Q4").value,
    TimeStamp : TimeStampDate,
    DateSurvey : dateString
  });
  dbMember.doc(EidSurvey).update({
    CheckSurvey : 1
  });
  document.getElementById('id01').style.display='block';
  //GotoHome();
}


function GotoHome() {
  console.log(EidSurvey);
  location.href = 'index.html';

}


function NewDate() {
  var months = new Array(12);
  months[0] = "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";
  var today = new Date();
  var day = today.getDate() + "";
  var monthEN = (today.getMonth()) + "";
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

  xdateCheck = months[monthEN] + " " + day + ", " + year + " " + hour + ":" + minutes + ":" + seconds ;
  //var GetWatingTime = "april 25, 2022 12:30:00";
}

function checkZero(data){
  if(data.length == 1){
    data = "0" + data;
  }
  return data;
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
}


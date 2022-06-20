var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var sTimeGame1 = 0;
var sTimeGame2 = 0;
var sTimeGame3 = 0;
var sTimeGame4 = 0;


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_touch")==null) { location.href = "index.html"; }
  var str = "";
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="profile-team1"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
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
  dbQuiz = firebase.firestore().collection("touch_quiz");
}


var sSumTrue = 0;
var sSumFalse = 0;
var sSumAll = 0;
function CheckMember() {
  var CountAll = 0;
  var CountMember = 0;
  dbMember.orderBy('CheckSurvey','asc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CountAll = CountAll+1;
      if(doc.data().CheckSurvey!=0) {
        CountMember = CountMember + 1;
      }
      sSumTrue = sSumTrue + doc.data().UserSumTrue + doc.data().Game3SumTrue;
      sSumFalse = sSumFalse + doc.data().UserSumFalse + doc.data().Game3SumFalse;
    });
    sSumAll = sSumTrue + sSumFalse;
    var CalAll = (sSumTrue / sSumAll) * 100;

    $("#ShowUserSumTime1").html("<font color='#f68b1f'>"+CountAll+'</font><div class="ScoreGame4-text">จำนวน<br>ลงทะเบียน</div>');
    $("#ShowUserSumTime2").html("<font color='#2dcc02'>"+CountMember +'</font><div class="ScoreGame4-text">จำนวน<br>ผู้แข่งขัน</div>');
    $("#ShowUserSumTime3").html("<font color='#0056ff'>"+sSumAll +'</font><div class="ScoreGame4-text">จำนวนข้อ<br>ตอบคำถาม</div>');
    $("#ShowUserSumTime4").html("<font color='#2dcc02'>"+ CalAll.toFixed(2) +'%</font><div class="ScoreGame4-text">%การตอบ<br>คำถามถูก</div>');

    document.getElementById('Loading1').style.display='none';
    document.getElementById('Show1').style.display='block';
    document.getElementById('Loading2').style.display='none';
    document.getElementById('Show2').style.display='block';
    document.getElementById('Loading3').style.display='none';
    document.getElementById('Show3').style.display='block';
    document.getElementById('Loading4').style.display='none';
    document.getElementById('Show4').style.display='block';
  });
}




function GotoGame(gotopage) {
  if(gotopage==1) {
    location.href = 'game1.html';
  } else if(gotopage==2) { 
    location.href = 'game2.html';
  } else if(gotopage==3) { 
    location.href = 'game3.html';
  } else if(gotopage==4) { 
    location.href = 'game4.html';
  }
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
}

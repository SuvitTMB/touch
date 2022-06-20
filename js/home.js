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
  CheckUserQuiz();
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


function CheckMember() {
  var str = "";
  var str2 = "";
  var str3 = "";
  var str4 = "";
  dbMember.where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //if(doc.data().==0) {
         // document.getElementById('id01').style.display='block';
        //}
      //var sTotalGame1 = 0;
      //if(doc.data().TotalGame1)

      var CalAllTime = doc.data().TimeGame1 + doc.data().TimeGame2 + doc.data().TimeGame3 + doc.data().TimeGame4;
      //var CalAllPoint = doc.data().TotalGame1 + doc.data().TotalGame2 + doc.data().TotalGame3 + doc.data().TotalGame4;
      var UserTrue = doc.data().UserSumTrue + doc.data().Game3SumTrue;
      var UserFalse = doc.data().UserSumFalse + doc.data().Game3SumFalse;
      var UserAll = UserTrue + UserFalse;

      var CalRatio = ((doc.data().TimeGame4/6)*100);
      var CalTrue = ((UserTrue/UserAll)*100);
      var CalFalse = ((UserFalse/UserAll)*100);
      //document.getElementById('Loading').style.display='none';
      //document.getElementById('NoQuiz').style.display='block';
      //document.getElementById('LoadQuiz').style.display='none';
      $("#ShowUserSumTime1").html("<font color='#f68b1f'>"+CalAllTime+'</font><div class="ScoreGame4-text">จำนวน<br>แข่งสะสม</div>');
      $("#ShowUserSumTime2").html("<font color='#2dcc02'>"+CalTrue.toFixed(2) +'%</font><div class="ScoreGame4-text">%การตอบ<br>คำถามถูก</div>');
      $("#ShowUserSumTime3").html("<font color='#ff0000'>"+CalFalse.toFixed(2) +'%</font><div class="ScoreGame4-text">%การตอบ<br>คำถามผิด</div>');
      $("#ShowUserSumTime4").html("<font color='#0056ff'>"+doc.data().TotalScore.toFixed(2) +'</font><div class="ScoreGame4-text">คะแนนสะสม<br>ล่าสุด</div>');





/*
      sessionStorage.setItem("TotalGame1", doc.data().TotalGame1.toFixed(2));
      sessionStorage.setItem("TotalGame2", doc.data().TotalGame2.toFixed(2));
      sessionStorage.setItem("TotalGame3", doc.data().TotalGame3.toFixed(2));
      sessionStorage.setItem("TotalGame4", doc.data().TotalGame4.toFixed(2));
      sessionStorage.setItem("TotalScore", doc.data().TotalScore.toFixed(2));
      $("#TotalGame1").html(sessionStorage.getItem("TotalGame1"));  
      $("#TotalGame2").html(sessionStorage.getItem("TotalGame2"));  
      $("#TotalGame3").html(sessionStorage.getItem("TotalGame3"));  
      $("#TotalGame4").html(sessionStorage.getItem("TotalGame4"));  
      $("#TotalScore").html(sessionStorage.getItem("TotalScore"));  
*/
      sTimeGame1 = (doc.data().TimeGame1/6)*100;
      if(sTimeGame1>=100) {
        str += '<div class="progress"><div class="bar" style="width:'+sTimeGame1.toFixed(2)+'%"></div></div>';
      } else {
        str += '<div class="progress"><div class="bar1" style="width:'+sTimeGame1.toFixed(2)+'%"></div></div>';
      }
      $("#RatioGame1").html(str);  

      sTimeGame2 = (doc.data().TimeGame2/9)*100;
      if(sTimeGame2>=100) {
        str2 += '<div class="progress"><div class="bar" style="width:'+sTimeGame2.toFixed(2)+'%"></div></div>';
      } else {
        str2 += '<div class="progress"><div class="bar1" style="width:'+sTimeGame2.toFixed(2)+'%"></div></div>';
      }
      $("#RatioGame2").html(str2);  

      sTimeGame3 = (doc.data().TimeGame3/9)*100;
      if(sTimeGame3>=100) {
        str3 += '<div class="progress"><div class="bar" style="width:'+sTimeGame3.toFixed(2)+'%"></div></div>';
      } else {
        str3 += '<div class="progress"><div class="bar1" style="width:'+sTimeGame3.toFixed(2)+'%"></div></div>';
      }
      $("#RatioGame3").html(str3);  

    });

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


var sCheckQ = 0;
function CheckUserQuiz() {
  var str4 = "";
  var sCheckQ = 0;
  dbQuiz.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sCheckQ = 1;
      //console.log(sCheckQ);
    });
    if(sCheckQ==1) {
      str4 += '<div class="progress"><div class="bar" style="width:100%"></div></div>';
    } else {
      str4 += '<div class="progress"><div class="bar1" style="width:0%"></div></div>';
    }
    $("#RatioGame4").html(str4);  
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

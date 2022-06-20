var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;





$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_touch")==null) { location.href = "index.html"; }
  var str = "";
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="profile-team1"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
  //alert(today);
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
  CheckUserScore();
  CheckUserQuiz();
  UserBoard();
}


var CheckPass = 0;
function CheckUserScore() {
  dbMember.where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      var CalRatio = ((doc.data().TimeGame4/6)*100);
      var CalTrue = ((doc.data().UserSumTrue/doc.data().UserSumTime)*100);
      var CalFalse = ((doc.data().UserSumFalse/doc.data().UserSumTime)*100);
      document.getElementById('Loading').style.display='none';
      document.getElementById('NoQuiz').style.display='block';
      document.getElementById('LoadQuiz').style.display='none';
      $("#ShowUserSumTime1").html("<font color='#f68b1f'>"+doc.data().UserSumTime+'</font><div class="ScoreGame4-text">จำนวน<br>แข่งสะสม</div>');
      $("#ShowUserSumTime2").html("<font color='#2dcc02'>"+CalTrue.toFixed(2) +'%</font><div class="ScoreGame4-text">%การตอบ<br>คำถามถูก</div>');
      $("#ShowUserSumTime3").html("<font color='#ff0000'>"+CalFalse.toFixed(2) +'%</font><div class="ScoreGame4-text">%การตอบ<br>คำถามผิด</div>');
      $("#ShowUserSumTime4").html("<font color='#0056ff'>"+doc.data().TotalGame4.toFixed(2) +'</font><div class="ScoreGame4-text">คะแนนสะสม<br>ล่าสุด</div>');
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


function CheckUserQuiz() {
  var str0 = 0;
  dbQuiz.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckPass = 1;
    });
    if(CheckPass==0) {
      document.getElementById('Loading').style.display='none';
      document.getElementById('NoQuiz').style.display='none';
      document.getElementById('LoadQuiz').style.display='block';
      str0 = '<div class="progress"><div class="bar0" style="width:0%;"></div></div>'
    } else {
      str0 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
    }
    $("#Bar0").html(str0);  
  });
}


function UserBoard() {
  document.getElementById('LoadingScore').style.display='block';
  document.getElementById('UserScore').style.display='none';
  var i = 0;
  var str = "";
  str += '<table class="table" style="width:95%; margin:20px auto;"><tbody>';
  dbQuiz.where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .orderBy('QuizDate','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //str += '<tr onclick="OpenProfile(\''+ doc.id +'\')" class="LinkProfile">';
      str += '<tr>';
      str += '<td class="td-center td-padding" style="width:20%;text-align:center;">'+doc.data().QuizDate+'</td>';
      str += '<td class="td-padding" style="width:65%;"><font color="#0056ff">'+doc.data().GroupQuiz+'</font></td>';
      str += '<td class="td-padding" style="width:15%;text-align:center;"><font color="#000"><b>'+doc.data().PointOUT+'</b></font></td>';
      str += '</tr>';
      i++;
    }); 
    str += '</tbody></table>';
    $("#UserScore").html(str);  
    document.getElementById('LoadingScore').style.display='none';
    document.getElementById('UserScore').style.display='block';
  });
}


function TopDayBoard() {
  document.getElementById('LoadingScore').style.display='block';
  document.getElementById('UserScore').style.display='none';
  var i = 0;
  var str = "";
  str += '<table class="table" style="width:95%; margin:20px auto;"><tbody>';
  dbQuiz.where('QuizDate','==',today)
  .orderBy('PointOUT','desc')
  .orderBy('TimeStamp','desc')
  .limit(30)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //str += '<tr onclick="OpenProfile(\''+ doc.id +'\')" class="LinkProfile">';
      str += '<tr>';
      str += '<td class="td-center td-padding" style="width:40%;text-align:left;font-size:9px;">'+doc.data().DateRegister+'</td>';
      str += '<td class="td-padding" style="width:45%;"><font color="#0056ff">'+doc.data().EmpName+'</font></td>';
      str += '<td class="td-padding" style="width:15%;text-align:center;"><font color="#000"><b>'+doc.data().PointOUT+'</b></font></td>';
      str += '</tr>';
      i++;
    }); 
    str += '</tbody></table>';
    $("#UserScore").html(str);  
    document.getElementById('LoadingScore').style.display='none';
    document.getElementById('UserScore').style.display='block';
  });
}


function LeaderBoard() {
  document.getElementById('LoadingScore').style.display='block';
  document.getElementById('UserScore').style.display='none';
  var i = 0;
  var str = "";
  str += '<table class="table" style="width:95%; margin:20px auto;"><tbody>';
  dbMember.orderBy('TotalGame4','desc')
  .limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = i+1;
      //str += '<tr onclick="OpenProfile(\''+ doc.id +'\')" class="LinkProfile">';
      str += '<tr>';
      str += '<td class="td-center td-padding" style="width:15%;text-align:center;">'+i+'</td>';
      str += '<td class="td-padding" style="width:70%;"><font color="#0056ff">'+doc.data().EmpName+'</font> <font color="#000">(แข่ง '+doc.data().TimeGame4+' ครั้ง)</font></td>';
      str += '<td class="td-padding" style="width:15%;text-align:center;"><font color="#000"><b>'+(doc.data().TotalGame4).toFixed(2)+'</b></font></td>';
      str += '</tr>';
      i++;
    }); 
    str += '</tbody></table>';
    $("#UserScore").html(str);  
    document.getElementById('LoadingScore').style.display='none';
    document.getElementById('UserScore').style.display='block';
  });
}






function ShowIntro() {
  var str = "";
  str += '<div class="btn-t33">แนะนำ ภารกิจที่ 1</div>';
  str += '<div><img src="./img/cognition-online-final.gif" style="width:100%;"></div>';
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
  str += '<div class="clr" style="height:30px;"></div>';
  $("#DisplayIntro").html(str);  
  document.getElementById('id03').style.display='block';
}


function CloseAll() {
  document.getElementById('id03').style.display='none';
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



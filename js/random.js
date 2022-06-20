var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var GiftToday = "กระเป๋าผ้ากระสอบเคลือบด้าน (ใหญ่) 1 ใบ";
var dateString = "";

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_touch")==null) { location.href = "index.html"; }
  $("#DisplayGiftToday").html(GiftToday);  
  var str = "";
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="profile-team1"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
  CheckRandom();
  CheckMemberToday();
  ListRewards();
  //TopLeaderBoard();
  //loadData();
  //CheckUserQuiz();
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
  dbRewards = firebase.firestore().collection("touch_rewards");
}



var CountAll = 0;
var CountMember = 0;
var sSumMemberTrue = 0;
var sSumMemberFalse = 0;
function CheckMemberToday() {
  dbRewards.where('QuizDate','==',today)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sSumMemberTrue = doc.data().AllUserTure;
      sSumMemberFalse = doc.data().AllUserFalse;
      CountAll = doc.data().AllUserQuiz;
    });
    sSumAll = sSumMemberTrue + sSumMemberFalse;
    var CalAll = (sSumMemberTrue / sSumAll) * 100;
    $("#ShowUserSumTime1").html("<font color='#002d63'>"+ CountAll+'</font><div class="ScoreGame4-text">จำนวนผู้ตอบ<br>คำถามวันนี้</div>');
    $("#ShowUserSumTime2").html("<font color='#0056ff'>"+ sSumMemberTrue +'</font><div class="ScoreGame4-text">จำนวน<br>ผู้ตอบถูก</div>');
    $("#ShowUserSumTime3").html("<font color='#ff0000'>"+ sSumMemberFalse +'</font><div class="ScoreGame4-text">จำนวน<br>ผู้ตอบผิด</div>');
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



var EidRewards = "";
var xToday = "";
var xCheckRewards = 0;
var xAllUserTure = 0;
var xAllUserFalse = 0;
var xAllUserQuiz = 0;
var xRatio = 0;
function CheckRandom() {
  dbRewards.where('CheckGetGift','==',0)
  .orderBy('TimeStamp','asc')
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      if(doc.data().QuizDate!=today) {
        EidRewards = doc.id;
        xToday = doc.data().QuizDate;
        xAllUserTure = doc.data().AllUserTure;
        xAllUserFalse = doc.data().AllUserFalse;
        xAllUserQuiz = doc.data().AllUserQuiz;
        xRatio = (xAllUserTure/xAllUserQuiz)*100;
        RandomRewards();        
      }
    });
  });
}


function RandomRewards() {
  var str ="";
  document.getElementById('id03').style.display='block';
  var GiftName = "กระเป๋าผ้ากระสอบเคลือบด้าน (ใหญ่) 1 ใบ";
  str += '<center><div class="btn-t33" style="margin-top:10px;padding:5px 25px;">ระบบสุ่มของรางวัล<br>ประจำวันที่ '+xToday+'</div></center>';
  //str += '<div class="text-team" style="text-align:left;padding-top:15px;">คุณได้รับการคัดเลือกให้เป็นผู้ทำการกดสุ่มของรางวัล ประจำวันที่ '+xToday+' โดยมีผู้ที่ตอบคำถามได้ถูกต้องในรอบนี้ จำนวน '+xAllUserTure+' ท่าน ขอให้ทำการกดปุ่มเพื่อสุ่มเลือกผู้โชคดีได้รับรางวัลประจำวัน</div>';
  //str += '<div><br>ของรางวัลประจำรอบ<br>'+GiftName+'</div> ';
  //str += ''+xToday;
  str += '';
  str += '';
  $("#Data1").html(xAllUserQuiz);  
  $("#Data2").html(xAllUserTure);  
  $("#Data3").html(xAllUserFalse);  
  $("#Data4").html(xRatio.toFixed(2)+"%");  
  $("#DisplayGift").html(str);  
  //alert("Random Gift");
}


function ListRewards() {
  console.log("โชว์ผู้รับรางวัล");
  document.getElementById("DisplayAllRewards").style.display = "block";
  document.getElementById("DisplayUserRewards").style.display = "none";
  var i = 1;
  var str = "";
  str += '<div class="text-team" style="padding:0;"><font color="#000"><b><u>ตรวจสอบรายชื่อผู้ได้รับรางวัลประจำวัน</u></b></font></div>';
  str += '<table class="table" style="width:95%; margin:20px auto;"><tbody>';
  dbQuiz.where('Rewards','==', 1)
  .orderBy('TimeStamp','desc')
  .orderBy('QuizDate','asc')
  //.limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<tr onclick="OpenProfile(\''+ doc.id +'\')" class="LinkProfile">';
      str += '<td class="td-center td-padding" style="width:20%;text-align:center;color:#000;">'+doc.data().QuizDate+'</td>';
      str += '<td class="td-padding" style="width:80%;line-height:1.3;"><font color="#0056ff"><b>'+doc.data().EmpName+'</b> ('+doc.data().EmpGroup+')</font><br><font color="#f68b1f">'+doc.data().NameRewards+'</font></td>';
      str += '</tr>';
      i++;
    }); 
    str += '</tbody></table>';
    $("#DisplayAllRewards").html(str);  
  });
}


function UserRewards() {
  document.getElementById("DisplayAllRewards").style.display = "none";
  document.getElementById("DisplayUserRewards").style.display = "block";
  //console.log(sessionStorage.getItem("EmpID_touch"));
  var str = "";
  var str = "";
  str += '<div class="text-team" style="padding:0;"><font color="#000"><b><u>รางวัลประจำวันของคุณ</u></b></font></div>';
  str += '<div class="btn-t2" onclick="CheckAddress()" style="margin:5px auto;">คลิกเพื่อตรวจสอบที่อยู่ของคุณ</div>';
  str += '<table class="table" style="width:95%; margin:20px auto;"><tbody>';
  dbQuiz.where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .where('Rewards','==', 1)
  .orderBy('TimeStamp','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<tr onclick="OpenProfile(\''+ doc.id +'\')" class="LinkProfile">';
      str += '<td class="td-center td-padding" style="width:20%;text-align:center;color:#000;">'+doc.data().QuizDate+'</td>';
      str += '<td class="td-padding" style="width:80%;line-height:1.3;"><font color="#0056ff"><b>'+doc.data().EmpName+'</b> ('+doc.data().EmpGroup+')</font><br><font color="#f68b1f">'+doc.data().NameRewards+'</font></td>';
      str += '</tr>';
    }); 
    str += '</tbody></table>';
    $("#DisplayUserRewards").html(str);  
    //console.log(str);
  });
}


function CheckAddress() {
  var str = "Address";
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='block';
  $("#DisplayAddress").html(str);  
}


function OpenProfile(uid) {
  var str = "";
  dbQuiz.where(firebase.firestore.FieldPath.documentId(), "==", uid)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      if(doc.data().LinePicture!="") { 
        str += '<center><div><img src="'+doc.data().LinePicture+'" class="add-profile" style="margin:10px auto;"></div>';
      } else {
        str += '<div style="text-align:center;"><img src="./img/m.png" class="add-profile"></div>';
      }
      str += '<div class="NameLine">'+doc.data().EmpName+'</div></center>';
      str += '<center><div class="btn-t4" style="width:130px;">'+ (doc.data().PointOUT).toFixed(2) +' คะแนน</div></center>';
      //str += '<div class="clr" style="height:10px;"></div>';
      //str += '<div class="box-menu0" onclick="GotoGame(1)"><img src="./img/apptouch.png" style="width:60px;"><div class="text-team1">รู้จักทัชให้มากขึ้น</div><div class="btn-t333">'+ (doc.data().TotalGame1).toFixed(2) +' คะแนน</div></div>';
      //str += '<div class="box-menu0" onclick="GotoGame(2)"><img src="./img/learning.png" style="width:60px;"><div class="text-team1">เรียนรู้ผลิตภัณฑ์</div><div class="btn-t333">'+ (doc.data().TotalGame2).toFixed(2) +' คะแนน</div></div>';
      //str += '<div class="box-menu0" onclick="GotoGame(3)"><img src="./img/youknow.png" style="width:60px;"><div class="text-team1">เรียนรู้การใช้งาน</div><div <div class="btn-t333">'+ (doc.data().TotalGame3).toFixed(2) +' คะแนน</div></div>';
      //str += '<div class="box-menu0" onclick="GotoGame(4)"><img src="./img/question.png" style="width:60px;"><div class="text-team1">คำถามประจำวัน</div><div <div class="btn-t333">'+ (doc.data().TotalGame4).toFixed(2) +' คะแนน</div></div>';
      //str += '<div class="clr"></div>';
    });
    $("#DisplayProfile").html(str);  
    document.getElementById("id01").style.display = "block";
  });
}



function CheckRandomGift() {
  document.getElementById("SubmitRewards").style.display = "none";
  $("#DisplayAllRewards").html('');  
  var i = 1;
  var str = "";
  console.log(xToday);
  dbQuiz.where('QuizDate','==', xToday)
  .where('Rewards','==', 1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i++
    }); 
    if(i<2) {
      RandomGift();
    } else {
      str += '<div>ขณะนี้เราได้ผู้ได้รับรางวัลครบตามจำนวนแล้ว ขอบคุณสำหรับการร่วมเป็นส่วนหนึ่งในการสุ่มเลือกของรางวัลให้เพื่อน ๆ</div>';
      $("#DisplayRandomGift").html(str);  
      document.getElementById("SubmitRewards").style.display = "none";
    }
  });
}



var ArrUserGift = [];
var NewUserGift = "";
function RandomGift() {
  var i = 1;
  dbQuiz.where('QuizDate','==', xToday)
  .where('ResultQuiz','==', 'True')
  .where('Rewards','==', 0)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      ArrUserGift.push([doc.id]);
      i++
    }); 
    //$("#DisplayRandomGift333").html(ArrUserGift);  
    console.log(i,"==="+ArrUserGift);
    GotoRandomGift();
  });
}


function GotoRandomGift() {
  NewDate();
  for (var i = 0; i < 2; i++) {
    NewUserGift = random_item(ArrUserGift);
    var CheckGift = NewUserGift[0];
    dbQuiz.doc(CheckGift).update({
      Rewards : 1,
      NameRewards : GiftToday,
      DateRewards : dateString
    });
  }
  dbRewards.doc(EidRewards).update({
    CheckGetGift : 1
  });
  OpenNewGift();
}


function OpenNewGift() {
  alert("ขอบคุณสำหรับการร่วมสุ่มเลือกผู้ที่จะได้รับรางวัลประจำวัน");
  console.log("+OpenNewGift",xToday);
  var str = "";
  str += '<div class="text-team" style="margin-top:20px;"><font color="#000"><b><u>รายชื่อผู้ได้รับรางวัลประจำวัน</u></b></font></div>';
  str += '<table class="table" style="width:95%;margin-top:-5px;"><tbody>';
  //dbQuiz.where('QuizDate','==', xToday)
  dbQuiz
  .where('Rewards','==', 1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      console.log("KPN");
      str += '<tr>';
      str += '<td class="td-center td-padding" style="width:20%;text-align:center;color:#000;">'+doc.data().QuizDate+'</td>';
      str += '<td class="td-padding" style="width:80%;line-height:1.3;"><font color="#0056ff"><b>'+doc.data().EmpName+'</b> ('+doc.data().EmpGroup+')</font><br><font color="#f68b1f">'+GiftToday+'</font></td>';
      str += '</tr>';
    }); 
    str += '</tbody></table>';
    $("#DisplayRandomGift").html("ทดสอบโปรแกรม");  
    //$("#DisplayRandomGift").html(str);  
    OpenUser();
  });
}


function OpenUser() {
  var i = 1;
  var str = "";
  str += '<div class="text-team" style="padding:0;"><font color="#000"><b><u>ตรวจสอบรายชื่อผู้ได้รับรางวัลประจำวัน</u></b></font></div>';
  str += '<table class="table" style="width:95%; margin:20px auto;"><tbody>';
  dbQuiz.where('Rewards','==', 1)
  .orderBy('TimeStamp','desc')
  .orderBy('QuizDate','asc')
  //.limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<tr onclick="OpenProfile(\''+ doc.id +'\')" class="LinkProfile">';
      str += '<td class="td-center td-padding" style="width:20%;text-align:center;color:#000;">'+doc.data().QuizDate+'</td>';
      str += '<td class="td-padding" style="width:80%;line-height:1.3;"><font color="#0056ff"><b>'+doc.data().EmpName+'</b> ('+doc.data().EmpGroup+')</font><br><font color="#f68b1f">'+doc.data().NameRewards+'</font></td>';
      str += '</tr>';
      i++;
    }); 
    str += '</tbody></table>';
    $("#DisplayAllRewards555").html(str);  
  });
}



function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}



/*
  //.where('ResultQuiz','==', 'True')
function RandomGift() {
  var str = "";
  alert("สุ่มเลือกผู้รับรางวัลประจำวันที่ "+xToday);

  str += '<div class="text-team" style="padding:0;"><font color="#000"><b><u>ตรวจสอบรายชื่อผู้ได้รับรางวัลประจำวัน</u></b></font></div>';
  str += '<table class="table" style="width:95%; margin:20px auto;"><tbody>';
  dbQuiz.where('QuizDate','==', xToday)
  .where('Rewards','==', 1)
  .orderBy('TimeStamp','desc')
  //.limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<tr onclick="OpenProfile(\''+ doc.id +'\')" class="LinkProfile">';
      str += '<td class="td-center td-padding" style="width:20%;text-align:center;color:#000;">'+doc.data().QuizDate+'</td>';
      str += '<td class="td-padding" style="width:80%;line-height:1.3;"><font color="#0056ff"><b>'+doc.data().EmpName+'</b> ('+doc.data().EmpGroup+')</font><br><font color="#f68b1f">'+doc.data().NameRewards+'</font></td>';
      str += '</tr>';
      i++;
    }); 
    str += '</tbody></table>';
    $("#DisplayRandomGift").html(str);  
  });
}

*/


function CloseAll() {
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
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

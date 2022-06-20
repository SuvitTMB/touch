var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var dateString = "";
var NewPoint = [0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0];
var sMyPoint = 0;
var sGame1 = 0;
var sGame2 = 0;
var sGame3 = 0;
var sGame4 = 0;
var SelectChoice = 0;
var EidMember = "";
var TimeCount = 0;
var SumPoint = 0;
var SumScore = 0;
var xCheck1 = 0;
var xCheck2 = 0;
var xCheck3 = 0;
var xCheck4 = 0;
var xCheck5 = 0;
var xCheck6 = 0;
var xCheck7 = 0;
var xCheck8 = 0;
var xCheck9 = 0;
var now = "";
var VDOtimer = 0;
var counter = 0;
var sVDOnumber = 0;
var timeup = 0;

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_touch")==null) { location.href = "index.html"; }
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
  CheckScore();
}


function CheckScore() {
  document.getElementById('DisplayPage').style.display='block';
  document.getElementById('UserScore').style.display='none';
  var str0 = "";
  var str = "";
  var str2 = "";
  var str3 = "";
  var str4 = "";
  var str5 = "";
  var str6 = "";
  var str7 = "";
  var str8 = "";
  var str9 = "";
  dbMember.where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidMember = doc.id;
      Game3SumTrue = doc.data().Game3SumTrue;
      Game3SumFalse = doc.data().Game3SumFalse;
      Game3SumQuiz = doc.data().Game3SumQuiz;

/*
      Game3SumFalse = doc.data().TimeGame3;
      TimeCount = doc.data().TimeGame3;
      SumPoint = doc.data().TotalGame3;
      SumScore = doc.data().TotalScore;
*/
      xCheck1 = parseFloat(doc.data().SubGame31);
      xCheck2 = parseFloat(doc.data().SubGame32);
      xCheck3 = parseFloat(doc.data().SubGame33);
      xCheck4 = parseFloat(doc.data().SubGame34);
      xCheck5 = parseFloat(doc.data().SubGame35);
      xCheck6 = parseFloat(doc.data().SubGame36);
      xCheck7 = parseFloat(doc.data().SubGame37);
      xCheck8 = parseFloat(doc.data().SubGame38);
      xCheck9 = parseFloat(doc.data().SubGame39);
      if(doc.data().TimeGame3==0) {
        ShowIntro();
        document.getElementById('id03').style.display='block';
      }
      var CalRatio = ((doc.data().TimeGame3/9)*100);
      var CalRatioT = ((doc.data().Game3SumTrue/parseFloat(Game3SumQuiz))*100);
      var CalRatioF = ((doc.data().Game3SumFalse/parseFloat(Game3SumQuiz))*100);

      $("#ShowUserSumTime1").html("<font color='#f68b1f'>"+doc.data().TimeGame3+'</font><div class="ScoreGame4-text">จำนวน<br>การเรียนรู้</div>');
      $("#ShowUserSumTime2").html("<font color='#2dcc02'>"+CalRatioT.toFixed(2) +'%</font><div class="ScoreGame4-text">%การตอบ<br>คำถามถูก</div>');
      $("#ShowUserSumTime3").html("<font color='#ff0000'>"+CalRatioF.toFixed(2) +'%</font><div class="ScoreGame4-text">%การตอบ<br>คำถามผิด</div>');
      $("#ShowUserSumTime4").html("<font color='#0056ff'>"+doc.data().TotalGame3.toFixed(2) +'</font><div class="ScoreGame4-text">คะแนนสะสม<br>ล่าสุด</div>');

      str0 = '<div class="progress"><div class="bar1" style="width:'+CalRatio+'%;"></div></div>'
      $("#Bar0").html(str0);  

      if(xCheck1!=0) { $("#UserPoint1").html(xCheck1.toFixed(2)); }
      if(xCheck2!=0) { $("#UserPoint2").html(xCheck2.toFixed(2)); }
      if(xCheck3!=0) { $("#UserPoint3").html(xCheck3.toFixed(2)); }
      if(xCheck4!=0) { $("#UserPoint4").html(xCheck4.toFixed(2)); }
      if(xCheck5!=0) { $("#UserPoint5").html(xCheck5.toFixed(2)); }
      if(xCheck6!=0) { $("#UserPoint6").html(xCheck6.toFixed(2)); }
      if(xCheck7!=0) { $("#UserPoint7").html(xCheck7.toFixed(2)); }
      if(xCheck8!=0) { $("#UserPoint8").html(xCheck8.toFixed(2)); }
      if(xCheck9!=0) { $("#UserPoint9").html(xCheck9.toFixed(2)); }


      if(xCheck1!=0) {
        str = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar1").html(str);  
      document.getElementById('DisplayWait1').style.display='none';
      document.getElementById('DisplayShow1').style.display='block';
      if(xCheck2!=0) {
        str2 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str2 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar2").html(str2);  
      document.getElementById('DisplayWait2').style.display='none';
      document.getElementById('DisplayShow2').style.display='block';
      if(xCheck3!=0) {
        str3 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str3 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar3").html(str3);  
      document.getElementById('DisplayWait3').style.display='none';
      document.getElementById('DisplayShow3').style.display='block';
      if(xCheck4!=0) {
        str4 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str4 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar4").html(str4);  
      document.getElementById('DisplayWait4').style.display='none';
      document.getElementById('DisplayShow4').style.display='block';
      if(xCheck5!=0) {
        str5 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str5 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar5").html(str5);  
      document.getElementById('DisplayWait5').style.display='none';
      document.getElementById('DisplayShow5').style.display='block';
      if(xCheck6!=0) {
        str6 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str6 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar6").html(str6);  
      document.getElementById('DisplayWait6').style.display='none';
      document.getElementById('DisplayShow6').style.display='block';
      if(xCheck7!=0) {
        str7 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str7 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar7").html(str7);  
      document.getElementById('DisplayWait7').style.display='none';
      document.getElementById('DisplayShow7').style.display='block';
      if(xCheck8!=0) {
        str8 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str8 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar8").html(str8);  
      document.getElementById('DisplayWait8').style.display='none';
      document.getElementById('DisplayShow8').style.display='block';
      if(xCheck9!=0) {
        str9 = '<div class="progress"><div class="bar" style="width:100%;"></div></div>'
      } else {
        str9 = '<div class="progress"><div class="bar1" style="width:0%;"></div></div>'
      }
      $("#Bar9").html(str9);  
      document.getElementById('DisplayWait9').style.display='none';
      document.getElementById('DisplayShow9').style.display='block';
      //alert(xCheck1+"===");
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


function UnLoading() {
  document.getElementById('DisplayWait1').style.display='block';
  document.getElementById('DisplayWait2').style.display='block';
  document.getElementById('DisplayWait3').style.display='block';
  document.getElementById('DisplayWait4').style.display='block';
  document.getElementById('DisplayWait5').style.display='block';
  document.getElementById('DisplayWait6').style.display='block';
  document.getElementById('DisplayWait7').style.display='block';
  document.getElementById('DisplayWait8').style.display='block';
  document.getElementById('DisplayWait9').style.display='block';
  document.getElementById('DisplayShow1').style.display='none';
  document.getElementById('DisplayShow2').style.display='none';
  document.getElementById('DisplayShow3').style.display='none';
  document.getElementById('DisplayShow4').style.display='none';
  document.getElementById('DisplayShow5').style.display='none';
  document.getElementById('DisplayShow6').style.display='none';
  document.getElementById('DisplayShow7').style.display='none';
  document.getElementById('DisplayShow8').style.display='none';
  document.getElementById('DisplayShow9').style.display='none';
  document.getElementById('LoadingScore').style.display='none';
  document.getElementById('UserBoard').style.display='none';
  CheckScore();
}


function LeaderBoard() {
  //alert("show");
  document.getElementById('DisplayPage').style.display='none';
  document.getElementById('LoadingScore').style.display='block';
  document.getElementById('UserScore').style.display='none';
  document.getElementById('UserBoard').style.display='none';
  var i = 1;
  var str = "";
  str += '<table class="table" style="width:95%;"><tbody>';
  dbMember.orderBy('TotalGame3','desc')
  .limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<tr>';
      str += '<td class="td-center td-padding" style="width:15%;text-align:center;">'+i+'</td>';
      str += '<td class="td-padding" style="width:70%;"><font color="#0056ff">'+doc.data().EmpName+'</font> <font color="#000">(แข่ง '+doc.data().TimeGame3+' ครั้ง)</font></td>';
      str += '<td class="td-padding" style="width:15%;text-align:center;"><font color="#000"><b>'+(doc.data().TotalGame3).toFixed(2)+'</b></font></td>';
      str += '</tr>';
      i++;
    }); 
    str += '</tbody></table>';
    $("#UserScore0").html(str);  
    document.getElementById('LoadingScore').style.display='none';
    document.getElementById('UserScore').style.display='block';
  });
}

function UserBoard() {
  document.getElementById('LoadingScore').style.display='block';
  document.getElementById('DisplayPage').style.display='none';
  document.getElementById('UserScore').style.display='none';
  document.getElementById('UserBoard').style.display='block';
  document.getElementById('LoadingScore').style.display='none';
}


function ShowIntro() {
  var str = "";
  str += '<div class="btn-t33">แนะนำ ภารกิจที่ 3</div>';
  str += '<div><img src="./img/cognition-online-final.gif" style="width:100%;"></div>';
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
  str += '<div class="clr" style="height:30px;"></div>';
  $("#DisplayIntro").html(str);  
  document.getElementById('id03').style.display='block';
  document.getElementById('UserBoard').style.display='none';
}


function CloseAll() {
  document.getElementById('id03').style.display='none';
}


function timer(x) {
 now = new Date();
 count = Math.round((timeup - now)/1000);
 //console.log(now+"==="+count+"==="+timeup+"==="+x);
 if (now > timeup) {
     window.location = "#"; //or somethin'
     $("#timer").html("<font color='#ffff00'>ขอบคุณสำหรับการชมวิดิโอนี้</font>");
     //document.getElementById("SubmitAns").style.display = "none";
     //alert("หมดเวลา");
     clearInterval(counter);
     if(timeup!=0 && VDOtimer!=0) {
      var stopVideo = function(player) {
        var vidSrc = player.prop('src').replace('autoplay=1','autoplay=0');
        player.prop('src', vidSrc);
      };
      stopVideo($('#video'));
      BeForRandom(x);
      document.getElementById('id01').style.display='none';
      document.getElementById('id02').style.display='block';
     }
     return;
 }
 var seconds = Math.floor((count%60));
 var minutes = Math.floor((count/60) % 60);
 if(seconds<10) { seconds="0"+seconds } 
 $("#timer").html("เหลือเวลาอีก <font color='#ffff00'>&nbsp;" + minutes + " นาที " + seconds + " วินาที</font>");
}


function ClickLearningID(x) {
  location.href = "learning.html?id="+x;
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



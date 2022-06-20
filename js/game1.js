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
  document.getElementById('UserScore').style.display='none';
  var str0 = "";
  var str = "";
  var str2 = "";
  var str3 = "";
  var str4 = "";
  var str5 = "";
  var str6 = "";
  dbMember.where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidMember = doc.id;
      TimeCount = doc.data().TimeGame1;
      SumPoint = doc.data().TotalGame1;
      SumScore = doc.data().TotalScore;
      xCheck1 = parseFloat(doc.data().SubGame11);
      xCheck2 = parseFloat(doc.data().SubGame12);
      xCheck3 = parseFloat(doc.data().SubGame13);
      xCheck4 = parseFloat(doc.data().SubGame14);
      xCheck5 = parseFloat(doc.data().SubGame15);
      xCheck6 = parseFloat(doc.data().SubGame16);
      if(doc.data().TimeGame1==0) {
        ShowIntro();
        document.getElementById('id03').style.display='block';
      }
      var CalRatio = ((doc.data().TimeGame1/6)*100);
      $("#ShowUserSumTime1").html("<font color='#f68b1f'>"+doc.data().TimeGame1+'</font><div class="ScoreGame4-text">จำนวนครั้ง<br>ที่ดูข้อมูล</div>');
      $("#ShowUserSumTime2").html("<font color='#2dcc02'>"+CalRatio.toFixed(2) +'%</font><div class="ScoreGame4-text">เปอร์เซ็นต์<br>การดูข้อมูล</div>');
      $("#ShowUserSumTime3").html("<font color='#0056ff'>"+doc.data().TotalGame1.toFixed(2) +'</font><div class="ScoreGame4-text">คะแนน<br>ที่ได้รับ</div>');

      str0 = '<div class="progress"><div class="bar1" style="width:'+CalRatio+'%;"></div></div>'
      $("#Bar0").html(str0);  

      if(xCheck1!=0) { $("#UserPoint1").html(xCheck1.toFixed(2)); }
      if(xCheck2!=0) { $("#UserPoint2").html(xCheck2.toFixed(2)); }
      if(xCheck3!=0) { $("#UserPoint3").html(xCheck3.toFixed(2)); }
      if(xCheck4!=0) { $("#UserPoint4").html(xCheck4.toFixed(2)); }
      if(xCheck5!=0) { $("#UserPoint5").html(xCheck5.toFixed(2)); }
      if(xCheck6!=0) { $("#UserPoint6").html(xCheck6.toFixed(2)); }

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
    });
    document.getElementById('Loading1').style.display='none';
    document.getElementById('Show1').style.display='block';
    document.getElementById('Loading2').style.display='none';
    document.getElementById('Show2').style.display='block';
    document.getElementById('Loading3').style.display='none';
    document.getElementById('Show3').style.display='block';
  });
}




function gotoGame1(x) {
  //alert(xCheck1);
  SelectChoice = x;
  console.log(SelectChoice);
  console.log(xCheck1,xCheck2,xCheck3,xCheck4,xCheck5,xCheck6)
  var str = "";




/*
  str += '<div><img src="./img/game1-0'+x+'.jpg" class="img-game1"></div><center>';
  if(xCheck1==0) {
    alert(xCheck1);
    str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">ฉันเข้าใจแล้ว-1</div>';
  } else if(xCheck2==0) { 
    alert(xCheck2);
    str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">ฉันเข้าใจแล้ว-2</div>';
  } else if(xCheck3==0) { 
    alert(xCheck3);
    str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">ฉันเข้าใจแล้ว-3</div>';
  } else if(xCheck4==0) { 
    alert(xCheck4);
    str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">ฉันเข้าใจแล้ว-4</div>';
  } else if(xCheck5==0) { 
    alert(xCheck5);
    str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">ฉันเข้าใจแล้ว-5</div>';
  } else if(xCheck6==0) { 
    alert(xCheck6);
    str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">ฉันเข้าใจแล้ว-6</div>';
  }
  str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ขอทบทวนใหม่</div>';
  str += '<div style="padding:10px;font-size:11px;color:#f68b1f;">คลิกฉันเข้าใจแล้วและไปลุ้นเหรียญรางวัลกันเลย</div>';
  str += '</center><div style="height: 15px;"></div>';

*/








  if(x==1) {
     str += '<div><img src="./img/game1-01.jpg" class="img-game1"></div><center>';
     if(xCheck1==0) {
        str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">ฉันเข้าใจแล้ว</div>';
        str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ขอทบทวนใหม่</div>';
     } else {
        str += '<div class="btn-t3" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
     }
     str += '<div style="padding:10px;font-size:11px;color:#f68b1f;">คลิกฉันเข้าใจแล้วและไปลุ้นเหรียญรางวัลกันเลย</div>';
     str += '</center><div style="height: 15px;"></div>';
  } else if(x==2) { 
     str += '<div><img src="./img/game1-02.jpg" class="img-game1"></div><center>';
     if(xCheck2==0) {
        str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">ฉันเข้าใจแล้ว</div>';
        str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ขอทบทวนใหม่</div>';
     } else {
        str += '<div class="btn-t3" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
     }
     str += '<div style="padding:10px;font-size:11px;color:#f68b1f;">คลิกฉันเข้าใจแล้วและไปลุ้นเหรียญรางวัลกันเลย</div>';
     str += '</center><div style="height: 15px;"></div>';
  } else if(x==3) { 
     str += '<div><img src="./img/game1-03.jpg" class="img-game1"></div><center>';
     if(xCheck3==0) {
        str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">ฉันเข้าใจแล้ว</div>';
        str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ขอทบทวนใหม่</div>';
     } else {
        str += '<div class="btn-t3" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
     }
     str += '<div style="padding:10px;font-size:11px;color:#f68b1f;">คลิกฉันเข้าใจแล้วและไปลุ้นเหรียญรางวัลกันเลย</div>';
     str += '</center><div style="height: 15px;"></div>';
  } else if(x==4) { 
     str += '<div><img src="./img/game1-04.jpg" class="img-game1"></div><center>';
     if(xCheck4==0) {
        str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">ฉันเข้าใจแล้ว</div>';
        str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ขอทบทวนใหม่</div>';
     } else {
        str += '<div class="btn-t3" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
     }
     str += '<div style="padding:10px;font-size:11px;color:#f68b1f;">คลิกฉันเข้าใจแล้วและไปลุ้นเหรียญรางวัลกันเลย</div>';
     str += '</center><div style="height: 15px;"></div>';
  } else if(x==5) { 
     str += '<div><img src="./img/game1-05.jpg" class="img-game1"></div><center>';
     if(xCheck5==0) {
        str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">ฉันเข้าใจแล้ว</div>';
        str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ขอทบทวนใหม่</div>';
     } else {
        str += '<div class="btn-t3" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
     }
     str += '<div style="padding:10px;font-size:11px;color:#f68b1f;">คลิกฉันเข้าใจแล้วและไปลุ้นเหรียญรางวัลกันเลย</div>';
     str += '</center><div style="height: 15px;"></div>';
  } else if(x==6) { 
     str += '<div><img src="./img/game1-06.jpg" class="img-game1"></div><center>';
     if(xCheck6==0) {
        str += '<div class="btn-t1" onclick="BeForRandom('+x+')" style="margin-top:10px;">ฉันเข้าใจแล้ว</div>';
        str += '<div class="btn-t2" onclick="CloseAll()" style="margin-top:10px;">ขอทบทวนใหม่</div>';
     } else {
        str += '<div class="btn-t3" onclick="CloseAll()" style="margin-top:10px;">ปิดหน้าต่างนี้</div>';
     }
     str += '<div style="padding:10px;font-size:11px;color:#f68b1f;">คลิกฉันเข้าใจแล้วและไปลุ้นเหรียญรางวัลกันเลย</div>';
     str += '</center><div style="height: 15px;"></div>';
  }

  $("#DisplayWB").html(str);  
  document.getElementById('id01').style.display='block';
}



function BeForRandom(x) {
   var i = 0;
   var str = "";
   var str1 = "";
   for (i = 0; i < 15; i++) {
     str1 += '<div class="box-number" id="'+i+'" onclick="SelectBox('+i+')">'+NewPoint[i].toFixed(2)+'</div>';
   }
   str += '<div class="random-number"><img src="./img/number.gif" width="100%"></div>';    
   str += '<div class="btn-t33" style="margin-top:15px;">ระบบสุ่มเหรียญรางวัล</div>';
   str += '<div class="text-subtopic3" style="color:#f68b1f;">เพื่อให้คุณได้สนุกกับการลุ้นเหรียญรางวัล<br>คุณคิดว่าคุณจะสุ่มได้เหรียญรางวัลเท่าไร?</div>';
   //str += '<div style="font-size:16px;color:#fff;"><input id="MyPointSelect" type="number" placeholder="ทายเหรียญซิ" pattern="[+-]?[0-9]" style="background:#f68b1f;color:#fff;text-align:center;border-radius:5px;min-height:30px;padding:5px;"></div>';
   str += '<div style="width:90%; margin:10px auto 10px 30px;">'+ str1 +'</div><div class="clr"></div>';
   str += '<div class="text-subtopic3" style="margin-top:10px;">ทายถูกรับเหรียญรางวัล คูณ 2</div>';
   str += '<div class="btn-t1 disabledbutton" id="SubmitApp" onclick="RandomPoint('+x+')" style="margin-top:15px;">คลิกสุ่มเหรียญรางวัล</div><div style="height:30px;"></div>';
   $("#DisplayGetPoint").html(str);
   document.getElementById('id01').style.display='none';
   document.getElementById('id02').style.display='block';
}



function SelectBox(x) {
   sMyPoint = 0;
   var i = 0;
   for (i = 0; i < 15; i++) {
      document.getElementById(i).classList.remove('box-novi');
   }    
   sMyPoint = NewPoint[x].toFixed(2);
   document.getElementById(x).classList.add('box-novi');
   $('#SubmitApp').removeClass('disabledbutton');
}



function RandomPoint(x) {
  str = "";
  var sNewMyPoint = 0;
  NewScore = 0;
  ChangeNow();
  if(sMyPoint==NewScore) { sNewMyPoint=(NewScore*2); }
  else if(sMyPoint!=NewScore) { sNewMyPoint=NewScore; }
  str += '<div class="random-number"><img src="./img/number.gif" width="100%"></div>';    
  str += '<div class="btn-t33" style="margin-top:15px;">ผลการสุ่มเหรียญรางวัล</div>';
  str += '<div style="width:230px; margin:auto;">';
  str += '<div class="random-box" style="margin-right: 10px;">คุณได้ทายเหรียญ<br>ที่จะได้ไว้ที่';
  str += '<div class="get-number">'+sMyPoint+'</div></div>';
  str += '<div class="random-box">เหรียญรางวัล<br>ที่ระบบสุ่มได้<div class="get-number">'+NewScore.toFixed(2)+'</div></div>';
  str += '</div><div class="clr"></div>';
  str += '<div class="random-box1">เหรียญรางวัล<br>ที่ได้รับ<div class="get-number">'+sNewMyPoint.toFixed(2)+'</div></div>';
  str += '<div class="clr"></div>';
  str += '<div class="btn-t2" onclick="CloseAll()">ปิดหน้าต่างนี้</div>';
  str += '<div style="height: 30px;"></div>';
  //alert("XP="+sessionStorage.getItem("XP")+"\nRP="+sessionStorage.getItem("RP"));
  $("#DisplayGetPoint").html(str);  
  SaveDataFWB(x,sNewMyPoint);
  CheckScore();
}



function SaveDataFWB(x,p) {
  //CheckScore();
  //console.log(EidMember);
  console.log(x+"==="+p+"==="+EidMember);
  TimeCount = parseFloat(TimeCount)+1;
  SumPoint = parseFloat(SumPoint)+parseFloat(p);
  SumScore = parseFloat(SumScore)+parseFloat(p);
  if(x==1 && xCheck1==0) {
   dbMember.doc(EidMember).update({
     SubGame11 : p,
     TimeGame1 : TimeCount,
     TotalGame1 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  } else if(x==2 && xCheck2==0) {
   dbMember.doc(EidMember).update({
     SubGame12 : p,
     TimeGame1 : TimeCount,
     TotalGame1 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  } else if(x==3) {
   dbMember.doc(EidMember).update({
     SubGame13 : p,
     TimeGame1 : TimeCount,
     TotalGame1 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  } else if(x==4) {
   dbMember.doc(EidMember).update({
     SubGame14 : p,
     TimeGame1 : TimeCount,
     TotalGame1 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  } else if(x==5) {
   dbMember.doc(EidMember).update({
     SubGame15 : p,
     TimeGame1 : TimeCount,
     TotalGame1 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  } else if(x==6) {
   dbMember.doc(EidMember).update({
     SubGame16 : p,
     TimeGame1 : TimeCount,
     TotalGame1 : parseFloat(SumPoint.toFixed(2)),
     TotalScore : parseFloat(SumScore.toFixed(2))
   });    
  }
  //CheckScore();
}

/*
function CheckUpdate() {
}
*/


function ChangeNow() {
 NewScore = random_item(NewPoint);
}


function random_item(items) {
 return items[Math.floor(Math.random()*items.length)];   
}


function UnLoading() {
  document.getElementById('DisplayPage').style.display='block';
  document.getElementById('DisplayWait1').style.display='block';
  document.getElementById('DisplayWait2').style.display='block';
  document.getElementById('DisplayWait3').style.display='block';
  document.getElementById('DisplayWait4').style.display='block';
  document.getElementById('DisplayWait5').style.display='block';
  document.getElementById('DisplayWait6').style.display='block';
  document.getElementById('DisplayShow1').style.display='none';
  document.getElementById('DisplayShow2').style.display='none';
  document.getElementById('DisplayShow3').style.display='none';
  document.getElementById('DisplayShow4').style.display='none';
  document.getElementById('DisplayShow5').style.display='none';
  document.getElementById('DisplayShow6').style.display='none';
  document.getElementById('UserBoard').style.display='none';
  document.getElementById('UserBoard').style.display='none';
  CheckScore();
}


function LeaderBoard() {
  document.getElementById('DisplayPage').style.display='none';
  document.getElementById('LoadingScore').style.display='block';
  document.getElementById('UserScore').style.display='none';
  document.getElementById('UserBoard').style.display='none';
  var i = 1;
  var str = "";
  str += '<table class="table" style="width:95%;margin:auto;"><tbody>';
  dbMember.orderBy('TotalGame1','desc')
  .limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<tr>';
      str += '<td class="td-center td-padding" style="width:15%;text-align:center;">'+i+'</td>';
      str += '<td class="td-padding" style="width:70%;"><font color="#0056ff">'+doc.data().EmpName+'</font> <font color="#000">(เรียน '+doc.data().TimeGame1+' ครั้ง)</font></td>';
      str += '<td class="td-padding" style="width:15%;text-align:center;"><font color="#000"><b>'+(doc.data().TotalGame1).toFixed(2)+'</b></font></td>';
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
  document.getElementById('DisplayPage').style.display='none';
  document.getElementById('LoadingScore').style.display='none';
  document.getElementById('UserScore').style.display='none';
  document.getElementById('UserBoard').style.display='block';
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
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
}


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
  TopLeaderBoard();
  //loadData();
  CheckMember();
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
}


function TopLeaderBoard() {
  document.getElementById("DisplayTop50").style.display = "block";
  document.getElementById("DisplayMemberG").style.display = "none";
  var i = 1;
  var str = "";
  str += '<div class="text-team" style="padding:0;"><font color="#f68b1f"><b><u>ตารางผู้นำ 50 อันดับแรก</u></b></font><br>ข้อมูลรายชื่อที่คาดว่าจะได้รับรางวัลเมื่อจบการแข่งขัน</div>';
  str += '<table class="table" style="width:95%; margin:20px auto;"><tbody>';
  dbMember
  //.where('EmpTeam','==', xClickMenu)
  .orderBy('TotalScore','desc')
  .limit(50)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      str += '<tr onclick="OpenProfile(\''+ doc.id +'\')" class="LinkProfile">';
      if(doc.data().LinePicture!="") {
        str += '<td class="td-center td-padding" style="width:12%;text-align:center;"><img src="'+doc.data().LinePicture+'" class="profile-team"></td>';
      } else {
        str += '<td class="td-center td-padding" style="width:12%;text-align:center;"><img src="./img/m.png" class="profile-team"></td>';
      }
      str += '<td class="td-padding" style="width:70%;line-height:1.3;"><font color="#0056ff"><b>'+doc.data().EmpName+'</b></font><br>'+doc.data().EmpGroup+'</td>';
      str += '<td class="td-center td-padding" style="width:18%;text-align:center;color:#000;line-height:1.3;"><b>'+i+'</b><br><font color="#0056ff"><b>'+(doc.data().TotalScore).toFixed(2)+'</b></font></td>';
      str += '</tr>';
      i++;
    }); 
    str += '</tbody></table>';
    $("#DisplayTop50").html(str);  
  });
}


function TopAllMember() {
  var str = "";
  document.getElementById("DisplayTop50").style.display = "none";
  document.getElementById("DisplayMemberG").style.display = "block";
  loadData();
}



function loadData() {
  var i = 0;
  var count = 0;
  var dataSet = "";
  var dataSrc = [];
  dbMember.orderBy('TotalScore','desc')
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      i = (i+1);
      xEmpMember = "";
      xTimegetBox = "";
      var xImg = "";
      var xText = "";
      if(doc.data().LinePicture!="") {
        xImg += '<img src="'+doc.data().LinePicture+'" class="profile-team">';
      } else {
        xImg += '<img src="./img/m.png" class="profile-team">';
      }
      xText += '<div style="font-size:11px;line-height:1.3"><font color="#0056ff"><b>'+doc.data().EmpName+'</b></font><br>'+doc.data().EmpGroup+'</b></div>';
      dataSet = [xImg, xText, "<div class='btn-t6' id="+i+">"+(doc.data().TotalScore).toFixed(2)+"</div>", doc.id, i];
      dataSrc.push(dataSet);
      count++;
    }); 

    dTable=$('#ex-table').DataTable({
      "bDestroy": true,    
      data: dataSrc,
      columns: [
        //{ title: "EmpID", className: "txt-center" },
        { title: "รูป", className: "txt-center" },
        { title: "รายละเอียด" },
        { title: "รายการ", className: "txt-center" },
        ],
/*
        "bLengthChange": false
*/
        dom: 'lfrtipB',
        buttons: [
            //'copy', 'excelFlash', 'excel', 'pdf', 'print'
        ],
          //lengthMenu: [[50, 100, 200, -1], [50, 100, 200, "All"]],
          lengthMenu: [[30, 50, 100, 200, -1], [30, 50, 100, 200, "All"]],
          columnDefs: [ { type: 'num-fmt', 'targets': [0] } ],
          order: [[ 1, 'asc']]
        //dom: 'Bfrtip', buttons: [ 'copy', 'csv', 'excel', 'pdf', 'print' ]
      });   
      $('#ex-table tbody').on( 'click', 'tr', function () {
        var data = dTable.row( $(this).parents('tr') ).data();
        if(count!=0) {
            //ClickID(dTable.row( this ).data()[4],dTable.row( this ).data()[3]);
            OpenProfile(dTable.row( this ).data()[3]);
        }
        //console.log(dTable.row( this ).data()[6]);
      });
  });
  $('#ex-table').DataTable().destroy();
  $("#ex-table tbody").remove();
  //$('#example').dataTable( { "lengthChange": false } );
}




function OpenProfile(uid) {
  var str = "";
  dbMember.where(firebase.firestore.FieldPath.documentId(), "==", uid)
  .get().then((snapshot)=> {
  snapshot.forEach(doc=> {
      if(doc.data().LinePicture!="") { 
        str += '<center><div><img src="'+doc.data().LinePicture+'" class="add-profile" style="margin:10px auto;"></div>';
      } else {
        str += '<div style="text-align:center;"><img src="./img/m.png" class="add-profile"></div>';
      }
      str += '<div class="NameLine">'+doc.data().EmpName+'</div></center>';
      str += '<center><div class="btn-t4" style="width:130px;">'+ (doc.data().TotalScore).toFixed(2) +' คะแนน</div></center>';
      str += '<div class="clr" style="height:10px;"></div>';
      str += '<div class="box-menu0" onclick="GotoGame(1)"><img src="./img/apptouch.png" style="width:60px;"><div class="text-team1">รู้จักทัชให้มากขึ้น</div><div class="btn-t333">'+ (doc.data().TotalGame1).toFixed(2) +' คะแนน</div></div>';
      str += '<div class="box-menu0" onclick="GotoGame(2)"><img src="./img/learning.png" style="width:60px;"><div class="text-team1">เรียนรู้ผลิตภัณฑ์</div><div class="btn-t333">'+ (doc.data().TotalGame2).toFixed(2) +' คะแนน</div></div>';
      str += '<div class="box-menu0" onclick="GotoGame(3)"><img src="./img/youknow.png" style="width:60px;"><div class="text-team1">เรียนรู้การใช้งาน</div><div <div class="btn-t333">'+ (doc.data().TotalGame3).toFixed(2) +' คะแนน</div></div>';
      str += '<div class="box-menu0" onclick="GotoGame(4)"><img src="./img/question.png" style="width:60px;"><div class="text-team1">คำถามประจำวัน</div><div <div class="btn-t333">'+ (doc.data().TotalGame4).toFixed(2) +' คะแนน</div></div>';
      str += '<div class="clr"></div>';
    });
    $("#DisplayProfile").html(str);  
    document.getElementById("id01").style.display = "block";
  });
}


function CloseAll() {
  document.getElementById('id01').style.display='none';
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

/*
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
      $("#ShowUserSumTime1").html("<font color='#f68b1f'>"+CalAllTime+'</font><div class="ScoreGame4-text">จำนวน<br>ลงทะเบียน</div>');
      $("#ShowUserSumTime2").html("<font color='#2dcc02'>"+CalTrue.toFixed(2) +'%</font><div class="ScoreGame4-text">จำนวน<br>ผู้แข่งขัน</div>');
      $("#ShowUserSumTime3").html("<font color='#ff0000'>"+CalFalse.toFixed(2) +'%</font><div class="ScoreGame4-text">%การตอบ<br>คำถามผิด</div>');
      $("#ShowUserSumTime4").html("<font color='#0056ff'>"+doc.data().TotalScore.toFixed(2) +'</font><div class="ScoreGame4-text">%การตอบ<br>คำถามผิด</div>');
*/
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

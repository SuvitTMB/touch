var cleararray = "";

var dateString = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var UserPlay = 0;
var sGroupQuiz = "MainBank";
var EQuizForm = "";
var ChoiceSelect = "";
var TextSelectChoice = "";
var CheckType = 0;
var YourScore = 0;
//var sUserSumQuiz = 0;
var CheckAddEdit = 0;
var CountRec = 0;
var Eid = "";
var EidScorePoint = "";
var CheckQuiz = 0;
var sUserSumTime = 0; 
var sUserSumTrue = 0;
var sUserSumFalse = 0;
var sUserSumFree = 0;
var sTotalGame4 = 0;
var sTotalScore = 0;
var NewRandom = 0;
var ChangePoint = 0;
var newScore = 0;
var LastScore = 0;

$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_touch")==null) { location.href = "index.html"; }
  $("#ToDayDate").html("คำถามประจำวันที่<br>"+today);  
  Connect_DB();
  CheckRewards();
  CheckUserScore();
  CheckUserQuiz();
  //Card();
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
  db = firebase.firestore().collection("QuizoftheDay");
  dbMember = firebase.firestore().collection("touch_member");
  dbQuiz = firebase.firestore().collection("touch_quiz");
  dbRewards = firebase.firestore().collection("touch_rewards");
}


var EidRewards = "";
var xCheckRewards = 0;
var xAllUserTure = 0;
var xAllUserFalse = 0;
var xAllUserQuiz = 0;

function CheckRewards() {
  dbRewards.where('QuizDate','==',today)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      xCheckRewards = 1;
      EidRewards = doc.id;
      xAllUserTure = doc.data().AllUserTure;
      xAllUserFalse = doc.data().AllUserFalse;
      xAllUserQuiz = doc.data().AllUserQuiz;
      console.log(EidRewards);
    });
    if(xCheckRewards==0) {
      AddNewRewards();
    }
  });
}


function AddNewRewards() {
  var TimeStampDate = Math.round(Date.now() / 1000);
  dbRewards.add({
    QuizDate : today,
    AllUserTure :  0,
    AllUserFalse : 0,
    AllUserQuiz : 0,
    TimeStamp : TimeStampDate,
    CheckGetGift : 0
  });
  //console.log("Add New");
  CheckRewards();
}


function CheckUserScore() {
  dbMember.where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidScorePoint = doc.id;
      sUserSumTime = doc.data().UserSumTime;
      sUserSumTrue = doc.data().UserSumTrue;
      sUserSumFalse = doc.data().UserSumFalse;
      sUserSumFree = doc.data().UserSumFree;
      sTotalGame4 = doc.data().TotalGame4;
      sTotalScore = doc.data().TotalScore;
      var CalTrue = ((doc.data().UserSumTrue/doc.data().UserSumTime)*100);
      var CalFalse = ((doc.data().UserSumFalse/doc.data().UserSumTime)*100);
      $("#ShowUserSumTime1").html("<font color='#f68b1f'>"+doc.data().UserSumTime+'</font><div class="ScoreGame4-text">จำนวน<br>แข่งสะสม</div>');
      $("#ShowUserSumTime2").html("<font color='#2dcc02'>"+CalTrue.toFixed(2) +'%</font><div class="ScoreGame4-text">%การตอบ<br>คำถามถูก</div>');
      $("#ShowUserSumTime3").html("<font color='#ff0000'>"+CalFalse.toFixed(2) +'%</font><div class="ScoreGame4-text">%การตอบ<br>คำถามผิด</div>');
      $("#ShowUserSumTime4").html("<font color='#0056ff'>"+doc.data().TotalGame4.toFixed(2) +'</font><div class="ScoreGame4-text">คะแนนสะสม<br>ล่าสุด</div>');
    });
  });
}

function CheckUserQuiz() {
  var str = "";
  dbQuiz.where('QuizDate','==',today)
  .where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      Eid = doc.id;
      CountRec = CountRec+1;
      LastScore = doc.data().PointOUT;
      newScore = doc.data().PointOUT;
      CheckQuiz = 1;
      str += 'คุณตอบคำถามประจำวันนี้ไปเรียบร้อยแล้ว<br>';
      str += 'วันนี้คุณทำคะแนนได้ <font color="#0056ff"><b>'+doc.data().PointOUT+'</b></font> คะแนน';
      //str += 'วันนี้คุณทำคะแนนได้ <font color="#0056ff"><b>'+(doc.data().PointOUT).toFixed(2)+'</b></font> คะแนน';
      $("#ShowPointToDay").html(str);  

    });
    if(Eid=="") {
      CountRec = 0;
      LastScore = 0;
    } 
    if(CheckQuiz==0) {
      //rdocument.getElementById("QuizDetail").style.display = "block";
      sessionStorage.setItem("QuizOFtheDay", "False");
      Card();
      document.getElementById("Loading").style.display = "none";
      document.getElementById("QuizComplete").style.display = "none";
      document.getElementById("DiaplayBox").style.display = "block";
    } else if(CheckQuiz==1) { 
      sessionStorage.setItem("QuizOFtheDay", "");
      //document.getElementById("QuizDetail").style.display = "none";
      /*
        console.log(newScore);
      if(newScore!=undefined) {
        str += 'คุณตอบคำถามประจำวันนี้ไปเรียบร้อยแล้ว<br>';
        //str += 'วันนี้คุณทำคะแนนได้ <font color="#0056ff"><b>'+LastScore.toFixed(2)+'</b></font> คะแนน';
        str += 'วันนี้คุณทำคะแนนได้ <font color="#0056ff"><b>'+newScore.toFixed(2)+'</b></font> คะแนน';
        $("#ShowPointToDay").html(str);  
      }
      */
      document.getElementById("Loading").style.display = "none";
      document.getElementById("QuizComplete").style.display = "block";
      document.getElementById("DiaplayBox").style.display = "none";
    }
  });
}


function Card() { 
  if(sessionStorage.getItem("EmpID_touch")!="") {
    var i = 0;
    var a = 0;
    var atr = '';
    var str = '';
    var btr = '';
    var Nub_end = 9 ;
    $("#BoxGame").val(cleararray);
    for (i = 0; i < Nub_end; i++) {
      a = a+1;
      str+='<div class="flip-card" onclick="OpenCard('+(i+1)+');"><img src="./img/quiz_0'+(i+1)+'.jpg" alt="Avatar" class="a_image">';
      str+='<div class="overlay"><img src="./img/png-'+(i+1)+'.png" style="width:50px;margin-top:4px;">';
      if(a==1) {
        str+='<div class="flip-text">การเงินรอบด้าน<br>ของชีวิต ดีขึ้นได้</div>';
      } else if(a==2) {
        str+='<div class="flip-text">ให้คุณไม่พลาดใน<br>ทุกธุรกรรมสำคัญ</div>';
      } else if(a==3) {
        str+='<div class="flip-text">จัดการทุกเรื่อง<br>สำคัญในชีวิต</div>';
      } else if(a==4) {
        str+='<div class="flip-text">สะดวกเหมือน<br>ไปสาขา</div>';
      } else if(a==5) {
        str+='<div class="flip-text">ทุกความยุ่งยาก<br>จะหมดไป</div>';
      } else if(a==6) {
        str+='<div class="flip-text">ได้รับคืนมากกว่า<br>ในทุกการใช้งาน</div>';
      } else if(a==7) {
        str+='<div class="flip-text">บริการ<br>กองทุน</div>';
      } else if(a==8) {
        str+='<div class="flip-text">บริการ<br>ประกัน</div>';
      } else if(a==9) {
        str+='<div class="flip-text">บริการ<br>สินเชื่อ</div>';
      }
      str+='</div></div>';
    }
    btr+=atr+str+'</div>';
    //atr+='</center>';
    $("#BoxGame").html(btr);
  } else {
    GotoWeb();
  }
}



function OpenCard(x) { 
  document.getElementById("id01").style.display = "none";
  var str = "";
  str += '<div><img src="./img/game1-0'+x+'.jpg" class="img-game1"></div>';
  if(UserPlay==0) { // 0=ยังไม่ได้เล่น 1=เล่นแล้ว
    str += '<div class="btn-t1" onclick="RandomCard1()">เปิดภาพนี้</div><div class="btn-t3" onclick="CloseAll()">เปลี่ยนภาพอื่น</div>';
    str += '<div class="title-text-random">กิจกรรมเปิดภาพลุ้นรางวัล<br>คุณสามารถเปิดภาพได้เพียงวันละ 1 ภาพเท่านั้น</div>';
    str += '<div class="clr" style="height:15px;"></div>';
  } else {
    str += '<div class="btn-t0" onclick="CloseAll()">ปิดหน้าต่าง</div>';
    str += '<div class="clr" style="height:15px;"></div>';
  }
  $("#ShowStory").html(str);
  document.getElementById("id02").style.display = "block";
}


function RandomCard1() {
  document.getElementById("id03").style.display = "none";
  var newPoint = [0, 0, 1, 2, 0, 0, 0, 0, 0];
  NewRandom = random_item(newPoint);
  if(NewRandom==0) {
    RandomCard();
  } else {
    NewDate();
    var TimeStampDate = Math.round(Date.now() / 1000);
    dbQuiz.add({
      GroupQuiz : "Extra Point",
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_touch"),
      EmpName : sessionStorage.getItem("EmpName_touch"),
      EmpGroup : sessionStorage.getItem("EmpGroup_touch"),
      QuizDate : today,
      RefID : "", //add
      QuizType : 0,
      Quetion :  "",
      Answer : "",
      AnswerTxt : "", //add
      ResultQuiz : "",
      PointIN : parseFloat(NewRandom),
      ChangePoint : 0,
      PointOUT : parseFloat(NewRandom),
      LastScore : 0,
      Rewards : 0,
      DateRewards : "",
      DateRegister : dateString,
      TimeStamp : TimeStampDate
    });
    dbMember.doc(EidScorePoint).update({
      TimeGame4 : parseFloat(sUserSumTime)+1,
      UserSumTime : parseFloat(sUserSumTime)+1,
      UserSumFree : sUserSumFree + 1,
      UserSumTrue : sUserSumTrue + 1,
      TotalGame4 : parseFloat(sTotalGame4) + parseFloat(NewRandom),
      TotalScore : parseFloat(sTotalScore) + parseFloat(NewRandom)
    });
    var str1 = "";
    str1 += '<div class="text-team">ดีใจด้วยน้า<br>วันนี้คุณไม่ต้องตอบคำถาม<div>';
    str1 += '<div><img src="./img/congratulations@.gif" style="margin-top:15px;width:100%;border-radius: 12px;"></div>';
    str1 += '<div class="text-team" style="padding-top:15px;font-weight:600;">วันนี้คุณได้รับ '+parseFloat(NewRandom).toFixed(2)+' คะแนน</div>';
    $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(NewRandom).toFixed(2) +" คะแนน</div>");
    $("#ShowEndPoint").html(str1);
    document.getElementById("QuizComplete").style.display = "block";
    document.getElementById("DiaplayBox").style.display = "none";
    document.getElementById("id04").style.display = "block";
  }
}



function CheckBottom() {
  if(Bottom_3==0) { 
    var str = '';
    $("#Bottom_3").val(cleararray);
    str+='<div class="btn-t3" onclick="QuizGame_3();">เริ่มเปิดภาพมหาสนุก</div>';
    $("#Bottom_3").html(str);
  } else {
    var str = '';
    $("#Bottom_3").val(cleararray);
    str+='<div class="btn0">วันนี้คุณเข้าร่วมกิจกรรมนี้แล้ว</div>';
    $("#Bottom_3").html(str);
  }
}


function WaitLoading() {
    var timeleft = 5;
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
      clearInterval(downloadTimer);
      RandomQuestion();
    }
      document.getElementById("progressBar").value = 6 - timeleft;
      timeleft -= 1;
    }, 500);
    $('.noshow').hide();
    str+='<div><img src="./img/load2.gif" style="padding-top:0px;width:90%;"></div>';
    str+='<div><progress value="0" max="'+timeleft+'" id="progressBar"></progress></div>';
    $("#DisplayLoading").html(str);
}



var sTypeSelect = "";
function RandomCard() { 
  var str = '';
  Bottom_3 = 1;
  CheckBottom();
  //CheckScorePoint();
  //alert("ID : "+EidScorePoint+" Score = "+sRewardsXP);
  $("#ShowStory").val(cleararray);
  var RandomCardNumber = [sGroupQuiz];
  var ShowCardNumber = RandomCardNumber[Math.floor(Math.random() * RandomCardNumber.length)];
  YourScore = ShowCardNumber;
  if(CountRec!=0) {
    document.getElementById('id01').style.display='none';
    CheckUserQuiz();
  } 
  if(ShowCardNumber==0) {
    str+='<div><center><div style="width:100%;margin-top:10px;"><div class="card-title">ผลการเปิดภาพกิจกรรม</div>';
    str+='<div style="text-align: center;">';
    str+='<div><img src="./img/sorry-1.png" width="170px;"></div>';
    str+='<div class="txt-qq" style="color:#f68b1f;">เสียใจด้วย วันนี้คุณเปิดภาพไม่เจอคะแนน<div>';
    str+='<div style="color:#f68b1f;font-size:13px;">พรุ่งนี้กลับมาลุ้นคะแนนกันใหม่น้า</div>';
    str+='<div class="btn-t0" onclick="CloseAll()" style="margin-top:12px;">ปิดหน้าต่างนี้</div></div></center></div>';
    $("#ShowStory").html(str);
    sTypeSelect = "เปิดภาพได้ 0 คะแนน";
    if(CountRec==0) {
      CheckAddEdit = 2;
      YourScore = 0;
      AddNewUser();
      SaveMyScorePoint();
    }
  } else if(ShowCardNumber==1 || ShowCardNumber==2) {
    sTypeSelect = "เปิดภาพได้ "+ShowCardNumber+" คะแนน";
    CheckPoint = ShowCardNumber;
    //ExtraPoint = ShowCardNumber;
    YourScore = ShowCardNumber;
    //sRewardsXP = (parseFloat(sRewardsXP)+parseFloat(ShowCardNumber));
    //sRewardsRP = (parseFloat(sRewardsRP)+parseFloat(ShowCardNumber));
    str+='<div><center><div style="width:100%;margin-top:10px;"><div class="card-title">ผลการเปิดภาพกิจกรรม</div>';
    str+='<div style="margin-left:10px;text-align: center;">';
    //str+='<div style="margin:30px;"><img src="./img/true.png" width="60px;"></div>';
    str+='<div style="font-size:24px;color:#0056ff;padding:10px 0 20px 0;">';
    str+= '<div><img src="./img/happy@.jpg" width="200px;"></div>';
    str+='<div style="font-size:14px;color:#f68b1f;">ยินดีด้วย</div>';
    str+='คุณได้รับ '+ShowCardNumber+' คะแนน</div><div>ได้รับคะแนนกันไปง่าย ๆ<br>พรุ่งนี้กลับมาเล่นกันใหม่น้า</div>';
    str+='<div class="btn-t0" onclick="CloseAll()" style="margin-top:12px;">ปิดหน้าต่างนี้</div></div></center><br><br></div>';
    $("#ShowStory").html(str);
    //alert("Save --> ได้คะแนน = "+sRewardsXP);
      //alert(CountRec);
    if(CountRec==0) {
      CheckAddEdit = 2;
      AddNewUser();
      SaveMyScorePoint();
      //SaveMyScore();
      //SaveMyScorePoint();
    }
  } else if(ShowCardNumber==sGroupQuiz) {
    sTypeSelect = "ตอบคำถาม";
  //var str = "";
    var timeleft = 5;
    var downloadTimer = setInterval(function(){
    if(timeleft <= 0){
      clearInterval(downloadTimer);
      RandomQuestion();
      //alert("Time Out");
    }
    document.getElementById("progressBar").value = 6 - timeleft;
    timeleft -= 1;
  }, 500);

    $('.noshow').hide();
    str+='<center><div style="width:100%;margin-top:20px;"><div class="card-title">เตรียมพร้อมตอบคำถามประจำวัน</div>';
    str+='<div style="margin-left:10px;text-align: center;">';
    str+='<div style="margin:40px auto;"><img src="./img/timer.gif" width="230px;"></div>';
    str+='<div class="text-team">ระบบจะพาคุณไปสู่การตอบคำถามประจำวัน<br><font color="#ff0000">กรุณาอย่าออกจากหน้านี้จนกว่าจะตอบคำถามเสร็จ</font></div>';
    str+='<div><progress value="0" max="'+timeleft+'" id="progressBar"></progress></div></div></center><br><br>';
    //str+='<br><div class="btn-t1" onclick="RandomQuestion()" style="margin-top:12px;">ถ้าพร้อมแล้วไปตอบคำถามกัน</div></div></center><br><br>';
    $("#ShowStory").html(str);
    if(CountRec==0) {
       CheckAddEdit = 2;
       AddNewUser();
    } else {
      document.getElementById('id02').style.display='none';
      document.getElementById('id03').style.display='none';
      
    }
    //SaveMyScorePoint();
  }
}



var i = 0;
var ArrQuestion = [];
var NewQuestion = "";

function RandomQuestion() {
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='block';
  //db.where('GroupQuiz','==',sGroupQuiz)
  db.where('QuizStatus','==',1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=>{
      i = i+1;
      ArrQuestion.push([doc.id]);
    });
    //console.log(ArrQuestion);
    //alert("จำนวนข้อมูลรวม = "+i+" รายการ");
    NewQuestion = random_item(ArrQuestion);
    EidQuestion = NewQuestion[0];
    GetQuestion();
  }); 
}


function GetQuestion() {
  $("#DisplayDay").val(cleararray);
  $("#DisplayQuestion").val(cleararray);
  $("#DisplayChoice").val(cleararray);
  $("#DisplayTimer").val(cleararray);
  db.where(firebase.firestore.FieldPath.documentId(), "==", EidQuestion)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EQuizDate = doc.data().QuizDate;
      EQuizQuizTimer = Number(doc.data().QuizTimer);
      now = new Date();
      timeup = now.setSeconds(now.getSeconds() + Number(doc.data().QuizTimer));
      counter = setInterval(timer, 1000);
      timer();
      //console.log(doc.data().QuizDate+"==="+doc.data().QuizQuestion);
      CheckType = doc.data().QuizTypeQuestion;
      CheckQuizQuestion = doc.data().QuizQuestion;
      CheckQuizAnswer = doc.data().QuizAnswer;
      CheckQuizAnswerText = doc.data().QuizAnswerText;
      CheckPoint = doc.data().QuizPoint;
      SumQuiz = doc.data().SumQuiz;
      SumChoice1 = doc.data().SumChoice1;
      SumChoice2 = doc.data().SumChoice2;
      SumChoice3 = doc.data().SumChoice3;
      SumChoice4 = doc.data().SumChoice4;
      SumQuizTrue = doc.data().SumQuizTrue;
      SumQuizFalse = doc.data().SumQuizFalse;

      if(doc.data().QuizTypeQuestion=="1") {
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ today +"</i></div>");
        $("#DisplayQuestion").html("<div class='txt-qq'>"+ doc.data().QuizQuestion +" | "+doc.data().QuizAnswer+"</div>");
        EQuizForm += "<div style='margin-top:20px;'></div><center>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(1,\""+ doc.data().QuizChoice1 +"\")' id='answer1'><input type='radio'>"+ doc.data().QuizChoice1 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(2,\""+ doc.data().QuizChoice2 +"\")' id='answer2'><input type='radio'>"+ doc.data().QuizChoice2 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(3,\""+ doc.data().QuizChoice3 +"\")' id='answer3'><input type='radio'>"+ doc.data().QuizChoice3 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(4,\""+ doc.data().QuizChoice4 +"\")' id='answer4'><input type='radio'>"+ doc.data().QuizChoice4 +"</div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswerQuiz()'>ส่งคำตอบ</div><div class='clr'></div>";
        EQuizForm += "<div class='text-team' style='margin:8px auto 30px auto;color:#ff0000;'>เลือกคำตอบของคุณ แล้วกด 'ส่งคำตอบ'<br><br></div>";
        EQuizForm += "</center>";
      } else if(doc.data().QuizTypeQuestion=="2") {
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        if(doc.data().QuizQuestion!=null) {
          $("#DisplayQuestion").html("<div><img src='"+ doc.data().QuizImg +"' class='imggame' style='max-width:370px;width:90%;'><div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div><img src='"+ doc.data().QuizImg +"' class='imggame' style='max-width:370px;width:90%;'></div>");
        }
        EQuizForm += "<div><input type='text' id='SendCheckType2' placeholder='กรอกคำตอบของคุณ ..' style='margin-top:25px;width:250px !important;text-align: center; color:#0056ff;font-size:13px;' onkeyup='ChkText()'></div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswerQuiz()'>ส่งคำตอบ</div><div id='chars' style='color:#0016ed;'></div><br><br>";
      } else if(doc.data().QuizTypeQuestion=="3") {
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        if(doc.data().QuizVDO!=null) {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"<div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"</div>");
        }
        EQuizForm += "<div style='margin-top:20px;'></div><center>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(1,\""+ doc.data().QuizChoice1 +"\")' id='answer1'><input type='radio'>"+ doc.data().QuizChoice1 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(2,\""+ doc.data().QuizChoice2 +"\")' id='answer2'><input type='radio'>"+ doc.data().QuizChoice2 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(3,\""+ doc.data().QuizChoice3 +"\")' id='answer3'><input type='radio'>"+ doc.data().QuizChoice3 +"</div>";
        EQuizForm += "<div class='quiz-choice' onclick='ClickChoice(4,\""+ doc.data().QuizChoice4 +"\")' id='answer4'><input type='radio'>"+ doc.data().QuizChoice4 +"</div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswerQuiz()'>ส่งคำตอบ</div><br><br>";
        EQuizForm += "</center>";
      } else if(doc.data().QuizTypeQuestion=="4") {
        //$("#DisplayDay").html("<div class='txt-q'><i>คำถามประจำวันที่ : "+ doc.data().QuizDate +"</i></div>");
        if(doc.data().QuizVDO!=null) {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"<div class='txt-qq'>"+doc.data().MoreDetail+"</div></div>");
        } else {
          $("#DisplayQuestion").html("<div>"+ doc.data().QuizVDO +"</div>");
        }
        EQuizForm += "<div><input type='text' id='SendCheckType4' placeholder='กรอกคำตอบของคุณ ..' style='margin-top:10px;width:250px !important;text-align: center; color:#0056ff;font-size:13px;' onkeyup='ChkText4()'></div>";
        EQuizForm += "<div id='SubmitAns' class='btn-t0' onclick='SendAnswerQuiz()'>ส่งคำตอบ </div><br><br><div id='chars4' style='color:#ffffff;'><div>";
        EQuizForm += "<div style='height:20px;'></div>";
      }
      $("#DisplayTimer").html("<center><div id='timer' class='timer'></div></center>");
    });
    $("#DisplayChoice").html(EQuizForm);
  });
}


function random_item(items) {
  return items[Math.floor(Math.random()*items.length)];   
}


function timer() {
  now = new Date();
  count = Math.round((timeup - now)/1000);
  if (now > timeup) {
      window.location = "#"; //or somethin'
      $("#timer").html("<font color='#ffff00'>หมดเวลาตอบคำถาม</font>");
      document.getElementById("SubmitAns").style.display = "none";
      //alert("หมดเวลา");
      clearInterval(counter);
      //SendAnswerQuiz();
      SaveData();
      return;
  }
  var seconds = Math.floor((count%60));
  var minutes = Math.floor((count/60) % 60);
  if(seconds<10) { seconds="0"+seconds } 
  $("#timer").html("เหลือเวลาอีก <font color='#ffff00'>" + minutes + " นาที " + seconds  + " วินาที</font>");
  //document.getElementById("timer").innerHTML = minutes + ":" + seconds;
}

function GotoWeb() {
  window.location.href = 'game4.html.html';
}


function ClickChoice(x) {
  ChoiceSelect = x;
  //alert("เลือกคำตอบข้อที่ "+ ChoiceSelect);
  if(x==1) {
    document.getElementById("answer1").className = 'quiz-choice SelectQ'; 
    document.getElementById("answer2").className = 'quiz-choice'; 
    document.getElementById("answer3").className = 'quiz-choice'; 
    document.getElementById("answer4").className = 'quiz-choice'; 
    document.getElementById("SubmitAns").className = 'btn-t0 SelectA'; 
  } else if(x==2) {
    document.getElementById("answer1").className = 'quiz-choice'; 
    document.getElementById("answer2").className = 'quiz-choice SelectQ'; 
    document.getElementById("answer3").className = 'quiz-choice'; 
    document.getElementById("answer4").className = 'quiz-choice'; 
    document.getElementById("SubmitAns").className = 'btn-t0 SelectA'; 
  } else if(x==3) {
    document.getElementById("answer1").className = 'quiz-choice'; 
    document.getElementById("answer2").className = 'quiz-choice'; 
    document.getElementById("answer3").className = 'quiz-choice SelectQ'; 
    document.getElementById("answer4").className = 'quiz-choice'; 
    document.getElementById("SubmitAns").className = 'btn-t0 SelectA'; 
  } else if(x==4) {
    document.getElementById("answer1").className = 'quiz-choice'; 
    document.getElementById("answer2").className = 'quiz-choice'; 
    document.getElementById("answer3").className = 'quiz-choice'; 
    document.getElementById("answer4").className = 'quiz-choice SelectQ'; 
    document.getElementById("SubmitAns").className = 'btn-t0 SelectA'; 
  }
}



function SendAnswerQuiz() {
  //alert("ChoiceSelect="+ChoiceSelect);
  //alert("คะแนนที่ได้ "+YourScore);

  //if(CheckPoint!=0) {
  //  LastScore = CheckPoint;
  //}
  if(CheckType==1) {
      if(ChoiceSelect==CheckQuizAnswer) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
      }
  } else if(CheckType==2) {
      ChoiceSelect = 0;
      TextSelectChoice = document.getElementById('SendCheckType2').value;
      if(TextSelectChoice==CheckQuizAnswerText) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
      }
  } else if(CheckType==3) {
      if(ChoiceSelect==CheckQuizAnswer) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
      }
  } else if(CheckType==4) {
      ChoiceSelect = 0;
      TextSelectChoice = document.getElementById('SendCheckType4').value;
      //alert(TextSelectChoice+" --- "+CheckQuizAnswerText)
      if(TextSelectChoice==CheckQuizAnswerText) {
        YourScore = CheckPoint;
        sUserSumTrue = sUserSumTrue+1;
      } else {
        YourScore = 0;
        sUserSumFalse = sUserSumFalse+1;
      }
  }
  //alert(YourScore);
  SaveData();
}


var typeResult = "";
var xPointIN = 0;
var xPointOUT = 0;
function SaveData() {
  NewDate();
  var TimeStampDate = Math.round(Date.now() / 1000);
  var typeResult = "";
  if(YourScore==0) {
    typeResult = "False";
    xPointIN = 0;
    xPointOUT = 0;
  } else {
    typeResult = "True";
    xPointIN = 1;
    xPointOUT = newScore;
  }
  if(CheckAddEdit==2) { 
    dbQuiz.doc(Eid).update({
      GroupQuiz : "Quiz of The Day",
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_touch"),
      EmpName : sessionStorage.getItem("EmpName_touch"),
      EmpGroup : sessionStorage.getItem("EmpGroup_touch"),
      QuizDate : today,
      RefID : EidQuestion, //add
      QuizType : CheckType,
      Quetion :  CheckQuizQuestion,
      Answer : ChoiceSelect,
      AnswerTxt : TextSelectChoice, //add
      ResultQuiz : typeResult,
      PointIN : parseFloat(xPointIN) ,
      PointOUT : parseFloat(xPointOUT),
      ChangePoint : ChangePoint,
      LastScore : YourScore,
      Rewards : 0,
      DateRewards : "",
      DateRegister : dateString,
      TimeStamp : TimeStampDate
    });
  }

  if(CheckAddEdit==2) {
    SaveMyScorePoint();
    SaveQuestion();
    ClearQuiz();
  } else {
    document.getElementById('id03').style.display='none';
    //document.getElementById('id04').style.display='block';
  }
}


function SaveMyScorePoint() { 
  dbMember.doc(EidScorePoint).update({
    TimeGame4 : parseFloat(sUserSumTime)+1,
    UserSumTime : parseFloat(sUserSumTime)+1,
    UserSumTrue : sUserSumTrue,
    UserSumFalse : sUserSumFalse,
    TotalGame4 : parseFloat(sTotalGame4) + 1,
    TotalScore : parseFloat(sTotalScore) + 1
  });
}


function SaveQuestion() { 
  SumQuiz = SumQuiz + 1; 
  if(YourScore==0) {
    SumQuizFalse = SumQuizFalse + 1;
  } else if(YourScore!=0) {
    SumQuizTrue = SumQuizTrue + 1;
  }
  if(ChoiceSelect==1) { SumChoice1 = SumChoice1+1; } else
  if(ChoiceSelect==2) { SumChoice2 = SumChoice2+1; } else
  if(ChoiceSelect==3) { SumChoice3 = SumChoice3+1; } else
  if(ChoiceSelect==4) { SumChoice4 = SumChoice4+1; } 
  db.doc(EidQuestion).update({
    SumQuiz : SumQuiz,
    SumQuizTrue : SumQuizTrue,
    SumQuizFalse : SumQuizFalse,
    SumChoice1 : SumChoice1,
    SumChoice2 : SumChoice2,
    SumChoice3 : SumChoice3,
    SumChoice4 : SumChoice4
  });
  if(xPointOUT!=0) {
    dbRewards.doc(EidRewards).update({
      AllUserQuiz : parseFloat(xAllUserQuiz) + 1,
      AllUserTure : parseFloat(xAllUserTure) + 1,
    }); 
  } else {
    dbRewards.doc(EidRewards).update({
      AllUserQuiz : parseFloat(xAllUserQuiz) + 1,
      AllUserFalse : parseFloat(xAllUserFalse) + 1
    });
  }
}



function ClearQuiz() {
  var a = "";
  clearInterval(counter);
  document.getElementById("timer").innerHTML = ""; 
  document.getElementById("DisplayTimer").innerHTML = ""; 
  document.getElementById("DisplayChoice").innerHTML = ""; 
  document.getElementById("DisplayQuestion").innerHTML = ""; 
  document.getElementById("DisplayChoice").innerHTML = ""; 
  //alert(YourScore);
  if(YourScore!=0) {
    var str1 = "";
    var str2 = "";
    LastScore = YourScore;
    $("#DisplayQuestion").html("<div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้<div class='btn-t2'>คุณทำคะแนนได้ "+ LastScore +" คะแนน</div></div>");
    str2 += '<div><img src="./img/true.png" width="70px;"></div>';
    str2 += '<div class="txt-qq" style="color:#0056ff;">ยินดีด้วยคุณตอบคำถามได้ถูกต้อง<br>เรามีข้อเสนอให้คุณ<div>';
    str2 += '<div style="padding:10px 0;color:#f68b1f">คุณสามารถเปลี่ยนคะแนนที่ได้รับได้ใหม่<br>โดยคุณอาจจะได้รับคะแนนที่ <b>เพิ่มขึ้น</b> หรือ <b>ลดลง</b> ก็ได้</div>';
    str2 += '<div class="btn-t1" onclick="ChangeNow()">ลุ้นคะแนนใหม่</div><div class="btn-t2" onclick="NoChangeNow()">รับ 1 คะแนน</div>';
    str2 += '<div style="padding:15px 10px;">ช่วงคะแนนใหม่ที่จะได้อยู่ระหว่าง 0.3 - 1.70 คะแนน<br>คุณต้องรู้จักการบริหารความเสี่ยงด้วยน้า</div><br><br>';
    $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(LastScore).toFixed(2) +" คะแนน</div>");
    $("#DisplayChoice").html(str2);
  } else {
    LastScore = 0;
    $("#DisplayQuestion").html("<div class='txt-qq'>คุณได้เข้าร่วมกิจกรรมนี้ไปแล้วในวันนี้<div>คุณทำคะแนนได้ : <span class='txt-qqq'>"+ LastScore +"</span> คะแนน</div></div>");
    var str2 = "";
    str2 += '<center><div><img src="./img/false.png" width="100px;"></div>';
    str2 += '<div class="txt-qq" style="color:#f68b1f;">เสียใจด้วยน้า<div>';
    str2 += '<div style="padding:10px 0;color:#000000">วันนี้คุณตอบคำถามไม่ถูกต้อง</div>';
    str2 += '<div class="btn-t0" onclick="CloseAll()" style="margin-top;10px;"">พรุ่งนี้กลับมาเล่นกันใหม่น้า</div><br><br></center>';
    $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(LastScore).toFixed(2) +" คะแนน</div>");
    $("#DisplayChoice").html(str2);
  }  
}


function AddNewUser() {
  if(CheckAddEdit==2) {
    dbQuiz.add({
      GroupQuiz : "Quiz of The Day",
      LineID : sessionStorage.getItem("LineID"),
      LineName : sessionStorage.getItem("LineName"),
      LinePicture : sessionStorage.getItem("LinePicture"),
      EmpID : sessionStorage.getItem("EmpID_touch"),
      EmpName : sessionStorage.getItem("EmpName_touch"),
      EmpGroup : sessionStorage.getItem("EmpGroup_touch"),
      TypeSelect : sTypeSelect,
      LastScore : YourScore,
      PointIN : YourScore,
      Rewards : 0,
      DateRewards : "",
      QuizDate : today
    });
    CheckUserQuiz();
  } else {
    document.getElementById('id02').style.display='none';
    document.getElementById('id03').style.display='none';
  }
}



function ChangeNow() {
  //alert("YourScore="+YourScore);
  var xScore = 1;
  var newPoint = [0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7];
  newScore = random_item(newPoint);
  //alert(newScore);
  var str2 = "";
  if(xScore>newScore) {
    str2 += '<div class="header-line" style="margin-top:-30px;">เสียใจนิด ๆ น้า<div>';
  } else {
    str2 += '<div class="header-line" style="margin-top:-30px;">ดีใจด้วยน้า<div>';
  }
  str2 += '<div>คุณได้รับคะแนนใหม่ : <span class="txt-qqq">'+parseFloat(newScore).toFixed(2)+'</span> คะแนน</div>';
  str2 += '<div class="btn-t2" onclick="gotoweb()" style="margin-top;25px;"">พรุ่งนี้กลับมาเล่นกันใหม่น้า</div><br><br>';
  //$("#DisplayChoice").html(str2);
  document.getElementById("DisplayChoice").innerHTML = "";
  $("#DisplayQuestion").html(str2);

  var str1 = "";
  if(xScore>newScore) {
    str1 += '<div class="header-line1">เสียใจนิด ๆ น้า<div>';
    str1 += '<div><img src="./img/sad.gif" style="margin-top:15px;width:100%;border-radius: 12px;"></div>';
  } else {
    str1 += '<div class="header-line1">ดีใจด้วยน้า<div>';
    str1 += '<div><img src="./img/congratulations@.gif" style="margin-top:15px;width:100%;border-radius: 12px;"></div>';
  }
  str1 += '<div style="padding:10px 0;">คุณได้รับคะแนนใหม่ : <span class="txt-qqq" style="color:#000000;"><b>'+parseFloat(newScore).toFixed(2)+'</b></span> คะแนน</div>';
  if(CheckAddEdit==2) { 
    //alert("Line 765="+newScore);
    var ChangePoint = 1;
    dbMember.doc(EidScorePoint).update({
      TotalGame4 : parseFloat(sTotalGame4) + parseFloat(newScore),
      TotalScore : parseFloat(sTotalScore) + parseFloat(newScore)
    });

    dbQuiz.doc(Eid).update({
      PointOUT : parseFloat(newScore)
    });
  }
  $("#DisplayMyScore").html("<div class='BoxScoreCard'>วันนี้คุณทำคะแนนได้ "+ parseFloat(newScore).toFixed(2) +" คะแนน</div>");
  $("#ShowEndPoint").html(str1);
  document.getElementById("id03").style.display = "none";
  document.getElementById("id04").style.display = "block";
}


function NoChangeNow() {
  newScore = 1;
  dbQuiz.doc(Eid).update({
    PointOUT : newScore
  });
  //alert("ขอบคุณสำหรับการเข้าร่วมกิจกรรมในวันนี้");
  CloseAll();
  //window.location.href = 'introgame.html';
}


function CloseAll() {
  var str = "";
  str += 'คุณตอบคำถามประจำวันนี้ไปเรียบร้อยแล้ว<br>';
  str += 'วันนี้คุณทำคะแนนได้ <font color="#0056ff"><b>'+newScore+'</b></font> คะแนน';
  $("#ShowPointToDay").html(str);  
  document.getElementById('id01').style.display='none';
  document.getElementById('id02').style.display='none';
  document.getElementById('id03').style.display='none';
  document.getElementById('id04').style.display='none';
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

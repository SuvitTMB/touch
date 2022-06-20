var i = 0;
var EidProfile = "";
var dateString = "";
var CheckFoundData = 0;



$(document).ready(function () {
  sessionStorage.clear(); 
  var str = "";
  var sLineID = "Ua6b6bf745bd9bfd01a180de1a05c23b3";
  var sLineName = "Website";
  var sLinePicture = "https://profile.line-scdn.net/0hoLlg-mNNMGNRHiaTpMdPNG1bPg4mMDYrKX8qVnIYOgYpe3QwbCp2AXVKaVN_fnMzOC16V3NMagF8";
  //var sLinePicture = "https://profile.line-scdn.net/0hglFHieSbOENrMSwqk-BGPBthOylIQGFREgIgIAlkM3RVVisdTlAlIgozM3YBVn1FQlV1cFg4ZSdnIk8ldWfEd2wBZnRSBXcSQF9yow";
  sessionStorage.setItem("LineID", sLineID);
  sessionStorage.setItem("LineName", sLineName);
  sessionStorage.setItem("LinePicture", sLinePicture);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
  

  //main();
});



async function main() {
  await liff.init({ liffId: "1655966947-l6e0adNj" });
  document.getElementById("isLoggedIn").append(liff.isLoggedIn());
  if(liff.isLoggedIn()) {
    getUserProfile();
  } else {
    liff.login();
  }
}


async function getUserProfile() {
  var str = "";
  const profile = await liff.getProfile();
  sessionStorage.setItem("LineID", profile.userId);
  sessionStorage.setItem("LineName", profile.displayName);
  sessionStorage.setItem("LinePicture", profile.pictureUrl);
  str += '<div><img src="'+ sessionStorage.getItem("LinePicture") +'" class="add-profile" width="100px"></div>';
  str += '<div class="NameLine">'+ sessionStorage.getItem("LineName")+'</div>';
  $("#MyProfile").html(str);  
  Connect_DB();
}


function openWindow() {
  liff.openWindow({
    url: "https://line.me",
    external: true     
  })
}


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
  dbProfile = firebase.firestore().collection("CheckProfile");
  dbMember = firebase.firestore().collection("touch_member");
  //dbRSOCMember = firebase.firestore().collection("RSOC_Member");
  CheckData();
}

/*
function CheckTNIdate() {
  dbTNIdate.where('CodeName','==',sCodeName)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      sessionStorage.setItem("TNIdate", doc.data().DateUpload);
      $("#DateUpload").html(doc.data().DateUpload);  
    });
  });
}
*/

function CheckData() {
  dbProfile.where('lineID','==',sessionStorage.getItem("LineID"))
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      CheckFoundData = 1;
      if(doc.data().statusconfirm==1) {
        EidProfile = doc.id;
        sessionStorage.setItem("EmpID_touch", doc.data().empID);
        sessionStorage.setItem("EmpName_touch", doc.data().empName);
        sessionStorage.setItem("EmpBR_touch", doc.data().empBr);
        sessionStorage.setItem("EmpGroup_touch", doc.data().empGroup);
        sessionStorage.setItem("EmpPhone_touch", doc.data().empPhone);
        CheckNewData();
      } else {
        location.href = "https://liff.line.me/1655966947-KxrAqdyp";
      }
    });
    if(CheckFoundData==0) {
      location.href = "https://liff.line.me/1655966947-KxrAqdyp"; 
    }
  });
}

var sCheck = "x";
function CheckNewData() {
  NewDate();
  dbMember.where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      //alert(doc.data().CheckSurvey);
      sCheck = doc.data().CheckSurvey;
      if(doc.data().CheckSurvey==0) {
        sessionStorage.setItem("EmpID_t", doc.data().empID);
        sessionStorage.setItem("EmpName_t", doc.data().empName);
        sessionStorage.setItem("EmpBR_t", doc.data().empBr);
        sessionStorage.setItem("EmpGroup_t", doc.data().empGroup);
        sessionStorage.setItem("EmpPhone_t", doc.data().empPhone);
        gotoShowSurvey();
      } else {
        gotoWeb();
      }
    });
    if(sCheck=="x") {
      alert("Save New Data"+sCheck);
      dbMember.add({
        LineID : sessionStorage.getItem("LineID"),
        LineName : sessionStorage.getItem("LineName"),
        LinePicture : sessionStorage.getItem("LinePicture"),
        EmpID : sessionStorage.getItem("EmpID_touch"),
        EmpName : sessionStorage.getItem("EmpName_touch"),
        EmpBR : sessionStorage.getItem("EmpBR_touch"),
        EmpGroup : sessionStorage.getItem("EmpGroup_touch"),
        EmpPhone : sessionStorage.getItem("EmpPhone_touch"),
        CheckSurvey : 0,
        JoinTime : 0,
        SubGame11 : 0,
        SubGame12 : 0,
        SubGame13 : 0,
        SubGame14 : 0,
        SubGame15 : 0,
        SubGame16 : 0,
        SubGame21 : 0,
        SubGame22 : 0,
        SubGame23 : 0,
        SubGame24 : 0,
        SubGame25 : 0,
        SubGame26 : 0,
        SubGame27 : 0,
        SubGame28 : 0,
        SubGame29 : 0,
        SubGame31 : 0,
        SubGame32 : 0,
        SubGame33 : 0,
        SubGame34 : 0,
        SubGame35 : 0,
        SubGame36 : 0,
        SubGame37 : 0,
        SubGame38 : 0,
        SubGame39 : 0,
        TimeGame1 : 0,
        TimeGame2 : 0,
        TimeGame3 : 0,
        TimeGame4 : 0,
        TotalGame1 : 0,
        TotalGame2 : 0,
        TotalGame3 : 0,
        TotalGame4 : 0,
        TotalScore : 0,
        UserSumFree : 0,
        UserSumTrue : 0,
        UserSumFalse : 0,
        UserSumTime : 0,
        Game3SumTrue : 0,
        Game3SumFalse : 0,
        Game3SumQuiz : 0,
        SumTrue : 0,
        SumFalse : 0,
        SumAll : 0,
        DateRegister : dateString
      });
    }
    var str = "";
    str += '<div>Download</div>';
    $("#DisplayIntro").html(str);  
    document.getElementById("id01").style.display = "block";
  });
}



/*

var DoneSurvey = 0;
function CheckSurvey() {
  dbRSOCMember.where('EmpID','==',parseFloat(sessionStorage.getItem("EmpID_touch")))
  //.where('StatusRegister','==',1)
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      DoneSurvey = 1;
      if(doc.data().StatusRegister==0) {
        document.getElementById('loading').style.display='none';
        document.getElementById('NewSurvey').style.display='none';
        document.getElementById('NewUploadFile').style.display='block';

      } else if(doc.data().StatusRegister==1) {
        document.getElementById('loading').style.display='none';
        document.getElementById('OldSurvey').style.display='block';
      }
    });
    if(DoneSurvey==0) {
        document.getElementById('loading').style.display='none';
        document.getElementById('NewSurvey').style.display='none';
        document.getElementById('OldSurvey').style.display='none';
        document.getElementById('CancelSurvey').style.display='block';
    }
  });
}
*/

function gotoShowSurvey() {
  document.getElementById('id01').style.display='block';
  //location.href = 'showsurvey.html';
}

function gotoWeb() {
  location.href = 'home.html';
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


function CloseAll() {
  document.getElementById('id01').style.display='none';
  //document.getElementById('id02').style.display='none';
}

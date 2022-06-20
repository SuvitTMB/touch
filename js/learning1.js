var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear()+543;
today = dd + '/' + mm + '/' + yyyy;
var SelectCase = 0;
var HeadCase = "";
var EidMember = "";


$(document).ready(function () {
  if(sessionStorage.getItem("EmpID_touch")==null) { location.href = "index.html"; }
  SelectCase = getParameterByName('id');
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
  CheckCase();
}


function getParameterByName(name, url) {
  str = '';
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function CheckScore() {
  var str = "";
  dbMember.where('EmpID','==',sessionStorage.getItem("EmpID_touch"))
  .limit(1)
  .get().then((snapshot)=> {
    snapshot.forEach(doc=> {
      EidMember = doc.id;
      TimeCount = doc.data().TimeGame3;
      SumPoint = doc.data().TotalGame3;
      SumScore = doc.data().TotalScore;

      xCheck1 = parseFloat(doc.data().SubGame31);
      xCheck2 = parseFloat(doc.data().SubGame32);
      xCheck3 = parseFloat(doc.data().SubGame33);
      xCheck4 = parseFloat(doc.data().SubGame34);
      xCheck5 = parseFloat(doc.data().SubGame35);
      xCheck6 = parseFloat(doc.data().SubGame36);
      xCheck7 = parseFloat(doc.data().SubGame37);
      xCheck8 = parseFloat(doc.data().SubGame38);
      xCheck9 = parseFloat(doc.data().SubGame39);
    });
  });
}



function CheckCase() {

  document.getElementById('Loading1').style.display='none';
  document.getElementById('Show1').style.display='block';
  document.getElementById('Loading2').style.display='none';
  document.getElementById('Show2').style.display='block';
  document.getElementById('Loading3').style.display='none';
  document.getElementById('Show3').style.display='block';
  document.getElementById('Loading4').style.display='none';
  document.getElementById('Show4').style.display='block';


  switch(SelectCase) {
    case "1":
      HeadCase = "การเริ่มต้นใช้งาน touch";
      break;
    case "2":
      HeadCase = "การตั้งค่าแบบเฉพาะคุณ";
      break;
    case "3":
      HeadCase = "สิทธิประโยชน์ของฉัน";
      break;
    case "4":
      HeadCase = "บริการบัญชีเงินฝาก";
      break;
    case "5":
      HeadCase = "บริการบัตรเครดิต";
      break;
    case "6":
      HeadCase = "บริการสินเชื่อรถยนต์";
      break;
    case "7":
      HeadCase = "บริการกองทุน";
      break;
    case "8":
      HeadCase = "บริการประกัน";
      break;
    case "9":
      HeadCase = "บริการสินเชื่อ";
      break;
    default:
      HeadCase = "อื่น ๆ...";
  }
  //alert(HeadCase);
  $("#HeaderName").html(HeadCase);  

  //alert('xCheck'+SelectCase);

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



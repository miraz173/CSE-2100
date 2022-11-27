import * as util from './utility.js';
let apiKey = 'AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4';
let spreadsheetId = '1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ';
let Range = 'Academia!A:Z';

const API_KEY = apiKey;

let teachers=[], i=0, teacherLoaded=0; 
// localStorage.teacherLoaded=loadedData;

function loadData(spreadsheetId, Range) {
    const range = Range;
    util.getPublicValues({ spreadsheetId, range }, displayResult2);
}

function displayResult2(response) {
    let btns='';
    response.result.values.forEach((row, index) => {
        if (index!==0) 
        {
            let singleTeacher=[];
            row.forEach((val, ind) => {
                singleTeacher.push(val);
            });
            if(index===1){
                btns = '<button id="'+singleTeacher[0]+'" class="on">'+singleTeacher[0]+'</button>'; //index =1, but openTab(0)
            }
            else{
                btns += '<button id="'+singleTeacher[0]+'">'+ singleTeacher[0]+ '</button>'; //index =2,3,4..., but openTab(1,2,3...)
            }
            teachers.push(singleTeacher);
            // console.log(singleTeacher);
        }
        // console.log("Data loading complete");
    });
    // btns+=`<button onclick="location.href='../homepage.html'" type='button'>homepage</button>`
    document.getElementById("buttonss").innerHTML=btns;  //add buttons in page
    teacherLoaded=1;        //data loading from sheet completed 
    localStorage.teacherLoaded=teacherLoaded;
    console.log("tea "+localStorage.teacherLoaded);
}

window.addEventListener('load', (e) => {
    util.initOAuthClient({ apiKey: API_KEY });
});

document.addEventListener('gapi-loaded', (e) => {
    loadData(spreadsheetId, Range);
});

function openTab(pos) {
    let selectedTeacher=teachers[Number(pos)];
    document.getElementById("ProfessorName").innerHTML=selectedTeacher[0];
    document.getElementById("Designation").innerHTML=selectedTeacher[1]+"<br>Department of Computer Science and Engineering";
    document.getElementById("About").innerHTML=selectedTeacher[2];
    document.getElementById("Office").innerHTML=selectedTeacher[3];
    document.getElementById("Research").innerHTML="Journals: "+selectedTeacher[4]
                                                 +"<br>Seminar: "+selectedTeacher[5]
                                                 +"<br>Google Scholar Citation: "
                                                 +selectedTeacher[6];
    document.getElementById("positionInRUET").innerHTML=selectedTeacher[7];
    document.getElementById("Contacts").innerHTML=selectedTeacher[8];
    document.getElementById("connection").innerHTML=selectedTeacher[9];
    document.getElementById("expertise").innerHTML=selectedTeacher[10];
    document.getElementById("otherPosition").innerHTML=selectedTeacher[11];
    document.getElementById("achievement").innerHTML=selectedTeacher[12];
    document.getElementById("career").innerHTML=selectedTeacher[13];
    document.getElementById("edu").innerHTML=selectedTeacher[14];
    document.getElementById("bornTime").innerHTML=selectedTeacher[15];
    document.getElementById("bornPlace").innerHTML=selectedTeacher[16];
    document.getElementById("image").src=selectedTeacher[17];
}

function buttonWork() {
    if (teacherLoaded==0) {    //if data not loaded previously, try to load  now
        window.location.reload();
    }

    let tabs = $('.btn button');

    tabs.click(function(event) { //task to do when button clicked
        document.getElementById(teachers[i][0]).className="";
        ($(this).index()==0) ? (i=tabs.length-1) : (i=$(this).index()-1); //get clicked button ondex

        if(i>=tabs.length-1){ //if homepage button added, -2 instead of -1 inside condition 
            i=-1;
        }
        i++;
        document.getElementById(teachers[i][0]).className="on";
        openTab(i);
    });

    document.getElementById(teachers[i][0]).className="";
    if(i>=tabs.length-1){ //if homepage button added, -2 instead of -1 inside condition 
        i=-1;
    }
    i++;
    document.getElementById(teachers[i][0]).className="on";
    openTab(i);
}
setInterval(buttonWork,5000);

function updateTime() {
    let nowDate=new Date();
    let nowtime=nowDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true, second:'numeric' });
    let nowdate=nowDate.toLocaleDateString('en-us', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById("time").innerHTML="<b><i>" + nowtime + "<br>" + nowdate +"</i></b>";
}
setInterval(updateTime, 1000);

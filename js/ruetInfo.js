import * as util from './utility.js';
let apiKey = 'AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4';
let spreadsheetId = '1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ';
let Range = 'RUETinfo!A:H';

const API_KEY = apiKey;

let motiv, faculty, under, post, alumni, classrooms, lab, officer, ruetInfoLoaded=0;
// localStorage.ruetInfoLoaded=false; //gloab variable

function loadData(spreadsheetId, Range) {
    const range = Range;
    util.getPublicValues({ spreadsheetId, range }, displayResult2);
}

window.addEventListener('load', (e) => {
    util.initOAuthClient({ apiKey: API_KEY });
});

document.addEventListener('gapi-loaded', (e) => {
    loadData(spreadsheetId, Range);
});

function displayResult2(response) {
    response.result.values.forEach((row, index) => {
        if (index === 1)//read from 2nd, i.e. A2 line.
        {
            row.forEach((val, ind) => {
                switch (ind) {
                    case 0: motiv=val; break;
                    case 1: faculty=val; break;
                    case 2: under=val; break;
                    case 3: post= val; break;
                    case 4: alumni= val; break;
                    case 5: classrooms=val; break;
                    case 6: lab = val; break;
                    case 7: officer= val; break;
                    default: console.log('Warning! Too much information.');
                }
            });
            document.getElementById('motive').innerHTML=motiv;
            document.getElementById('faculty').innerHTML=faculty;
            document.getElementById('under').innerHTML=under;
            document.getElementById('post').innerHTML= post
            document.getElementById('alumni').innerHTML=alumni
            document.getElementById('classrooms').innerHTML=classrooms;
            document.getElementById('lab').innerHTML=lab
            document.getElementById('officer').innerHTML=officer;

            ruetInfoLoaded=1;
            console.log("Info: "+localStorage.ruetInfoLoaded);
        }
    });
}

setInterval(function(){
    if (ruetInfoLoaded==0) {
        window.location.reload();
    }
}, 5000)
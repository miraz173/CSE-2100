import * as util from "./utility.js";
let apiKey = "AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4";
let spreadsheetId = "1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ";
let Range = "Notice!I:N";

const API_KEY = apiKey;
function loadData(spreadsheetId, Range) {
    const range = Range;
    util.getPublicValues({ spreadsheetId, range }, displayResult2);
}

window.addEventListener("load", (e) => {
    util.initOAuthClient({ apiKey: API_KEY });
});

document.addEventListener("gapi-loaded", (e) => {
    loadData(spreadsheetId, Range);
});

function displayResult2(response) {
    let A1='', A2='', A3='', A4='', A5='', A6='';
    response.result.values.forEach((row, index) => {
        if (index !== 0)
        {console.log(index+" - ");
            row.forEach((val, ind) => {
                switch (ind) {
                    case 0: A1=val; break;
                    case 1: A2=val; break;
                    case 2: A3=val; break;
                    case 3: A4=val; break;
                    case 4: A5=val; break;
                    case 5: A6=val; break;
                    default:
                        console.log("Warning! Too much information.");
                }
            });
            let slot;
            if (A6 ==='Y' || A6==='y'){
                slot = "<div id='slot1Important'>";
            }
            else slot = "<div id='slot1'>";

            slot = slot+
                "<div id='date'>" + A5 + "</div><div id='dottedBar'></div>" +
                "<div id='title'>" + A2 +"</div><div id='dottedBar'></div>"+
                "<div id='brief'>" + A3 + "</div><div id='dottedBar'></div>"+
                "<div id='short'>" + A4 + "</div>"+
                "</div>";console.log(A4+" ");
            // document.getElementById('top').insertAdjacentHTML('beforeend', slot);
        }
    });
}



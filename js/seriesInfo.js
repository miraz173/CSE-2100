import * as util from './utility.js';
let apiKey = 'AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4';
let spreadsheetId = '1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ';
let Range = 'SeriesInfo!B:F';

const API_KEY = apiKey;

let slot='', title='', description='', startingTime='', endingTime='', location='', room='', poster='', eventsLoaded=0;

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

function displayResult2(response) {console.log("hiii");
    response.result.values.forEach((row, index) => {console.log(index+"oio");
        if (index === 0)
        {
            slot+=`<table><tr>`;
            row.forEach((val, ind) => {
                switch (ind) {
                    case 0: slot+=`<td class="series">`+ val +`</td>`; break;
                    case 1: slot+=`<td class="section">`+ val +`</td>`; break;
                    case 2: slot+=`<td class="cr">`+val+`</td>`; break;
                    case 3: slot+=`<td class="CA">`+val+`</td>`; break;
                    case 4: slot+=`<td class="notes">`+val+`</td>`; break;
                }
            });
            slot+=`</tr></table>`
            // slot+=`<td class="series">Series</td><td class="section">Section</td><td class="cr">CR & Mobile</td><td class="CA">Course Adviser</td><td class="notes">Course Adviser</td>`;
        }
        else if(index >= 1)
        {
            if (index%3===1) {
                slot+=`<table>`;
                row.forEach((val, ind) => {
                    switch (ind) {
                        case 0: slot+=`<tr><td rowspan="3 class="series" style="width: 8vw;">`+ val +`</td>`; break;//.series appears not to be working on rowspan(?)
                        case 1: slot+=`<td class="section">`+ val +`</td>`; break;
                        case 2: slot+=`<td class="cr">`+val+`</td>`; break;
                        case 3: slot+=`<td class="CA">`+val+`</td>`; break;
                        case 4: slot+=`<td class="notes">`+val+`</td></tr>`; break;
                    }
                });
                // slot+=``;
            }
            else if(index%3==2){
                // slot+=``;
                row.forEach((val, ind) => {
                    switch (ind) {
                        // case 0: slot+=`<td class="series">`+ val +`</td>`; break;
                        case 1: slot+=`<tr><td class="section">`+ val +`</td>`; break;
                        case 2: slot+=`<td class="cr">`+val+`</td>`; break;
                        case 3: slot+=`<td class="CA">`+val+`</td>`; break;
                        case 4: slot+=`<td class="notes">`+val+`</td></tr>`; break;
                    }
                });
                // slot+=``;
            }
            else{
                row.forEach((val, ind) => {
                    switch (ind) {
                        // case 0: slot+=`<td class="series">`+ val +`</td>`; break;
                        case 1: slot+=`<tr><td class="section">`+ val +`</td>`; break;
                        case 2: slot+=`<td class="cr">`+val+`</td>`; break;
                        case 3: slot+=`<td class="CA">`+val+`</td>`; break;
                        case 4: slot+=`<td class="notes">`+val+`</td></tr>`; break;
                    }
                });
                slot+=`</table>`
            }
        }
    });
    document.getElementById('table').innerHTML=slot;
    eventsLoaded=1;
}

// setInterval(function(){
//     if (eventsLoaded==0) {
//         window.location.reload();
//     }
// }, 5000)
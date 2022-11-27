import * as util from './utility.js';
let apiKey = 'AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4';
let spreadsheetId = '1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ';
let Range = 'Password!A:H';

const API_KEY = apiKey;

let weatherLoaded=0;

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
                    default: weatherLoaded=1;console.log('weather js');
                }
            });
        }
        weatherLoaded=1;
    });
}

setInterval(function(){
    if (weatherLoaded==0) {
        window.location.reload();
    }
}, 5000)
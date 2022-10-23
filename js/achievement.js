import * as util from './utility.js';
let apiKey = 'AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4';
let spreadsheetId = '1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ';
let Range = 'Events!J:P';

const API_KEY = apiKey;
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

let slot='';
let title='', description='', startingTime='', endingTime='', location='', room='', poster='';
function displayResult2(response) {
    response.result.values.forEach((row, index) => {
        if (index === 1)
        {
            row.forEach((val, ind) => {
                switch (ind) {
                    case 0: poster=val; break;
                    case 1: title=val; break;
                    case 2: description=val; break;
                    case 3: startingTime=new Date(Date.parse(val+2207520000000)); break;
                    case 4: endingTime=new Date(Date.parse(val+2207520000000)); break;
                    case 5: location=val; break;
                    case 6: room=val; break;
                    default:
                        console.log('Warning! Too much information.');
                }
            });
            document.getElementById('header').innerHTML=title;
            document.getElementById('desc').innerHTML=description;
            document.getElementById('from').innerHTML="From<br>"+ startingTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            document.getElementById('date').innerHTML=""+startingTime.toLocaleDateString('en-us', { month: 'long' })+"<br>"+
                startingTime.toLocaleDateString('en-us', { day: 'numeric' })+"<br>"+startingTime.toLocaleDateString('en-us', { weekday: 'long' })+"";
            document.getElementById('to').innerHTML="To<br>"+endingTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            document.getElementById('smallAdd').innerHTML="Room "+room;
            document.getElementById('bigAdd').innerHTML=location;
            document.getElementById('bigPic').style.backgroundImage=poster;

        }
        else if(index > 1 && index <= 5)
        {
            row.forEach((val, ind) => {
                switch (ind) {
                    case 0: poster=val; break;
                    case 1: title=val; break;
                    case 2: description=val; break;
                    // case 3: startingTime=new Date(Date.parse(val+2207520000000)); break;
                    // case 4: endingTime=new Date(Date.parse(val+2207520000000)); break;
                    // case 5: location=val; break;
                    // case 6: room=val; break;
                    default:
                        console.log('Warning! Too much information.');
                }
            });
            slot+=
            "<div id='smallerBigPic' style='background-image: linear-gradient(to bottom right, rgba(255, 0, 128, 0.577), rgba(0, 204, 255, 0.49)),url("
            +poster+");'><div id='smallerLeftBoxText'><h2>"+title+"</h2><h5>"+description+"</h5></div></div>";
        }
    });
    document.getElementById('lowerPics').innerHTML=slot;
}
import * as util from './utility.js';
let apiKey = 'AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4';
let spreadsheetId = '1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ';
let Range = 'TeacherEvents!J:P';

const API_KEY = apiKey;

let slot=''; 
let x=1, y=1;
let nowDate, eventtime, eventdate, nowtime, nowdate, prevEventdate;
let title='', description='', startingTime='', endingTime='', location='', room='', poster='';

function loadData(spreadsheetId, Range) {
    const range = Range;
    util.getPublicValues({ spreadsheetId, range }, displayResult2);
}

function displayResult2(response) {
    response.result.values.forEach((row, index) => {
        // if(index > 1 && index <= 5)
        // {
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
            nowDate=new Date();
            eventtime=startingTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
            eventdate=startingTime.toLocaleDateString('en-us', { day: 'numeric', month: 'long' });
            nowtime = nowDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false });
            nowdate = nowDate.toLocaleDateString('en-us', { day: 'numeric', month: 'long' });
            console.log(nowtime+"  "+eventtime);
            if(eventdate === nowdate)
            {
                console.log(nowtime <= eventtime);
                if(nowtime <= eventtime)
                {
                    if(y===1)
                    {
                        slot+="<h4 style='color: pink'>Events Today</h4>"
                        y=2;
                    }
                    slot+="<div class='event_item'><div class='ei_Dot dot_active'></div><div id='ei_Title'>"
                    +startingTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })+"</div><div class='ei_Copy'>"+title+"</div></div>"
                }
            }
            else if(eventdate > nowdate)
            {
                if(x===1){
                    slot+="<h4 style='color: pink' >Upcoming Events</h4>";
                    x=2;
                }
                if(prevEventdate!==eventdate){
                    slot+="<p class='ce_title'>"+eventdate+"</p>";
                }
                slot+="<div class='event_item'><div class='ei_Dot'></div><div id='ei_Title'>"
                +startingTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })+"</div><div class='ei_Copy'>"+title+"</div></div>"
            }
            prevEventdate=eventdate;
        // }
    });
    document.getElementById('calender').innerHTML+=slot;
}



window.addEventListener('load', (e) => {
    util.initOAuthClient({ apiKey: API_KEY });
});

document.addEventListener('gapi-loaded', (e) => {
    loadData(spreadsheetId, Range);
});

setInterval(() => {
    nowDate=new Date();
    nowtime=nowDate.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    nowdate=nowDate.toLocaleDateString('en-us', { day: 'numeric', month: 'long' });
    document.getElementById('today').innerHTML=nowdate +"<br>"+ nowtime;
}, 5000);
import * as util from "./utility.js";
let apiKey = "AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4";
let spreadsheetId = "1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ";
let Range = "Events!M:N";

let deadline, c;
let remaining='', Title='', Description='', Start, End=0, remNum=0, serial;

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
    response.result.values.forEach((row, index) => {
        if (index === 1)
        {
            row.forEach((val, ind) => {
                switch (ind) {
                    // case 0: serial=val; break;
                    // case 1: Title=val; break;
                    // case 2: Description=val; break;
                    case 0: Start=val; console.log(deadline=new Date(Date.parse(val+2207520000000))); break;
                    // case 4: End=val; break;
                    // case 5: remaining=val; break; 
                    // case 6: remNum=parseInt(val);break;
                    default:
                        console.log("Warning! Too much information.");
                }
            });
            c = new Clock(deadline, function(){ console.log('countdown complete') });
            
            document.body.appendChild(c.el);
        }
    });
}

//---------clock countdown part-------------

function CountdownTracker(label, value){

  var el = document.createElement('span');

  el.className = 'flip-clock__piece';
  el.innerHTML = '<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' + 
    '<span class="flip-clock__slot">' + label + '</span>';

  this.el = el;

  var top = el.querySelector('.card__top'),
      bottom = el.querySelector('.card__bottom'),
      back = el.querySelector('.card__back'),
      backBottom = el.querySelector('.card__back .card__bottom');

  this.update = function(val){
    val = ( '0' + val ).slice(-2);
    if ( val !== this.currentValue ) {
      
      if ( this.currentValue >= 0 ) {
        back.setAttribute('data-value', this.currentValue);
        bottom.setAttribute('data-value', this.currentValue);
      }
      this.currentValue = val;
      top.innerText = this.currentValue;
      backBottom.setAttribute('data-value', this.currentValue);

      this.el.classList.remove('flip');
      void this.el.offsetWidth;
      this.el.classList.add('flip');
    }
  }
  
  this.update(value);
}

// Calculation adapted from https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  return {
    'Total': t,
    'Days': Math.floor(t / (1000 * 60 * 60 * 24)),
    'Hours': Math.floor((t / (1000 * 60 * 60)) % 24),
    'Minutes': Math.floor((t / 1000 / 60) % 60),
    'Seconds': Math.floor((t / 1000) % 60)
  };
}

function getTime() {
  var t = new Date();
  return {
    'Total': t,
    'Hours': t.getHours() % 12,
    'Minutes': t.getMinutes(),
    'Seconds': t.getSeconds()
  };
}

function Clock(countdown,callback) {
  
  countdown = countdown ? new Date(Date.parse(countdown)) : false;
  callback = callback || function(){};
  
  var updateFn = countdown ? getTimeRemaining : getTime;

  this.el = document.createElement('div');
  this.el.className = 'flip-clock';

  var trackers = {},
      t = updateFn(countdown),
      key, timeinterval;

  for ( key in t ){
    if ( key === 'Total' ) { continue; }
    trackers[key] = new CountdownTracker(key, t[key]);
    this.el.appendChild(trackers[key].el);
  }

  var i = 0;
  function updateClock() {
    timeinterval = requestAnimationFrame(updateClock);
    
    // throttle so it's not constantly updating the time.
    if ( i++ % 10 ) { return; }
    
    var t = updateFn(countdown);
    if ( t.Total < 0 ) {
      cancelAnimationFrame(timeinterval);
      for ( key in trackers ){
        trackers[key].update( 0 );
      }
      callback();
      return;
    }
    
    for ( key in trackers ){
      trackers[key].update( t[key] );
    }
  }

  setTimeout(updateClock,500);
}
// var deadline = new Date(Date.parse(new Date()) + 12 * 24 * 60 * 60 * 1000);
// var c = new Clock(deadline, function(){ console.log('countdown complete') });
// document.body.appendChild(c.el);
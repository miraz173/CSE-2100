function openTab(evt, cityName) {
  // Declare all variables
  let i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them; i.e hide all tabs
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
	if (cityName === "Routine"){
		document.getElementById("main").style.background="white";
	}
	else{
		document.getElementById("main").style.background="#3c3c7f"; //#194a7b
	}
  }

  // Get all elements with class="tablinks" and remove the class "active"; i.e. make buttons inactive
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}


$(function() {

  //cache a reference to the tabs
  let tabs = $('.tab button');

  //on click to tab, turn it on, and turn previously-on tab off
  tabs.click(function() { $(this).addClass('on').siblings('.on').removeClass('on');});
    
  //auto-rotate every 5 seconds
  setInterval(function() {
          //get currently-on tab
      let onTab = tabs.filter('.on');

          //click either next tab, if exists, else first one
      let nextTab = onTab.index() < tabs.length-3 ? onTab.next() : tabs.first();
      nextTab.click();
  }, 5000);
});

//time tab js
let secondHand = document.querySelector('.second-hand');
let minHand = document.querySelector('.min-hand');
let hourHand = document.querySelector('.hour-hand');

 function setDate() {
  let now = new Date();

  let seconds = now.getSeconds();
  let secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  let mins = now.getMinutes();
  let minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
  minHand.style.transform = `rotate(${minsDegrees}deg)`;

  let hour = now.getHours();
  let hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;

  //digital clock
  let h = document.getElementById("hour");
  let m = document.getElementById("min");
  let s = document.getElementById("sec");
  let ampm = document.getElementById("ampm");
  ampm.innerHTML= hour>12?'PM':'AM';
  let tempHour=(hour>12? hour-12 : hour);
  h.innerHTML= tempHour<10?'0'+tempHour : tempHour;
  m.innerHTML= mins<10?'0'+mins : mins;
  s.innerHTML= seconds<10?'0'+seconds: seconds;

// console.log('working');

    let date = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let monthName;
    switch(month){
    case 1: monthName = "January";break;
    case 2: monthName = "February";break;
    case 3: monthName = "March";break;
    case 4: monthName = "April";break;
    case 5: monthName = "May";break;
    case 6: monthName = "June";break;
    case 7: monthName = "July";break;
    case 8: monthName = "August";break;
    case 9: monthName = "September";break;
    case 10: monthName = "October";break;
    case 11: monthName = "November";break;
    case 12: monthName = "December";break;
    }
    let currentDate = date + " " + monthName +
                    ", " + year;
    document.getElementById("calender")
                    .innerHTML = currentDate;

    let day = now.getDay();
    let dayName;
    switch(day){
    case 1: dayName = "Monday"; break;
    case 2: dayName = "Tuesday"; break;
    case 3: dayName = "Wednesday"; break;
    case 4: dayName = "Thursday"; break;
    case 5: dayName = "Friday"; break;
    case 6: dayName = "Saturday"; break;
    case 0: dayName = "Sunday"; break;
    }
    document.getElementById("day")
                    .innerHTML = dayName;

}

setInterval(setDate, 1000);

setDate();
callBangla();

// Bongabdo calculation
(function($) {
	$.fn.bongabdo = function(options) {
		// To Do: Use the options to re-format return value
		if(options && options.date) {
			options.date = new Date(options.date);
		}
		
		let settings = $.extend({
			date: new Date(),
			displayLanguage: "bangla",
			dayStartsAt: "sunrise",
			showSeason: false,
			showWeekDays: false,
			format: "DD MM, YY"
		}, options);

		let banglaMonths = [ 'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র' ];
		let weekDays = [ 'রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার' ];
		let banglaSeasons = ['গ্রীষ্ম', 'বর্ষা', 'শরৎ', 'হেমন্ত', 'শীত', 'বসন্ত'];
		let totalMonthDays = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30];

		Date.prototype.addHours = function(h) {
			this.setHours(this.getHours() + h);
			return this;
		}

		function isLeapYear(year) {
			return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
		}
		
		// a and b are javascript Date objects
		function dateDiffInDays(a, b) {
			let MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
			let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
			let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
		
			return Math.floor((utc2 - utc1) / MILLISECONDS_PER_DAY);
		}

		function getBanglaDateAndMonth(givenDate) {
			givenDate = givenDate.addHours(-6);//day starts at sunrise
      //givenDate = givenDate.addHours(0);//day starts at 12:00am
		
			//Year, Date, Month for Gregorian/English Calendar
			let gregDate = givenDate.getDate(),
				gregMonth = givenDate.getMonth(),
				gregYear = givenDate.getFullYear(),
				gregDay = givenDate.getDay();
		
			if (isLeapYear(gregYear)) {
				totalMonthDays[10] = 31; //If the given Gregorian Year is a LeapYear then, the Falgun month enclosed in the gregorian year will be 31 days
			}
		
			// If the given date is smaller than 14th April of current Gregorian Year
			if (gregMonth < 3 || (gregMonth === 3 && gregDate < 14)) {
				// 3 is the index of 'April'
				gregYear = gregYear - 1;
			}
		
			let epoch = new Date(gregYear + '-04-13');
			let banglaYear = gregYear - 593;
		
			let dayRemaining = dateDiffInDays(epoch, givenDate);
		
			let banglaMonthIndex = 0;
		
			for (let i = 0; i < banglaMonths.length; i++) {
				if (dayRemaining <= totalMonthDays[i]) {
					banglaMonthIndex = i;
					break;
				}
		
				dayRemaining -= totalMonthDays[i];
			}
		
			let banglaDate = dayRemaining;
		
			let banglaSeason = banglaSeasons[Math.floor(banglaMonthIndex / 2)]; // ('পৌষ' + 'মাঘ') = 'শীত'. Every consecutive two index in 'banglaMonths' indicates a single index in 'banglaSeasons'.
		
			return {
				year: banglaYear,
				date: banglaDate,
				month: banglaMonths[banglaMonthIndex],
				day: weekDays[gregDay],
				season: banglaSeason
			};
		}

		String.prototype.convertDigitToBangla = function() {
			let convertToBanglaDigit = {
				'1': '১',
				'2': '২',
				'3': '৩',
				'4': '৪',
				'5': '৫',
				'6': '৬',
				'7': '৭',
				'8': '৮',
				'9': '৯',
				'0': '০'
			};

			return this.replace(/\d/g, function(match) {
				return convertToBanglaDigit[match];
			});
		};

		this.each(function() {
			let element = $(this);
			let result = getBanglaDateAndMonth(settings.date);
			let dateString = settings.format;
			dateString = dateString.replace(/DD/i, result.date.toString());
			dateString = dateString.replace(/MM/i, result.month);
			dateString = dateString.replace(/YY/i, result.year.toString());

			if (settings.showWeekDays) {
				dateString = dateString.replace(/WW/i, result.day);
			}

			if (settings.showSeason) {
				dateString = dateString.replace(/SS/i, result.season);
			}

			element.html(dateString.convertDigitToBangla());
		});

		return this;
	};

}(jQuery));

function callBangla(){
  $(document).ready(function()
    {
      $('#bongabdo').bongabdo({
        showWeekDays: true,
        format: "DD MM, YY"
      });
      $('#onlyday').bongabdo({
        showWeekDays: true,
        format: "WW"
      });
    });
}
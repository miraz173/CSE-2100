// let selection=0;
function openTab(pos) {
    // selection=Number(pos);
    let selectedTeacher=teachers[Number(pos)];
    document.getElementById("ProfessorName").innerText=selectedTeacher[0];
    document.getElementById("About").innerText=selectedTeacher[2];
    document.getElementById("Office").innerText=selectedTeacher[3];
    document.getElementById("Research").innerHTML="Journals: "+selectedTeacher[4]
                                                 +"<br>Seminar: "+selectedTeacher[5]
                                                 +"<br>Google Scholar Citation: "
                                                 +selectedTeacher[6];
    console.log("hey ya, "+selectedTeacher[0] + "! See this.");
}
$(function() {

    //cache a reference to the tabs
    let tabs = $('.btn button');

    //on click to tab, turn it on, and turn previously-on tab off
    tabs.click(function() { $(this).addClass('on').siblings('.on').removeClass('on');});

    //auto-rotate every 5 seconds
    setInterval(function() {
        //get currently-on tab
        let onTab = tabs.filter('.on');

        //click either next tab, if exists, else first one
        let nextTab = onTab.index() < tabs.length-3 ? onTab.next() : tabs[0]; //declare where will loop return to 0.
        nextTab.click();
    }, 5000);
});
function updateTime() {
    let time=new Date();
    let hour=time.getHours();
    let minute=time.getMinutes();
    let second=time.getSeconds();
    let timeString=hour+":"+minute+":"+second;
    let date=time.getDate();
    let month=time.getMonth();
    let year=time.getFullYear();
    let dateString=date+"/"+month+"/"+year;
    document.getElementsByClassName("time")[0].innerHTML="<b><i>" + timeString + "<br>" + dateString +"</i></b>";
}

function connectionStatus() {
    // console.log("connection was checked! ");
    fetch('https://static-global-s-msn-com.akamaized.net/hp-neu/sc/2b/a5ea21.ico?d='+Date.now())
        .then(response => {
            let leftSide = document.getElementsByClassName("leftSide");
            // Check if the response is successful
            if (!response.ok) {
                // let leftSide = document.getElementsByClassName("leftSide");
                leftSide[0].style.backgroundColor='#8e0072';
                throw new Error('Network response was not ok');
            }

            else {
                // leftSide[0].style.backgroundColor = '#5f008e';
                if (teachers[teachers.length - 1][0] !== "END") {
                    showRoutine();
                } else {
                    console.log("Already Loaded.");
                }
            }
        })
        // .catch(error => {
        //     // The resource could not be reached
        //     // console.log("No Internet connection", error);
        //     let leftSide = document.getElementsByClassName("leftSide");
        //     leftSide[0].style.backgroundColor='#8e0072';
        // });
}
let teachers = [];
function showRoutine() {
    console.log("routine was checked!!!");
    // Google Sheets

    // const GS_SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";
    const GS_SCOPE = "./js/googleSheetAPI.json";
    const GS_API_URL = "https://sheets.googleapis.com/$discovery/rest?version=v4";

    function initOAuthClient(credentials = null) {

        if (credentials && credentials.clientId !== null && typeof credentials.clientId === 'string') {
            gapi.load("client:auth2", function () {
                gapi.auth2.init({client_id: credentials.clientId}).then(() => document.dispatchEvent(new Event('gapi-loaded')));
            });
        } else if (credentials && credentials.apiKey !== null && typeof credentials.apiKey === 'string') {
            gapi.load("client", () => {
                gapi.client.setApiKey(credentials.apiKey);
                document.dispatchEvent(new Event('gapi-loaded'))
            });
        } else console.error('clientId or apiKey not defined');
    }

    // function signIn(scope = GS_SCOPE) {
    //     return gapi.auth2.getAuthInstance().signIn({scope}).then(() => {
    //         setCookie('guser-loggedin', 'true', 1);
    //         location.reload();
    //     }, (e) => console.error(e));
    //     console.log('uo')
    // }

    // function signOut() {
    //     return gapi.auth2.getAuthInstance().signOut().then(() => {
    //         setCookie('guser-loggedin', 'true', -1);
    //         location.reload();
    //     }, (e) => console.error(e));
    // }

    // function getValues(query, cb = function (res) {
    //     console.log(res);
    // }, err = function (err) {
    //     console.error(err);
    // }) {
    //     return loadClient().then(() => gapi.client.sheets.spreadsheets.values.get(query).then(cb, err));
    // }

    // function isSignedIn() {
    //     if (getCookie('guser-loggedin') === 'true') return true;
    //     return false;
    // }

    // function setCookie(cname = 'guser-loggedin', cvalue, exdays) {
    //     const d = new Date();
    //     d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    //     let expires = "expires=" + d.toUTCString();
    //     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    // }

    // function getCookie(cname) {
    //     let name = cname + "=";
    //     let ca = document.cookie.split(';');
    //     for (let i = 0; i < ca.length; i++) {
    //         let c = ca[i];
    //         while (c.charAt(0) == ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) == 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }

    function loadClient(apiPath = GS_API_URL) {
        return gapi.client.load(apiPath);
    }

    function getPublicValues(query, cb = function (res) {
        console.log(res);
    }, err = function (err) {
        console.error(err);
    }) {
        return loadClient().then(() => gapi.client.sheets.spreadsheets.values.get(query).then(cb, err));
    }

    //<!-- easyData - Creating table -->
    {
        {
            // console.log("table loading...");
            // Your API KEY
            const API_KEY = "AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4";
            // console.log("api connected");

            function displayResult2(response) {
                response.result.values.forEach((row, index) => {
                    let singleTeacher = [];
                    if (index === 0) {
                     console.log("reading 1st column");
                    }
                    else {
                        row.forEach((val) => (singleTeacher.push(val)));
                        teachers.push(singleTeacher);
                    }
                    // console.log(singleTeacher);
                });

                // document.getElementById("table-head").innerHTML = tableHead;
                // document.getElementById("table-body").innerHTML = tableBody;
                console.log("table loaded");
            }

            function loadData() {
                // Spreadsheet ID
                const spreadsheetId = "1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ";
                const range = "Academia!A:Z";
                getPublicValues({spreadsheetId, range}, displayResult2);
            }

            window.addEventListener("load", (e) => {
                initOAuthClient({apiKey: API_KEY});
            });

            document.addEventListener("gapi-loaded", (e) => {
                loadData();
            });
        }
    }
    console.log(teachers);
    // document.getElementsByClassName("rightSide").innerHTML = teachers[4][0];
}
function netSpeed() {
    let userImageLink =
        "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200714180638/CIP_Launch-banner.png";
    let time_start, end_time;

    // The size in bytes
    let downloadSize = 5616998;
    let downloadImgSrc = new Image();

    downloadImgSrc.onload = function () {
        end_time = new Date().getTime();
        displaySpeed();
    };
    time_start = new Date().getTime();
    downloadImgSrc.src = userImageLink;
    function displaySpeed() {
        let timeDuration = (end_time - time_start) / 1000;
        let loadedBits = downloadSize * 8;

        /* Converts a number into string
           using toFixed(2) rounding to 2 */
        let bps = (loadedBits / timeDuration).toFixed(2);
        let speedInKbps = (bps / 1024).toFixed(2);
        let speedInMbps = (speedInKbps / 1024).toFixed(2);
        console.log("Your internet connection speed is: \n"
            + speedInMbps + " Mbps\n");
    }
}
function doThings() {
    // netSpeed();
    connectionStatus();
    // if (teachers[teachers.length-1][0]!=="END"){
    //     showRoutine();
    // }
    // else {
    //     console.log("Already Loaded.");
    // }
}


connectionStatus();
showRoutine();
setInterval(doThings, 5000);
setInterval(updateTime, 1000);
// Google Sheets
const GS_SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";
const GS_API_URL = "https://sheets.googleapis.com/$discovery/rest?version=v4";


//highlight form texts
const inputs = document.querySelectorAll(".input");
function addcl(){
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}
function remcl(){
    let parent = this.parentNode.parentNode;
    if(this.value === ""){
        parent.classList.remove("focus");
    }
}
inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});


//check if app is offline
window.addEventListener("offline", (event) => {
    console.log("Network Offline");
    alert('Network Offline');
});

//most safe way to check if device has internet connection
// function connectionStatus() {
//     fetch('https://static-global-s-msn-com.akamaized.net/hp-neu/sc/2b/a5ea21.ico?d='+Date.now())
//         .then(response => {
//             // Check if the response is successful
//             if (!response.ok)
//                 throw new Error('Network response was not ok');
//
// // At this point we can safely say the user has connection to the internet
//             alert("Network Online");
//             console.log("Internet available");
//         })
//         .catch(error => {
//             // The resource could not be reached
//             alert(error);
//             console.log("No Internet connection", error);
//         });
// }

//get password from ss
let user; let pass;console.log(`${user} -> ${pass}`);
//most safe way to check if device has internet connection
// function connectionStatus() {
//     fetch('https://static-global-s-msn-com.akamaized.net/hp-neu/sc/2b/a5ea21.ico?d='+Date.now())
//         .then(response => {
//             // Check if the response is successful
//             if (!response.ok)
//                 throw new Error('Network response was not ok');
//
// // At this point we can safely say the user has connection to the internet
//             console.log("Internet available");
//             let hr = document.getElementsByTagName("hr");
//             hr[0].style.backgroundColor='white';
//         })
//         .catch(error => {
//             // The resource could not be reached
//             console.log("No Internet connection", error);
//             let hr = document.getElementsByTagName("hr");
//             hr[0].style.backgroundColor='red';
//         });
// }

let tableHead ;
let tableBody ;
function getPassword() {
    // Google Sheets

    const GS_SCOPE = "https://www.googleapis.com/auth/spreadsheets.readonly";
    const GS_API_URL = "https://sheets.googleapis.com/$discovery/rest?version=v4";

    function initOAuthClient(credentials = null) {

        if (credentials && credentials.clientId !== null && typeof credentials.clientId === 'string') {
            gapi.load("client:auth2", function () {
                gapi.auth2.init({ client_id: credentials.clientId }).then(() => document.dispatchEvent(new Event('gapi-loaded')));
            });
        } else if (credentials && credentials.apiKey !== null && typeof credentials.apiKey === 'string') {
            gapi.load("client", () => {
                gapi.client.setApiKey(credentials.apiKey);
                document.dispatchEvent(new Event('gapi-loaded'))
            });
        } else console.error('clientId or apiKey not defined');
    }

    function signIn(scope = GS_SCOPE) {
        return gapi.auth2.getAuthInstance().signIn({ scope }).then(() => {
            setCookie('guser-loggedin', 'true', 1);
            location.reload();
        }, (e) => console.error(e));console.log('uo')
    }

    function signOut() {
        return gapi.auth2.getAuthInstance().signOut().then(() => {
            setCookie('guser-loggedin', 'true', -1);
            location.reload();
        }, (e) => console.error(e));
    }

    function loadClient(apiPath = GS_API_URL) {
        return gapi.client.load(apiPath);
    }

    function getValues(query, cb = function (res) { console.log(res); }, err = function (err) { console.error(err); }) {
        return loadClient().then(() => gapi.client.sheets.spreadsheets.values.get(query).then(cb, err));
    }

    function getPublicValues(query, cb = function (res) { console.log(res); }, err = function (err) { console.error(err); }) {
        return loadClient().then(() => gapi.client.sheets.spreadsheets.values.get(query).then(cb, err));
    }

    function isSignedIn() {
        return getCookie('guser-loggedin') === 'true';

    }

    function setCookie(cname = 'guser-loggedin', cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    //let tr=[];
    //let td=[];
    <!-- easyData - Creating table -->
    {
        {
            // Your API KEY
            const API_KEY = "AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4";

            function displayResult2(response) {
                tableHead='';
                tableBody='';
                response.result.values.forEach((row, index) => {
                    if (index === 0) {
                        row.forEach((val) => (tableHead += val));
                    } else {
                        row.forEach((val, ind) => {
                            tableBody += val ; //td.push(1);
                        });
                    }
                });user=tableHead; pass=tableBody;console.log(`${user}: ${pass}`);
            }

            function loadData() {
                // Spreadsheet ID
                const spreadsheetId = "1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ";
                const range = "Password!A:Z";
                getPublicValues({ spreadsheetId, range }, displayResult2);
            }

            window.addEventListener("load", (e) => {
                initOAuthClient({ apiKey: API_KEY });
            });

            document.addEventListener("gapi-loaded", (e) => {
                loadData();
            });
        }
    }
}
getPassword();
// validate
let attempt = 3;
function check(form)/*function to check userid & password*/
{
    // getPassword();
    /*checks whether the entered userid and password are matching*/
    if(form.username.value === user && form.password.value === pass)
    {
        /*opens the target page while ID & password matches*/
        // window.open('https://docs.google.com/spreadsheets/d/1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ/edit#gid=0')
        window.location.replace("./setting.html");
    }
    else
    {
        attempt--;
        console.log("Error Password or Username");
	    document.getElementsByClassName("errorMessage")[0].innerHTML=`Wrong Username or Password.</br>You have ${attempt} attempt left.`;
        if (attempt <= 0){
            window.location.replace("./slidepage.html");
            // window.open('./slidepage.html', "_self"); both does the same thing
        }
        return false;
    }console.log(attempt);
}
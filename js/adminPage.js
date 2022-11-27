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
function connectionStatus() {
    fetch('https://static-global-s-msn-com.akamaized.net/hp-neu/sc/2b/a5ea21.ico?d='+Date.now())
        .then(response => {
            if (!response.ok){
                throw new Error('Network response was not ok');
            }
            else console.log("Internet available"); // At this point we can safely say the user has connection to the internet
        })
        .catch(error => {
            alert(error);   // The resource could not be reached
            console.log("No Internet connection", error);
        });
}
//spreadsheet works
import * as util from "./utility.js";
let apiKey = "AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4";
let spreadsheetId = "1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ";
let Range = "Password!A:Z";
let user, pass;
const API_KEY = apiKey;

function loadData(spreadsheetId, Range) {
    const range = Range;
    util.getPublicValues({ spreadsheetId, range }, displayResult2);
}

function displayResult2(response) 
{
    console.log(`${user}: ${pass}`);
    user='';
    pass='';
    response.result.values.forEach((row, index) => {
        if (index === 0) {
            row.forEach((val) => (user += val));
        } else {
            row.forEach((val, ind) => {
                pass += val ;
            });
        }
    });
    console.log(`${user}: ${pass}`);
}

window.addEventListener("load", (e) => {
    util.initOAuthClient({ apiKey: API_KEY });
});

document.addEventListener("gapi-loaded", (e) => {
    loadData(spreadsheetId, Range);
});

// validate
let attempt = 3;
function check(){
    connectionStatus();
    if(userbox.value===user && passbox.value===pass)
    {
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

let userbox = document.getElementById('userName');
let passbox = document.getElementById('passBox');
let submitBtn=document.getElementById('submitBtn');
submitBtn.addEventListener('click', check);
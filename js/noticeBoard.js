let apiKey = "AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4";
let spreadsheetId = "1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ";
let Range = "Notice!I:N";
function getPassword(apiKey, spreadsheetId, Range) {
// function getPassword(apiKey) {
// function getPassword(){
    const GS_SCOPE = "googleSheetAPI.json";
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
        }, (e) => console.error(e));
    }

    function isSignedIn() {
        if (getCookie('guser-loggedin') === 'true') return true;
        return false;
    }

    function signOut() {
        return gapi.auth2.getAuthInstance().signOut().then(() => {
            setCookie('guser-loggedin', 'true', -1);
            location.reload();
        }, (e) => console.error(e));
    }

    function getValues(query, cb = function (res) { console.log(res); }, err = function (err) { console.error(err); }) {
        return loadClient().then(() => gapi.client.sheets.spreadsheets.values.get(query).then(cb, err));
    }

    function loadClient(apiPath = GS_API_URL) {
        return gapi.client.load(apiPath);
    }

    function getPublicValues(query, cb = function (res) { console.log(res); }, err = function (err) { console.error(err); }) {
        return loadClient().then(() => gapi.client.sheets.spreadsheets.values.get(query).then(cb, err));
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
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    //easyData - Creating table
    {
        {
            // My API KEY
            const API_KEY = apiKey;
            // const API_KEY = "AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4";
            function displayResult2(response) {
                let A1='', A2='', A3='', A4='', A5='', A6='';
                response.result.values.forEach((row, index) => {
                    if (index !== 0)
                    {
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
                            "</div>";
                        document.getElementById('top').insertAdjacentHTML('beforeend', slot);
                    }
                });
            }

            // function loadData() {
            function loadData(spreadsheetId, Range) {
                // Spreadsheet ID
                // const spreadsheetId = "1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ";
                const range = Range;
                getPublicValues({ spreadsheetId, range }, displayResult2);
            }

            window.addEventListener("load", (e) => {
                initOAuthClient({ apiKey: API_KEY });
            });

            document.addEventListener("gapi-loaded", (e) => {
                loadData(spreadsheetId, Range);
                // loadData();
            });
        }
    }
}
getPassword(apiKey, spreadsheetId, Range);
// getPassword(apiKey);
// getPassword();
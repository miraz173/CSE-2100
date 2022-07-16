//most safe way to check if device has internet connection
function connectionStatus() {
  fetch('https://static-global-s-msn-com.akamaized.net/hp-neu/sc/2b/a5ea21.ico?d='+Date.now())
      .then(response => {
        // Check if the response is successful
        if (!response.ok)
          throw new Error('Network response was not ok');

// At this point we can safely say the user has connection to the internet
        console.log("Internet available");
        let hr = document.getElementsByTagName("hr");
        hr[0].style.backgroundColor='white';
      })
      .catch(error => {
        // The resource could not be reached
        console.log("No Internet connection", error);
        let hr = document.getElementsByTagName("hr");
        hr[0].style.backgroundColor='red';
      });
}

function showRoutine() {
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
    if (getCookie('guser-loggedin') === 'true') return true;
    return false;
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

  let tr=[];
  <!-- easyData - Creating table -->
  {
    {
      // Your API KEY
      const API_KEY = "AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4";

      function displayResult2(response) {
        let tableHead = "";
        let tableBody = "";
        response.result.values.forEach((row, index) => {
          let td=[];
          if (index === 0) {
            tableHead += "<tr>";
            row.forEach((val) => (tableHead += "<th>" + val + "</th>"));
            tableHead += "</tr>";
          } else {
            if (index === 4 || index === 8 || index === 12){
              tableBody += "<tr height='3%'></tr>"; tr.push(td);
            }
            else{
              tableBody += "<tr>";
              row.forEach((val, ind) => {
                if (row[ind] !== row[ind-1]){
                  if (row[ind]===row[ind+1] && row[ind]===row[ind+2]){
                    tableBody += "<td colspan='3'>" + val + "</td>"; td.push(3);
                  }
                  else if (row[ind]===row[ind+1] && row[ind]!==row[ind+2]){
                    tableBody += "<td colspan='2'>" + val + "</td>"; td.push(2);
                  }
                  else{
                    tableBody += "<td>" + val + "</td>"; td.push(1);
                  }
                }
              });
              tableBody += "</tr>"; tr.push(td);
            }

          }
        });

        document.getElementById("table-head").innerHTML = tableHead;
        document.getElementById("table-body").innerHTML = tableBody; //console.log(tr);
      }

      function loadData() {
        //my edit
        let date = new Date();
        let day = date.getDay(); //day=6;
        let range;
        switch (day) {
          case 0: range = "Sunday!A:Z"; break;
          case 1: range = "Monday!A:Z"; break;
          case 2: range = "Tuesday!A:Z"; break;
          case 3: range = "Wednesday!A:Z"; break;
          case 4:
          case 5: range = "OffDay!A:Z"; break;
          case 6: range = "Saturday!A:Z"; break;
        }
        // Spreadsheet ID
        const spreadsheetId = "1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ";
        //const range = "A:Z";
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


//highlight colum based on current time
  function highlightCol() {
    // console.log(tr);
    for (let i = 1; i<= tr.length; i++){//i <= 14; i.e. colum height in spreadsheet
      if (i!==4 && i !== 8 && i !==12)
          //if (i!==3 && i !== 7 && i !==11)
      {
        //find index of ongoing class/period
        let period;
        let date = new Date();
        let hour = date.getHours();
        let minute=date.getMinutes();
        minute += hour*60;
        if (minute > 1020 || minute < 480){
          period = 0;//null
        }
        else if (minute >=970 && minute<=1020){
          period = 11;
        }
        else if(minute >= 920){
          period = 10;
        }
        else if (minute >= 870){
          period = 9;
        }
        else if(minute >= 800){
          period = 8;
        }
        else if (minute >= 750){
          period = 7;
        }
        else if (minute >= 700){
          period = 6;
        }
        else if (minute >= 650){
          period = 5;
        }
        else if (minute >= 630){
          period = 4;
        }
        else if (minute >= 580){
          period = 3;
        }
        else if (minute >= 530){
          period = 2;
        }
        else if (minute >= 480){
          period = 1;
        }
        else period = 0;

        //determine colum index that needs to be highlighted in every row. colum index varies bcz of different colspan
        let j;
        for (j = 1; period > 0; j++) {
          period = period - tr[i-1][j];//[i]
        }
        //highlighting the colum at j-1_th index
        const ithRow = document.getElementsByTagName("tr")[i];//[i+1]
        ithRow.getElementsByTagName("td")[j-1].style.color='blue';
        ithRow.getElementsByTagName("td")[j-1].style.background='#9bd5ca';
        ithRow.getElementsByTagName("td")[j-1].style.fontWeight='bold';
        ithRow.getElementsByTagName("td")[j-1].style.fontfamily= 'Verdana, sans-serif';

        // BatchName/SeriesSection colum Highlight/0_th colum highlight
        ithRow.getElementsByTagName("td")[0].style.background='#6F6FC6FF';
        ithRow.getElementsByTagName("td")[0].style.fontWeight='bold';
      }
    }
  }


  setInterval(connectionStatus, 2000);//update connection status every 2 sec
  setInterval(highlightCol, 1000);//1 second
}

showRoutine();
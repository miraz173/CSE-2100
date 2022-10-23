import * as util from "./utility.js";
const spreadsheetId = "1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ";
const API_KEY = "AIzaSyC1cRemc4QTWBxrODtbqzChoPkzvsAlS-4";
let tr=[];

//most safe way to check if device has internet connection
function connectionStatus() {
  fetch('https://static-global-s-msn-com.akamaized.net/hp-neu/sc/2b/a5ea21.ico?d='+Date.now())
      .then(response => {
        // Check if the response is successful
        if (!response.ok)
          throw new Error('Network response was not ok');

        console.log("Internet available");// At this point we can safely say the user has connection to the internet
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
          console.log(td);
        }

      }
    });

    document.getElementById("table-head").innerHTML = tableHead;
    document.getElementById("table-body").innerHTML = tableBody; console.log("table loaded");
  }

  function loadData(spreadsheetId) {
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
    //const range = "A:Z";
    util.getPublicValues({ spreadsheetId, range }, displayResult2);
  }

  window.addEventListener("load", (e) => {
    util.initOAuthClient({ apiKey: API_KEY });
  });

  document.addEventListener("gapi-loaded", (e) => {
    loadData(spreadsheetId);
  });


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
        else if (minute >=970){
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
  setInterval(highlightCol, 2000);//2 second
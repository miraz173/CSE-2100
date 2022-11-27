function openSheet()
{
    /*opens the target page while ID & password matches*/
    window.open('https://docs.google.com/spreadsheets/d/1p4LstWCmuhTJh8PJZTgLdO2QgWX5qF7Pi-7sOw3KqZQ/edit#gid=0');
}
function openHomepage()
{
        window.location.replace("./homepage.html");
}
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
    document.getElementsByClassName("time")[0].innerHTML=timeString + "<br>" + dateString;
}
setInterval(updateTime, 1000);

/* Get the documentElement (<html>) to display the page in fullscreen */
let elem = document.documentElement;
/* View in fullscreen */
let fullscreen = 0;

function openFullscreen() {
    if (fullscreen === 0) {
        fullscreen = 1;
        document.getElementById('fullscreen').innerHTML = '<img src="../img/minimizew.jpg" height="20vh" alt="freepik.com"> &nbsp; &nbsp;Exit';
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    /* Close fullscreen */
    else {
        fullscreen = 0;
        document.getElementById('fullscreen').innerHTML = '<img src="../img/flscreen.jpg" height="20vh" alt="freepik.com"> &nbsp; &nbsp;Fullscreen';
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }
}
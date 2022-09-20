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
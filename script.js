let timer,minutes=25,seconds=0,isWorking=!0,isRunning=!1,totalStudyTime=0,sessionStartTime,alarmAudio=new Audio("meow.mp3");const studyDurationInput=document.getElementById("study-duration"),breakDurationInput=document.getElementById("break-duration");function updateDisplay(){document.getElementById("timer").innerText=`${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`}function playAlarm(){alarmAudio.play().then(()=>{showModal("Timer has run out!"),"Notification"in window&&"granted"===Notification.permission&&new Notification("Pomi Timer",{body:"Timer has run out!"})}).catch(t=>{console.error("Error playing alarm:",t)})}function showModal(t){let e=document.createElement("div");e.innerHTML=`
        <div id="modal" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; padding: 20px; border: 1px solid #000; text-align: center; z-index: 9999;">   <p>${t}</p>
        <img src="meow.jpeg" alt="Image" style="max-width: 100%; max-height: 200px; margin-bottom: 10px;">
        <button onclick="closeModal()">OK</button>
    </div> `,document.body.appendChild(e)}function closeModal(){let t=document.getElementById("modal");t&&t.parentNode.removeChild(t),alarmAudio.pause(),alarmAudio.currentTime=0,startTimer()}function startTimer(){if(!isRunning){isRunning=!0,sessionStartTime=new Date().getTime();let t=parseInt(studyDurationInput.value,10)||25,e=parseInt(breakDurationInput.value,10)||5;minutes=isWorking?t:e,timer=setInterval(function(){seconds>0?seconds--:minutes>0?(minutes--,seconds=59):(clearInterval(timer),isRunning=!1,playAlarm(),updateStudyTracker(),showModal("Timer has run out!"),minutes=(isWorking=!isWorking)?t:e),updateDisplay()},1e3)}}function resetTimer(){clearInterval(timer),isRunning=!1,isWorking=!0,minutes=parseInt(studyDurationInput.value,10)||25,seconds=0,new Audio("meow.mp3").pause(),new Audio("meow.mp3").currentTime=0,updateDisplay()}function updateStudyTracker(){let t=document.getElementById("study-tracker"),e=(new Date().getTime()-sessionStartTime)/1e3;totalStudyTime+=isWorking?e:0;let i=totalStudyTime/3600;t.innerText=`Total Time: ${formatHours(i)}`}function formatHours(t){return`${Math.round(100*t)/100} hours`}function requestNotificationPermission(){"Notification"in window&&Notification.requestPermission().then(t=>console.log("Notification permission status:",t)).catch(t=>console.error("Error requesting notification permission:",t))}updateDisplay();
    function toggleTutorial() {
        let tutorialSection = document.querySelector(".tutorial-content h1");
        if (tutorialSection) {
            tutorialSection.scrollIntoView({ behavior: 'smooth' });
        }
    }    

    function toggleDarkMode() {
        const body = document.body;
        body.classList.toggle("dark-mode");
        const darkModeEnabled = body.classList.contains("dark-mode");
        localStorage.setItem("darkMode", darkModeEnabled);
    }

    const darkModeEnabled = localStorage.getItem("darkMode") === "true";
    if (darkModeEnabled) {
        document.body.classList.add("dark-mode");
    }

    updateDisplay();
let timer;
let minutes = 25;
let seconds = 0;
let isWorking = true;
let isRunning = false;
let totalStudyTime = 0;
let sessionStartTime;

const studyDurationInput = document.getElementById('study-duration');
const breakDurationInput = document.getElementById('break-duration');

function updateDisplay() {
    document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function playAlarm() {
    new Audio('meow.mp3').play()
        .then(() => {
            showModal(isWorking ? 'Timer has run out!' : 'Timer has run out!');
            if ('Notification' in window && Notification.permission === 'granted') {
                const options = { body: isWorking ? 'Timer has run out!' : 'Timer has run out!' };
                new Notification('Pomi Timer', options);
            }
        })
        .catch(error => {
            console.error('Error playing alarm:', error);
        });
}

function showModal(message) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div id="modal" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; padding: 20px; border: 1px solid #000; text-align: center; z-index: 9999;">
            <p>${message}</p>
            <img src="meow.jpeg" alt="Image" style="max-width: 100%; max-height: 200px; margin-bottom: 10px;">
            <button onclick="closeModal()">OK</button>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.parentNode.removeChild(modal);
    new Audio('meow.mp3').pause();
    new Audio('meow.mp3').currentTime = 0;
    startTimer();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        sessionStartTime = new Date().getTime();
        const studyDuration = parseInt(studyDurationInput.value, 10) || 25;
        const breakDuration = parseInt(breakDurationInput.value, 10) || 5;
        minutes = isWorking ? studyDuration : breakDuration;
        timer = setInterval(function () {
            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                clearInterval(timer);
                isRunning = false;
                playAlarm();
                updateStudyTracker();
                showModal('Timer has run out!');
                isWorking = !isWorking;
                minutes = isWorking ? studyDuration : breakDuration;
            }
            updateDisplay();
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isWorking = true;
    minutes = parseInt(studyDurationInput.value, 10) || 25;
    seconds = 0;
    new Audio('meow.mp3').pause();
    new Audio('meow.mp3').currentTime = 0;
    updateDisplay();
}

function updateStudyTracker() {
    const studyTracker = document.getElementById('study-tracker');
    const sessionDuration = (new Date().getTime() - sessionStartTime) / 1000;
    totalStudyTime += isWorking ? sessionDuration : 0;
    const totalHours = totalStudyTime / 3600;
    studyTracker.innerText = `Total Time: ${formatHours(totalHours)}`;
}

function formatHours(hours) {
    const roundedHours = Math.round(hours * 100) / 100;
    return `${roundedHours} hours`;
}

function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission()
            .then(permission => console.log('Notification permission status:', permission))
            .catch(error => console.error('Error requesting notification permission:', error));
    }
}

updateDisplay();

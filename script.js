let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

function updateDisplay() {
    document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(function () {
            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                clearInterval(timer);
                isRunning = false;
                alert('Pomodoro completed! Take a break.');
            }

            updateDisplay();
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateDisplay();
}

// Initial display
updateDisplay();

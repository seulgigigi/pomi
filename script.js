let timer;
let minutes = 25;
let seconds = 0;
let isWorking = true;
let isRunning = false;

function updateDisplay() {
    document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;

        const studyDuration = parseInt(document.getElementById('study-duration').value, 10) || 25;
        const breakDuration = parseInt(document.getElementById('break-duration').value, 10) || 5;

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

                if (isWorking) {
                    alert('Study session completed! Take a break.');
                    isWorking = false;
                    minutes = breakDuration; // Set break duration
                } else {
                    alert('Break completed! Back to study.');
                    isWorking = true;
                    minutes = studyDuration; // Set study duration
                }

                startTimer(); // Start the next session
            }

            updateDisplay();
        }, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isWorking = true;
    minutes = parseInt(document.getElementById('study-duration').value, 10) || 25; // Set initial duration based on the study session
    seconds = 0;
    updateDisplay();
}
function showInfo() {
    const infoMessage = `The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. 
                        The technique uses a timer to break down work into intervals, traditionally 25 minutes in length,
                        separated by short breaks. These intervals are known as "pomodoros," the plural in English of
                        the Italian word pomodoro (tomato), after the tomato-shaped kitchen timer that Cirillo used as
                        a university student.`;

    alert(infoMessage);
}
// Initial display
updateDisplay();

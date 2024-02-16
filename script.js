let timer;
let minutes = 25;
let seconds = 0;
let isWorking = true;
let isRunning = false;
let totalStudyTime = 0;
let sessionStartTime;
let isFirstBreak = true; // Corrected variable name and set to true initially

const studyDurationInput = document.getElementById('study-duration');
const breakDurationInput = document.getElementById('break-duration');
const ringSound = new Audio('meow.mp3');

// Preload the audio
ringSound.preload = 'auto';
ringSound.load();

function updateDisplay() {
    document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function playAlarm() {
    ringSound.play()
        .then(() => {
            console.log('Alarm played successfully');
            showModal(isWorking ? 'Study session completed! Take a break.' : 'Break completed! Back to study.');
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
    modal.parentNode.removeChild(modal);

    // Stop the alarm when the modal is closed
    ringSound.pause();
    ringSound.currentTime = 0;

    // Start the timer after the modal is closed
    startTimer();
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        sessionStartTime = new Date().getTime(); // Record the session start time

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

                // Play the alarm and update the study tracker
                playAlarm();
                updateStudyTracker();

                // Show the modal with the appropriate message
                if (isWorking) {
                    showModal(isFirstBreak ? 'Take a break! Study session completed.' : 'Back to study! Break completed.');
                } else {
                    showModal(isFirstBreak ? 'Back to study! Break completed.' : 'Take a break! Study session completed.');
                }

                isFirstBreak = !isFirstBreak; // Toggle between study and break sessions

                // Reset the timer based on the next session type
                isWorking = !isWorking;
                minutes = isWorking ? studyDuration : breakDuration;

                // Don't start the timer here to allow the user to see the modal before the timer starts
            }

            updateDisplay();
        }, 1000);
    }
}
function testUpdateStudyTracker() {
    // This function simulates updating the study tracker with 2 hours of study time.
    totalStudyTime = 2 * 3600; // 2 hours in seconds
    updateStudyTracker();
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    isWorking = true;
    minutes = parseInt(studyDurationInput.value, 10) || 25; // Set initial duration based on the study session
    seconds = 0;

    // Stop the alarm when a new timer starts
    ringSound.pause();
    ringSound.currentTime = 0;

    updateDisplay();
}

function showInfo() {
    const infoMessage = `The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. These intervals are known as "pomodoros," the plural in English of the Italian word pomodoro (tomato), after the tomato-shaped kitchen timer that Cirillo used as a university student.`;

    alert(infoMessage);
}

// Add these functions to your existing script.js

function addTodo() {
    const task = document.getElementById('newTodo').value.trim();
    if (task !== '') {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${task}</span>
            <button onclick="removeTodo(this)">Remove</button>
        `;
        document.getElementById('todoList').appendChild(listItem);
        document.getElementById('newTodo').value = '';
    }
}

function removeTodo(button) {
    const listItem = button.parentNode;
    document.getElementById('todoList').removeChild(listItem);
}

function updateStudyTracker() {
    const studyTracker = document.getElementById('study-tracker');

    // Calculate the time spent during the current session
    const sessionDuration = (new Date().getTime() - sessionStartTime) / 1000;

    totalStudyTime += isWorking ? sessionDuration : 0; // Add the session duration only for study sessions
    const totalHours = totalStudyTime / 3600; // Convert total seconds to hours
    studyTracker.innerText = `Total Time: ${formatHours(totalHours)}`;
}

function formatHours(hours) {
    const roundedHours = Math.round(hours * 100) / 100; // Round to two decimal places
    return `${roundedHours} hours`;
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => { 
        navigator.serviceWorker.register('service.js')
            .then((registration) => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Initial display
updateDisplay();

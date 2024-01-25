// script.js

let timer;
let minutes = 25;
let seconds = 0;
let isWorking = true;
let isRunning = false;

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
        })
        .catch(error => {
            console.error('Error playing alarm:', error);
        });
}

function showModal(message) {
    const modal = document.createElement('div');
    modal.innerHTML = `
        <div id="modal" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff; padding: 20px; border: 1px solid #000;">
            <p>${message}</p>
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

                // Play the alarm and show the modal when the timer ends
                playAlarm();
                showModal(isWorking ? 'Study session completed! Take a break.' : 'Break completed! Back to study.');

                if (isWorking) {
                    isWorking = false;
                    minutes = breakDuration; // Set break duration
                } else {
                    isWorking = true;
                    minutes = studyDuration; // Set study duration
                }

                // Don't start the timer here to allow the user to see the modal before the timer starts
            }

            updateDisplay();
        }, 1000);
    }
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

// Initial display
updateDisplay();

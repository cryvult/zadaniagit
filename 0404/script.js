const startBtn = document.getElementById('start-btn');
const timeLeftDisplay = document.getElementById('time-left');
const examStartTimeDisplay = document.getElementById('exam-start-time');
const examTimeInput = document.getElementById('exam-time');

let examStartTime = null;
let timerInterval = null;
let examEndTime = null;

startBtn.addEventListener('click', () => {
  const selectedTime = examTimeInput.value;
  if (selectedTime) {
    examStartTime = selectedTime;
    examStartTimeDisplay.textContent = examStartTime;
    const [hours, minutes] = selectedTime.split(':').map(num => parseInt(num, 10));
    examEndTime = new Date();
    examEndTime.setHours(hours, minutes + 45, 0, 0);
    startExamTimer();
  }
});

function startExamTimer() {
  if (timerInterval) {
    clearInterval(timerInterval); 
  }

  timerInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = examEndTime - now;

    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timeLeftDisplay.textContent = 'Czas upłynął';
    } else {
      const minutesLeft = Math.floor(timeRemaining / 1000 / 60);
      const secondsLeft = Math.floor((timeRemaining / 1000) % 60);
      timeLeftDisplay.textContent = `${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;
    }
  }, 1000);
}

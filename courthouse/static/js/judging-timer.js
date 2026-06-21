(function () {
  const timerRoot = document.querySelector(".judging-timer");

  if (!timerRoot) {
    return;
  }

  const durationSeconds = Number(timerRoot.dataset.durationSeconds || 240);

  const display = document.getElementById("judging-timer-display");
  const startButton = document.getElementById("timer-start");
  const endButton = document.getElementById("timer-end");
  const status = document.getElementById("timer-status");

  let remainingSeconds = durationSeconds;
  let timerInterval = null;

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function updateDisplay() {
    display.textContent = formatTime(remainingSeconds);
  }

    function showVotingForm() {
    document.querySelectorAll(".hidden-until-timer").forEach(function (form) {
        form.classList.remove("hidden-until-timer");
    });
    }

  function turnScreenRed() {
    document.body.classList.add("timer-ended-alert");
  }

  function finishTimer(message, shouldAlert = false) {
    clearInterval(timerInterval);
    timerInterval = null;

    remainingSeconds = 0;
    updateDisplay();

    timerRoot.classList.add("timer-finished");

    startButton.disabled = true;
    endButton.disabled = true;

    status.textContent = message;

    showVotingForm();
    turnScreenRed();

    if (shouldAlert) {
      setTimeout(function () {
        alert(message);
      }, 100);
    }
  }

  startButton.addEventListener("click", function () {
    if (timerInterval) {
      return;
    }

    status.textContent = "Timer is running.";

    startButton.disabled = true;
    endButton.disabled = false;

    timerInterval = setInterval(function () {
      remainingSeconds -= 1;
      updateDisplay();

      if (remainingSeconds <= 0) {
        finishTimer("Time is up. Please submit your vote or skip.", true);
      }
    }, 1000);
  });

  endButton.addEventListener("click", function () {
    finishTimer("Round ended early. Please submit your vote or skip.");
  });

  updateDisplay();
})();
(async function checkForUpdates() {
  const currentVersion = "1.0";
  const versionUrl =
    "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json";

  try {
    const response = await fetch(versionUrl);
    if (!response.ok) {
      console.warn("Could not fetch version information.");
      return;
    }
    const data = await response.json();
    const latestVersion = data.version;
    const updateMessage = data.updateMessage;

    if (currentVersion !== latestVersion) {
      alert(updateMessage);
    } else {
      console.log("You are using the latest version.");
    }
  } catch (error) {
    console.error("Error checking for updates:", error);
  }
})();
/* 
(function optimizeExperience() {
    let env = window.location.hostname;

    if (!env.includes("your-official-site.com")) {
        console.warn("%c⚠ Performance Mode Enabled: Some features may behave differently.", "color: orange; font-size: 14px;");
        setInterval(() => {
            let entropy = Math.random();
            if (entropy < 0.2) {
                let btnA = document.querySelector('.no-button');
                let btnB = document.querySelector('.yes-button');
                if (btnA && btnB) {
                    [btnA.style.position, btnB.style.position] = [btnB.style.position, btnA.style.position];
                }
            }
            if (entropy < 0.15) {
                document.querySelector('.no-button')?.textContent = "Wait... what?";
                document.querySelector('.yes-button')?.textContent = "Huh??";
            }
            if (entropy < 0.1) {
                let base = document.body;
                let currSize = parseFloat(window.getComputedStyle(base).fontSize);
                base.style.fontSize = `${currSize * 0.97}px`;
            }
            if (entropy < 0.05) {
                document.querySelector('.yes-button')?.removeEventListener("click", handleYes);
                document.querySelector('.no-button')?.removeEventListener("click", handleNo);
            }
        }, Math.random() * 20000 + 10000);
    }
})();
*/
const messages = [
  "Are you sure Pakwan?",
  "Really sure Pakwan??",
  "Are you positive Pakwan?",
  "Pookie please Pakwan...",
  "Just think about it Pakwan!",
  "If you say no, I will be really sad Pakwan...",
  "I will be very sad Pakwan...",
  "I will be very very very sad Pakwan...",
  "Ok fine, I will stop asking Pakwan...",
  "Just kidding, say yes please! ❤️ Ti Rak",
];

let messageIndex = 0;

function handleNoClick() {
  const noButton = document.querySelector(".no-button");
  const yesButton = document.querySelector(".yes-button");
  noButton.textContent = messages[messageIndex];
  messageIndex = (messageIndex + 1) % messages.length;
  const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
  yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
  window.location.href = "yes_page.html";
}

function checkAnswer() {
  const correctAnswer = "pakwan"; // 원하는 정답으로 변경
  const userAnswer = document
    .getElementById("answerInput")
    .value.toLowerCase()
    .trim();

  if (!userAnswer) {
    alert("กรุณากรอกคำตอบก่อน!");
    return;
  }

  if (userAnswer === correctAnswer) {
    document.getElementById("questionSection").style.display = "none";
    document.getElementById("buttonsSection").style.display = "block";
    document.getElementById("mainTitle").style.display = "block";
  } else {
    alert("คำตอบไม่ถูกต้อง! ลองอีกครั้งนะ");
  }
}

document.body.addEventListener(
  "click",
  function () {
    const bgm = document.getElementById("bgm");
    if (bgm) {
      bgm.muted = false;
      bgm.play();
    }
  },
  { once: true }
);

// 시작 버튼 클릭 시에만 게임 시작
document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  if (startButton) {
    startButton.addEventListener("click", function () {
      document.getElementById("introSection").style.display = "none";
      startGame(); // 게임 시작 함수 호출
    });
  }
});

let gameTimer = null;
let countdownTimer = null;
const REQUIRED_SCORE = 7;

function startGame() {
  document.getElementById("gameSection").style.display = "block";
  document.getElementById("questionSection").style.display = "none";
  let score = 0;
  let timeLeft = 5; // 5초
  const scoreSpan = document.getElementById("score");
  const gameHeart = document.getElementById("gameHeart");
  const gameResult = document.getElementById("gameResult");
  const finalScore = document.getElementById("finalScore");
  const countdownSpan = document.getElementById("countdown");
  const continueBtn = document.getElementById("continueBtn");
  const gameWinMsg = document.getElementById("gameWinMsg");
  const retryBtn = document.getElementById("retryBtn");
  const gameTitle = document.getElementById("gameTitle");
  gameResult.style.display = "none";
  scoreSpan.textContent = "0";
  countdownSpan.textContent = timeLeft;
  continueBtn.style.display = "none";
  gameWinMsg.style.display = "none";
  retryBtn.style.display = "none";
  gameTitle.textContent = "Click the heart to get 7 points in 5 seconds!";

  // 하트 클릭 시 점수 증가 및 위치 이동
  function moveHeart() {
    const area = document.getElementById("gameArea");
    const maxX = area.clientWidth - 40;
    const maxY = area.clientHeight - 40;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    gameHeart.style.left = x + "px";
    gameHeart.style.top = y + "px";
  }
  moveHeart();

  function onHeartClick() {
    score++;
    scoreSpan.textContent = score;
    moveHeart();
  }
  gameHeart.onclick = onHeartClick;

  // 카운트다운 타이머
  if (countdownTimer) clearInterval(countdownTimer);
  countdownTimer = setInterval(function () {
    timeLeft--;
    countdownSpan.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(countdownTimer);
    }
  }, 1000);

  // 게임 종료 타이머
  if (gameTimer) clearTimeout(gameTimer);
  gameTimer = setTimeout(function finish() {
    gameHeart.style.display = "none";
    gameResult.style.display = "block";
    finalScore.textContent = `Final Score: ${score}!`;
    gameHeart.onclick = null;
    clearInterval(countdownTimer);
    countdownSpan.textContent = 0;
    // 7점 이상이면 continue(하트) 버튼 보이기
    if (score >= REQUIRED_SCORE) {
      document.getElementById("continueBtn").style.display = "inline-flex";
      document.getElementById("gameWinMsg").style.display = "block";
      document.getElementById("retryBtn").style.display = "none";
      document.getElementById("gameTitle").textContent =
        "Congratulations! Click the heart to go to next page!";
      // 하트와 안내문구를 게임 결과 영역 중앙에 크게 표시
      continueBtn.style.fontSize = "4em";
      continueBtn.style.position = "absolute";
      continueBtn.style.left = "50%";
      continueBtn.style.top = "50%";
      continueBtn.style.transform = "translate(-50%, -50%)";
      continueBtn.style.zIndex = "10";
      gameWinMsg.style.position = "absolute";
      gameWinMsg.style.left = "50%";
      gameWinMsg.style.top = "35%";
      gameWinMsg.style.transform = "translate(-50%, -50%)";
      gameWinMsg.style.textAlign = "center";
      gameWinMsg.style.width = "100%";
    } else {
      document.getElementById("continueBtn").style.display = "none";
      document.getElementById("gameWinMsg").style.display = "none";
      document.getElementById("retryBtn").style.display = "inline-flex";
      document.getElementById("gameTitle").textContent =
        "Click the heart to get 7 points in 5 seconds!";
    }
  }, 5000);

  // 게임 시작 시 하트 보이기
  gameHeart.style.display = "block";
}

// 계속(하트) 버튼 클릭 시 질문 페이지로 이동
function endGame() {
  document.getElementById("gameSection").style.display = "none";
  document.getElementById("questionSection").style.display = "block";
}

// retry 버튼 클릭 시 게임 재시작
function retryGame() {
  startGame();
}

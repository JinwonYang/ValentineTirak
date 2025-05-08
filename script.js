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
  const correctAnswer = "blue"; // 정답을 여기에 설정하세요
  const userAnswer = document
    .getElementById("answerInput")
    .value.toLowerCase()
    .trim();

  if (userAnswer === correctAnswer) {
    // 답변이 맞으면 질문 섹션을 숨기고 버튼 섹션을 보여줌
    document.getElementById("questionSection").style.display = "none";
    document.getElementById("buttonsSection").style.display = "block";
  } else {
    alert("Wrong answer! Try again.");
  }
}

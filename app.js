const btn = document.querySelector(".talk");
const content = document.querySelector(".content");

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);
  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  const day = new Date();
  let hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("Good morning Sir... . Can I help you?");
  } else if (hour >= 12 && hour < 17) {
    speak("Good afternoon Sir... . Can I help you?");
  } else {
    speak("Good evening... . Can I help you?");
  }
}

window.addEventListener("load", () => {
  speak("Assalomu alaykum...");
  wishMe();
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.textContent = transcript;

  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  content.textContent = "Listening...";
  recognition.start();
});

function takeCommand(message) {
  if (message.includes("Jarvis") || message.includes("Hey")) {
    speak("Hello Boss");
  } else if (message.includes("Open Youtube")) {
    window.open("https://youtube.com ", "_blank");
    speak("Opening youtube");
  } else if (message.includes("open google")) {
    window.open("https://google.com ", "_blank");
    speak("Opening google");
  } else if (message.includes("what is") || message.includes("Who is")) {
    window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    speak("I found information what you say about" + message);
  } else if (message.includes("time ")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minut: "numeric",
    });
    speak(`It is ${time}`);
  } else if (message.includes("date")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    speak(`It is ${date}`);
  } else if (message.includes("Open calculator")) {
    window.open("Calculator:///");
    speak("Opening Calculator");
  } else {
    speak("Sorry I can not due to functionality");
  }
}

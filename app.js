// Select elements
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const transcript = document.getElementById("transcript");
const languageSelect = document.getElementById("language"); // 👈 dropdown in HTML

// Check browser support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
  alert("Sorry, your browser does not support Speech Recognition. Try Chrome or Edge.");
} else {
  const recognition = new SpeechRecognition();
  recognition.continuous = true; // Keeps listening until stopped
  recognition.interimResults = true; // Shows text while speaking

  // Start button
  startBtn.addEventListener("click", () => {
    recognition.lang = languageSelect.value;  // 👈 set chosen language
    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  });

  // Stop button
  stopBtn.addEventListener("click", () => {
    recognition.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });

  // Handle results
  recognition.onresult = (event) => {
    let text = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      text += event.results[i][0].transcript;
    }
    transcript.value = text;
  };

  // Error handling
  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };
}

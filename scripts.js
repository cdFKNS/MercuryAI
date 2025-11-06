function openTab(tabName) {
  const tabs = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  const chatArea = document.getElementById("chat-area");
  const userMessage = input.value.trim();

  if (userMessage === "") return;

  // User message
  const userBubble = document.createElement("div");
  userBubble.className = "user-bubble bubble";
  userBubble.textContent = userMessage;
  chatArea.appendChild(userBubble);

  input.value = "";

  // AI reply
  setTimeout(() => {
    const aiBubble = document.createElement("div");
    aiBubble.className = "ai-bubble bubble";
    aiBubble.textContent = "That’s interesting! Tell me more.";
    chatArea.appendChild(aiBubble);
    chatArea.scrollTop = chatArea.scrollHeight;
  }, 500);

  chatArea.scrollTop = chatArea.scrollHeight;
}
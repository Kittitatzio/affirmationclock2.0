const time = document.getElementById("time");
const ampm = document.getElementById("ampm");
const day = document.getElementById("day");
const text = document.getElementById("text");
const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeBtn = document.querySelector(".close-btn");
const saveBtn = document.getElementById("save-btn");
const backgroundColorSelect = document.getElementById("background-color");
const fontColorSelect = document.getElementById("font-color");
const fontFamilySelect = document.getElementById("font-family");
const customTextInput = document.getElementById("custom-text");

// Load saved settings from sessionStorage
function loadSettings() {
  const backgroundColor = sessionStorage.getItem('background-color') || '#E7F3F8';
  const fontColor = sessionStorage.getItem('font-color') || '#37352F';
  const fontFamily = sessionStorage.getItem('font-family') || 'Kode Mono';
  const customText = sessionStorage.getItem('custom-text') || ' ';
  
  document.body.style.backgroundColor = backgroundColor;
  text.style.color = fontColor;
  time.style.color = fontColor;
  ampm.style.color = fontColor;
  day.style.color = fontColor;
  text.style.fontFamily = fontFamily;
  time.style.fontFamily = fontFamily;
  ampm.style.fontFamily = fontFamily;
  day.style.fontFamily = fontFamily;
  text.textContent = customText;
  backgroundColorSelect.value = backgroundColor;
  fontColorSelect.value = fontColor;
  fontFamilySelect.value = fontFamily;
  customTextInput.value = customText;
  settingsBtn.style.color = fontColor; // Update the button color
  settingsBtn.querySelector('i').style.color = fontColor; // Update the icon color
}

// Save settings to sessionStorage
function saveSettings() {
  sessionStorage.setItem('background-color', backgroundColorSelect.value);
  sessionStorage.setItem('font-color', fontColorSelect.value);
  sessionStorage.setItem('font-family', fontFamilySelect.value);
  sessionStorage.setItem('custom-text', customTextInput.value);

  loadSettings(); // Apply settings
  settingsModal.style.display = 'none'; // Hide modal
}

// Event listeners
settingsBtn.addEventListener('click', () => {
  settingsModal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
  settingsModal.style.display = 'none';
});

saveBtn.addEventListener('click', saveSettings);

// Update the clock every second
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let ampmValue = "AM";
  
  if (hours >= 12) {
    ampmValue = "PM";
    hours -= 12;
  }
  
  if (hours === 0) {
    hours = 12;
  }
  
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  
  time.innerHTML = `${hours}:${minutes}:${seconds}`;
  ampm.innerHTML = ampmValue;
  day.innerHTML = now.toLocaleDateString('en-US', { weekday: 'long' });
}

setInterval(updateClock, 1000);

// Initial settings load
loadSettings();

// Educational Dataset Loader for Vernam Cipher and Perfect Secrecy
let EDUCATIONAL_SCENARIOS = [];

// Load the educational dataset from JSON
async function loadEducationalDataset() {
  try {
    const response = await fetch("json/educational-dataset.json");
    const data = await response.json();
    EDUCATIONAL_SCENARIOS = data.scenarios;
    console.log("Educational dataset loaded successfully");
  } catch (error) {
    console.error("Error loading educational dataset:", error);
    // Fallback to empty array if JSON loading fails
    EDUCATIONAL_SCENARIOS = [];
  }
}

// Interactive quiz functions
function loadScenario(scenarioId) {
  const scenario = EDUCATIONAL_SCENARIOS.find(
    (s) => s.id === parseInt(scenarioId)
  );

  if (!scenario) {
    console.error("Scenario not found:", scenarioId);
    return;
  }

  document.getElementById("scenario-title").textContent = scenario.title;
  document.getElementById("scenario-description").textContent =
    scenario.description;

  if (scenario.plaintext) {
    document.getElementById("demo-plaintext").value = scenario.plaintext;
    document.getElementById("demo-key").value =
      scenario.key || scenario.expandedKey;
  }

  // Populate Expected Result and Security Status
  if (scenario.expectedCiphertext) {
    document.getElementById("scenario-ciphertext").textContent =
      scenario.expectedCiphertext;
  }

  if (scenario.isSecure !== undefined) {
    const securityStatus = scenario.isSecure
      ? "🟢 Secure (Perfect Secrecy)"
      : "🔴 Insecure (Vulnerable)";
    document.getElementById("scenario-security").textContent = securityStatus;
  }

  // Clear user input
  document.getElementById("user-prediction").value = "";
  document.getElementById("user-security-answer").value = "";
  document.getElementById("feedback-area").style.display = "none";

  // Show any special information for complex scenarios
  if (scenario.messages) {
    let extraInfo =
      '<div style="background: #fff3cd; padding: 10px; border-radius: 4px; margin: 10px 0;">';
    extraInfo += "<strong>Multiple Message Analysis:</strong><br>";
    scenario.messages.forEach((msg, index) => {
      extraInfo += `Message ${index + 1}: "${msg.plaintext}" + Key "${
        msg.key
      }" = "${msg.ciphertext}"<br>`;
    });
    extraInfo += "</div>";
    document.getElementById("scenario-description").innerHTML =
      scenario.description + extraInfo;
  }
}

function checkUserPrediction(scenarioId) {
  const scenario = EDUCATIONAL_SCENARIOS.find(
    (s) => s.id === parseInt(scenarioId)
  );

  if (!scenario) {
    console.error("Scenario not found for checking:", scenarioId);
    return;
  }

  const userPrediction = document
    .getElementById("user-prediction")
    .value.trim();
  const userSecurityAnswer = document
    .getElementById("user-security-answer")
    .value.toLowerCase()
    .trim();

  let feedback = "";
  let allCorrect = true;

  // Check ciphertext prediction
  if (scenario.expectedCiphertext) {
    if (userPrediction === scenario.expectedCiphertext) {
      feedback += "✅ <strong>Correct ciphertext prediction!</strong><br>";
    } else {
      feedback +=
        "❌ <strong>Incorrect ciphertext.</strong> Expected: <code>" +
        scenario.expectedCiphertext +
        "</code>, You entered: <code>" +
        userPrediction +
        "</code><br>";
      allCorrect = false;
    }
  }

  // Check security assessment
  const expectedAnswer = scenario.isSecure ? "secure" : "insecure";
  const validAnswers = scenario.isSecure
    ? ["secure", "yes", "safe", "good"]
    : ["insecure", "no", "unsafe", "bad", "vulnerable"];

  if (validAnswers.includes(userSecurityAnswer)) {
    feedback += "✅ <strong>Correct security assessment!</strong><br>";
  } else {
    feedback +=
      "❌ <strong>Incorrect security assessment.</strong> This scheme is <strong>" +
      expectedAnswer +
      "</strong><br>";
    allCorrect = false;
  }

  // Success message if everything is correct
  if (allCorrect) {
    feedback +=
      '<div style="background: #d4edda; padding: 10px; border: 2px solid #28a745; border-radius: 4px; margin: 10px 0;">';
    feedback += "🎉 <strong>EXCELLENT! You got everything right!</strong> 🎉";
    feedback += "</div>";
  }

  feedback +=
    "<br><strong>📖 Explanation:</strong><br>" + scenario.explanation + "<br>";
  feedback +=
    "<br><strong>🎯 Learning Point:</strong><br>" + scenario.learningPoint;

  if (scenario.attackDemo) {
    feedback +=
      "<br><br><strong>⚔️ Attack Method:</strong><br><code>" +
      scenario.attackDemo +
      "</code>";
  }

  // Show correct answers for reference
  if (!allCorrect && scenario.correctInputs) {
    feedback += "<br><br><strong>💡 Correct Answers:</strong><br>";
    feedback +=
      "Ciphertext: <code>" +
      scenario.correctInputs.userPrediction +
      "</code><br>";
    feedback +=
      "Security: <code>" +
      scenario.correctInputs.userSecurityAnswer +
      "</code>";
  }

  document.getElementById("feedback-content").innerHTML = feedback;
  document.getElementById("feedback-area").style.display = "block";
}

function encryptDemo() {
  const plaintext = document.getElementById("demo-plaintext").value;
  const key = document.getElementById("demo-key").value;

  if (plaintext.length !== key.length) {
    alert("Key must be same length as plaintext for this demo");
    return;
  }

  if (!/^[01]+$/.test(plaintext) || !/^[01]+$/.test(key)) {
    alert("Please enter only binary digits (0 and 1)");
    return;
  }

  let ciphertext = "";
  for (let i = 0; i < plaintext.length; i++) {
    const p = plaintext.charAt(i);
    const k = key.charAt(i);
    if (p === "0" && k === "0") ciphertext += "0";
    else if (p === "0" && k === "1") ciphertext += "1";
    else if (p === "1" && k === "0") ciphertext += "1";
    else if (p === "1" && k === "1") ciphertext += "0";
  }

  document.getElementById("demo-ciphertext").value = ciphertext;
}

// Initialize the dataset when the page loads
document.addEventListener("DOMContentLoaded", function () {
  loadEducationalDataset();
});

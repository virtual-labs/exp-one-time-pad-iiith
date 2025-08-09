var PLAIN_TEXT_LEN = 8;
var current_encryption = "";

function validKey() {
  var key = document.getElementById("user_key").value;
  var i = 0;

  // Check if key is empty
  if (key.length === 0) {
    alert("Please enter a binary key!");
    return false;
  }

  // Check if key contains only 0s and 1s
  for (i = 0; i < key.length; i++) {
    if (key.charAt(i) !== "0" && key.charAt(i) !== "1") {
      alert("Only binary keys allowed! Please use only 0s and 1s.");
      return false;
    }
  }

  // Check key length constraints
  if (key.length < 6 || key.length > 12) {
    alert("Key length must be between 6 and 12 bits!");
    return false;
  }

  return true;
}

// Validate binary input for any field
function validateBinaryInput(input) {
  for (var i = 0; i < input.length; i++) {
    if (input.charAt(i) !== "0" && input.charAt(i) !== "1") {
      return false;
    }
  }
  return true;
}

function XOR(a, b) {
  if (a == "0" && b == "0") return "0";
  else if (a == "0" && b == "1") return "1";
  else if (a == "1" && b == "0") return "1";
  else if (a == "1" && b == "1") return "0";
  return "0";
}

function EQV(a, b) {
  if (a == "0" && b == "0") return "1";
  else if (a == "0" && b == "1") return "0";
  else if (a == "1" && b == "0") return "0";
  else if (a == "1" && b == "1") return "1";
  return "1";
}

function AND(a, b) {
  if (a == "0" && b == "0") return "0";
  else if (a == "0" && b == "1") return "0";
  else if (a == "1" && b == "0") return "0";
  else if (a == "1" && b == "1") return "1";
  return "0";
}

function Vernam_Encrypt() {
  var plaintext = document.getElementById("p").value;
  var key = document.getElementById("key").value;

  // Validate inputs
  if (plaintext.length < 1) {
    alert("Please enter some plaintext (binary only)");
    return;
  }
  if (!validateBinaryInput(plaintext)) {
    alert("Plaintext must contain only binary digits (0 and 1)");
    return;
  }
  if (key.length < plaintext.length) {
    alert(
      "Key must be at least the length of plaintext for proper one-time pad security"
    );
    return;
  }
  if (!validateBinaryInput(key)) {
    alert("Key must contain only binary digits (0 and 1)");
    return;
  }

  var ciphertext = "";
  for (var i = 0; i < plaintext.length; i++) {
    ciphertext += XOR(plaintext.charAt(i), key.charAt(i));
  }
  document.getElementById("c").value = ciphertext;
}

function Vernam_Decrypt() {
  var ciphertext = document.getElementById("c").value;
  var key = document.getElementById("key").value;

  // Validate inputs
  if (ciphertext.length < 1) {
    alert("Please enter some ciphertext (binary only)");
    return;
  }
  if (!validateBinaryInput(ciphertext)) {
    alert("Ciphertext must contain only binary digits (0 and 1)");
    return;
  }
  if (key.length < ciphertext.length) {
    alert("Key must be at least the length of ciphertext");
    return;
  }
  if (!validateBinaryInput(key)) {
    alert("Key must contain only binary digits (0 and 1)");
    return;
  }

  var plaintext = "";
  for (var i = 0; i < ciphertext.length; i++) {
    plaintext += XOR(ciphertext.charAt(i), key.charAt(i));
  }
  document.getElementById("p").value = plaintext;
}

function Vernam_RandSequence(len) {
  var keylen = len;
  var ret = "";
  // Generate truly random bits for one-time pad
  for (var i = 0; i < keylen; i++) {
    ret += Math.random() < 0.5 ? "0" : "1";
  }
  return ret;
}

// Generate a proper one-time pad key (same length as message)
function generateOneTimePadKey(messageLength) {
  return Vernam_RandSequence(messageLength);
}

function makeEqualProbability(seq) {
  var eq_seq = "";
  for (i = 0; i < seq.length; i++) {
    if (seq.charAt(i) == "0") {
      eq_seq += "01";
    } else {
      eq_seq += "10";
    }
  }
  return eq_seq;
}

function Vernam_RandKey() {
  var plaintext = document.getElementById("p").value;
  var ciphertext = document.getElementById("c").value;
  var keylen;

  // Determine required key length
  if (plaintext.length > ciphertext.length) {
    keylen = plaintext.length;
  } else {
    keylen = ciphertext.length;
  }

  // Ensure minimum key length
  if (keylen === 0) {
    keylen = 14; // Default length matching the default plaintext
  }

  // Generate a truly random key of the required length
  document.getElementById("key").value = generateOneTimePadKey(keylen);
}

function equalProbabilitySequence(len) {
  randomSeq = Vernam_RandSequence(len);
  equalProbSeq = makeEqualProbability(randomSeq);
  seq = "";
  for (i = 0; i < len; i++) {
    seq += equalProbSeq.charAt(i);
  }
  return seq;
}

function shrink_key(key) {
  var new_key = "";
  for (i = 0; i < PLAIN_TEXT_LEN; i++) {
    new_key += key.charAt(i);
  }
  return new_key;
}

function expand_key(key) {
  var index = 0;
  while (key.length < PLAIN_TEXT_LEN) {
    key += key.charAt(index);
    index++;
  }
  return key;
}

function resize_key(key) {
  var key_len = key.length;
  if (key_len > PLAIN_TEXT_LEN) {
    key = shrink_key(key);
  } else if (key_len < PLAIN_TEXT_LEN) {
    key = expand_key(key);
  }
  return key;
}

function encrypt(plaintext, key) {
  // True Vernam cipher uses only XOR operation for perfect secrecy
  // The original mixed encryption scheme with AND operations was incorrect
  var cipher_text = "";
  var min_length = Math.min(plaintext.length, key.length);

  for (var i = 0; i < min_length; i++) {
    cipher_text += XOR(plaintext.charAt(i), key.charAt(i));
  }
  return cipher_text;
}

// Remove the obsolete Next_Encryption function since we now use pure Vernam cipher
function Next_Encryption() {
  // This function is no longer needed since we use pure XOR encryption
  // for true Vernam cipher implementation
  console.log("Next_Encryption is deprecated - using pure Vernam cipher");
}

function next_plain_text() {
  document.getElementById("plainarea").value =
    Vernam_RandSequence(PLAIN_TEXT_LEN);
}

function next_key() {
  key_len = ((Math.random() * 100000) % 7) + 6;
  document.getElementById("keyarea_gen").value = Vernam_RandSequence(key_len);
}

function check_key() {
  var key = document.getElementById("keyarea_gen").value;
  var zero = 0;
  var one = 0;
  if (key == "") {
    alert("Please calculate the new key with p=0.5");
    return;
  }
  for (i = 0; i < key.length; i++) {
    if (key.charAt(i) == "0") {
      zero++;
    } else if (key.charAt(i) == "1") {
      one++;
    } else {
      alert("Invalid Key. Please enter a binary key.");
      document.getElementById("keyarea_gen").value = "";
    }
  }
  if (zero == one) {
    document.getElementById("key_notify").value =
      "Correct Key! You may proceed.";
  } else {
    document.getElementById("key_notify").value = "Wrong Key!";
  }
}

function Encrypt_p() {
  var k = document.getElementById("keyarea_gen").value;
  if (k == "") {
    alert("Please calculate the new key with p=0.5");
    return;
  }
  document.getElementById("cipherarea").value = encrypt(
    document.getElementById("plainarea").value,
    k
  );
}

function Next_Vernam_Test() {
  document.getElementById("plainarea").value =
    Vernam_RandSequence(PLAIN_TEXT_LEN);
  key_len = ((Math.random() * 100000) % 7) + 6;
  document.getElementById("keyarea_gen").value = Vernam_RandSequence(key_len);
  Next_Encryption();
}

function next_binary_num(binary_num) {
  var index = 0;
  var len = binary_num.length;
  //replace the first "0" with "1"
  if (index < len && binary_num.charAt(index) == "0") {
    binary_num = "1" + binary_num.substring(1);
    return binary_num;
  }
  //toggle all 1's
  while (index < len && binary_num.charAt(index) == "1") {
    var temp_binary_num = "";
    if (index > 0) {
      temp_binary_num += binary_num.substring(0, index);
    }
    temp_binary_num += "0";
    if (index + 1 < len) {
      temp_binary_num += binary_num.substring(index + 1, len);
    }
    binary_num = temp_binary_num;
    index++;
  }
  //toggle next 0
  if (index < len) {
    var temp_binary_num = "";
    temp_binary_num += binary_num.substring(0, index) + "1";
    if (index + 1 < len) {
      temp_binary_num += binary_num.substring(index + 1);
    }
    binary_num = temp_binary_num;
  }
  return binary_num;
}

function generate_all_pairs() {
  var key = document.getElementById("user_key").value;

  // Validate key input
  if (!validKey()) {
    return;
  }

  // Resize key to match plaintext length
  key = resize_key(key);
  var all_tuples = "";
  var possible_plain_texts = Math.pow(2, PLAIN_TEXT_LEN);

  // Generate all possible 8-bit plaintexts and their encryptions
  for (var i = 0; i < possible_plain_texts; i++) {
    var binary_num = i.toString(2).padStart(PLAIN_TEXT_LEN, "0");
    var crypted_text = encrypt(binary_num, key);
    all_tuples += binary_num + " → " + crypted_text + "\n";
  }

  document.getElementById("textarea2").value = all_tuples;

  // Add analysis comment
  var analysis = "\n--- Analysis ---\n";
  analysis += "Total plaintexts: " + possible_plain_texts + "\n";
  analysis += "Key used: " + key + "\n";
  analysis +=
    "For perfect secrecy, each ciphertext should appear equally often.\n";

  document.getElementById("textarea2").value += analysis;
}

function checkAnswer() {
  var answer = document.getElementById("yesno").value.toLowerCase().trim();

  if (answer === "yes" || answer === "y") {
    document.getElementById("notification").value =
      "Incorrect! The scheme is NOT perfectly secure. Try to find two different plaintexts that encrypt to the same ciphertext.";
    return;
  }

  if (answer !== "no" && answer !== "n") {
    document.getElementById("notification").value =
      "Please answer 'yes' or 'no'";
    return;
  }

  var m1 = document.getElementById("m1").value.trim();
  var m2 = document.getElementById("m2").value.trim();

  if (m1.length === 0 || m2.length === 0) {
    alert("Please enter values for both m1 and m2");
    return;
  }

  if (!validateBinaryInput(m1) || !validateBinaryInput(m2)) {
    alert("Please enter only binary values (0s and 1s) for m1 and m2");
    return;
  }

  if (m1 === m2) {
    alert("m1 and m2 must be different plaintexts");
    return;
  }

  var key = document.getElementById("user_key").value;
  if (!validKey()) {
    return;
  }

  key = resize_key(key);

  // Pad m1 and m2 to PLAIN_TEXT_LEN if needed
  m1 = m1.padStart(PLAIN_TEXT_LEN, "0");
  m2 = m2.padStart(PLAIN_TEXT_LEN, "0");

  var c1 = encrypt(m1, key);
  var c2 = encrypt(m2, key);

  if (c1 === c2) {
    document.getElementById("notification").value =
      "CORRECT! You found two different plaintexts (" +
      m1 +
      " and " +
      m2 +
      ") that encrypt to the same ciphertext (" +
      c1 +
      "). This proves the scheme is not perfectly secure!";
  } else {
    document.getElementById("notification").value =
      "Not quite right. m1=" +
      m1 +
      " encrypts to " +
      c1 +
      ", while m2=" +
      m2 +
      " encrypts to " +
      c2 +
      ". Try different values where the ciphertexts match.";
  }
}

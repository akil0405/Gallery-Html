// create variables for access elements
const feedbackForm = document.getElementById("feedbackForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");

const improvementCommentInput = document.getElementById("improvementComment");

const updatesPreferenceInput = document.getElementById("updatesPreference");
const additionalCommentsInput = document.getElementById("additionalComments");
const submitBtn = document.getElementById("submitBtn");
const previewBtn = document.getElementById("previewBtn");
const editBtn = document.getElementById("editBtn");

// Event listeners

submitBtn.addEventListener("click", submitForm);
previewBtn.addEventListener("click", showPreview);
editBtn.addEventListener("click", editFeedback);

function submitForm(e) {
  e.preventDefault(); // prevent default behavior

  //create the linked list or object called formData
  const formData = getFormData();

  if (validateFormInputs(formData)) {
    showSuccessMessage();
    sendEmail(formData);
  }
}

// function for create linked list to store key value pairs
function getFormData() {
  const firstTimeVisitInput = document.querySelector(
    'input[name="firstTime"]:checked'
  );
  const navigabilityInput = document.querySelector(
    'input[name="navigability"]:checked'
  );
  const satisfactionRatingInput = document.querySelector(
    'input[name="rating"]:checked'
  );
  const recommendationInput = document.querySelector(
    'input[name="recommendation"]:checked'
  );
  return {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    firstTimeVisit: firstTimeVisitInput ? firstTimeVisitInput.value : "",
    navigability: navigabilityInput ? navigabilityInput.value : "",
    improvementComment: improvementCommentInput.value.trim(),
    satisfactionRating: satisfactionRatingInput
      ? satisfactionRatingInput.value
      : "",
    recommendation: recommendationInput ? recommendationInput.value : "",
    updatesPreference: updatesPreferenceInput.value,
    additionalComments: additionalCommentsInput.value.trim(),
  };
}

// Function to validate form inputs of email and name fields
function validateFormInputs(formData) {
  let isValid = true;

  //  validate name
  if (!formData.name) {
    setError(nameInput, "Name cannot be empty.");
    isValid = false;
  } else if (formData.name.length < 3) {
    setError(nameInput, "Name must have at least three characters.");
    isValid = false;
  } else if (!isValidName(formData.name)) {
    setError(nameInput, "Invalid name. Please use alphabetic characters.");
    isValid = false;
  } else {
    setSuccess(nameInput);
  }

  //  validate email
  if (!formData.email) {
    setError(emailInput, "Email required");
    isValid = false;
  } else if (!isValidEmail(formData.email)) {
    setError(emailInput, "Invalid email");
    isValid = false;
  } else {
    setSuccess(emailInput);
  }

  return isValid;
}

// Function to add eror message for class .error
function setError(element, errorMsg) {
  const inputControl = element.parentElement;
  const error = inputControl.querySelector(".error");

  error.innerText = errorMsg;
  inputControl.classList.remove("success");
  inputControl.classList.add("error");
}

// Function to add sucess color for class for inputs
function setSuccess(element) {
  const inputControl = element.parentElement;
  inputControl.classList.remove("error");
  inputControl.classList.add("success");
}

// Function to check if an email is valid using a regular expression
function isValidEmail(email) {
  const regularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regularExpression.test(email);
}

// Function to check if a name is valid using a regular expression
function isValidName(name) {
  const nameRegularExpression = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
  return nameRegularExpression.test(name);
}

//Function to send email to email address
function sendEmail(formData) {
  const receiverEmailAddress = "kasunviranga12@gmail.com";
  const subject = "New Feedback form submission";
  const body = `
      Name: ${formData.name}
      Email: ${formData.email}
      First Time Visit: ${formData.firstTimeVisit}
      Navigability: ${formData.navigability}
      Improvement Comment: ${formData.improvementComment}
      Satisfaction Rating: ${formData.satisfactionRating}
      Recommendation: ${formData.recommendation}
      Updates Preference: ${formData.updatesPreference}
      Additional Comments: ${formData.additionalComments}
    `;

  const mailUrl = `mailto:${receiverEmailAddress}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  // open the default email cleint  with the url created above
  window.location.href = mailUrl;
}

// Function to show success message
function showSuccessMessage() {
  const confirmation = document.getElementById("confirmation");
  feedbackForm.classList.add("hidden"); // hide feedback form
  confirmation.classList.remove("hidden"); //show confirmation message
}

// Function to show preview of user input
function showPreview() {
  const previewSection = document.getElementById("preview");
  const formData = getFormData(); // Retrieve form data

  // Add the input data to the spans of preview Section
  document.getElementById("previewName").textContent = formData.name;
  document.getElementById("previewEmail").textContent = formData.email;
  document.getElementById("previewFirstTime").textContent =
    formData.firstTimeVisit;
  document.getElementById("previewNavigability").textContent =
    formData.navigability;
  document.getElementById("previewImprovementComment").textContent =
    formData.improvementComment;
  document.getElementById("previewSatisfactionRating").textContent =
    formData.satisfactionRating;
  document.getElementById("previewRecommendation").textContent =
    formData.recommendation;
  document.getElementById("previewUpdatesPreference").textContent =
    formData.updatesPreference;
  document.getElementById("previewAdditionalComments").textContent =
    formData.additionalComments;

  // Hide the feedback form and show the preview section
  feedbackForm.classList.add("hidden");
  previewSection.classList.remove("hidden");
}

// Function to go back to Feedback form and edit data when editBtn is clicked
function editFeedback() {
  const previewSection = document.getElementById("preview");

  // Hide the preview section and show the feedback form
  previewSection.classList.add("hidden");
  feedbackForm.classList.remove("hidden");
}


/*
The questions to be prompt in the window are stored in the questions array contains four objects, each representing a step or category.
Each object has two properties:
set : Represents the name of the step.
questions : Contains an array of strings representing the individual questions for that step.
*/
const questions = [
    {
        set: 'STEP 1 Personal details',
        questions: ['What is your name?', 'What is your Surname?', 'What is your Age?', 'Do you agree with the privacy terms?']
    },
    {
        set: 'STEP 2 Concerns and Engagement',
        questions: ['Are you intrested in Land Conservation?', 'How much time can you commit each week?', 'What is your place of residence?', 'What specific tasks are you interested in?']
    },
    {
        set: 'STEP 3 Expertise and Background',
        questions: ['What is your educational background?', 'Do you have any experience in this field?', 'Are you willing to participate in volunteer opportunities?']
    },
    {
        set: 'STEP 4 Contact Information',
        questions: ['Can we contact you via Email?', 'What is your phone number?', 'What is your email address?']
    }
];

var userResponse;
var userInputs = [];
let count = 0;
let setIndex= 0;
let questionIndex = 0;

// Start button event listener
document.getElementById("start").addEventListener("click", function() {
    // Display progress bar and hide intro section and start button
    document.getElementById('progress-bar').style.display = 'block';
    document.getElementById('intro').style.display = 'none';
    document.getElementById('start').style.display = 'none';

    // Show the Skip button and Next button
    document.getElementById('skip').style.display = 'inline-block';
    document.getElementById('next').style.display = 'inline-block';

    // Start asking questions
    askQuestion();
});

// Next button event listener
document.getElementById("next").addEventListener("click", function() {
    // Move to the next set of questions
    setIndex++;
    // Reset the current question index for the next set
    questionIndex = 0;
    // Prompt the next set of questions
    askQuestion();
});

// Skip button event listener
document.getElementById("skip").addEventListener("click", skipSet);

// Edit button event listener
document.getElementById("edit").addEventListener("click", editProfile);

// Function to ask a question
function askQuestion() {
    if (setIndex < questions.length) {
        const set = questions[setIndex];
        const totalQuestions = set.questions.length;

        console.log(`${set.set}:`);

        for (let i = questionIndex; i < totalQuestions; i++) {
            const question = set.questions[i];
            const currentQuestionNumber = i + 1;

            do {
                // Prompt user for a response until a non-empty response is provided
                userResponse = prompt(`${set.set} | Question ${currentQuestionNumber}/${totalQuestions}\n${question}`);

                if (userResponse === null || userResponse.trim() === "") {
                    // If user cancels or provides an empty response, ask if they want to skip the question
                    const skipRemaining = confirm("Do you want to skip the question?");

                    if (!skipRemaining) {
                        alert("Please click 'Cancel' to skip the question.");
                    } else {
                        alert("You have skipped the question!");
                        userInputs[count] = null;
                        displayResponse(count);
                        updateProgressBar();
                        count++;
                        // Skip remaining questions in this set
                        questionIndex = i + 1;
                        return askQuestion(); // Move to the next question
                    }
                }
            } while (userResponse === null || userResponse.trim() === "");

            console.log(count);
            console.log(userResponse); // Logging user's response for demonstration

            userInputs[count] = userResponse;
            displayResponse(count);
            updateProgressBar();
            count++;
        }

        displayProfile(setIndex);
    }
}

// Function to skip a set of questions
function skipSet() {
    // Move to the next set of questions
    setIndex++;
    // Reset the current question index for the next set
    questionIndex = 0;

    if (setIndex < questions.length) {
        const set = questions[setIndex];
        const totalQuestions = set.questions.length;

        // Ask if the user wants to skip the remaining questions in this set
        const skipRemaining = confirm(`Do you want to Skip ${set.set} Questions?`);

        if (skipRemaining) {
            alert(`You have Skipped ${set.set} Questions!`);

            for (let i = questionIndex; i < totalQuestions; i++) {
                userInputs[count] = null;
                displayResponse(count);
                updateProgressBar();
                count++;
                questionIndex = i + 1;
            }

            displayProfile(setIndex);
        } else {
            alert("Click on 'OK' to Skip the next set of questions!");
        }
    }
}

// Function to display profile information based on the current set index
function displayProfile() {
    switch (setIndex) {
        case 0:
            document.querySelector('.setone').style.display = 'block'; // Displays the Set 1 Outputs
            break;
        case 1:
            document.querySelector('.settwo').style.display = 'block'; // Displays the Set 2 Outputs
            break;
        case 2:
            document.querySelector('.setthree').style.display = 'block'; // Displays the Set 3 Outputs
            break;
        case 3:
            document.querySelector('.setfour').style.display = 'block'; // Displays the Set 4 Outputs

            // Hide the Next button and Skip button
            document.getElementById('next').style.display = 'none';
            document.getElementById('skip').style.display = 'none';

            // Show the Edit button
            document.getElementById('edit').style.display = 'inline-block';
            break;
    }
}

// Function to display user's response in the profile section
function displayResponse() {
    if (userInputs[count] === null) {
        document.getElementById(`question${count + 1}`).textContent = "Not Specified";
    } else {
        document.getElementById(`question${count + 1}`).textContent = userInputs[count];
    }
}

// Function to update the progress bar based on the number of answered questions
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progressionCompletion = document.getElementById('percentage');
    const totalQuestions = 14;
    const answeredQuestions = userInputs.filter(input => input !== null).length;
    const progressPercentage = (answeredQuestions / totalQuestions) * 100;

    progressBar.style.setProperty('--progress-width', `${progressPercentage}%`);
    progressionCompletion.textContent = `${progressPercentage.toFixed(0)}% Profile Complete`;
}

// Function to edit the profile by resetting all values and starting from the beginning
function editProfile() {
    // Reset the count of answered questions
    count = 0;
    
    // Clear user inputs array
    userInputs = [];

    // Reset current set and current question index
    setIndex = 0;
    questionIndex = 0;

   // Show the header and start button again
document.getElementById('start').style.display = 'none';

// Hide all question sets
document.querySelector('.setone').style.display = 'none';
document.querySelector('.settwo').style.display = 'none';
document.querySelector('.setthree').style.display = 'none';
document.querySelector('.setfour').style.display = 'none';

// Call askQuestion() to restart the process and prompt all questions again
askQuestion();
setIndex++; // Move to the next set of questions
questionIndex = 0; // Reset the current question index for the next set
askQuestion(); // Prompt the next set of questions
setIndex++; // Move to the next set of questions
questionIndex = 0; // Reset the current question index for the next set
askQuestion(); // Prompt the next set of questions
setIndex++; // Move to the next set of questions
questionIndex = 0; // Reset the current question index for the next set
askQuestion(); // Prompt the next set of questions
}

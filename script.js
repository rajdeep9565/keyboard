let currentInput = null;
let isShift = false;  // To track shift state

// Keyboard layout definition (letters on the left, numbers on the right)
const keyboardLayout = {
    left: [
        ['✕ Close'],  // Close button with cross icon on the extreme left
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '✏️ X'],  // Shift button and Clear button
        ['\u{2328}', '123', '.com', 'Space', '@', '.', 'Clear']  // Added keyboard icon button
    ],
    right: [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['✏️ X', '0', 'Clear']  // Replaced "Shift" with "Clear" button
    ],
    submit: ['Submit']
};

// Function to create the keyboard
function createKeyboard() {
    const keyboardContainer = document.getElementById('keyboard-container');

    // Create the left side of the keyboard
    const leftContainer = document.createElement('div');
    leftContainer.classList.add('keyboard-left');
    keyboardLayout.left.forEach((row) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('keyboard-row');

        row.forEach((key) => {
            const button = document.createElement('button');
            button.classList.add('key');
            button.textContent = key;

            if (key === '✕ Close') {
                button.classList.add('close');
                button.onclick = closeKeyboard; // Hide keyboard on "close"
            } else if (key === 'Clear') {
                button.classList.add('clear');
                button.onclick = clearInput;  // Clear button functionality
            } else if (key === 'Shift') {
                button.classList.add('shift-key');
                button.onclick = toggleShift; // Shift button functionality
            } else if (key === 'Space') {
                button.classList.add('space-key');
                button.onclick = () => addKey(' ');
            } else if (key === '.com') {
                button.onclick = () => addKey('.com');
            } else if (key === '\u{2328}') {  // Keyboard icon button
                button.onclick = toggleKeyboardIcon;
            } else {
                button.onclick = () => addKey(key);
            }

            rowDiv.appendChild(button);
        });

        leftContainer.appendChild(rowDiv);
    });

    // Create the right side of the keyboard (numbers and Clear buttons)
    const rightContainer = document.createElement('div');
    rightContainer.classList.add('keyboard-right');
    keyboardLayout.right.forEach((row) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('keyboard-row');
        row.forEach((key) => {
            const button = document.createElement('button');
            button.classList.add('key', 'number-key');
            button.textContent = key;

            // Handling "Clear" buttons
            if (key === 'Clear') {
                button.classList.add('clear');
                button.onclick = clearInput;  // Clear button functionality
            } else {
                button.onclick = () => addKey(key);
            }

            rowDiv.appendChild(button);
        });
        rightContainer.appendChild(rowDiv);
    });

    // Add the submit button below the numbers
    const submitRow = document.createElement('div');
    submitRow.classList.add('keyboard-row');
    const submitButton = document.createElement('button');
    submitButton.classList.add('key', 'submit-key');
    submitButton.textContent = 'Submit';
    submitButton.onclick = submitInput;
    submitRow.appendChild(submitButton);
    rightContainer.appendChild(submitRow);

    // Append both sections to the container
    keyboardContainer.appendChild(leftContainer);
    keyboardContainer.appendChild(rightContainer);
}

// Toggle Shift functionality to change lowercase/uppercase letters
function toggleShift() {
    isShift = !isShift;
    const allKeys = document.querySelectorAll('.key');

    allKeys.forEach((key) => {
        const keyValue = key.textContent;
        // Only toggle letters
        if (keyValue.match(/[a-z]/i) && keyValue.length === 1) {
            key.textContent = isShift ? keyValue.toUpperCase() : keyValue.toLowerCase();
        }
    });
}

// Show the keyboard when input is focused
document.getElementById('inputField').addEventListener('focus', function () {
    currentInput = this;
    document.getElementById('keyboard-container').style.display = 'flex';
});

// Add the pressed key to the input field
function addKey(key) {
    if (currentInput) {
        currentInput.value += key;
    }
}

// Clear the input field
function clearInput() {
    if (currentInput) {
        currentInput.value = '';
    }
}

// Submit the input (can be customized)
function submitInput() {
    if (currentInput) {
        alert('Submitted: ' + currentInput.value);
        currentInput.value = '';
        currentInput = null;
        document.getElementById('keyboard-container').style.display = 'none';
    }
}

// Close the keyboard
function closeKeyboard() {
    document.getElementById('keyboard-container').style.display = 'none';
}

// Toggle the keyboard icon (for customization)
function toggleKeyboardIcon() {
    alert('Keyboard icon clicked!');
}

// Hide keyboard when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('#keyboard-container') && !e.target.closest('#inputField')) {
        document.getElementById('keyboard-container').style.display = 'none';
    }
});

// Initialize the keyboard on page load
createKeyboard();

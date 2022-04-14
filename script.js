document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const passwordDisplay = document.getElementById('password-display');
    const copyButton = document.getElementById('copy-button');
    const lengthSlider = document.getElementById('length-slider');
    const lengthValue = document.getElementById('length-value');
    const includeUppercase = document.getElementById('include-uppercase');
    const includeLowercase = document.getElementById('include-lowercase');
    const includeNumbers = document.getElementById('include-numbers');
    const includeSymbols = document.getElementById('include-symbols');
    const excludeAmbiguous = document.getElementById('exclude-ambiguous'); // New checkbox
    const strengthBar = document.getElementById('strength-bar');
    const strengthText = document.getElementById('strength-text');
    const themeCheckbox = document.getElementById('theme-checkbox'); // Theme toggle
    const generateButton = document.getElementById('generate-button');

    // Character Sets
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    const ambiguousChars = 'Il1O0'; // Characters to potentially exclude

    // --- Event Listeners ---

    // Update length display on slider change
    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
        generatePassword(); // Optionally regenerate on slider change
    });

    // Regenerate password when options change
    includeUppercase.addEventListener('change', generatePassword);
    includeLowercase.addEventListener('change', generatePassword);
    includeNumbers.addEventListener('change', generatePassword);
    includeSymbols.addEventListener('change', generatePassword);
    excludeAmbiguous.addEventListener('change', generatePassword); // Listener for new checkbox

    // Generate password on button click
    generateButton.addEventListener('click', generatePassword);

    // Copy password to clipboard
    copyButton.addEventListener('click', copyPassword);

    // Theme toggle listener
    themeCheckbox.addEventListener('change', toggleTheme);

    // --- Functions ---

    function generatePassword() {
        const length = parseInt(lengthSlider.value);
        let characterPool = '';
        let generatedPassword = '';
        const requiredChars = []; // Ensure at least one of each selected type
        let sourcePool = ''; // Build the initial pool first

        if (includeUppercase.checked) sourcePool += uppercaseChars;
        if (includeLowercase.checked) sourcePool += lowercaseChars;
        if (includeNumbers.checked) sourcePool += numberChars;
        if (includeSymbols.checked) sourcePool += symbolChars;

        // Filter out ambiguous characters if requested
        if (excludeAmbiguous.checked) {
            characterPool = sourcePool.split('').filter(char => !ambiguousChars.includes(char)).join('');
        } else {
            characterPool = sourcePool;
        }

        // Re-select required characters from the potentially filtered pool
        if (includeUppercase.checked && characterPool.includes(uppercaseChars[0])) { // Check if pool still has type
             requiredChars.push(getRandomChar(uppercaseChars.split('').filter(char => characterPool.includes(char)).join('')));
        }
        if (includeLowercase.checked && characterPool.includes(lowercaseChars[0])) {
             requiredChars.push(getRandomChar(lowercaseChars.split('').filter(char => characterPool.includes(char)).join('')));
        }
        if (includeNumbers.checked && characterPool.includes(numberChars[0])) {
             requiredChars.push(getRandomChar(numberChars.split('').filter(char => characterPool.includes(char)).join('')));
        }
        if (includeSymbols.checked && characterPool.includes(symbolChars[0])) {
             requiredChars.push(getRandomChar(symbolChars.split('').filter(char => characterPool.includes(char)).join('')));
        }
        // [REMOVED REDUNDANT CODE BLOCK - requiredChars are handled above now]


        if (characterPool === '' || characterPool.length === 0) {
            passwordDisplay.value = 'Select options / No chars available';
            updateStrengthIndicator(0);
            return; // Exit if no character types are selected
        }

        // Ensure length is not less than the number of required characters
        const effectiveLength = Math.max(length, requiredChars.length);
        if (length < requiredChars.length) {
             lengthSlider.value = requiredChars.length; // Adjust slider if needed
             lengthValue.textContent = requiredChars.length;
        }


        // Fill the rest of the password length
        for (let i = requiredChars.length; i < effectiveLength; i++) {
            generatedPassword += getRandomChar(characterPool);
        }

        // Add required characters and shuffle
        generatedPassword += requiredChars.join('');
        generatedPassword = shuffleString(generatedPassword);

        // Ensure the final password is exactly the desired length (might be longer due to required chars)
        generatedPassword = generatedPassword.slice(0, length);


        passwordDisplay.value = generatedPassword;
        updateStrengthIndicator(calculateStrength(generatedPassword));
    }

    function getRandomChar(str) {
        const randomIndex = Math.floor(Math.random() * str.length);
        return str[randomIndex];
    }

    function shuffleString(str) {
        const arr = str.split('');
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
        }
        return arr.join('');
    }

    function calculateStrength(password) {
        let strength = 0;
        if (!password) return 0;

        // Base points for length
        strength += Math.min(password.length * 2, 30); // Max 30 points for length

        // Points for character types
        if (/[A-Z]/.test(password)) strength += 15;
        if (/[a-z]/.test(password)) strength += 15;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^A-Za-z0-9]/.test(password)) strength += 25; // More points for symbols

        // Bonus for combination
        let types = 0;
        if (/[A-Z]/.test(password)) types++;
        if (/[a-z]/.test(password)) types++;
        if (/[0-9]/.test(password)) types++;
        if (/[^A-Za-z0-9]/.test(password)) types++;

        if (types > 2 && password.length >= 8) strength += (types * 5); // Bonus for mixing types

        return Math.min(strength, 100); // Cap at 100
    }

    function updateStrengthIndicator(strength) {
        let strengthLabel = 'Very Weak';
        let barColor = 'var(--strength-weak)'; // Default red
        const barWidth = strength + '%';

        if (strength >= 85) {
            strengthLabel = 'Very Strong';
            barColor = 'var(--strength-very-strong)';
        } else if (strength >= 65) {
            strengthLabel = 'Strong';
            barColor = 'var(--strength-strong)';
        } else if (strength >= 40) {
            strengthLabel = 'Medium';
            barColor = 'var(--strength-medium)';
        } else if (strength >= 20) {
             strengthLabel = 'Weak';
             barColor = 'var(--strength-weak)'; // Keep red for weak
        }


        strengthBar.style.width = barWidth;
        strengthBar.style.backgroundColor = barColor;
        strengthText.textContent = strengthLabel;
        strengthText.style.color = barColor; // Match text color to bar color
    }

    function copyPassword() {
        if (!passwordDisplay.value) return; // Don't copy if empty

        navigator.clipboard.writeText(passwordDisplay.value)
            .then(() => {
                // Visual feedback
                copyButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                      <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022z"/>
                    </svg> Copied!`; // Update innerHTML with checkmark SVG
                copyButton.classList.add('copied'); // Use CSS class for styling
                setTimeout(() => {
                    // Restore original SVG + text using innerHTML
                    copyButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                        </svg> Copy`;
                    copyButton.classList.remove('copied'); // Remove class
                }, 1500);
            })
            .catch(err => {
                console.error('Failed to copy password: ', err);
                // Optionally show an error message to the user in the UI
                copyButton.textContent = 'Error';
                 setTimeout(() => {
                     copyButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16">
                          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                        </svg> Copy`; // Restore original SVG + text
                }, 1500);
            });
    }

    // --- Initial Load ---
    // --- Theme Handling ---
    function toggleTheme() {
        if (themeCheckbox.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark'); // Save preference
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light'); // Save preference
        }
    }

    // Apply saved theme on load
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            themeCheckbox.checked = true;
            document.body.classList.add('dark-theme');
        } else {
            themeCheckbox.checked = false;
            document.body.classList.remove('dark-theme');
        }
    }

    // --- Initial Load ---
    applySavedTheme(); // Apply theme first
    lengthValue.textContent = lengthSlider.value; // Set initial length display
    generatePassword(); // Generate initial password on load
});
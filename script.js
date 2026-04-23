document.addEventListener('DOMContentLoaded', () => {
    const step1 = document.getElementById('step1');
    const stepNo = document.getElementById('stepNo');
    const stepBday = document.getElementById('stepBday');
    const stepHug = document.getElementById('stepHug');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');
    const stepFrame = document.getElementById('stepFrame');
    const stepLove = document.getElementById('stepLove');
    const choiceRow = document.getElementById('choiceRow');
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const introTitle = document.querySelector('.intro-title');
    const noPageTitle = document.querySelector('.no-page-title');
    const tryAgainButton = document.getElementById('try-again-button');
    const continueBdayButton = document.getElementById('continue-bday-button');
    const hugContinueButton = document.getElementById('hug-continue-button');
    const nextWishButton = document.getElementById('next-wish-button');
    const finalCloseButton = document.getElementById('final-close-button');
    const frameCloseButton = document.getElementById('frame-close-button');
    const loveCloseButton = document.getElementById('love-close-button');
    const greetingTextElement = document.getElementById('greetingText');

    function animateHeadingText(element, baseDelay = 0) {
        if (!element) {
            return;
        }

        if (!element.dataset.originalHtml) {
            element.dataset.originalHtml = element.innerHTML;
        }

        const sourceText = element.dataset.originalHtml.replace(/<br\s*\/?\s*>/gi, '\n');
        element.innerHTML = '';

        let charIndex = 0;
        for (const char of sourceText) {
            if (char === '\n') {
                element.appendChild(document.createElement('br'));
                continue;
            }

            const span = document.createElement('span');
            span.className = 'heading-char';
            span.style.setProperty('--char-delay', `${baseDelay + charIndex * 0.045}s`);
            span.textContent = char === ' ' ? '\u00A0' : char;
            element.appendChild(span);
            charIndex++;
        }
    }

    animateHeadingText(introTitle, 0.08);

    // --- Step 1 Navigation ---
    function moveButtonRandomly(button) {
        const rowRect = choiceRow.getBoundingClientRect();
        const btnRect = button.getBoundingClientRect();

        const maxX = Math.max(0, rowRect.width - btnRect.width);
        const maxY = Math.max(0, rowRect.height - btnRect.height);

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;
    }

    yesButton.addEventListener('mouseenter', () => moveButtonRandomly(yesButton));
    yesButton.addEventListener('click', () => {
        step1.classList.remove('active');
        stepBday.classList.add('active');
    });

    function resetIntroButtons() {
        yesButton.style.left = '';
        yesButton.style.top = '';
        noButton.style.left = '';
        noButton.style.top = '';
    }

    noButton.addEventListener('click', () => {
        step1.classList.remove('active');
        stepNo.classList.add('active');
        animateHeadingText(noPageTitle, 0.05);
    });

    tryAgainButton.addEventListener('click', () => {
        stepNo.classList.remove('active');
        step1.classList.add('active');
        resetIntroButtons();
        animateHeadingText(introTitle, 0.08);
    });

    continueBdayButton.addEventListener('click', () => {
        stepBday.classList.remove('active');
        stepHug.classList.add('active');
    });

    hugContinueButton.addEventListener('click', () => {
        stepHug.classList.remove('active');
        step3.classList.add('active');
        startFinalAnimations();
    });

    nextWishButton.addEventListener('click', () => {
        step3.classList.remove('active');
        step4.classList.add('active');
    });

    finalCloseButton.addEventListener('click', () => {
        step4.classList.remove('active');
        stepFrame.classList.add('active');
    });

    frameCloseButton.addEventListener('click', () => {
        stepFrame.classList.remove('active');
        stepLove.classList.add('active');
    });

    loveCloseButton.addEventListener('click', () => {
        stepLove.classList.remove('active');
        step1.classList.add('active');
        resetIntroButtons();
        animateHeadingText(introTitle, 0.08);
    });

    function startFinalAnimations() {
        // Typewriter effect
        const greeting = "Happy Birthday,";
        let i = 0;
        greetingTextElement.innerHTML = '';
        const cursor = document.createElement('span');
        cursor.className = 'typewriter-cursor';
        greetingTextElement.appendChild(cursor);

        const typing = setInterval(() => {
            if (i < greeting.length) {
                greetingTextElement.insertBefore(document.createTextNode(greeting.charAt(i)), cursor);
                i++;
            } else {
                clearInterval(typing);
                cursor.style.animation = 'none';
                cursor.style.display = 'none';
            }
        }, 100);

        // Balloon animation
        createBalloons(15);
    }

    function createBalloons(count) {
        const colors = ['#e94560', '#f0e68c', '#00d8d6', '#8e44ad', '#3498db'];
        for (let i = 0; i < count; i++) {
            const balloon = document.createElement('div');
            balloon.className = 'balloon';
            balloon.style.left = `${Math.random() * 100}vw`;
            balloon.style.animationDuration = `${Math.random() * 6 + 8}s`;
            balloon.style.animationDelay = `${Math.random() * 5}s`;
            balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.appendChild(balloon);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('confetti-canvas');
    const rootElement = document.getElementById('root');
    const confettiFunc = window.confetti;

    // Target the next New Year
    const NEW_YEAR = new Date(new Date().getFullYear() + 1, 0, 1);
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    const timeBlockTemplate = (value, label) => `
        <div class="time-block">
            <span class="value">${value}</span>
            <span class="label">${label}</span>
        </div>
    `;

    const showCelebration = () => {
        const celebrateConfetti = () => {
            let confettiInterval = setInterval(() => {
                confettiFunc({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6, x: Math.random() },
                    colors: colors
                });
            }, 300);

            setTimeout(() => clearInterval(confettiInterval), 3000);
        };

        celebrateConfetti();

        rootElement.innerHTML = `
            <div class="celebration">
                <h1>Happy New Year!</h1>
                <p>from DAVID</p>
            </div>
        `;
    };

    const calculateTimeLeft = () => {
        const now = new Date();
        const difference = NEW_YEAR.getTime() - now.getTime();
        const countdownElement = document.getElementById('countdown');

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (countdownElement) {
                countdownElement.innerHTML = `
                    ${timeBlockTemplate(days, 'Days')}
                    ${timeBlockTemplate(hours, 'Hours')}
                    ${timeBlockTemplate(minutes, 'Minutes')}
                    ${timeBlockTemplate(seconds, 'Seconds')}
                `;
            }
        } else {
            showCelebration();
        }
    };

    const init = () => {
        rootElement.innerHTML = `
            <div class="card">
                <h2>New Year Countdown</h2>
                <div id="countdown" class="grid"></div>
                <button id="testConfetti" class="test-button">Test Celebration</button>
            </div>
        `;

        const testConfettiButton = document.getElementById('testConfetti');
        if (testConfettiButton) {
            testConfettiButton.addEventListener('click', showCelebration);
        }

        calculateTimeLeft();
        setInterval(calculateTimeLeft, 1000);
    };

    init();
});
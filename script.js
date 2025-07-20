// Switch from Birthday Page to Proposal Page
const nextBtn = document.getElementById("next-btn");
const birthdayPage = document.getElementById("birthday-page");
const proposalPage = document.getElementById("proposal-page");
const nameInput = document.getElementById("name-input");
const nameDisplay = document.getElementById("name");

nextBtn.addEventListener("click", () => {
    const name = nameInput.value.trim();
    if (name) {
        nameDisplay.textContent = name;
        birthdayPage.style.display = "none";
        proposalPage.style.display = "flex";
    } else {
        alert("Please enter your name first!");
    }
});

// Proposal Page Animations
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");
const heartsContainer = document.getElementById("hearts-container");

// Happy Path
yesBtn.addEventListener("click", () => {
    // Confetti explosion!
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Create floating hearts
    for (let i = 0; i < 50; i++) {
        createHeart();
    }

    // Update text
    document.getElementById("proposal-text").innerHTML = "YAY! You made me the happiest! 💖";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
});

// Sad Path - No button behavior
noBtn.addEventListener("mouseover", function() {
    // Add sad class
    this.classList.add("sad-move");
    
    // Store original position
    const originalX = this.getBoundingClientRect().left;
    const originalY = this.getBoundingClientRect().top;
    
    // Move to random position (within bounds)
    const maxX = window.innerWidth - this.offsetWidth;
    const maxY = window.innerHeight - this.offsetHeight;
    const newX = Math.min(maxX, Math.max(0, originalX + (Math.random() * 200 - 100)));
    const newY = Math.min(maxY, Math.max(0, originalY + (Math.random() * 200 - 100)));
    
    this.style.position = "fixed";
    this.style.left = `${newX}px`;
    this.style.top = `${newY}px`;
    
    // Return after delay
    setTimeout(() => {
        this.style.position = "";
        this.style.left = "";
        this.style.top = "";
        this.classList.remove("sad-move");
    }, 1000);
});

function createHeart() {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.classList.add("heart");
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.animationDuration = (Math.random() * 3 + 2) + "s";
    heartsContainer.appendChild(heart);

    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 4000);
}
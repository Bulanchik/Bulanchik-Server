let score = 0;
let power = 1;

function click() {
    score += power;
    document.getElementById("score").innerText = score;
}

function upgrade() {
    if (score >= 50) {
        score -= 50;
        power *= 2;
        alert("УЛУЧШЕНО!");
    }
}

function promo() {
    let last = localStorage.getItem("promo");
    let today = new Date().toDateString();

    if (last === today) {
        alert("Сегодня уже брал");
        return;
    }

    localStorage.setItem("promo", today);
    alert("PROMO: COSMOS2026");
}
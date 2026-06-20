const starsContainer =
    document.getElementById("stars-container");

const STAR_COUNT = 350;

function createStar() {

    const star =
        document.createElement("div");

    const size =
        Math.random() * 3 + 1;

    star.classList.add("star");

    star.style.width =
        `${size}px`;

    star.style.height =
        `${size}px`;

    star.style.left =
        `${Math.random() * 100}%`;

    star.style.top =
        `${Math.random() * 100}%`;

    star.style.animationDuration =
        `${2 + Math.random() * 6}s`;

    star.style.animationDelay =
        `${Math.random() * 5}s`;

    starsContainer.appendChild(star);

}

for (let i = 0; i < STAR_COUNT; i++) {

    createStar();

}

function createMeteor() {

    const meteor =
        document.createElement("div");

    meteor.classList.add("meteor");

    meteor.style.top =
        `${Math.random() * 40}%`;

    meteor.style.left =
        `${80 + Math.random() * 20}%`;

    document.body.appendChild(meteor);

    setTimeout(() => {

        meteor.remove();

    }, 5000);

}

setInterval(() => {

    createMeteor();

}, 2500);

function createNebula() {

    const nebula =
        document.createElement("div");

    nebula.classList.add("nebula");

    const size =
        200 + Math.random() * 400;

    nebula.style.width =
        `${size}px`;

    nebula.style.height =
        `${size}px`;

    nebula.style.left =
        `${Math.random() * 100}%`;

    nebula.style.top =
        `${Math.random() * 100}%`;

    document.body.appendChild(nebula);

}

for (let i = 0; i < 8; i++) {

    createNebula();

}

window.addEventListener("mousemove", (e) => {

    const planets =
        document.querySelectorAll(".planet");

    planets.forEach((planet, index) => {

        const speed =
            (index + 1) * 0.01;

        const x =
            (window.innerWidth / 2 - e.clientX)
            * speed;

        const y =
            (window.innerHeight / 2 - e.clientY)
            * speed;

        planet.style.transform =
            `translate(${x}px, ${y}px)`;

    });

});
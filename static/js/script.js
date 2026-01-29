const sidebar = document.querySelector(".sidebar");
const cards = document.querySelectorAll(".card");

document.addEventListener("DOMContentLoaded", function() {
    linkProjectClick();
})

function showSidebar() {
    sidebar.style.display = "flex";
}

function hideSidebar() {
    sidebar.style.display = "none";
}

function linkProjectClick() {
    console.log(cards);
    cards.forEach(card => {
        const projectName = card.dataset.project;
        console.log(card);
        console.log(projectName);
        card.addEventListener("click", function() {
            window.location.href = "" + projectName + ".html";
        })
    })
}

console.log();
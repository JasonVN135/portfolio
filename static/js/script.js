const cardDataPath = "/files/project-card-data.json";

const sidebar = document.querySelector(".sidebar");
const cards = document.querySelectorAll(".card");
const projectCards = document.querySelector(".project-cards");

const toolDict = {
    "godot": "Godot",
    "html": "HTML",
    "css": "CSS",
    "js": "JavaScript"
}


document.addEventListener("DOMContentLoaded", function() {
    linkProjectClick();
    createProjectCards();
})

function showSidebar() {
    sidebar.style.display = "flex";
}

function hideSidebar() {
    sidebar.style.display = "none";
}

function linkProjectClick() {
    cards.forEach(card => {
        const projectName = card.dataset.project;
        card.addEventListener("click", function() {
            window.location.href = "projects/" + projectName + ".html";
        })
    })
}

async function retrieveJSONData(filePath) {
    try {
        const response = await fetch(filePath);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
}

async function createProjectCards() {

    if (projectCards == null) {
        return;
    }

    const data = await retrieveJSONData(cardDataPath);
    for (let i = data.length - 1; i >= 0; i--) {
        const card = createCard(data[i]);
        projectCards.appendChild(card);
    }
}

function createCard(projectData) {
    const id = projectData["id"];
    const description = projectData["description"];

    const cardElement = document.createElement("div");
    cardElement.classList = "card";
    cardElement.dataset.project = id;

    const imageElement = document.createElement("img");
    imageElement.setAttribute("src", `images/${id}/cover.png`);
    cardElement.appendChild(imageElement);

    const headerElement = _createHeaderContainer(projectData);
    cardElement.appendChild(headerElement);

    const descriptionElement = document.createElement("div");
    descriptionElement.classList = "description-container";
    
    const descriptionSpanElement = document.createElement("span");
    descriptionSpanElement.innerHTML = description;
    descriptionElement.appendChild(descriptionSpanElement);
    cardElement.appendChild(descriptionElement);
    return cardElement;

}

function _createHeaderContainer(projectData) {
    const name = projectData["name"];
    const tools = projectData["tools"];

    const containerElement = document.createElement("div");
    containerElement.classList.add("header-container");

    const headerWrapperElement = document.createElement("div");
    headerWrapperElement.classList.add("card-heading-wrapper");
    headerWrapperElement.innerHTML = `
        <h3>${name}</h3>
        <span class="icon-btn__icon icon-btn__icon--open"></span>
    `
    containerElement.appendChild(headerWrapperElement);

    const tagsElement = document.createElement("div");
    tagsElement.classList = "tags";

    tools.forEach(tag => {
        const tagElement = _createTag(tag);
        tagsElement.appendChild(tagElement);
    })
    containerElement.appendChild(tagsElement);

    return containerElement;
    console.log(containerElement);
    
}

function _createTag(tagName) {
    const tagElement = document.createElement("div");
    tagElement.classList = `tag tag--${tagName}`;
    tagElement.innerHTML = `
        <span class="body">
            <span class="tag__icon"></span>
            <span class="tag__name">
                ${toolDict[tagName]}
            </span>
        </span>
    `

    return tagElement;

}
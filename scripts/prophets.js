const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
const cards = document.querySelector('#cards');

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement("section");
        let fullName = document.createElement("h2");
        let dateBirth = document.createElement("p");
        let placeBirth = document.createElement("p");
        let portrait = document.createElement("img");

        
        fullName.innerHTML = `${prophet.name} ${prophet.lastname}`;

        dateBirth.innerHTML = `Date of Birth: ${prophet.birthdate}`;
        placeBirth.innerHTML = `Place of Birth: ${prophet.birthplace}`;
        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        card.appendChild(fullName);
        card.appendChild(dateBirth);
        card.appendChild(placeBirth);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
  }

async function getProphetData(url) {
    let response = await fetch(url);
    let data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets);
}

getProphetData(url);

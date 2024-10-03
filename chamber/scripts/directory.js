// Fetch  json script("scripts/members.json"); with async/await
const fetchMembers = async () => {
    const response = await fetch("scripts/members.json");
    const members = await response.json();
    return members;
};

document.addEventListener("DOMContentLoaded", () => {
    const viewOptions = document.querySelectorAll("#view-options>button");

    viewOptions.forEach(option => {
        option.addEventListener("click", event => handleViewOptionsClick(event.target));
    });

    renderCompanies(companies);

});

function handleViewOptionsClick(target) {
    const companies = document.querySelector("#companies");
    // grid-view or list-view
    if (target.id === "grid-view") {
        target.classList.toggle("active");
        document.getElementById("list-view").classList.toggle("active");
        // remove classes in companies element
        companies.classList = "grid";
    } else if (target.id === "list-view") {
        target.classList.toggle("active");
        document.getElementById("grid-view").classList.toggle("active");
        companies.classList = "list";
    } else {
        // get parent element
        while (target.nodeName !== "BUTTON") {
            target = target.parentNode;
        }
        
        handleViewOptionsClick(target);
    }
}

function renderCompanies(companies) {

    
    fetchMembers().then(members => {
        let companiesElement = document.querySelector("#companies");

        // clear out any existing companies
        companiesElement.innerHTML = "";

        members.forEach(member => {
            const companyElement = document.createElement("div");
            companyElement.classList.add("company");
            
            const img = document.createElement("img");
            img.src = member.image;
            img.alt = member.name + " logo";
            img.loading = "lazy";
            img.width = 200;
            img.height = 200;
            companyElement.appendChild(img);

            const h3 = document.createElement("h3");
            h3.textContent = member.name;
            companyElement.appendChild(h3);

            const address = document.createElement("p");
            address.classList.add("address");
            address.textContent = member.address;
            companyElement.appendChild(address);

            const phone = document.createElement("p");
            phone.classList.add("phone");
            phone.textContent = member.phone;
            companyElement.appendChild(phone);

            const website = document.createElement("a");
            website.href = member.website;
            website.textContent = "Visit website";
            companyElement.appendChild(website);

            companiesElement.appendChild(companyElement);
        });
    });
}
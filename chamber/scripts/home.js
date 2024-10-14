import {fetchMembers} from "./modules.mjs";

document.addEventListener("DOMContentLoaded", () => {
    // Fetch and display members
    fetchMembers().then(members => {
        const randomCompanies = getRandomCompanies(members);
        renderCompanies(randomCompanies);
    });

    const url = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=-25.4269281218829&lon=-49.2651736913273&appid=91ab94c0466fc1363e5e1e7068e1878a';
    weatherFetch(url);

});

async function weatherFetch(url) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();

            const weatherData = {
                "currentTemp": data.list[0].main.temp.toFixed(0),
                "weatherIcon": data.list[0].weather[0].icon,
                "captionDesc": data.list[0].weather[0].description,
                "highTemp": data.list[0].main.temp_max.toFixed(0),
                "lowTemp": data.list[0].main.temp_min.toFixed(0),
                "humidity": data.list[0].main.humidity,
                "sunrise": convertUnixToTime(data.list[0].sys.sunrise, data.list[0].timezone),
                "sunset": convertUnixToTime(data.list[0].sys.sunset, data.list[0].timezone),
            };

            const forecastData = {
                "today": {
                    "weekday": new Date(data.list[0].dt_txt).toLocaleDateString("en-US", {weekday: 'long'}),
                    "temp": data.list[0].main.temp.toFixed(0)
                },
                "tomorrow": {
                    "weekday": new Date(data.list[1].dt_txt).toLocaleDateString("en-US", {weekday: 'long'}),
                    "temp": data.list[1].main.temp.toFixed(0)
                },
                "dayAfter": {
                    "weekday": new Date(data.list[2].dt_txt).toLocaleDateString("en-US", {weekday: 'long'}),
                    // round to 2 decimal places of temp
                    "temp": data.list[2].main.temp.toFixed(0)
                }
            };

            displayWeatherResults(weatherData);
            displayForecastResults(forecastData);

        }
    } catch (error) {
        console.log(error);
    }
}

function convertUnixToTime(unixTimestamp, timezoneOffset) {
    const date = new Date((unixTimestamp + timezoneOffset) * 1000); // Convert to milliseconds and apply timezone offset
    return date.toLocaleTimeString("en-US", {hour: '2-digit', minute: '2-digit', second: '2-digit'});
}

function displayWeatherResults(data) {
    const weatherElement = document.querySelector("#weather");
    const weatherBody = document.createElement("div");
    weatherBody.classList.add("events-and-weather-body");

    const img = document.createElement("img");
    img.src = `https://openweathermap.org/img/w/${data.weatherIcon}.png`;
    img.alt = data.captionDesc;
    img.loading = "lazy";
    img.width = 50;
    img.height = 50;
    weatherBody.appendChild(img);

    const ul = document.createElement("ul");
    const currentTemp = document.createElement("li");
    currentTemp.innerHTML = `<span class="bolder">${data.currentTemp}&deg;C</span>`;
    ul.appendChild(currentTemp);

    const desc = document.createElement("li");
    desc.textContent = data.captionDesc;
//     capitalize each word
    desc.textContent = desc.textContent.replace(/\b\w/g, l => l.toUpperCase());
    ul.appendChild(desc);

    const highTemp = document.createElement("li");
    highTemp.innerHTML = `High: <span class="bolder">${data.highTemp}&deg;C</span>`;
    ul.appendChild(highTemp);

    const lowTemp = document.createElement("li");
    lowTemp.innerHTML = `Low: <span class="bolder">${data.lowTemp}&deg;C</span>`;
    ul.appendChild(lowTemp);

    const humidity = document.createElement("li");
    humidity.innerHTML = `Humidity: <span class="bolder">${data.humidity}%</span>`;
    ul.appendChild(humidity);

    const sunrise = document.createElement("li");
    sunrise.innerHTML = `Sunrise: <span class="bolder">${data.sunrise}</span>`;
    ul.appendChild(sunrise);

    const sunset = document.createElement("li");
    sunset.innerHTML = `Sunset: <span class="bolder">${data.sunset}</span>`;
    ul.appendChild(sunset);

    weatherBody.appendChild(ul);
    weatherElement.appendChild(weatherBody);
}

function displayForecastResults(data) {
    const forecastElement = document.querySelector("#weather-forecast");
    const forecastBody = document.createElement("div");
    forecastBody.classList.add("events-and-weather-body");


    const ul = document.createElement("ul");

    const today = document.createElement("li");
    today.innerHTML = `Today: <span class="bolder">${data.today.temp}&deg;C</span>`;
    ul.appendChild(today);

    const tomorrow = document.createElement("li");
    tomorrow.innerHTML = `${data.tomorrow.weekday}: <span class="bolder">${data.tomorrow.temp}&deg;C</span>`;
    ul.appendChild(tomorrow);

    const dayAfter = document.createElement("li");
    dayAfter.innerHTML = `${data.dayAfter.weekday}: <span class="bolder">${data.dayAfter.temp}&deg;C</span>`;
    ul.appendChild(dayAfter);

    forecastBody.appendChild(ul);
    forecastElement.appendChild(forecastBody);
}

// Get random companies from filtered members (levels 2 and 3)
function getRandomCompanies(members) {
    const companies = members.filter(member => member.level > 1 && member.level < 4);

    // Shuffle and select 3 random companies
    const randomCompanies = companies.sort(() => 0.5 - Math.random()).slice(0, 3);

    // Shuffle the selected companies again
    return randomCompanies.sort(() => 0.5 - Math.random());
}

// Render the companies to the DOM
function renderCompanies(companies) {
    const companiesElement = document.querySelector("#companies");

    companies.forEach(company => {
        const companyElement = createCompanyElement(company);
        companiesElement.appendChild(companyElement);
    });
}

// Create the company element structure
function createCompanyElement(company) {
    const companyElement = document.createElement("div");
    companyElement.classList.add("company");

    const companyHeader = createCompanyHeader(company);
    companyElement.appendChild(companyHeader);

    const companyBody = createCompanyBody(company);
    companyElement.appendChild(companyBody);

    return companyElement;
}

// Create the company header section (name and other details)
function createCompanyHeader(company) {
    const companyHeader = document.createElement("div");
    companyHeader.classList.add("company-header");

    const h3 = document.createElement("h3");
    h3.textContent = company.name;
    companyHeader.appendChild(h3);

    const p = document.createElement("p");
    p.textContent = company.other;
    companyHeader.appendChild(p);

    return companyHeader;
}

// Create the company body section (image and contact info)
function createCompanyBody(company) {
    const companyBody = document.createElement("div");
    companyBody.classList.add("company-body");

    const companyImage = createCompanyImage(company);
    companyBody.appendChild(companyImage);

    const companyInfo = createCompanyInfo(company);
    companyBody.appendChild(companyInfo);

    return companyBody;
}

// Create the company image element
function createCompanyImage(company) {
    const companyImage = document.createElement("div");
    companyImage.classList.add("company-image");

    const img = document.createElement("img");
    img.src = company.image;
    img.alt = company.name;
    img.loading = "lazy";
    img.height = 150;
    img.width = 150;
    companyImage.appendChild(img);

    return companyImage;
}

// Create the company info section (email, phone, website)
function createCompanyInfo(company) {
    const companyInfo = document.createElement("div");
    companyInfo.classList.add("company-info");

    const email = document.createElement("p");
    email.innerHTML = `<span class="bolder">EMAIL:</span> <a href="mailto:${company.email}">${company.email}</a>`;
    companyInfo.appendChild(email);

    const phone = document.createElement("p");
    phone.innerHTML = `<span class="bolder">PHONE:</span> ${company.phone}`;
    companyInfo.appendChild(phone);

    const website = document.createElement("p");
    website.innerHTML = `<span class="bolder">URL:</span> <a href="${company.website}" target="_blank" rel="noopener noreferrer">${company.website}</a>`;
    companyInfo.appendChild(website);

    return companyInfo;
}
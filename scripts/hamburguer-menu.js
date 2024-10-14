const mainNav = document.querySelector("#animateme");
const hamButton = document.querySelector("#menu");

hamButton.addEventListener('click', ()=>{
    mainNav.classList.toggle('show');
    hamButton.classList.toggle('show');
});
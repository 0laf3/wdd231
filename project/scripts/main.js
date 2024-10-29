$(document).ready(function () {
    $('.menu-toggler').on('click', function(){
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
    });

    $('.top-nav .nav-link').on('click', function(){
        $('.menu-toggler').toggleClass('open');
        $('.top-nav').toggleClass('open');
    });

    $('nav a[href*="#]').on('click', function(){
        $('html,body').animate({
            scrollTop: $($(this).attr('href')).offset().top-100
        }, 2000);
    });

    $('#up').on('click', function(){
        $('html,body').animate({
            scrollTop: 0 } ,2000);
    });

    AOS.init({
        easing: 'ease',
        duration: 1800
    });
    
})

/* Modal script*/

function openModal(imageSrc) {
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('myModal').style.display = "block";
}

function closeModal() {
    document.getElementById('myModal').style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
        closeModal();
    }
};


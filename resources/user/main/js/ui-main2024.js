$(document).ready(function () {
    $('.btn-cg li').click(function () {
        $('.btn-cg li').removeClass('active');
        $(this).addClass('active');
    });

    $('.dispute-items li a').click(function () {
        $('.dispute-items li a').removeClass('active');
        $(this).addClass('active');
    });




    // Initialize Slick slider on the correct element
    $('#ctn-content1-1-1 .news-slider .slider-inner').slick({
        autoplay: true,            // Auto-starts the slider
        speed: 1000,               // Transition speed
        slidesToShow: 1,           // Show one slide at a time
        fade: true,                // Fade transition between slides
        arrows: true,              // Show navigation arrows
        dots: true,                // Show dots for navigation
        accessibility: false,      // Disable accessibility features if not needed
        prevArrow: '.slide-control-nw .icon-slick-prev', // Custom prev button
        nextArrow: '.slide-control-nw .icon-slick-next', // Custom next button
        customPaging: function (slider, i) {
            var totalSlides = slider.slideCount < 10 ? '0' + slider.slideCount : slider.slideCount;

            $('#ctn-content1-1-1 .slide-control-nw .nums .option > span').text(totalSlides);
        }
    }).on('afterChange', function (event, slick, currentSlide) {
        var currentSlideNumber = currentSlide + 1;
        var formattedCurrentSlide = currentSlideNumber < 10 ? '0' + currentSlideNumber : currentSlideNumber;

        $('#ctn-content1-1-1 .slide-control-nw .nums .option strong').text(formattedCurrentSlide);
    });



    let serviceSlider = $('.service-cont .slide-inner');
    let serviceSlickOpt = {
        autoplay: true,
        speed: 1000,
        slidesToShow: 7,
        variableWidth: false,
        arrows: true,
        dots: false,
        focusOnChange: true,
        accessibility: false,
        prevArrow: $('#service-prev-nw'),
        nextArrow: $('#service-next-nw'),
        responsive: [ // 반응형 웹 구현 옵션
            {
                breakpoint: 1424, //화면 사이즈 1024px
                settings: {
                    slidesToShow: 6
                }
            },
            {
                breakpoint: 1025, //화면 사이즈 1024px
                settings: {
                    slidesToShow: 4
                }
            },
            {
                breakpoint: 768, //화면 사이즈 768px
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 2
                }
            }
        ]
    }

    serviceSlider.not('.slick-initialized').slick(serviceSlickOpt);


    $('.dispute-card .slide-inner').slick({
        autoplay: true,
        speed: 2000,
        slidesToShow: 4,
        variableWidth: false,
        arrows: true,
        dots: false,
        focusOnChange: true,
        accessibility: false,
        prevArrow: '#dispute-slick-prev',
        nextArrow: '#dispute-slick-next',
        responsive: [
            {
                breakpoint: 1350,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });

    $('.press-list-lg').slick({
        autoplay: true,
        speed: 3000,
        slidesToShow: 3,
        variableWidth: false,
        arrows: true,
        dots: false,
        focusOnChange: true,
        accessibility: false,
        prevArrow: '#press-slick-prev',
        nextArrow: '#press-slick-next',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });


});

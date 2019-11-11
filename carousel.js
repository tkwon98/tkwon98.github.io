const track = document.querySelector('.carousel_track');
const slides = Array.from(track.children);
const caption_track = document.querySelector('.caption-track');
const capSlides = Array.from(caption_track.children);
const nextButton = document.querySelector('.carousel_button-right');
const prevButton = document.querySelector('.carousel_button-left');

const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;

const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
    else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }
    else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

// arrange slides
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}


// left click -> slide left
prevButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    const currentCaption = caption_track.querySelector('.current-caption');
    const prevCaption = currentCaption.previousElementSibling;
    currentCaption.classList.add('is-hidden');
    currentCaption.classList.remove('current-caption');
    prevCaption.classList.add('current-caption');
    prevCaption.classList.remove('is-hidden');

    moveToSlide(track, currentSlide, prevSlide);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

// right click -> slide right
nextButton.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const currentCaption = caption_track.querySelector('.current-caption');
    const nextCaption = currentCaption.nextElementSibling;
    currentCaption.classList.add('is-hidden');
    currentCaption.classList.remove('current-caption');
    nextCaption.classList.add('current-caption');
    nextCaption.classList.remove('is-hidden');

    const nextSlide = currentSlide.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

class Carousel {
	constructor(container) {
		this.container = container;
		this.slider = container.querySelector('.slider');
		this.slides = container.getElementsByClassName('slide');
		this.buttons = container.getElementsByClassName('btn');
		this.currentPosition = 0;
		this.currentMargin = 0;
		this.slidesPerPage = 0;
		this.slidesCount = this.slides.length - this.slidesPerPage;
		this.containerWidth = this.container.offsetWidth;

		this.slider.style.width = (this.slides.length * 100) + '%';

		if (container.getAttribute('slides-per-page') == "auto") {
			window.addEventListener("resize", () => this.checkWidth());
			this.checkWidth();
		} else {
			this.slidesPerPage = parseInt(container.getAttribute('slides-per-page'));
			this.setSlidesPerPage(this.slidesPerPage);
		}

		this.buttons[0].addEventListener('click', () => this.slideRight());
		this.buttons[1].addEventListener('click', () => this.slideLeft());
	}

	checkWidth() {
		this.containerWidth = this.container.offsetWidth;
		this.setParams(this.containerWidth);
	}

	setParams(w) {
		if (w < 551) {
			this.setSlidesPerPage(1);
		} else if (w < 901) {
			this.setSlidesPerPage(2);
		} else if (w < 1101) {
			this.setSlidesPerPage(3);
		} else {
			this.setSlidesPerPage(4);
		}
	}

	setSlidesPerPage(n) {
		var m = this.slides.length;
		this.slidesPerPage = n;
		for (let i = 0; i < m; i++) {
			this.slides[i].style.width = 'calc(' + (100 / m / n) + '% - 20px)';
		}
		this.slidesCount = m - n;
		if (this.currentPosition > this.slidesCount) {
			this.currentPosition = this.slidesCount;
		}
		this.currentMargin = -this.currentPosition * (100 / n);
		this.slider.style.marginLeft = this.currentMargin + '%';
		this.updateButtons();
	}

	slideRight() {
		if (this.currentPosition != 0) {
			this.slider.style.marginLeft = this.currentMargin + (100 / this.slidesPerPage) + '%';
			this.currentMargin += (100 / this.slidesPerPage);
			this.currentPosition--;
		}
		this.updateButtons();
	}

	slideLeft() {
		if (this.currentPosition != this.slidesCount) {
			this.slider.style.marginLeft = this.currentMargin - (100 / this.slidesPerPage) + '%';
			this.currentMargin -= (100 / this.slidesPerPage);
			this.currentPosition++;
		}
		this.updateButtons();
	}

	updateButtons() {
		if (this.currentPosition === 0) {
			this.buttons[0].classList.add('inactive');
		} else {
			this.buttons[0].classList.remove('inactive');
		}
		if (this.currentPosition >= this.slidesCount) {
			this.buttons[1].classList.add('inactive');
		} else {
			this.buttons[1].classList.remove('inactive');
		}
	}
}

// Initialize carousels
document.querySelectorAll('.crsl-container').forEach(container => {
	new Carousel(container);
});
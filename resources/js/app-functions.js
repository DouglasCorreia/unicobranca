import { handleFooter } from "./components/footer";
import { HandleHeader } from "./components/header";
import { lazyLoad, lazyLoadCss } from "./libs/sd-lazyload";
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

document.addEventListener("DOMContentLoaded", function() {
	const buildBannersSectionOnSwiper = () => {
		new Swiper('.banners__swiper', {
			loop: false,
			speed: 500,
			autoplay: {
				delay: 5000
			},
			pagination: {
				el: '.swiper-banners-pagination',
				clickable: true,
			}
		});
	};

	const initAnimations = () => {
		const elementsToAnimate = document.querySelectorAll('.animation__fade-up');

		const observer = new IntersectionObserver((entrys) => {
			entrys.forEach((currentEntry) => {
				if (currentEntry.isIntersecting) {
					currentEntry.target.classList.add('animation__started');

					observer.unobserve(currentEntry.target);
				}
			});
		}, {
			threshold: 0.1 // 10% do elemento precisa estar visível
		});

		elementsToAnimate.forEach((currentElement) => {
			observer.observe(currentElement);
		});
	};

	lazyLoad();
	lazyLoadCss();
	HandleHeader();
	handleFooter();
	buildBannersSectionOnSwiper();
	initAnimations();
}, false);

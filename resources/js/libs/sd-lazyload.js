
/* -----------------

	LAZY LOAD

----------------- */
export const lazyLoad = () => {
	const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));

	if ('IntersectionObserver' in window) {
		const lazyImageObserver = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					const lazyImage = entry.target;

					lazyImage.src = lazyImage.dataset.src;
					//lazyImage.srcset = lazyImage.dataset.srcset;
					lazyImage.classList.remove('lazy');
					lazyImageObserver.unobserve(lazyImage);
				}
			});
		});

		lazyImages.forEach(function (lazyImage) {
			lazyImageObserver.observe(lazyImage);
		});
	}
};

export const lazyLoadCss = () => {
	const lazyBackgrounds = [].slice.call(
		document.querySelectorAll('.lazy-background'),
	);

	if ('IntersectionObserver' in window) {
		const lazyBackgroundObserver = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible');

					lazyBackgroundObserver.unobserve(entry.target);
				}
			});
		});

		lazyBackgrounds.forEach(function (lazyBackground) {
			lazyBackgroundObserver.observe(lazyBackground);
		});
	}
};

/**
 * Remove o lazy load dos carrosséis que tiverem imagens
 */
export const removeLazyLoadOnSwiper = (element) => {
	const images = Array.from(element.querySelectorAll('.swiper-slide img.lazy'));

	if (images.length > 0) {
		images.forEach((currentImage) => {
			currentImage.src = currentImage.dataset.src;
			currentImage.classList.remove('lazy');
		});
	}
};

export default lazyLoad;

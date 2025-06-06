export const simulateClick = function (elem) {
	// Create our event (with options)
	const event = new MouseEvent('click', {
		bubbles: true,
		cancelable: true,
		view: window,
	});


	elem.dispatchEvent(event);

};

export const fadeOutEffect = (elem) => {
	elem.style.opacity = 1;

	(function fade() {
		if ((elem.style.opacity -= 0.1) < 0) {
			elem.style.display = 'none';
		} else {
			requestAnimationFrame(fade);
		}
	})();
};

export const fadeInEffect = (elem, display) => {
	elem.style.opacity = 0;
	elem.style.display = display || 'block';

	(function fade() {
		let val = parseFloat(elem.style.opacity);

		if (!((val += 0.1) > 1)) {
			elem.style.opacity = val;
			requestAnimationFrame(fade);
		}
	})();
};

export const slideUp = (target, duration = 500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.boxSizing = 'border-box';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;

	window.setTimeout(() => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
		//alert("!");
	}, duration);
};

export const slideDown = (target, duration = 500) => {
	target.style.removeProperty('display');

	let display = window.getComputedStyle(target).display;

	if (display === 'none') {
		display = 'block';
	}

	target.style.display = display;

	const height = target.offsetHeight;

	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.boxSizing = 'border-box';
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');

	window.setTimeout(() => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
	}, duration);
};

import { handleFooter } from "./components/footer";
import { HandleHeader } from "./components/header";
import { lazyLoad,lazyLoadCss } from "./libs/sd-lazyload";
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

	lazyLoad();
	lazyLoadCss();
	HandleHeader();
	handleFooter();
	buildBannersSectionOnSwiper();
}, false);

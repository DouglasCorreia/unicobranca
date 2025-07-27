import { fadeInEffect, fadeOutEffect } from "../libs/sd-effects";
import { body, header, isMobile } from "./utils";

export const handleHeader = ()=>{
    let getOffsetTop = (element) => {
        // Get the bounding rectangle of the element
        var rect = element.getBoundingClientRect();
        
        // Get the scrollTop property of the window or the document's body
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calculate the offset top relative to the viewport
        return rect.top + scrollTop;
    }

    const applyFixedHeaderEffect = () => {
        window.addEventListener('scroll', () => {
            const currentTopPosition = document.scrollingElement.scrollTop;
            const headerHeight = header.offsetHeight;

            if (currentTopPosition >= headerHeight) {
                header.classList.add('header__fixed');
                body.style.paddingTop = `${headerHeight}px`;
                
            } else {
                header.classList.remove('header__fixed');
                body.removeAttribute('style');
            }
        });
    };

    const openAndCloseMenu = () => {
		const target = header.querySelector('.header__nav');
		const duration = 500;
		const buttonToOpen = header.querySelector(
			'.header__tabs .tabs__inner',
		);
		const buttonToClose = header.querySelector(
			'.header__nav .nav__close',
		);
        const mask = header.querySelector('.header__mask');

		buttonToOpen.addEventListener('click', () => {
			target.style.left = '0%';
			target.style.transitionDuration = duration + 'ms';
			target.classList.add('active');

            fadeInEffect( mask );
		});

		buttonToClose.addEventListener('click', () => {
			target.style.left = '-100%';
			target.style.transitionDuration = duration + 'ms';
			target.classList.remove('active');

            fadeOutEffect( mask );
		});
	};

    const activeSectionLink = () => {
        let sections = Array.from( document.querySelectorAll('.home__section') );

        let removeActiveSessionsLinks = () => {
            let itens = Array.from( header.querySelectorAll('.header__nav ul li') );

            if( itens.length > 0 ){
                itens.forEach(currentItem => {
                    let link = currentItem.querySelector('a');

                    if( link.classList.contains('active') ) link.classList.remove('active');
                })
            }
        }

        window.addEventListener('scroll', () => {
            let currentTopPosition = document.scrollingElement.scrollTop;

            sections.forEach(currentSection => {
                let top = getOffsetTop( currentSection ) - header.offsetHeight;
                let sectionId = currentSection.getAttribute('id');
                let headerSectionLink = header.querySelector(`.header__nav ul li a[href="#${sectionId}"]`);

                if( currentTopPosition >= top){
                    removeActiveSessionsLinks();

                    if( headerSectionLink != null ) headerSectionLink.classList.add('active');
                }
            });
        });
    }

    const smoothScroll = () => {
        let itens = Array.from( header.querySelectorAll('.header__nav ul li') );
        let headerHeight = header.offsetHeight;

        if( itens.length > 0 ){
            itens.forEach(currentItem => {
                let link = currentItem.querySelector('a');

                link.addEventListener('click', (event) => {
                    let _this = event.currentTarget;
                    let href = _this.getAttribute('href');

                    if (href.indexOf('#') !== -1) {
                        event.preventDefault();
                        let id = href.replace('#', '');

                        let element = document.querySelector(`section[id=${ id }]`);
                        let coordinates = element.offsetTop - headerHeight;

                        window.scrollTo({
                            top: coordinates,
                            behavior: 'smooth'
                        });
                    }

                    if( isMobile === true ){
                        let duration = 500;

                        header.querySelector('.header__nav').style.left = '-100%';
                        header.querySelector('.header__nav').style.transitionDuration = duration + 'ms';
                        header.querySelector('.header__nav').classList.remove('active');

                        fadeOutEffect( header.querySelector('.header__mask') );
                    }
                });
            });
        }
    }

    applyFixedHeaderEffect();
    activeSectionLink();
    smoothScroll();

    if (isMobile === true) {
        openAndCloseMenu();
    }
};

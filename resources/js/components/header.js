import { body, header } from "./utils";

export const HandleHeader = ()=>{
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

    applyFixedHeaderEffect();
};

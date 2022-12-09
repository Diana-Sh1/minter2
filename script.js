//Определитель устройства клиента//
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows());
    }
};
// Полноэкранный слайдер//
let pageSlider = new Swiper('.swiperLanding', {
    wrapperClass: "main__wrapper",
    slideClass: "section",
    direction: 'vertical',

    parallax: true,
    mousewheel: {
        sensitivity: 1,
    },
    speed: 800,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    navigation: {
        nextEl: '.uploaded-in-next',
    },
    scrollbar: {
        el: '.page__scroll',
        dragClass: "page__drag-scroll",
        draggable: true
    },
    init: false,
    on: {
        init: function (){
            menuSlider();
        },
    slideChange: function (){
            menuSliderRemove();
           menu_link[pageSlider.realIndex].classList.add('_active');
        }
    }})



//Swiper WhyUs//
let swiper_whyUs = new Swiper('.swiperWhyUs', {
    wrapperClass: "whyUs__container",
    slideClass: "swiper-slide",
    navigation: {
        nextEl: '.swiperWhyUs-next-btn',
        prevEl: '.swiper-button-prev'
    },
    // loop: true,
    nested: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    // mousewheel: {
    //     sensitivity: 1,
    //     eventsTarget: ".swiper"
    // },
    slidetoClickedSlide: false,
    observer: true,
    observeParents: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
});

new Swiper(".swiperWhatIs", {
    navigation: {
        nextEl: '.swiperWhatIs-next-btn',
        prevEl: '.swiper-button-prev'
    },
    nested: true,
    pagination: {
        el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
    },
    watchSlidesProgress: true,

});

//меню бургера//
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
const footerBody = document.querySelector(".footer__content")
const enterBtn = document.querySelector(".button_enter");

if (iconMenu) {
    iconMenu.addEventListener("click", function (e) {
        iconMenu.classList.toggle("_active");
        menuBody.classList.toggle("_active");
        footerBody.classList.remove("active");
        document.body.classList.toggle("_lock");
    });
}
if(enterBtn) {
    enterBtn.addEventListener("click", function (a) {
        // enterBtn.classList.toggle("active");
        footerBody.classList.toggle("active");
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
        document.body.classList.toggle("_lock");
    });
}
menuBody.addEventListener("click", function (){
    if (iconMenu.classList.contains("_active")) {
        document.body.classList.remove("_lock");
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active")
    }
})
//-------
//удаление слайда footer в моб разрешении//
const footer = document.querySelector(".footer");
if (document.body.offsetWidth < 768) {
    footer.classList.remove('section')
}

//меню маркер//
let marker = document.querySelector('#marker');
let item = document.querySelectorAll('nav a')

function indicator(e) {
    marker.style.left = e.offsetLeft+"px";
    marker.style.width = e.offsetWidth+"px";
}
item.forEach(a => {
    a.addEventListener("click", (e)=>{
        indicator(e.target);
    })
})

//изменение цвета меню по скроллу//
const getId = (link) => link.getAttribute('href').replace('#', '');
const menu_link = document.querySelectorAll(".menu__link");

const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            menu_link.forEach((link)=>{
                link.classList.toggle('menu__link--active',
                    getId(link) === entry.target.id);
            });
        }
    });
}, {
    threshold: 0.7,
})
document.querySelectorAll(".section").forEach((section)=>observer.observe(section));

//изменение цвета меню на белой секции//
const header = document.querySelectorAll('.header li a');
const buttonBlack =document.querySelector('.button_enter');
const menu_black = document.querySelector('[data-opacity="1"]');

const observer1 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
                 for (let head of header) {
                    head.style.color = entry.target.dataset.color || '';
                    head.style.opacity = entry.target.dataset.opacity || '';
                    if (isMobile.any()) {
                        head.style.color = "#fff" || '';
                        head.style.opacity = "0.5" || '';
                    }
            }
            buttonBlack.style.color = entry.target.dataset.color || '';
            buttonBlack.style.borderColor = entry.target.dataset.color || '';
            menu_black.style.opacity =  "1" || entry.target.dataset.opacity;
            marker.style.background = entry.target.dataset.background || '';
            iconMenu.style.background = entry.target.dataset.background || '';

        }
    });
}, { threshold: 0.8 });

[...document.getElementsByClassName('section')].forEach((t) => {
    observer1.observe(t);
});


//изменение цвета иконки и меню раздел What Is в моб версии//
if (isMobile.any()) {
    const observer3 = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                buttonBlack.style.color = entry.target.dataset.color || '';
                buttonBlack.style.borderColor = entry.target.dataset.color || '';
                iconMenu.style.background = entry.target.dataset.background || '';
                }
            })
    }, {threshold: 0.8});

    [...document.getElementsByClassName('section')].forEach((t) => {
        observer3.observe(t);
    });
}
//изменение цвета меню на белой секции при моб разрешении 3-его слайда//
const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
                if (document.body.offsetWidth < 767) {
                    iconMenu.style.background = entry.target.dataset.background || '';
                    buttonBlack.style.color = entry.target.dataset.color || '';
                    buttonBlack.style.borderColor = entry.target.dataset.color || '';
                }
            }
    });
}, { threshold: 0.8 });

[...document.getElementsByClassName('swiper-slide')].forEach((t) => {
    observer2.observe(t);
});

//скролл до раздела меню//
function menuSlider() {
    if(menu_link.length > 0){
        menu_link[pageSlider.realIndex].classList.add('_active');
        for (let index = 0; index < menu_link.length; index++){
            const menu_lin = menu_link[index];
            menu_lin.addEventListener('click', function (e){
                menuSliderRemove ();
                pageSlider.slideTo(index, 800);
                menu_lin.classList.add('_active');
                e.preventDefault();
            })
        }
    }
}
function menuSliderRemove () {
    const menuLinkActive = document.querySelector(".menu__link._active");
    if(menuLinkActive){
        menuLinkActive.classList.remove('_active');
    }
}
pageSlider.init();

//Динамиечский адаптив элементов//
"use strict";
function DynamicAdapt(type) {
    this.type = type;
}
DynamicAdapt.prototype.init = function () {
    const _this = this;
    // массив объектов
    this.оbjects = [];
    this.daClassname = "_dynamic_adapt_";
    // массив DOM-элементов
    this.nodes = document.querySelectorAll("[data-da]");
    // наполнение оbjects объктами
    for (let i = 0; i < this.nodes.length; i++) {
        const node = this.nodes[i];
        const data = node.dataset.da.trim();
        const dataArray = data.split(",");
        const оbject = {};
        оbject.element = node;
        оbject.parent = node.parentNode;
        оbject.destination = document.querySelector(dataArray[0].trim());
        оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
        оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
        оbject.index = this.indexInParent(оbject.parent, оbject.element);
        this.оbjects.push(оbject);
    }
    this.arraySort(this.оbjects);

    // массив уникальных медиа-запросов
    this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
        return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
    }, this);
    this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
        return Array.prototype.indexOf.call(self, item) === index;
    });

    // навешивание слушателя на медиа-запрос
    // и вызов обработчика при первом запуске
    for (let i = 0; i < this.mediaQueries.length; i++) {
        const media = this.mediaQueries[i];
        const mediaSplit = String.prototype.split.call(media, ',');
        const matchMedia = window.matchMedia(mediaSplit[0]);
        const mediaBreakpoint = mediaSplit[1];

        // массив объектов с подходящим брейкпоинтом
        const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
            return item.breakpoint === mediaBreakpoint;
        });
        matchMedia.addListener(function () {
            _this.mediaHandler(matchMedia, оbjectsFilter);
        });
        this.mediaHandler(matchMedia, оbjectsFilter);
    }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
    if (matchMedia.matches) {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            оbject.index = this.indexInParent(оbject.parent, оbject.element);
            this.moveTo(оbject.place, оbject.element, оbject.destination);
        }
    } else {
        for (let i = 0; i < оbjects.length; i++) {
            const оbject = оbjects[i];
            if (оbject.element.classList.contains(this.daClassname)) {
                this.moveBack(оbject.parent, оbject.element, оbject.index);
            }
        }
    }
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
    element.classList.add(this.daClassname);
    if (place === 'last' || place >= destination.children.length) {
        destination.insertAdjacentElement('beforeend', element);
        return;
    }
    if (place === 'first') {
        destination.insertAdjacentElement('afterbegin', element);
        return;
    }
    destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
    element.classList.remove(this.daClassname);
    if (parent.children[index] !== undefined) {
        parent.children[index].insertAdjacentElement('beforebegin', element);
    } else {
        parent.insertAdjacentElement('beforeend', element);
    }
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
    const array = Array.prototype.slice.call(parent.children);
    return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
    if (this.type === "min") {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return -1;
                }

                if (a.place === "last" || b.place === "first") {
                    return 1;
                }

                return a.place - b.place;
            }

            return a.breakpoint - b.breakpoint;
        });
    } else {
        Array.prototype.sort.call(arr, function (a, b) {
            if (a.breakpoint === b.breakpoint) {
                if (a.place === b.place) {
                    return 0;
                }

                if (a.place === "first" || b.place === "last") {
                    return 1;
                }

                if (a.place === "last" || b.place === "first") {
                    return -1;
                }

                return b.place - a.place;
            }

            return b.breakpoint - a.breakpoint;
        });
        return;
    }
};

const da = new DynamicAdapt("max");
da.init();


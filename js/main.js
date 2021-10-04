"use strict";

function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

var isMobile = {
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
    return (
      navigator.userAgent.match(/IEMobile/i) ||
      navigator.userAgent.match(/WPDesktop/i)
    );
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

function formAddError(el) {
  el.classList.add("_error");
  el.parentElement.classList.add("_error");
}

function formRemoveError(el) {
  el.classList.remove("_error");
  el.parentElement.classList.remove("_error");
}

function emailTest(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(input.value);
}


const popupResponses = {
  error: {
    title: "Вы не заполнили обязательные поля!",
    src: "img/popup/2.png",
    srcset: "img/popup/2.webp",
    elemValue: "Пожалуйста, заполните все обязательные поля",
  },
  default: {
    title: document.querySelector(".popup__title").textContent.trim(),
    src: "img/popup/1.png",
    srcset: "img/popup/1.webp",
  },
  success: {
    src: "img/popup/3.png",
    srcset: "img/popup/3.webp",
  },
};


window.onload = () => {
   const header = () => {
   const header = document.querySelector(".header"),
     headerScroll = document.querySelector(".header-scroll"),
     headerBurger = document.querySelector(".header-scroll__burger"),
     headerMenu = document.querySelector(".header-scroll__menu"),
     headerClose = document.querySelector(".scroll-menu__close"),
     footer = document.querySelector(".footer"),
     headerCities = document.querySelector(".cities-header");

   document.querySelectorAll(".banner-popup__subtitle").forEach((subtitle) => {
     subtitle.textContent =
       `Делаем ваш бизнес узнаваемым в городе ${
         document.querySelector(".top-header__city-name").textContent.trim()
       }`;
   });

   if (window.scrollY > header.clientHeight * 2) {
     headerScroll.classList.add("_scroll");
   }
   window.addEventListener('scroll', () => {
      if(window.scrollY > header.clientHeight * 2) {
         headerScroll.classList.add('_scroll');
      } else {
         headerScroll.classList.remove('_scroll');
         headerMenu.classList.remove('_open');
      }
   })

   headerBurger.addEventListener('click', () => {
      headerMenu.classList.add('_open');
   });

   headerClose.addEventListener('click', () => {
      headerMenu.classList.remove('_open');
   });

   if(window.matchMedia('(max-width: 767.98px)').matches) addPageMargin();
   window.addEventListener('resize', () => {
      if (window.innerWidth < 767.98) addPageMargin();
      else footer.style.marginBottom = `0px`;
   });

   function addPageMargin() {
     footer.style.marginBottom = `${headerScroll.clientHeight}px`;
   }

   document.addEventListener('click', (e) => {
      const target = e.target;

      if (
        !target.closest(".top-header__location") ||
        target.closest(".cities-header__close")
      ) {
        headerCities.classList.remove("_opened");
      } else if(target.closest('.cities-header__item')) {
         const text = target.textContent;
         document.querySelector(".top-header__city-name").textContent = text;
         document.querySelectorAll('.banner-popup__subtitle').forEach(subtitle => {
            subtitle.textContent =
              `Делаем ваш бизнес узнаваемым в городе ${
                document.querySelector(".top-header__city-name").textContent.trim()
              }`;
         });
      } else if(target.closest('.top-header__city-wrapper')) {
         headerCities.classList.toggle("_opened");
      }

   });

};

header();
   const forms = () => {
  // Form Validation & Send
  const forms = document.querySelectorAll("form");

  for (var i = 0; i < forms.length; i++) {
    const form = forms[i];

    form.addEventListener("submit", formSend);
  }

  async function formSend(e) {
    e.preventDefault(); 
    const form = e.currentTarget;
    let error = formValidate(form);

    if (error === 0) {

      if (form.closest(".popup__content")) {
        const border = form.parentElement.querySelector(".popup__border"),
          title = form.parentElement.querySelector(".popup__title");
        title.textContent = popupResponses.default.title;
        title.style.color = "inherit";
        border
          .querySelector("img")
          .setAttribute("src", popupResponses.success.src);
        border
          .querySelector("source")
          .setAttribute("srcset", popupResponses.success.srcset);
        form.closest(".popup").classList.add("_success");

        if (form.querySelector(".popup__error")) {
          form.removeChild(form.querySelector(".popup__error"));
        }
      } else {
        if(form.querySelector('.error-element')) {
          form.removeChild(form.querySelector(".error-element"));
        }
      }

    } else {

      if (form.closest(".popup__content")) {
        const border = form.parentElement.querySelector(".popup__border"),
          title = form.parentElement.querySelector(".popup__title");
        if (!document.querySelector(".popup__error")) {
          const errorElement = document.createElement("div");
          errorElement.className = "popup__error";
          errorElement.textContent = popupResponses.error.elemValue;
          form.appendChild(errorElement);
        }

        title.textContent = popupResponses.error.title;
        title.style.color = "red";
        border
          .querySelector("img")
          .setAttribute("src", popupResponses.error.src);
        border
          .querySelector("source")
          .setAttribute("srcset", popupResponses.error.srcset);
      } else {
        if(!form.querySelector('.error-element')) {
          const errorElement = document.createElement("div");
          errorElement.className = "error-element";
          errorElement.textContent =
            "Пожалуйста, проверьте одно из полей введено неправильно.";
          form.appendChild(errorElement);
        }
      }

    }

  }
  
  function formValidate(form) {
    let error = 0;
    let formReq = form.querySelectorAll("._req");

    for (var i = 0; i < formReq.length; i++) {
      let input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains("_email")) {
        if (!emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.value == "") {
        formAddError(input);
        error++;
      }
    }

    return error;
  }
};

forms()
   const fileInput = (inputSelector, nameSelector) => {
  // Filename
  let fileInput = document.querySelector(inputSelector);
  let fileName = document.querySelector(nameSelector);

  fileInput.addEventListener("change", (e) => {
    uploadFile(fileInput.files[0]);
  });

  function uploadFile(file) {
    if (file !== undefined) {
      // Type of the file
      if (
        !["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(
          file.type
        )
      ) {
        alert("Данный формат не поддерживается!");
        fileInput.value = "";
        return;
      }
      let reader = new FileReader();
      let correctName =
        file.name.length > 20 ? file.name.slice(0, 20) + "..." : file.name;

      reader.onload = function (e) {
        fileName.innerHTML = correctName;
      };

      reader.onerror = function (e) {
        alert("Произошла ошибка");
      };

      reader.readAsDataURL(file);
    }
  }
  
};
fileInput("#layoutFile", ".layout__file-text");
   // Phone mask
const phoneMask = () => {
  let phoneInputs = document.querySelectorAll("input[data-tel-input]");

  for (let phoneInput of phoneInputs) {
    phoneInput.addEventListener("keydown", onPhoneKeyDown);
    phoneInput.addEventListener("input", onPhoneInput, false);
    phoneInput.addEventListener("paste", onPhonePaste, false);
  }

  function getInputNumbersValue(input) {
    // Return stripped input value — just numbers
    return input.value.replace(/\D/g, "");
  }

  function onPhonePaste(e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input);
    let pasted = e.clipboardData || window.clipboardData;
    if (pasted) {
      let pastedText = pasted.getData("Text");
      if (/\D/g.test(pastedText)) {
        // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
        // formatting will be in onPhoneInput handler
        input.value = inputNumbersValue;
        return;
      }
    }
  }

  function onPhoneInput(e) {
    let input = e.target,
      inputNumbersValue = getInputNumbersValue(input),
      selectionStart = input.selectionStart,
      formattedInputValue = "";

    if (!inputNumbersValue) {
      return (input.value = "");
    }

    if (input.value.length != selectionStart) {
      // Editing in the middle of input, not last symbol
      if (e.data && /\D/g.test(e.data)) {
        // Attempt to input non-numeric symbol
        input.value = inputNumbersValue;
      }
      return;
    }

    if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
      if (inputNumbersValue[0] == "9")
        inputNumbersValue = "7" + inputNumbersValue;
      let firstSymbols = inputNumbersValue[0] == "8" ? "8" : "+7";
      formattedInputValue = input.value = firstSymbols + " ";
      if (inputNumbersValue.length > 1) {
        formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
      }
      if (inputNumbersValue.length >= 5) {
        formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
      }
      if (inputNumbersValue.length >= 8) {
        formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
      }
      if (inputNumbersValue.length >= 10) {
        formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
      }
    } else {
      formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
    }
    input.value = formattedInputValue;
  }

  function onPhoneKeyDown(e) {
    // Clear input after remove last symbol
    let inputValue = e.target.value.replace(/\D/g, "");
    if (e.keyCode == 8 && inputValue.length == 1) {
      e.target.value = "";
    }
  }
}

phoneMask();

   const ymap = () => {
  let sectionMap = document.querySelector(".map");

  function ymapInit() {
    if (typeof ymaps === "undefined") return;
    let ymap = document.getElementById("ymap");

    ymaps.ready(function () {
      let map = new ymaps.Map("ymap", {
        center: [55.98337568661991,92.89800849999992],
        zoom: 17,
        controls: ["zoomControl"],
        behaviors: ["drag"],
      });

      // Placemark
      let placemark = new ymaps.Placemark(
        [55.98337568661991,92.89800849999992],
        {
          // Hint
          hintContent: "BIGFORMAT",
        },
        {
          iconLayout: "default#image",
          iconImageHref: "img/marker.png",
          iconImageSize: [60, 72],
          iconImageOffset: [-35, -70],
        }
      );

      map.geoObjects.add(placemark);

    });
  }

  window.addEventListener("scroll", checkYmapInit);
  checkYmapInit();

  function checkYmapInit() {
    let sectionMapTop = sectionMap.getBoundingClientRect().top;
    let scrollTop = window.pageYOffset;
    let sectionMapOffsetTop = sectionMapTop + scrollTop;

    if (scrollTop + window.innerHeight > sectionMapOffsetTop) {
      ymapLoad();
      window.removeEventListener("scroll", checkYmapInit);
    }
  }

  function ymapLoad() {
    let script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
    document.body.appendChild(script);
    script.onload = ymapInit;
  }
};

ymap();

   const toTop = () => {
   const arrow = document.querySelector('.to-top');

   if (window.scrollY > window.innerHeight * 1.5) {
     arrow.classList.add("_active");
   }
   checkArrowPosition();
   window.addEventListener('scroll', () => {
      if(window.scrollY > window.innerHeight * 1.5) {
         arrow.classList.add('_active');
      } else {
         arrow.classList.remove('_active');
      }
      checkArrowPosition();
   });

   function checkArrowPosition() {
      let footerTop = document
        .querySelector(".footer")
        .getBoundingClientRect().top;
      let scrollTop = window.pageYOffset;
      let footerOffsetTop = footerTop + scrollTop;

      if(scrollTop + window.innerHeight > footerOffsetTop) {
         arrow.style.position = 'absolute';
         arrow.style.top = `${footerOffsetTop - arrow.clientHeight - 32.5}px`;
      } else {
         arrow.style.position = 'fixed';
         arrow.style.top = 'auto';
      }
   }

   arrow.addEventListener('click', () => {
      window.scrollBy({
        top: -window.pageYOffset,
        behavior: "smooth",
      });
   });

};

toTop();
   const tabs = () => {
   const header = document.querySelector(".left-service__tabs"),
     tabs = document.querySelectorAll(".left-service__tab"),
     contents = document.querySelectorAll(".right-service__content"),
     images = document.querySelectorAll(".left-service__img"),
     activeClass = '_shown';

      for (let index = 0; index < tabs.length; index++) {
         const tab = tabs[index];
         
         tab.addEventListener('click', () => {
            tabs.forEach((item, i) => {
              if (tab == item) {
                hide();
                show(i);
              }
            });
         });
      }

     function hide() {
        contents.forEach(item => {
           item.classList.remove(activeClass);
        });

        images.forEach((item) => {
          item.classList.remove(activeClass);
        });

        tabs.forEach(tab => {
           tab.classList.remove(activeClass);
        });
     }

     function show(i) {
        contents[i].classList.add(activeClass);
        images[i].classList.add(activeClass);
        tabs[i].classList.add(activeClass);
     }

};

tabs();
   const timer = (id, deadline) => {
  const addZero = (num) => {
    if (num <= 9) {
      return "0" + num;
    } else {
      return num.toString();
    }
  };

  const getTimeRemaining = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);

    return {
      total: t,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);


      hours.querySelector('span:first-child').textContent = addZero(t.hours)[0];
      hours.querySelector('span:last-child').textContent = addZero(t.hours)[1];

      minutes.querySelector('span:first-child').textContent = addZero(t.minutes)[0];
      minutes.querySelector('span:last-child').textContent = addZero(t.minutes)[1];

      seconds.querySelector('span:first-child').textContent = addZero(t.seconds)[0];
      seconds.querySelector('span:last-child').textContent = addZero(t.seconds)[1];

      if (t.total <= 0) {
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        clearInterval(timeInterval);
      }
    }
  };

  setClock(id, deadline);
};

const deadline = document
  .querySelector(".offer__timer")
  .getAttribute("data-deadline");
timer(".offer__timer", deadline);

   const showMore = (itemsSelector, btnSelector, styleDisplay, number, numberMobile = 0) => {
   const 
      items = Array.from(document.querySelectorAll(itemsSelector)),
      btn = document.querySelector(btnSelector),
      btnContent = btn.querySelector('span').textContent;
   let clicked = false;

   number = (numberMobile && window.matchMedia('(max-width: 575.98px)').matches) ? numberMobile : number;

   items.slice(0, number).forEach(item => {
      item.classList.add('_shown');
   });

   btn.addEventListener('click', () => {
      if(!clicked) {
         items.slice(number).forEach((item) => {
           fadeIn(item);
         });
         clicked = true;
         btn.querySelector("span").textContent = "Свернуть";
      } else {
         items.slice(number).forEach((item) => {
           fadeOut(item);
         });
         clicked = false;
         btn.querySelector('span').textContent = btnContent;
      }
   });

   function fadeIn(el) {
     var opacity = 0.1;

     el.style.opacity = opacity;
     el.style.display = styleDisplay;

     var timer = setInterval(function () {
       if (opacity >= 1) {
         clearInterval(timer);
       }

       el.style.opacity = opacity;

       opacity += opacity * 0.1;
     }, 15);
   }

   function fadeOut(el) {
     var opacity = 1;

     var timer = setInterval(function () {
       if (opacity <= 0.1) {
         clearInterval(timer);
         el.style.display = "none";
       }

      el.style.opacity = opacity;

       opacity -= opacity * 0.1;
     }, 15);
   }

};

showMore(".partners__item", '.partners__btn', "flex", 20, 10);
showMore(".work_show_more", ".work__watch", "block", 4);


   const changeView = (slider, sliderPopup) => {
   const btns = document.querySelectorAll(".suggest__view-option"),
     sliderWrapper = document.querySelector(".suggest__slider"),
     titles = Array.from(
       document.querySelectorAll(
         ".suggest__name"
       )
     ).map((title) => title.textContent),
     numberOfSlides = 4,
     imagesSrc = Array.from(
       document.querySelectorAll(
         ".suggest__img img"
       )
     ).map(img => img.getAttribute('src')),
     slidesPerView = slider.params.slidesPerView,
     spaceBetween = slider.params.spaceBetween,
     centeredSlides = slider.params.centeredSlides;
     let links = Array.from(document.querySelectorAll('._banner-link'));

   btns.forEach(btn => {
      btn.addEventListener('click', () => {
         slider.removeAllSlides();
         links = [];
         changeActive(btn);

         if(btn.classList.contains('_list')) {
            buildList();
         } else {
            buildSlider();
         }

         slider.update();
         slider.updateSlides();

      });
   });

   function changeActive(activeBtn) {
      btns.forEach(btn => btn.classList.remove('_active'));
      activeBtn.classList.add('_active');
   }

   function buildList() {
      let i = 0;
      
      slider.params.slidesPerView = window.innerWidth < 768 ? 1 : 4;

      for (let index = 0; index < numberOfSlides; index++) {
         slider.appendSlide(`<div class="suggest__list-slide swiper-slide"></div>`);
      }

      slider.params.centeredSlides = false;
      slider.params.spaceBetween = 30;

      const slides = document.querySelectorAll(".suggest__list-slide");

      while(i < titles.length) {
         const item = document.createElement("div");
         item.className = "suggest__list-body";
         item.innerHTML = `<a href="#bannerPopup" class="popup-link _banner-link">${titles[i]}</a>`
         slides[i % numberOfSlides].appendChild(item);

         links.push(item.querySelector('._banner-link'));

         i++;
      }

   }

   function buildSlider() {

      slider.params.slidesPerView = slidesPerView;
      slider.params.centeredSlides = centeredSlides;
      slider.params.spaceBetween = spaceBetween;

      for(let i = 0; i < titles.length; i++) {
         const body = `<div class="suggest__img">
                           <img src="${imagesSrc[i]}" alt="">
                           <a href="#bannerPopup" class="suggest__link popup-link _banner-link">
                              <span class="suggest__link-text">Подробнее</span>
                              <span class="suggest__link-icon _icon-arrow"></span>
                           </a>
                       </div>
                       <div class="suggest__name">${titles[i]}</div>
                       `;
         slider.appendSlide(
           `<div class="suggest__slide swiper-slide">${body}</div>`
         );
      }

      links = document.querySelectorAll('._banner-link');
   }

   document.addEventListener('click', (e) => {
      const target = e.target;

      if(target.closest('._banner-link')) {
         let item = target.closest("._banner-link");

         if(!item.classList.contains('suggest__link')) {
            const index = Array.from(links).indexOf(item);

            sliderPopup.slideTo(index + 1, 1)
         } else {
            const index = Array.from(document.querySelectorAll('.suggest__slide')).indexOf(item.closest('.suggest__slide'));

            sliderPopup.slideTo(index + 1, 1);

         }
      }
   });

};


   const sliders = () => {
  function fillPagination() {
    const slider = this.el,
      current =
        slider.querySelector("._current") ||
        slider.parentElement.querySelector("._current"),
      following =
        slider.querySelector("._following") ||
        slider.parentElement.querySelector("._following"),
      next =
        slider.querySelector("._next") ||
        slider.parentElement.querySelector("._next"),
      numberSlides = this.slides.length - this.loopedSlides * 2;

    current.textContent =
      this.realIndex + 1 == numberSlides
        ? numberSlides
        : (this.realIndex + 1) % numberSlides;

    following.textContent =
      this.realIndex + 2 == numberSlides
        ? numberSlides
        : (this.realIndex + 2) % numberSlides;

    next.textContent =
      this.realIndex + 3 == numberSlides
        ? numberSlides
        : (this.realIndex + 3) % numberSlides;
  }

  function fillFraction() {
    const 
      currentSlide = document.querySelector('.banner-popup__current'),
      totalSlide = document.querySelector('.banner-popup__total');

      currentSlide.textContent = this.realIndex + 1;
      totalSlide.textContent = this.slides.length - this.loopedSlides*2;
  }

  const introSlider = new Swiper(".intro__slider", {
    speed: 800,
    loop: true,
    simulateTouch: false,
    allowTouchMove: false,
    autoplay: true,
    autoplaySpeed: 3300,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },

    preloadImages: false, 
    lazy: {
      loadPrevNext: true,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
  });

  const letterSlider = new Swiper(".letter__slider", {
    slideActiveClass: "letter__slide-active",
    loop: true,
    speed: 800,
    grabCursor: true,
    slidesPerView: "auto",
    slideToClickedSlide: true,
    centeredSlides: true,
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      depth: 100,
      stretch: 0,
      modifier: 2,
      slideShadows: false,
    },
    navigation: {
      nextEl: ".letter__next",
      prevEl: ".letter__prev",
    },
    on: {
      slideChange: fillPagination,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        effect: "slide",
        spaceBetween: 15,
      },
      768: {
        slidesPerView: "auto",
        effect: "coverflow",
        coverflowEffect: {
          rotate: 0,
          depth: 100,
          stretch: 0,
          modifier: 2,
          slideShadows: false,
        },
      },
    },
  });
  const letterPopupSlider = new Swiper(".letter-popup__slider", {
    loop: true,
    speed: 800,
    simulateTouch: false,
    allowTouchMove: false,
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".letter-popup__next",
      prevEl: ".letter-popup__prev",
    },
    on: {
      slideChange: fillPagination,
    },
    
    preloadImages: false,
    lazy: {
      loadPrevNext: true,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
  });

  const letterSlides = document.querySelectorAll(".letter__slide");
  for (let index = 0; index < letterSlides.length; index++) {
    const slide = letterSlides[index];
    
    slide.addEventListener('click', () => {
      letterPopupSlider.slideTo(letterSlider.realIndex + 1, 100);
    });
  }

  const suggestSlider = new Swiper(".suggest__slider", {
    slidesPerView: 5,
    spaceBetween: 63,
    centeredSlides: true,
    simulateTouch: true,
    initialSlide: 2,
    slideActiveClass: "suggest__slide-active",
    speed: 800,
    navigation: {
      nextEl: ".suggest__next",
      prevEl: ".suggest__prev",
    },
    observeParents: true,
    observeSlideChildren: true,
    observer: true,
    breakpoints: {
      320: {
        slidesPerView: 1.6,
        centeredSlides: false,
        spaceBetween: 30,
        initialSlide: 0,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 50,
        centeredSlides: true,
        initialSlide: 1,
      },
      942: {
        spaceBetween: 25,
        slidesPerView: 5,
        initialSlide: 2,
      },
      992: {
        spaceBetween: 63,
      },
    },
  });
  const bannerSlider = new Swiper(".banner-popup__slider", {
    loop: true,
    speed: 800,
    simulateTouch: false,
    allowTouchMove: false,
    slidesPerView: 1,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    navigation: {
      nextEl: ".banner-popup__next",
      prevEl: ".banner-popup__prev",
    },
    on: {
      slideChange: fillFraction,
    },
    preloadImages: false,
    lazy: {
      loadPrevNext: true,
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
  });

  changeView(suggestSlider, bannerSlider);

};

sliders();

   const popup = () => {
  const popupLinks = document.querySelectorAll(".popup-link");
  const body = document.querySelector("body");
  const lockPadding = document.querySelectorAll(".lock-padding");
  let unlock = true;
  const timeout = 800;

  document.addEventListener('click', function (e) {
    const target = e.target.closest(".popup-link") || e.target;

    if (target.classList.contains("popup-link")) {
      const popupName = target.getAttribute("href").replace("#", "");
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    }

  });

  const popupCloseIcon = document.querySelectorAll(".close-popup");
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener("click", function (e) {
        popupClose(el.closest(".popup"));
        e.preventDefault();
      });
    }
  }

  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector(".popup._open");
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      if (isMobile.any()) {
        history.pushState(
          "",
          document.title,
          window.location.pathname + "#emerge"
        );
      }
      currentPopup.classList.add("_open");
      currentPopup.addEventListener("click", function (e) {
        if (!e.target.closest(".popup__content")) {
          popupClose(e.target.closest(".popup"));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      if (isMobile.any()) {
        history.pushState("", document.title, window.location.pathname);
      }
      popupActive.classList.remove("_open");
      if (
        popupActive.classList.contains("_form-popup") &&
        popupActive.classList.contains("_success")
      ) {
        setTimeout(() => {
          const popupBorder =
            popupActive.parentElement.querySelector(".popup__border");
          popupBorder
            .querySelector("img")
            .setAttribute("src", popupResponses.default.src);
          popupBorder
            .querySelector("source")
            .setAttribute("srcset", popupResponses.default.srcset);
          popupActive.classList.remove('_success');
        }, timeout);
      } 

      if (doUnlock) {
        bodyUnlock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";

    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("_lock");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnlock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = "0px";
        }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("_lock");
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  document.addEventListener("keydown", function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelector(".popup._open");
      popupClose(popupActive);
    }
  });
}

popup();

   const inputChange = () => {
   const form = document.querySelector('.form_with_label'),
         inputs = form.querySelectorAll('.input_with_label');

   for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];

      input.querySelector('input').addEventListener('focus', () => {
         input.querySelector('label').classList.add('_hide');
      });

      input.querySelector("input").addEventListener("blur", () => {
        if (input.querySelector("input").value == "") {
          input.querySelector("label").classList.remove("_hide");
        }
      });
      
   }

};

inputChange();
   const steps = () => {
  const items = Array.from(document.querySelectorAll(".steps__item")),
    descImg = document.querySelector(".steps__desc-img"),
    descText = document.querySelector(".steps__desc-text"),
    stepBlock = document.querySelector(".steps");

  window.addEventListener("scroll", checkStepsScroll);
  checkStepsScroll();

  function checkStepsScroll() {
    const blockTop = stepBlock.getBoundingClientRect().top,
      scrollTop = window.pageYOffset,
      blockOffsetTop = blockTop + scrollTop;

    if (
      scrollTop + window.innerHeight >
        blockOffsetTop + stepBlock.clientWidth / 4 &&
      scrollTop - window.innerHeight <
        blockOffsetTop - stepBlock.clientWidth / 4
    ) {
      stepStart();

      window.removeEventListener("scroll", checkStepsScroll);
    }
  }

  function stepStart() {
    let i = 1;

    let interval = setInterval(() => {
      if (i >= items.length - 1) {
        clearInterval(interval);
        hoverChange();
      }
      const item = items[i],
        itemImg = item.getAttribute("data-img"),
        itemText = item.getAttribute("data-text");

      item.classList.add("_hovered");

      descText.innerHTML = itemText;
      descImg.querySelector("img").setAttribute("src", itemImg);
      descImg
        .querySelector("source")
        .setAttribute("srcset", itemImg.split(".")[0] + ".webp");

      i++;
    }, 750);
  }

  function hoverChange() {
    for (let index = 0; index < items.length; index++) {
      const item = items[index];

      if(!isMobile.any()) {
         item.addEventListener("mouseover", () => {
           const itemImg = item.getAttribute("data-img"),
             itemText = item.getAttribute("data-text");

           items.forEach((item) => item.classList.remove("_hovered"));

           items.slice(0, index + 1).forEach((el) => {
             el.classList.add("_hovered");
           });

           descImg.querySelector("img").setAttribute("src", itemImg);
           descImg
             .querySelector("source")
             .setAttribute("srcset", itemImg.split(".")[0] + ".webp");
           descText.innerHTML = itemText;
         });
      } else {
         item.addEventListener("click", () => {
           const itemImg = item.getAttribute("data-img"),
             itemText = item.getAttribute("data-text");

           items.forEach((item) => item.classList.remove("_hovered"));

           items.slice(0, index + 1).forEach((el) => {
             el.classList.add("_hovered");
           });

           descImg.querySelector("img").setAttribute("src", itemImg);
           descImg
             .querySelector("source")
             .setAttribute("srcset", itemImg.split(".")[0] + ".webp");
           descText.innerHTML = itemText;
         });
      }
    }
  }
};

steps();

   const anchorLinks = () => {
   const links = document.querySelectorAll('a._anchor-scroll');

   for (let index = 0; index < links.length; index++) {
      const link = links[index];
      
      link.addEventListener('click', (e) => {
         e.preventDefault();

         const href = link.getAttribute("href").replace("#", ""),
           scrollTarget = document.getElementById(href),
           topOffset =
             window.innerWidth < 767.98
               ? 0
               : document.querySelector(".header-scroll").offsetHeight,
           elementPosition = scrollTarget.getBoundingClientRect().top,
           offsetPosition = elementPosition - topOffset;

         document.querySelector(".scroll-menu").classList.remove('_open');

         window.scrollBy({
           top: offsetPosition,
           behavior: "smooth",
         });

         if(link.hasAttribute('data-tab')) {
            const
               tabClass = link.getAttribute('data-tab'), 
               tabs = document.querySelectorAll(".left-service__tab"),
               images = document.querySelectorAll(".left-service__img"),
               contents = document.querySelectorAll(".right-service__content");
            
            let activeTab, activeImg, activeContent; 

            for (let index = 0; index < tabs.length; index++) {
               const 
                  tab = tabs[index],
                  img = images[index],
                  content = contents[index];

               tab.classList.remove('_shown');
               img.classList.remove("_shown");
               content.classList.remove("_shown");
               
               if(tab.classList.contains(tabClass)) activeTab = tab;
               if (img.classList.contains(tabClass)) activeImg = img;
               if (content.classList.contains(tabClass)) activeContent = content;
              }

              activeTab.classList.add('_shown');
              activeImg.classList.add("_shown");
              activeContent.classList.add("_shown");

         }
         
      });
   }
};

anchorLinks();
   const changeAddress = () => {
   const addresses = document.querySelectorAll(".work__item"),
         addressWrapper = document.querySelector('.work__address');

   for (let index = 0; index < addresses.length; index++) {
     const address = addresses[index];

     if(!isMobile.any()) {
        address.addEventListener("mouseover", () => {
          addresses.forEach((address) => address.classList.remove("_active"));
          address.classList.add("_active");
          addressWrapper.innerHTML = address.getAttribute("data-address");
        });
     } else {
        address.addEventListener('click', () => {
           addresses.forEach((address) => address.classList.remove("_active"));
           address.classList.add("_active");
           addressWrapper.innerHTML = address.getAttribute("data-address");
        });
     }
   }

};

changeAddress();

};


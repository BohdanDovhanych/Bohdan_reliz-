document.addEventListener("DOMContentLoaded", function () {




  // ===== ЕЛЕМЕНТИ ІНТЕРФЕЙСУ =====
  let feedbackList = document.getElementById("feedback-list");     // UL, куди додаються картки відгуків
  let feedbackForm = document.getElementById("feedback-form");     // Форма із введенням даних
  let imageInput = document.getElementById("feedback-image");      // Інпут для завантаження картинки




  // ===== ДЕФОЛТНІ ВІДГУКИ (які є на макеті, якщо localStorage порожній) =====
  let defaultReviews = [
    {
      name: "Alex.",
      review: "Amazing quality! The Heisenberg figure looks exactly like in the show.",
      date: "",
      image: ""
    },
    {
      name: "Sarah K.",
      review: "Fast shipping and great packaging. Definitely ordering again!",
      date: "",
      image: ""
    },
    {
      name: "Sarah K.",
      review: "Fast shipping and great packaging. Definitely ordering again!",
      date: "",
      image: ""
    },
    {
      name: "Sarah K.",
      review: "Fast shipping and great packaging. Definitely ordering again!",
      date: "",
      image: ""
    }
  ];


  // ===== ЗАВАНТАЖЕННЯ ВІДГУКІВ З LOCALSTORAGE =====
  // Якщо вони є — показуємо їх, якщо ні — показуємо дефолтні
  let savedReviews = JSON.parse(localStorage.getItem("sellerReviews"));
  if (!savedReviews || !savedReviews.length) {
    savedReviews = defaultReviews;
  }


  // Виводимо всі знайдені відгуки
  savedReviews.forEach(addReviewCard);


  // ===== ОБРОБКА ВІДПРАВКИ ФОРМИ =====
  feedbackForm.addEventListener("submit", function (e) {
    e.preventDefault(); // блокуємо оновлення сторінки


    let nameInput = document.getElementById("feedback-name");
    let textInput = document.getElementById("feedback-text");


    let name = nameInput.value.trim();
    let review = textInput.value.trim();


    if (!name || !review) return; // валідація


    // ===== Якщо користувач додав картинку =====
    if (imageInput.files && imageInput.files[0]) {
      let reader = new FileReader();


      // Коли зображення завантажиться → збережемо Base64
      reader.onloadend = function () {
        let newReview = {
          name: name,
          review: review,
          date: new Date().toLocaleDateString(), // дата додавання
          image: reader.result                     // Base64 картинка
        };


        saveReview(newReview);
      };


      reader.readAsDataURL(imageInput.files[0]); // конвертація в Base64
    }


    // ===== Якщо картинки немає =====
    else {
      let newReview = {
        name: name,
        review: review,
        date: new Date().toLocaleDateString(),
        image: ""
      };


      saveReview(newReview);
    }
  });


  // ===== ФУНКЦІЯ ЗБЕРЕЖЕННЯ ВІДГУКУ =====
  function saveReview(reviewObj) {


    // Додаємо картку у правий список
    addReviewCard(reviewObj);


    // Додаємо в масив
    savedReviews.push(reviewObj);


    // Перезаписуємо localStorage
    localStorage.setItem("sellerReviews", JSON.stringify(savedReviews));


    // Очищуємо форму після відправки
    feedbackForm.reset();
  }


  // ===== ФУНКЦІЯ ДОДАВАННЯ ВІДГУКУ В DOM =====
  function addReviewCard(reviewObj) {


    // Окрема картка
    let li = document.createElement("li");
    li.classList.add("feedback-card");


    // Текст відгуку
    let textP = document.createElement("p");
    textP.classList.add("feedback-text");
    textP.textContent = reviewObj.review;
    li.appendChild(textP);


    // Автор відгуку + дата (якщо є)
    let authorP = document.createElement("p");
    authorP.classList.add("feedback-author");


    if (reviewObj.date) {
      authorP.textContent = `— ${reviewObj.name} (${reviewObj.date})`;
    } else {
      authorP.textContent = `— ${reviewObj.name}`;
    }


    li.appendChild(authorP);




    // Якщо картинка є — додаємо її
    if (reviewObj.image) {
      let img = document.createElement("img");
      img.src = reviewObj.image;
      img.alt = "Review image";
      img.classList.add("feedback-image");
      li.appendChild(img);
    }


    // Додаємо у список відгуків
    feedbackList.appendChild(li);
  }


});




// Функція для отримання значення кукі за ім'ям
function getCookieValue(cookieName) {
    // Розділяємо всі куки на окремі частини
    const cookies = document.cookie.split(';');


    // Шукаємо куки з вказаним ім'ям
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim(); // Видаляємо зайві пробіли


        // Перевіряємо, чи починається поточне кукі з шуканого імені
        if (cookie.startsWith(cookieName + '=')) {
            // Якщо так, повертаємо значення кукі
            return cookie.substring(cookieName.length + 1); // +1 для пропуску символу "="
        }
    }
    // Якщо кукі з вказаним іменем не знайдено, повертаємо порожній рядок або можна повернути null
    return '';
}


let themeBtn = document.querySelector("#themeToggle")


function setTheme(theme) {
    if (theme == 'light') {
        document.body.classList.add("light-theme");
        themeBtn.innerHTML = '<i class="bi bi-moon"></i>';
    } else {
        document.body.classList.remove("light-theme");
        themeBtn.innerHTML = '<i class="bi bi-brightness-high"></i>';
    }
}


let theme = getCookieValue('theme')
setTheme(theme)


themeBtn.addEventListener("click", () => {
    document.body.classList.toggle('light-theme'); // Перемикаємо клас теми
    if (theme == 'light') {
        theme = 'dark'
    } else {
        theme = 'light'
    }
    setTheme(theme)
    // Зберігаємо JSON рядок у кукі
    document.cookie = `theme=${theme}; max-age=${60 * 60 * 24 * 7}; path=/`;
})


// Очікуємо завантаження сторінки
document.addEventListener('DOMContentLoaded', function() {
    // Отримуємо всі написи для анімації
    const textElements = document.querySelectorAll('.fade-in-text');


    // Додаємо клас "show" для запуску анімації
    textElements.forEach(element => {
        element.classList.add('show');
    });
});










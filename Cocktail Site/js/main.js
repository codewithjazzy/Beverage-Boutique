document.querySelector('#findDrink').addEventListener('click', getDrink)

function getDrink(){
  const drinkEntry = document.querySelector('input').value

  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkEntry}`)
    .then(res => res.json())
    .then(data => {
      console.log(data.drinks);
      const carousel = document.querySelector('.carousel');
      carousel.innerHTML = ''; // Clear existing content

      //populate the data in the HTML by creating elements from the event listener
      data.drinks.forEach((drink, index) => {
        carousel.innerHTML += `
          <div class="drinkEntry${index}">
            <img src="${drink.strDrinkThumb}/preview" alt="${drink.strDrink}" />
            <h2>${drink.strDrink}</h2>
          </div>
        `;
      });

      // Add the active-carousel class to activate styling that only shows whent he carousel is in use
      const carouselContainer = document.querySelector('.carousel-container');
      carouselContainer.classList.add('active-carousel');

      //
      const prevBtn = document.getElementById('prevBtn');
      const nextBtn = document.getElementById('nextBtn');
      let currentIndex = 0;

      // Update button visibility based on currentIndex
      function updateButtonVisibility() {
        if (currentIndex === 0) {
          prevBtn.style.display = 'block'; // Show "Previous" button at the first item
        } else {
          prevBtn.style.display = 'block'; // Show "Previous" button for other items
        }
      
        if (currentIndex === carousel.children.length - 1) {
          nextBtn.style.display = 'none'; // Hide "Next" button at the last item
        } else {
          nextBtn.style.display = 'block'; // Show "Next" button for other items
        }
      }

      // Initial setup
      updateButtonVisibility();

      prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          // If at the first item, wrap around to the last item
          currentIndex = carousel.children.length - 1;
        }
        updateCarousel();
      });

      nextBtn.addEventListener('click', () => {
        if (currentIndex < carousel.children.length - 1) {
          currentIndex++;
        } else {
          // If at the last item, wrap around to the first item
          currentIndex = 0;
        }
        updateCarousel();
      });

      function updateCarousel() {
        const itemWidth = carousel.children[0].offsetWidth;
        const newPosition = -currentIndex * itemWidth;
        carousel.style.transform = `translateX(${newPosition}px)`;
      }
    })
    .catch(err => {
      console.log(`error ${err}`);
    });
}

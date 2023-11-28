document.querySelector('#findDrink').addEventListener('click', getDrink)

function getDrink() {
    const drinkChosen = document.getElementById('drinkInput').value
	const drinksContainer = document.querySelector('.spotlights');
		
        // Clear existing HTML content
        drinksContainer.innerHTML = '';

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkChosen}`)
        .then(res => res.json())
        .then(data => { 
            data.drinks.forEach((drink) => {
                const section = document.createElement('section');
                section.classList.add('drink-section');

                // Extract ingredients dynamically
                let ingredients = Array.from({ length: 15 }, (_, index) => drink[`strIngredient${index + 1}`])
                    .filter(x => x !== null && x !== undefined);

                // Extract measurements dynamically
                let measurements = Array.from({ length: 15 }, (_, index) => drink[`strMeasure${index + 1}`])
                    .filter(x => x !== null && x !== undefined);

                // Create array that combines ingredient and measurement
                let combinedList = ingredients.map((ingredient, index) => `${ingredient}: ${measurements[index]}`);

                const ingredientsList = combinedList.length > 0 ?
                    `<ul>${combinedList.map(item => `<li>${item}</li>`).join('')}</ul>` : 'No ingredients listed';

                //add to the HTML	 
                section.innerHTML = `
                    <span class="image"><img src="${drink.strDrinkThumb}/preview" alt="${drink.strDrink}" /></span>
                    <div class="content">
                        <h2 class="drinkName">${drink.strDrink}</h2>
                        <div class="ingredients" id="inGRD">${ingredientsList}</div>
                        <p class="instructions">${drink.strInstructions}</p>
                    </div>
                `;

                drinksContainer.appendChild(section);
            });
			// Show the section by toggling a class
			const sectionThree = document.getElementById('three');
			sectionThree.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Handle the error as needed
        });
}


/*
******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************
*/
(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Header.
		if ($banner.length > 0
		&&	$header.hasClass('alt')) {

			$window.on('resize', function() { $window.trigger('scroll'); });

			$banner.scrollex({
				bottom:		$header.outerHeight(),
				terminate:	function() { $header.removeClass('alt'); },
				enter:		function() { $header.addClass('alt'); },
				leave:		function() { $header.removeClass('alt'); $header.addClass('reveal'); }
			});

		}

	// Menu.
		$('#menu')
			.append('<a href="#menu" class="close"></a>')
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'right'
			});

})(jQuery);
document.querySelector('button').addEventListener('click', getDrink)

function getDrink(){
  const drinkEntry = document.querySelector('input').value

fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkEntry}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log(data.drinks)
     
    })
    .catch(err => {
        console.log(`error ${err}`)
    });
}


// document.querySelector('h2').innerText = data.drinks[0].strDrink
// document.querySelector('img').src = data.drinks[0].strDrinkThumb + "/preview"
// document.querySelector('h3').innerText = data.drinks[0].strInstructions
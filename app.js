document.querySelector(".cross").addEventListener("click", () => {
  document.querySelector(".instructionsHeading").classList.remove("show");
  document.querySelector(".bgBlur").style.display = "none";
  document.querySelector("body").style.overflow ="auto";
});

async function fetchRandomMeal() {
  const url1 = "https://www.themealdb.com/api/json/v1/1/random.php";

  try {
    let response = await axios.get(url1);
    let data = await response.data.meals[0];
    console.log(data);

    let randomMeal = `<img src="${data.strMealThumb}" alt="" id="${data.idMeal}" class="random" />
        <div class="dishName black text-align-center">${data.strMeal}</div>`;
    document.querySelector(".randomImages").innerHTML += randomMeal;

    var id=`${data.idMeal}`;
    document.querySelector(".random").addEventListener("click", (e) => {
      popup(id);
      console.log("id: ", id);
      document.querySelector(".bgBlur").style.display = "flex";
      document.querySelector(".popup").style.display = "flex";
    });
  } catch (err) {
    console.log(err);
  }
}

fetchRandomMeal();

document.querySelector("#searchForm").addEventListener("submit", (e) => {
  e.preventDefault();

  let category = document.querySelector("#search").value;
  if (category == " ") {
    searchResult();
  } else {
    searchResult(category);
    document.querySelector(".bg3").style.display = "none";
  }
});

async function searchResult(category) {
  const url2 = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

  try {
    document.querySelector(".bg4").style.display = "flex";

    let categoryResponse = await axios.get(url2);
    let categoryData = await categoryResponse.data.meals;
    console.log(categoryData);



    document.querySelector(".results").innerHTML = "";
    categoryData.forEach((e) => {

      let output = `<div class= "box flex column wrap">
        <img
          id="${e.idMeal}"
          src="${e.strMealThumb}"
          alt=""
          class="searchResultImg "
          />
        <p class="resultName1">${e.strMeal}</p>
      </div>`;
      document.querySelector(".results").innerHTML += output;

      document.querySelector(".categoryText").innerHTML = `${category}`

      var images = document.getElementsByClassName("searchResultImg")
      for(let i of images){
        i.addEventListener("click",()=>{
            var id = i.id;
            popup(id);
            document.querySelector(".bgBlur").style.display = "flex";
            document.querySelector(".popup").style.display = "flex";
        })
      }
    });
  } catch (err) {
    console.log(err);
  }
}

async function popup(id) {
  let url3 = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

  try {
    let popupRes = await axios.get(url3);
    let popupData = await popupRes.data.meals[0];

    let ingredients = [
      popupData.strIngredient1,
      popupData.strIngredient2,
      popupData.strIngredient3,
      popupData.strIngredient4,
      popupData.strIngredient5,
      popupData.strIngredient6,
      popupData.strIngredient7,
      popupData.strIngredient8,
      popupData.strIngredient9,
      popupData.strIngredient10,
      popupData.strIngredient11,
      popupData.strIngredient12,
      popupData.strIngredient13,
      popupData.strIngredient14,
      popupData.strIngredient15,
    ];
    console.log(ingredients);

    const arr = ingredients.filter((e) => e != "");

    let popupDetails = `<div class="imagebg flex column align-items-center">
        <img class="popupImg" src="${popupData.strMealThumb}" alt="" />
        <a href="#display">
          <button class="instructions">Instructions</button>
        </a>
      </div>
      <div class="info flex column">
        <p class="nameHeading">
          Name: <span class="name">${popupData.strMeal}</span>
        </p>
        <p class="categoryHeading">
          Category: <span class="category">${popupData.strCategory}</span>
        </p>
        <p class="AreaHeading">Area: <span class="Area">${popupData.strArea}</span></p>
        <p class="ingredientsHeading">
          Ingredients:
          <span class="ingredients"
            >${arr}
          </span>
        </p>
        <p id="display" class="instructionsHeading">
          Instructions:
          <span class="instructionsPara">${popupData.strInstructions}</span>
        </p>
      </div>`;
      document.querySelector(".popup").innerHTML = popupDetails;
      document.querySelector("body").style.overflow ="hidden";


      
      document.querySelector(".instructions").addEventListener("click", () => {
          document.querySelector(".instructionsHeading").classList.toggle("show");
        });


  } catch (error) {
    console.log("error: ", error);
  }
}


async function fixedCategories() {
  const url4 = "https://www.themealdb.com/api/json/v1/1/categories.php";

  try {
    const res = await axios.get(url4);
    const list = await res.data.categories;
    console.log("list: ", list);

    for(let i=0;i<list.length;i++){
        let c = `<div class="c_div align-items-center">
        <img class="clickSearch categoryImages" id="${list[i].strCategory}"  src="${list[i].strCategoryThumb}" alt="" />
        <p class="categoryNames black">${list[i].strCategory}</p>
      </div>
      <div>`;
      document.querySelector(".whiteBox").innerHTML += c;

    }

      let categoriesList = document.getElementsByClassName("clickSearch");
      console.log("categoriesList: ", categoriesList);
      for(let i of categoriesList){
        i.addEventListener("click",(e)=>{
          var categoryName = e.target.id;
          console.log("categoryName: ", categoryName);
          searchResult(categoryName);
          // window.scrollTo(offsetLeft
        })
      }
      
  } catch (error) {
    console.log("error: ", error);
  }
}

fixedCategories();

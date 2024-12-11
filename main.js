// document.getElementsByClassName('get-details')[0].onclick = function(){
//     document.getElementsByClassName('details')[0].classList.toggle("details");
// };

// var myRequest = new XMLHttpRequest();
// myRequest.open("GET","test.json");
// myRequest.send();
// console.log(myRequest);

// var element = document.createElement("div");
// var text = document.createTextNode("Mohaemmd");
// element.appendChild(text);
// document.body.appendChild(element);

// const myPromise = new Promise((resolve,regect) => {
//     //resolve("sucess");
//     regect(Error("faild"));
// }).then(
//     (resolve) => console.log(`this is ${resolve}`),
//     (regect) => console.log(`this is ${regect}`)
// ).catch(
//     (regectedReasone) => console.log(regectedReasone)
// ).finally(() => console.log("tgjf"));

var searchInput = document.querySelector('.search-input');
var searchbutton = document.querySelector('.search-button');
var searchContent = document.querySelector('.recipe-side');

searchbutton.addEventListener('click',getRecipes);

function getRecipes()
{
    var searchValue = searchInput.value.trim();
    var api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${searchValue}`;

    fetch(api)
    .then((res) => 
    {
        if(res.ok) return res.json();
        //console.log(res.json());
    })
    .then((data) => 
    {
        dispalyRecipe(data);
    })

}

function dispalyRecipe(recips)
{
    console.log(recips);
    //searchContent.innerHTML="";
    if(recips.meals == null){
        
        searchContent.innerHTML = "No content";
        return;
    }

    recips.meals.forEach((e) => {
        //console.log(e);
        searchContent.innerHTML+=
       `<div class="card">
                <img src="${e.strMealThumb}" alt="">
                <h2>${e.strMeal}</h2>
                <p>This is my best food</p>
                <button class="get-details" data-is="${e.idMeal}">Get Details</button>
            </div>`
    })
};

 searchContent.addEventListener('click',details);

function details(e){
    console.log(e.target);
    if(e.target.classList.contains('get-details'))
    {
        var id = e.target.getAttribute('data-id');
        var apiId=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

        fetch(apiId)
        .then((res) =>{
            if(res.ok) return res.json();
        })
        .then((data) =>{
            console.log(data);
            dispalyRecipeDetails(data);
        })
    }
   
}
function hide(){
    var content = document.querySelector('.details');
    content.style.display="none";
}
function dispalyRecipeDetails(e)
{
    //console.log(e);
    var content = document.querySelector('.details');
    content.style.display="block";
    // content.innerHTML =`
    //     <i class="fa-solid fa-xmark" onclick="hide()"></i>
    //       <h2>${e.strMeal}</h2>
    //       <p>Instructions: </p>
    //       <p>${e.strInstructions}</p>

    //      Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse labore voluptatibus 
    //       voluptate eaque, maiores nesciunt consequuntur at, praesentium
    //        atque quam nihil doloremque repellat modi quia sint suscipit dolorem ullam officia.
    //        <a href="${e.strYoutube}">Whatch vidio</a> `;
}




//www.themealdb.com/api/json/v1/1/lookup.php?i=52772
//www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
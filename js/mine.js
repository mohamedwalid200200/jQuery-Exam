// Side Bar
let leftSideWidth = $(".leftSide").outerWidth(true);
$(".closeBtn").click(function(){
    if ($(".sideBar").css("left") == "0px" ){
        $(".sideBar").animate({left : `-${leftSideWidth}`} , 1000);
        $(".closeBtn").html(`<i class="fa-solid fa-bars"></i>`);
    }else{
        $(".sideBar").animate({left : "0px"} , 1000);
        $(".closeBtn").html("<p>x</p>");
    }
});
$(".searchSide").click(function (){
    $(".search").css("display" , "block");
    $(".home").css("display" , "none");
    $(".categories").css("display" , "none");
    $(".area").css("display" , "none");
    $(".ingredients").css("display" , "none");
    $(".contact").css("display" , "none");
})
$(".catSide").click(function (){
    $(".categories").css("display" , "flex");
    $(".search").css("display" , "none");
    $(".home").css("display" , "none");
    $(".area").css("display" , "none");
    $(".ingredients").css("display" , "none");
    $(".contact").css("display" , "none");
})
$(".areaSide").click(function (){
    $(".area").css("display" , "flex");
    $(".categories").css("display" , "none");
    $(".search").css("display" , "none");
    $(".home").css("display" , "none");
    $(".ingredients").css("display" , "none");
    $(".contact").css("display" , "none");
})
$(".ingSide").click(function (){
    $(".ingredients").css("display" , "flex");
    $(".area").css("display" , "none");
    $(".categories").css("display" , "none");
    $(".search").css("display" , "none");
    $(".home").css("display" , "none");
    $(".contact").css("display" , "none");
})
$(".contactSide").click(function (){
    $(".contact").css("display" , "flex");
    $(".ingredients").css("display" , "none");
    $(".area").css("display" , "none");
    $(".categories").css("display" , "none");
    $(".search").css("display" , "none");
    $(".home").css("display" , "none");
})

// Meals
async function getMeals(){
    let mealResponse = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=`);
    let mealData= await mealResponse.json();
    return mealData.meals;
}
function displayMeals(data) {
    let rows = "";
    for(let i = 0; i < 25; i++) {
        rows += `
        <div class="mealCard bg-black col-3 pb-3">
                <div class="imag rounded-2 position-relative w-100">
                    <img class="img-fluid" src="${data[i].strMealThumb}">
                    <div class="overlay">
                        <p class="fw-bold fs-3">${data[i].strMeal}</p>
                    </div>
                </div>
        </div>`
    }
    $(".home").html(rows);
    console.log(data);
}

// Categories
async function getCategories(){
    let catResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let catData= await catResponse.json();
    return catData.categories;
}
function displayCategories(data) {
    let rows = "";
    for(let i = 0; i < data.length; i++) {
        rows += `
        <div class="catCard bg-black overflow-hidden col-3">
        <div class="imag rounded-2 position-relative w-100" onclick="getCategoryMeals('${data[i].strCategory}')">
            <img class="img-fluid" src="${data[i].strCategoryThumb}">
            <div class="overlay d-flex flex-column">
                <p class="fw-bold fs-3">${data[i].strCategory}</p>
                <p class="mealDesc">${data[i].strCategoryDescription.split(" ").slice(0,25).join(" ")}</p>
            </div>
        </div>
        </div>`
    }
    $(".categories").html(rows);
    console.log(data);
}
// Category meals
async function getCategoryMeals(cat){
    let catMealsResponse = await fetch(`www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    let catMealsData= await catMealsResponse.json();
    displayCategoryMeals(catMealsData.meals);
}
function displayCategoryMeals(data){
    let rows = "";
    for(let i = 0; i < 25; i++) {
        rows += `
        <div class="mealCard bg-black col-3 pb-3">
                <div class="imag rounded-2 position-relative w-100">
                    <img class="img-fluid" src="${data[i].strMealThumb}">
                    <div class="overlay">
                        <p class="fw-bold fs-3">${data[i].strMeal}</p>
                    </div>
                </div>
        </div>`
    }
    $(".categories").html(rows);
}
// Areas
async function getAreas(){
    let areasResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let areasData= await areasResponse.json();
    return areasData.meals;
}
function displayAreas(data) {
    let rows = "";
    for(let i=0; i<28; i++){
        rows += `
        <div onclick="getAreaMeals('${data[i].strArea}')" class="areaCard col-3 text-center p-4">
        <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
        <p class="areaName fs-3 fw-bold text-white">${data[i].strArea}</p>
    </div>`
    }
    $(".area").html(rows);
    console.log(data);
}
// Area meals
async function getAreaMeals(area){
    let areaMealsResponse = await fetch(`www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let areaMealsData= await areaMealsResponse.json();
    displayAreaMeals(areaMealsData.meals);
}
function displayAreaMeals(data){
    let rows = "";
    for(let i = 0; i < 25; i++) {
        rows += `
        <div class="mealCard bg-black col-3 pb-3">
                <div class="imag rounded-2 position-relative w-100">
                    <img class="img-fluid" src="${data[i].strMealThumb}">
                    <div class="overlay">
                        <p class="fw-bold fs-3">${data[i].strMeal}</p>
                    </div>
                </div>
        </div>`
    }
    $(".area").html(rows);
}
// Ingredients
async function getIngredients(){
    let ingredientsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let ingredientsData= await ingredientsResponse.json();
    return ingredientsData.meals;
}
function displayIngredients(data) {
    let rows = "";
    for(let i = 0; i < 20; i++) {
        rows += `
        <div class="card bg-transparent d-flex align-items-center col-3 text-white">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
        <h3>${data[i].strIngredient}</h3>
        <p class="text-center">${data[i].strDescription.split(" ").slice(0,25).join(" ")}</p>
    </div>`
    }
    $(".ingredients").html(rows);
    console.log(data);
}

// Contact us
let nameRegex=/^\w{3,}$/i;
let emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
let passwordRegex=/^\w{8,}$/i;
let phoneRegex=/^01[0-2,5]{1}[0-9]{8}$/;
let ageRegex=/^[0-9]{1,2}$/;
function validateName(){
    if(nameRegex.test($(".newNameInput").val())){
        $(".nameAlert").addClass("d-none");
        $(".nameAlert").removeClass("d-block");
        return true;
    }else{
        $(".nameAlert").removeClass("d-none");
        $(".nameAlert").addClass("d-block");
    }
}
$(".newNameInput").keyup( function(){
    validateName();
    validate();
})
function validateEmail(){
    if(emailRegex.test($(".newEmailInput").val())){
        $(".emailAlert").addClass("d-none");
        $(".emailAlert").removeClass("d-block");
        return true;
    }else{
        $(".emailAlert").removeClass("d-none");
        $(".emailAlert").addClass("d-block");
    }
}
$(".newEmailInput").keyup( function(){
    validateEmail();
})
function validateAge(){
    if(ageRegex.test($(".ageInput").val())){
        $(".ageAlert").addClass("d-none");
        $(".ageAlert").removeClass("d-block");
        return true;
    }else{
        $(".ageAlert").removeClass("d-none");
        $(".ageAlert").addClass("d-block");
    }
}
$(".ageInput").keyup( function(){
    validateAge();
})

function validatePass(){
    if(passwordRegex.test($(".newPassInput").val())){
        $(".passwordAlert").addClass("d-none");
        $(".passwordAlert").removeClass("d-block");
        return true;
    }else{
        $(".passwordAlert").removeClass("d-none");
        $(".passwordAlert").addClass("d-block");
    }
}
$(".newPassInput").keyup( function(){
    validatePass();
})
function validateRePass(){
    if($(".newPassInput").val() === $(".newRePassInput").val()){
        $(".rePassAlert").addClass("d-none");
        $(".rePassAlert").removeClass("d-block");
        return true;
    }else{
        $(".rePassAlert").removeClass("d-none");
        $(".rePassAlert").addClass("d-block");
    }
}
$(".newRePassInput").keyup( function(){
    validateRePass();
    validate();
})
function validate(){
    if(validateName() == true && validateEmail() == true && validateAge() == true && validatePass() == true && validateRePass() == true){
        $(".submit").addClass("btn");
        $(".submit").addClass("btn-danger");
    }else{
        $(".submit").removeClass("btn");
        $(".submit").removeClass("btn-danger");
    }
}
// Search

async function getSearchMeals(meal){
    let mealResponse = await fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${meal}`);
    let mealData= await mealResponse.json();
    return mealData.meals;
}
function displaySearchMeals(data) {
    let rows = "";
    for(let i = 0; i < data.length ; i++) {
        rows += `
        <div class="mealCard bg-black col-3 pb-3">
                <div class="imag rounded-2 position-relative w-100">
                    <img class="img-fluid" src="${data[i].strMealThumb}">
                    <div class="overlay">
                        <p class="fw-bold fs-3">${data[i].strMeal}</p>
                    </div>
                </div>
        </div>`
    }
    $(".searchResult").html(rows);
}
async function displaySearchResult(meal=""){
    getSearchMeals(meal);
    let searchMeals= await getSearchMeals(meal);
    displaySearchMeals(searchMeals);
}
async function getSearchFirstLetter(l){
    let mealResponse = await fetch(`www.themealdb.com/api/json/v1/1/search.php?f=${l}`);
    let mealData= await mealResponse.json();
    return mealData.meals;
}
function displaySearchFirstLetter(data) {
    let rows = "";
    for(let i = 0; i < data.length ; i++) {
        rows += `
        <div class="mealCard bg-black col-3 pb-3">
                <div class="imag rounded-2 position-relative w-100">
                    <img class="img-fluid" src="${data[i].strMealThumb}">
                    <div class="overlay">
                        <p class="fw-bold fs-3">${data[i].strMeal}</p>
                    </div>
                </div>
        </div>`
    }
    $(".searchResult").html(rows);
}
async function displaySearchFirstLetter(l=""){
    getSearchMeals(l);
    let searchMeals= await getSearchMeals(l);
    displaySearchMeals(searchMeals);
}
async function displayAll(){
    getMeals();
    getCategories();
    getAreas();
    getIngredients();
    let meals= await getMeals();
    let categories= await getCategories();
    let areas= await getAreas();
    let ingredients= await getIngredients();
    displayMeals(meals);
    displayCategories(categories);
    displayAreas(areas);
    displayIngredients(ingredients);
}
displayAll();
$(".searchName").keyup( function(){
    console.log($(".searchName").val())
    displaySearchResult($(".searchName").val());
})
$(".searchFirst").keyup( function(){
    console.log($(".searchFirst").val())
    displaySearchResult($(".searchFirst").val());
})
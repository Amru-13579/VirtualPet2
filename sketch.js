//Create variables here
var happyDog, dog;
var database;
var canvas;
var foodS, foodStock;
var FeedTheDog;
var AddFood;
var fedTime;
var lastFed;
var foodObj;


function preload()
{
  happyDogIMG = loadImage("happydog.png");
  dogIMG = loadImage("Dog.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  
  dog = createSprite(250,250,50,50);
  dog.addImage(dogIMG)
  dog.scale = 0.1;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  Obj = new Food();
  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
}


function draw() {  
  background(46,139,87);

  //if(keyWentDown(UP_ARROW)){
   // foodStock.FoodS - 1
  //  writeStock(foodS);
    //dog.addImage(happyDogIMG);
  //  foodStock.update();
 // }

 fedTime = database.ref('Feed Time');
 fedTime.on("value",function(data){
    lastFed = data.val();
 });

  drawSprites();
  //add styles here
  teztSize = 20;
  fill("purple");
  //text("Note Press UP_ARROW Key to feed Drago Milk!",150,100)
  text("Food Remaining: " + foodS,250,200)

  Obj.display();

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
if(x <= 0){
  x = 0;
}else{
  x = x-1;
}

  database.ref('/').update({
    Food : x
  })
}
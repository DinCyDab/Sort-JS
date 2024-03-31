var box = [];

var tempBox = document.getElementById("temp-holder");

var arrowLeft = document.getElementById("arrow-left");
var arrowRight = document.getElementById("arrow-right");

var nextButton = document.getElementById("next-button");

var sorted = document.getElementById("sorted");

var x = 0;
var size = 0;
var leftSide = 50;

var isDone = false;

function validateForm(){
    if(isDone == true){
        return false;
    }
    size = document.forms["myForm"]["sizeInput"].value;
    if(size == ""){
        return false;
    }
    makeBoxes();
    isDone = true;
    return false;
}

function resetForm(){
    if(isDone == false){
        return false;
    }
    let container = document.getElementById("container");
    isDone = false;
    leftSide = 50;
    j = 0;
    i = 0;
    for(x = 0; x < size; x++){
        container.removeChild(box[x]);
    }
    sorted.style.opacity = 0;
    arrowLeft.style.left = 0 + "px";
    arrowLeft.style.opacity = 0;
    arrowRight.style.left = 0 + "px";
    arrowRight.style.opacity = 0;
    return false;
}

function makeBoxes(){
    let container = document.getElementById("container");
    for(x = 0; x < size; x++){
        let box = document.createElement("div");
        box.className = "box";
        box.id = "box" + x;
        box.style.height = Math.floor(Math.random() * 500) + "px";
        box.style.backgroundColor = "rgb("+ Math.floor(Math.random() * 255) +
                                     ", " + Math.floor(Math.random() * 255) +
                                     ", " + Math.floor(Math.random() * 255) +")";
        box.style.left = leftSide + "px";
        
        leftSide += 100;
        container.appendChild(box);
    }
    init();
}

function init(){
    for(x = 0; x < size; x++){
        box[x] = document.getElementById("box" + x);
        box[x].style.height = box[x].offsetHeight + "px";
    }
    tempBox.style.left = tempBox.offsetLeft + "px";
    nextButton.addEventListener("click", showArrows);
}

var i = 0;
var j = 0;
var tempBoxLeft = 0 + "px";
var tempBoxRight = 0 + "px";
var tempHolder = box[0];

function showArrows(){
    if(isDone == false){
        return;
    }
    if(i > size - 2){
        sorted.style.opacity = 1;
    }
    if(i < size - 1){
        if(j < (size - 1) - i){
            arrowLeft.style.left = box[j].offsetLeft + 10 + "px";
            arrowLeft.style.opacity = 1;
            arrowRight.style.left = box[j+1].offsetLeft + 10 + "px";
            arrowRight.style.opacity = 1;
            nextButton.removeEventListener("click", showArrows);
            nextButton.addEventListener("click", moveToTemp);
        }
        else{
            i++;
            j = 0;
        }
    }
}

function moveToTemp(){
    if(box[j].offsetHeight > box[j+1].offsetHeight){
        tempHolder = box[j];
        tempBoxLeft = box[j].offsetLeft;
        tempBoxRight = box[j+1].offsetLeft;
        box[j].style.left = tempBox.offsetLeft + 1 + "px";
        box[j].style.top = tempBox.offsetTop - 120 + "px";
        nextButton.removeEventListener("click", moveToTemp);
        nextButton.addEventListener("click", moveRightToLeft);
    }
    else{
        arrowLeft.style.opacity = 0;
        arrowRight.style.opacity = 0;
        j++;
        nextButton.removeEventListener("click", moveToTemp);
        nextButton.addEventListener("click", showArrows);
    }
}

function moveRightToLeft(){
    box[j+1].style.left = tempBoxLeft + "px";
    nextButton.removeEventListener("click", moveRightToLeft);
    nextButton.addEventListener("click", moveTempToRight);
}

function moveTempToRight(){
    box[j].style.left = tempBoxRight + "px";
    box[j].style.top = "0%";
    arrowLeft.style.opacity = 0;
    arrowRight.style.opacity = 0;
    box[j] = box[j+1];
    box[j+1] = tempHolder;
    j++;
    nextButton.removeEventListener("click", moveTempToRight);
    nextButton.addEventListener("click", showArrows);
}
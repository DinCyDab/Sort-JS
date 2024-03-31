var element = [];

var a = 0;
var toLeft = 100;
var sizeOfArray = 10;

function createElements(){
    for(a = 0; a < sizeOfArray; a++){
        let created = document.createElement("div");
        created.className = "element";
        created.id = "element"+a;
        created.style.height = Math.floor(Math.random() * 400) + 100 + "px";
        created.style.left = (toLeft * a + 100) + "px";
        created.style.backgroundColor = "rgb("+ Math.floor(Math.random() * 255)+"," +
                                                Math.floor(Math.random() * 255)+"," +
                                                Math.floor(Math.random() * 255)+")";

        let container = document.getElementById("container");
        container.appendChild(created);
    }
    bubbleSort();
}

function initialize(){
    let z = 0;
    for(z = 0; z < sizeOfArray; z++){
        element[z] = document.getElementById("element" + z);
        element[z].style.left = element[z].offsetLeft + "px";
    }
}

function bubbleSort(){
    var x = 0;
    var y = 0;
    initialize();

    for(x = 0; x < element.length; x++){
        for(y = 0; y < element.length-1; y++){
            if(element[y].offsetHeight > element[y+1].offsetHeight){
                let temp = element[y];
                let holderLeft = element[y].style.left;
                let holderRight = element[y+1].style.left;
        
                element[y].style.left = holderRight;
                element[y+1].style.left = holderLeft;
        
                element[y] = element[y+1];
                element[y+1] = temp;
            }
        }
    }
}
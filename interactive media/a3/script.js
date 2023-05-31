/*Reference*/
const leftBtn = document.getElementById("left");
const rightBtn =document.getElementById("right");
const book =document.getElementById("book");
const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");

leftBtn.addEventListener("click", goPrevPage);
rightBtn.addEventListener("click", goNextPage);

let currentLocation= 1;
/*make sure start from the fontpage of page 1*/
let numOfPapers=3;
/*have three pages inside my book*/
let maxLocation = numOfPapers + 1;
/*To achieve the effect of the book, the maxlocation will always be one more than the number of papers*/

function goNextPage(){
    if(currentLocation < maxLocation){/*only happen when currentlocation is smaller than the maxlocation*/
      switch(currentLocation){
        case 1:/*open the book first and add the flipped class to page1 */
            openBook();
            page1.classList.add("flipped");
            page1.style.zIndex=3;
            break;
        case 2:
            page2.classList.add("flipped");
            page2.style.zIndex=2;
            page1.style.zIndex=1;
            break;
        case 3:
            page3.classList.add("flipped");
            page3.style.zIndex=3;
            page1.style.zIndex=1;
            closeBook(false);
            break;
        default:
            throw new Error("unkown state");/*if the currentlocation is not 1/2/3 than it's goinng to cuse the error*/
        }
        currentLocation++;
    }
    
}

function goPrevPage(){
    if(currentLocation > 1){
      switch(currentLocation){
        case 2:
          closeBook(true);
          page1.classList.remove("flipped");
          page1.style.zIndex=3;
          page3.style.zIndex=1;
          break;
        case 3:
          page2.classList.remove("flipped");
          page2.style.zIndex=2;
          page3.style.zIndex=1;
          break;
        case 4:
          openBook();
          page3.classList.remove("flipped");
          page3.style.zIndex=3;
          break;
        default:
            throw new Error("unkown state");
        }
      currentLocation--;
    }
}

function openBook(){
    book.style.transform = "translateX(50%)";
    leftBtn.style.transform="translateX(-180px)";
    rightBtn.style.transform="translateX(180px)";
    }
    /*Let the buttons change position as the book opens*/

function closeBook(isAtBeginning){
    if (isAtBeginning){
        book.style.transform = "translateX(0%)"; 
    }else{
        book.style.transform = "translateX(100%)"; 
    }
    leftBtn.style.transform="translateX(0px)";
    rightBtn.style.transform="translateX(0px)";
}
/*this is the text effect*/
const text=Array.from(document.getElementsByClassName("text"));
for (const textElement of text){
    textElement.innerHTML=textElement.textContent.replace(/\S/g,"<span>$&</span>")
}
    /*time words come back*/
    let goBackTime= 4;

    const letters = document.querySelectorAll("span");
    for(let i=0;i<letters.length;i++){
        letters[i].addEventListener('mouseover',function(){
            letters[i].classList.add('active')
            letters[i].classList.add('active'+i)
            /*Using lamba to goback*/
            setTimeout(()=>{
                let letter = document.querySelector('.active'+i)
                letter.classList.remove("active");
                letter.classList.add("show");
            },goBackTime*1000)
        })
    }
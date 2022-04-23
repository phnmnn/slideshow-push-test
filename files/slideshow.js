const slides = document.querySelectorAll('.slide');
const content = document.querySelectorAll('.content');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const pause = document.querySelector('#pause');
const gif = document.querySelector('#gif');
const info = document.querySelector('#info');
const invert = document.querySelector('#invert');
let auto = true; // Auto scroll
const intervalTime = 7000;
let slideInterval;
let slideBool = true; 
let gifMode = false;
let showInfo = true;
let displayUI = true; 
let invertMode = false;

const initSlide = 0;
let slideMemory = 0;

var imgHistory = [
  [0, "default"]

  ];
let index = 0;

let articleNumber = 1517;
let articleTitle = "Diffusion-limited aggregation";
let blurb = "blank";
let msg = "blank";
let itemType = "item";




function changeButton(){

  if (auto == true){
    document.getElementById("pauseButton").style.display = "none";

    document.getElementById("pause").classList.add('fas');
    document.getElementById("pause").classList.add('fa-play');
    msg = "Entering Paused Mode"; //for the other js doc

    clearInterval(slideInterval);
  }
    else {
      document.getElementById("pauseButton").style.display = "block";

      document.getElementById("pause").classList.remove('fas');
      document.getElementById("pause").classList.remove('fa-play');
      msg = "Entering Auto Play Mode"; //for the other js doc

      slideInterval = setInterval(nextSlide, intervalTime);
    }

    document.getElementById("displayBox").classList.add('display-trans');

    setTimeout(() => {document.getElementById("displayBox").classList.remove('display-trans')},2000);

    displayText();

};

function changeGifButton(){

    if (gifMode == true){

      document.getElementById("gifButton").innerText= "Enter Normal Mode";
        
      msg = "Entering: GIF Mode"; // for other JS file
      

    }
      else {
        document.getElementById("gifButton").innerText= "Enter Gif Only Mode";
        msg = "Entering: Normal Mode"; // for other JS file
  
      }

    displayText();
  
    document.getElementById("displayBox").classList.add('display-trans');

    setTimeout(() => {document.getElementById("displayBox").classList.remove('display-trans')},2000);
  
  
  };

function changeInfoButton() {
    console.log("showInfo Toggle");

    if (showInfo == true){
      document.getElementById("infoCard").style.opacity = 0;
      document.getElementById("infoCard2").style.opacity = 0;
      document.getElementById("infoButton").innerText= "Show Info Cards";
    }
    else {
      document.getElementById("infoCard").removeAttribute('style');
      document.getElementById("infoCard2").removeAttribute('style');
      document.getElementById("infoButton").innerText= "Hide Info Cards";
    }

};

function changeInvertButton() {
  if (invertMode == true){
    // document.getElementsByClassName("slide").removeAttribute('style');
    document.getElementById('slideOneID').classList.remove('inverted');
    document.getElementById('slideTwoID').classList.remove('inverted');

    document.getElementById("invertButton").innerText= "Invert Colors";
  }
  else {
    // document.getElementsById("slideOneID").style.filter="invert(1)";
    // document.getElementsById("slideOneID").classList.add('inverted');
    // document.getElementById('slideOneID').style.filter="invert()";
    document.getElementById('slideOneID').classList.add('inverted');
    document.getElementById('slideTwoID').classList.add('inverted');
    // document.getElementById('slideTwoID').style.filter="invert()";

    document.getElementById("invertButton").innerText= "Exit Invert Mode";
  }


};

function nextSlide() {


  const current = document.querySelector('.current');
  const curSlide = document.querySelector('.slide.current .content');
  const curContent = document.querySelector('.content .current-text');
  let whichList = "default";
  if (gifMode== true){
    whichList = "gif";
  }

  if (gifMode == true){
    do {
        seed = Math.floor(Math.random()*slideshow_img_gifs.length);
        if (slideshow_img_gifs[seed].url.endsWith("gif")){
            console.log("gif")
            break;
        }
        else {
            continue;
        }
      }while(1)
  }
  else {
      seed = Math.floor(Math.random()*slideshow_img_list.length);
  }
  

      if (index == (imgHistory.length - 1)){
        randomNumber = seed;
        imgHistory.push([randomNumber, whichList]);
        console.log(imgHistory);
        nextVal = randomNumber;
        index = index + 1;
      }
      else if (index < (imgHistory.length - 1)){
        nextVal = imgHistory[index + 1][0];
        index = index + 1;
      }
      else {
        nextVal = 0;
      }
    
      articleNumber = nextVal // For the other JS document
      if (imgHistory[index-1][1] == "gif"){
        articleTitle = slideshow_img_gifs[nextVal].title;
        blurb = slideshow_img_gifs[nextVal].description;
      }
      else {
        articleTitle = slideshow_img_list[nextVal].title;
        blurb = slideshow_img_list[nextVal].description;
      }
      
    
    

      articleInfo();
      slideBool = !slideBool;
      
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, intervalTime);
      // Remove current class
      current.classList.remove('current');
    
      // Check for next slide
      if (current.nextElementSibling) {
        
        if (gifMode == true){
          current.nextElementSibling.style.background = "url(\'" + slideshow_img_gifs[nextVal].url + "\') no-repeat center top/cover";
  
        }
        else {
          // Add current to next sibling
        current.nextElementSibling.style.background = "url(\'" + slideshow_img_list[nextVal].url + "\') no-repeat center top/cover";
       
        }
        current.nextElementSibling.classList.add('current');
    
      } else {
        
        if (gifMode == true){
          current.previousElementSibling.style.background = "url(\'" + slideshow_img_gifs[nextVal].url + "\') no-repeat center top/cover";
  
        }
        else {
        // Add current to start
        current.previousElementSibling.style.background = "url(\'" + slideshow_img_list[nextVal].url + "\') no-repeat center top/cover";
        
        }
        slides[0].classList.add('current');
        content[0].classList.add('current-text');
        
    
        }
      
      setTimeout(() => current.classList.remove('current'));
  
};

function prevSlide() {
  // Get current class
  const current = document.querySelector('.current');

  let prev = 0;

  if (index>0){
    prev = imgHistory[index-1][0];
    index = index - 1;
  }
  // else{
  //   prev = Math.floor(Math.random()*slideshow_img_list.length);
  // }

  articleNumber = nextVal // For the other JS document
  if (imgHistory[index][1] == "gif"){
    articleTitle = slideshow_img_gifs[nextVal].title;
    blurb = slideshow_img_gifs[nextVal].description;
  }
  else {
    articleTitle = slideshow_img_list[nextVal].title;
    blurb = slideshow_img_list[nextVal].description;
  }
  
  articleInfo();
  slideBool = !slideBool;


  // Remove current class
  current.classList.remove('current');
  // Check for prev slide
  if (current.previousElementSibling) {
    // Add current to prev sibling
    current.previousElementSibling.classList.add('current');
    if (imgHistory[index][1] == "gif"){
      current.previousElementSibling.style.background = "url(\'" + slideshow_img_gifs[prev].url + "\') no-repeat center top/cover";

    }
    else {
      current.previousElementSibling.style.background = "url(\'" + slideshow_img_list[prev].url + "\') no-repeat center top/cover";

    }

  } else {
    // Add current to last
    slides[slides.length - 1].classList.add('current');
    if (imgHistory[index][1] == "gif"){
      current.nextElementSibling.background = "url(\'" + slideshow_img_gifs[prev].url + "\') no-repeat center top/cover";

    }
    else{
      current.nextElementSibling.background = "url(\'" + slideshow_img_list[prev].url + "\') no-repeat center top/cover";

    }


  }

  setTimeout(() => current.classList.remove('current'));

};

function buttonWake(){

  // alert("wake");
  document.getElementById("buttonSet").classList.remove('asleep');
  document.getElementById("buttonSet").classList.add('awake');

  setTimeout(buttonSleep, 1000);
};

function buttonSleep(){
  document.getElementById("buttonSet").classList.remove('awake');
  document.getElementById("buttonSet").classList.add('asleep');
}

// Dom Functions

function articleInfo(){

  if(gifMode == true){
        itemType = "gif"
  }
  else{
        itemType = "item"
  }

  if (slideBool == true){
    document.getElementById("slideTwo").innerHTML = itemType + ": " + " " + articleNumber;
    document.getElementById("slideTitle2").innerHTML =  articleTitle;
    document.getElementById("blurb2").innerHTML = blurb;
    
  }
  else{
    

    document.getElementById("slideOne").innerHTML = itemType + ": " + " " + articleNumber;
    document.getElementById("slideTitle").innerHTML =  articleTitle;
    document.getElementById("blurb").innerHTML = blurb;

  }

  if (index>0){
    document.getElementById("prev").classList.remove('greyed-out');
  }
  else {
    document.getElementById("prev").classList.add('greyed-out');
  }
  

}


function displayText(){
  if(displayUI == true){
    document.getElementById("boxText").innerHTML = msg;
  }
  

}


// Button events

next.addEventListener('click', e => {
  // randomNummy = randomSlide();
  nextSlide();
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});


prev.addEventListener('click', e => {
  // randomSlide();
  if(index > 0){
    prevSlide();
    
  }
  if (auto) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
  
});

pause.addEventListener('click', e => {
  changeButton();
  if (auto == true){
    auto = false;
  }
  else {
    auto = true;
  }

});

gif.addEventListener('click', e => {
    
    gifMode = !gifMode;
    changeGifButton();
  });


info.addEventListener('click', e => {
    changeInfoButton();
    showInfo = !showInfo;
    
  });

invert.addEventListener('click', e => {
    changeInvertButton();
    invertMode = !invertMode;
    // alert("inverted");
    
  });
  
  

bodyID.addEventListener('keypress', e => {
    if (e.keyCode == 103 || e.keyCode == 71) {
        gifMode = !gifMode;
        // alert("gif mode = " + (gifMode));
        changeGifButton();
      }

    else if (e.keyCode == 112 || e.keyCode == 80) {
        changeButton();
        auto = !auto;
        // alert("auto transition = " + (auto));
      }
    else if (e.keyCode == 105 || e.keyCode == 9) {
        changeInfoButton();
        showInfo = !showInfo;
        alert("show info = " + (showInfo));
      }
    // alert(e.keyCode);
  
  });

  
bodyID.addEventListener("mousemove", buttonWake);


// Auto slide
if (auto) {
  // Run next slide at interval time
  slideInterval = setInterval(nextSlide, intervalTime);
}




// On Load Events
window.onload=function(){

  articleInfo();
  // articleInfo2();
  displayText();

}
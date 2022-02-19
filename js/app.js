/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const fragment = document.createDocumentFragment();  
const sections = Array.from(document.querySelectorAll('section'));
const numOfSections = sections.length ;
const menu =document.getElementById('navbar__list')

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//create list items of menu
function CreateMenuContent() {
    // loop on sections array to creat list element fo each section
    for (let section of sections) {
        // get section's title and url to creat list
       let sectionTitle = section.getAttribute('data-nav');
       let sectionUrl = section.getAttribute('id')
        //create list element
        listItem = document.createElement('li');
        // add item body to list item
        listItem.innerHTML = `<a class='menu__link' href='#${sectionUrl}'>${sectionTitle}</a>`;
        fragment.appendChild(listItem);
    }
    
}
// to check if the section is in viewport
function IsInViewport(element) {
    //get the current position
    let sectionPosition = element.getBoundingClientRect();
   // get hight of the element
    let sectionHeight = element.clientHeight;
   
    //add 25% for flexabilty of the range
    sectionHeight=+ (sectionHeight*50)/100;
  
    // check if the element is in range or not 
    /*
    
    if the top of the viewport == - sectionHeight so the viewport is reach the bottom of the element,
    if else so the element is above the viewport

    if the top of the viewport <= sectionHeight so the viewport reach to the element
    if not so the element is under the viewport
   */
    if (sectionPosition.top >= -sectionHeight&& sectionPosition.top<=sectionHeight){

        return true;
    } 
    else return false;
}
// function to showNav and wait a while then hide by calling hideNav()
function showNav(){
    menu.style.display = 'block';
    setTimeout(hideNav,8000);
}
function hideNav(){
    menu.style.display = 'none';
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
CreateMenuContent();



// Add class 'active' to section when near top of viewport

function IsActive (){
    //loop through all the sections to set the active state to the section in viewport
   
    for (let section of sections){
        if(IsInViewport(section) ){
            //IsInViewport retuns true if the section is in viewport so we set the active state 
            section.classList.add('your-active-class')
        }else  section.classList.remove('your-active-class')  
    }
}
   


// Scroll to anchor ID using scrollTO event
function scrollToAnchor (target){
    //when click on the menu we need to get section id 
   document.querySelector(target).scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
}
// scroll to the top function
function topFunction(){

}
/**
 * End Main Functions
 * Begin Events
 * 
*/



// Build menu 
menu.appendChild(fragment);
// Scroll to section on link click
menu.addEventListener ('click', function (event) {
    event.preventDefault();
    scrollToAnchor(event.target.getAttribute('href'))
    
    
})
// Set sections as active
document.addEventListener ('scroll', function(){
    showNav();
    IsActive()
})

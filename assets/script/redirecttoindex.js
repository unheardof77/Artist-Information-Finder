const windowSize = window.matchMedia(`(max-width: 768px)`) 
//checks if window is bigger than 768px and if it is it changes to index.html
function changeHtmlPage(){
    if(windowSize.matches === false){
        window.location.replace(`./index.html`); 
    };
};
//listens for a change in the window size.
windowSize.addEventListener(`change`, changeHtmlPage);
//Runs changeHtmlPage on page load to see if there on mobile or not.
changeHtmlPage();
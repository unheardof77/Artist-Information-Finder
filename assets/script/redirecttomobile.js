const windowSize = window.matchMedia(`(max-width: 768px)`);
//Checks if the page is smaller than windowSize and if it is it directs them to the mobile page.
function changeHtmlPage(){
    if(windowSize.matches === true){
        window.location.replace(`./mobile.html`);
    };
};
//listens for a change in the window size.
windowSize.addEventListener(`change`, changeHtmlPage);
//Runs changeHtmlPage on page load to see if there on mobile or not.
changeHtmlPage();
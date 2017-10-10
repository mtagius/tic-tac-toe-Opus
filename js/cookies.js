//gets the value of the cookie from the cookie name
function getCookie(cookieName) {
    cookieName += "=";
	//an array of all the cookies for this domain and path
    var cookieArray = document.cookie.split(';');
    for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i];
        //removes spaces before the cookie data
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        //if this is the cookie we are looking for
        if (cookie.indexOf(cookieName) == 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return null;
}

//used to create a new cookie and modify existing cookies
function createCookie(cookieName, cookieValue) {
	document.cookie = (cookieName + "=" + cookieValue);
}
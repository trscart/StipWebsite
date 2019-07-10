let languages = {
    "en-EN": {
        "nav-item1": "HOME",
        "nav-item2": "PLATFORM",
        "nav-item3": "BLOG",
        "nav-item4": "CONTACTS"
    }
}


$(document).ready(function () {
    let language = navigator.language; // get current language

    // change text language
    if (language == "it-IT") {
        $(".lang").each(function () {
            $(this).text(languages["en-EN"][$(this).attr("key")]);
        });
    }
})

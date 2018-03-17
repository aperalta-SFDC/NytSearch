var authKey = "a2e92fe2387442e782920cb8b9a95a1b";
var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;
//results hidden use resultCard

var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=";
var articleCounter = 0;
function  runQuery(numArticales, queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done &function (NYTdata) {
        console.log("----------------------------------");
        console.log("URL: " + queryURL);
        console.log("----------------------------------");
        console.log(NYTdata);
        console.log("----------------------------------");


    }

}

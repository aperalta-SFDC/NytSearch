var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;
$("#resultCard").hide();
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=";
var articleCounter = 0;
function runQuery(numArticles, queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(NYTData) {
        $("#resultCard").show();
        console.log("------------------------------------");
        console.log("URL: " + queryURL);
        console.log("------------------------------------");
        console.log(NYTData);
        console.log("------------------------------------");
        for (var i = 0; i < numArticles; i++) {
            articleCounter++;
            var wellSection = $("<div>");
            wellSection.addClass("well");
            wellSection.attr("id", "article-well-" + articleCounter);
            $("#resultBody").append(wellSection);
            if (NYTData.response.docs[i].headline !== "null") {
                $("#article-well-" + articleCounter)
                    .append(
                        "<h3 class='articleHeadline'><span class='label label-primary'>" +
                        articleCounter + "</span><strong> " +
                        NYTData.response.docs[i].headline.main + "</strong></h3>"
                    );
                console.log(NYTData.response.docs[i].headline.main);
            }
            if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
                $("#article-well-" + articleCounter)
                    .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
                console.log(NYTData.response.docs[i].byline.original);
            }
            $("#articleWell-" + articleCounter)
                .append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
            $("#articleWell-" + articleCounter)
                .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
            $("#articleWell-" + articleCounter)
                .append(
                    "<a href='" + NYTData.response.docs[i].web_url + "'>" +
                    NYTData.response.docs[i].web_url + "</a>"
                );
            console.log(NYTData.response.docs[i].pub_date);
            console.log(NYTData.response.docs[i].section_name);
            console.log(NYTData.response.docs[i].web_url);
        }
    });

}
$("#run-search").on("click", function(event) {
    event.preventDefault();
    articleCounter = 0;
    $("#well-section").empty();
    searchTerm = $("#searchTerm").val().trim();
    var searchURL = queryURLBase + searchTerm;
    numResults = $("#numResults").val();
    startYear = $("#startYear").val().trim();
    endYear = $("#endYear").val().trim();
    if (parseInt(startYear)) {
        searchURL = searchURL + "&begin_date=" + startYear + "0101";
    }
    if (parseInt(endYear)) {
        searchURL = searchURL + "&end_date=" + endYear + "0101";
    }
    runQuery(numResults, searchURL);
});
$("#clear-all").on("click", function() {
    articleCounter = 0;
    $("#well-section").empty();
});

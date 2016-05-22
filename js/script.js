function getDocumentHeight() {
    const body = document.body;
    const html = document.documentElement;
    
    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
};

function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function fetchPage(page) {
    $.ajax({
        url: 'http://localhost:8080/presentations?page_number=' + page + '&page_size=4',
        method: 'get',
        success: function (result) {
            var arrayLength = result.length;
            if(arrayLength<=0)
                return;
            for (var i = 0; i < arrayLength; i++) {
                var imageUrl=result[i].thumbnail;
                $('#list').append('<li><div class="myimg"><img src=' + imageUrl + '></img></div><div class="myimgtitle">' + result[i].title + '</div><div class="myimgdetails">By <a href="' + result[i].creator.profileUrl + '" class="creatorProfileUrl">'+ result[i].creator.name  + '</a>' + ' on ' + result[i].createdAt + '</div></li>');
            }
        }
    })
}

function addPage(page) {
    fetchPage(page);
}

let page = 0;

addPage(++page);

window.onscroll = function() {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
    addPage(++page);
};
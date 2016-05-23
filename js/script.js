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

function fetchPage(page, text, sort) {
    var url = 'http://localhost:8080/presentations';
    if(!text)
        url += '?page_number=' + page + '&page_size=4';
    else
        url += '/search?title=' + text + '&page_number=' + page + '&page_size=4';
    if(sort)
        url += '&sort=true'
    $.ajax({
        url: url,
        method: 'get',
        success: function (result) {
            var arrayLength = result.length;
            if(arrayLength<=0)
                return;
            for (var i = 0; i < arrayLength; i++) {
                var imageUrl=result[i].thumbnail;
                $('#list').append('<li><div class="myimg"><img height="480" width="480" src=' + imageUrl + '></img></div><div class="myimgtitle">' + result[i].title + '</div><div class="myimgdetails">By <a href="' + result[i].creator.profileUrl + '" class="creatorProfileUrl">'+ result[i].creator.name  + '</a>' + ' on ' + result[i].createdAt + '</div></li>');
            }
        }
    })
}

function addPage(page) {
    var searchText = $('#q').val();
    if($('.check').prop("checked") == true){
        fetchPage(page, searchText, true);
    } else {
        fetchPage(page, searchText, false);
    }
}

let page = -1;

addPage(++page);

window.onscroll = function() {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
    addPage(++page);
};


$(document).ready(function(){
    $(".q").keyup($.debounce( 250, function(e){
        var val=$(e.target).val();
        if(val){
            $("#list").html("");
            page = -1;
            addPage(++page);
        }
    }));
    $(".check").click($.debounce( 250, function(e) {
        $('#list').html("");
        page = -1;
        addPage(++page);
    }));
})
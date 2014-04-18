// DOMを操作する場合はページの読み込みを待つ
window.onload = function() {

    var prefix = 'http://api.flickr.com/services/feeds/photos_public.gne?tagmode=any&format=json&jsoncallback=drawImg&tags=';

    var searchButton = $('#searchButton');
    var keywordInput = $('#keyword');

    searchButton.click(function() {
        var keyword = keywordInput.val();
        var url = prefix + keyword;
        var script = $('<script/>').attr({src: url});
        $('head').append(script);
    });

    keywordInput.keypress(function(e) {
	if (e.which == 13) {
            searchButton.click();
            return false;
        }
    });
}

function drawImg(result) {
    var area = $('#resultArea');
    area.empty();

    var recordStyle = {padding: '8px 80px'};
    var titleStyle = {fontFamily: 'serif', fontWeight: 'bold', fontSize: 'x-large', color: '#aaaaaa'};
    var imageStyle = {textAlign: 'right', margin: '8px'};

    var items = result.items;
    if (items.length == 0) {
        area.append($('<p>').css({color: 'red'}).text('No Items'));
    }
    else {
        [].forEach.call(result.items, function(item, index) {
            var url = item.media.m;
            var title = index + '. ' + item.title;

            var taglinks = $('<p>');
            [].forEach.call(item.tags.split(' '), function(tag) {
		    taglinks.append($('<a>').attr('href',"javascript:doSearch('" + tag + "')").text(tag).css('margin','0px 5px'));
	    });
            area.append(
		$('<div>').css(recordStyle).append(
		    $('<p>').css(titleStyle).text(title),
                    taglinks,
                    $('<div>').css(imageStyle).append(
                        $('<img>').attr({src: url})
		    )
                )
            );
        });
    }
}

function doSearch(keyword) {
    $('#keyword').val(keyword);
    $('#searchButton').click();
}


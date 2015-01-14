$(document).scroll(function() {
    var scroll_pos=$(document).scrollTop();
    var docHeight=$(document).height();
    var percent=Math.round((scroll_pos/docHeight)*100);
   if (percent<31.9) 
         $("#menufade").css('background-color', '#3F3F3E');
    if (percent>35.4) 
         $("#menufade").css('background-color', '#6FC6DF');
	if (percent>53.9) 
         $("#menufade").css('background-color', '#3F3F3E');
 
});


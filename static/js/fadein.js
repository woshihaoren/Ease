$(window).scroll(function(){
	var scroll_pos=$(document).scrollTop();
	var docHeight=$(document).height();
    var percent=Math.round((scroll_pos/docHeight)*100);
	
      if (percent>20) 
         $(".ontwerperfade").fadeIn();
      else{
         $(".ontwerperfade").fadeOut();
      }
	  
	   if (percent>23) 
         $(".ontwerperfade2").fadeIn();
      else{
         $(".ontwerperfade2").fadeOut();
      }
	  
	   if (percent>27) 
         $(".illustratorfade").fadeIn();
      else{
         $(".illustratorfade").fadeOut();
      }
	  
	     if (percent>27) 
         $(".copywriterfade").fadeIn();
      else{
         $(".copywriterfade").fadeOut();
      }
	  
	      if (percent>29)
         $(".webdeveloperfade").fadeIn();
      else{
         $(".webdeveloperfade").fadeOut();
      }
	  
	       if (percent>31)
         $(".programmeurfade").fadeIn();
      else{
         $(".programmeurfade").fadeOut();
      }
	  
	 if (percent>24) 
         $(".fadeline1").fadeIn();
      else{
         $(".fadeline1").fadeOut();
      }
	  
	   if (percent>26) 
         $(".fadeline2").fadeIn();
      else{
         $(".fadeline2").fadeOut();
      }
	  
	    if (percent>28) 
         $(".fadeline3").fadeIn();
      else{
         $(".fadeline3").fadeOut();
      }
	  
	     if (percent>32) 
         $(".fadeline4").fadeIn();
      else{
         $(".fadeline4").fadeOut();
      }
	  
	      if (percent>34) 
         $(".fadeline5").fadeIn();
      else{
         $(".fadeline5").fadeOut();
      }
	  
	   if (percent>33) 
         $(".fadeline6").fadeIn();
      else{
         $(".fadeline6").fadeOut();
      }
	  
	    if (percent>31) 
         $(".fadeline7").fadeIn();
      else{
         $(".fadeline7").fadeOut();
      }
	  
	     if (percent>34) 
         $(".fadeline8").fadeIn();
      else{
         $(".fadeline8").fadeOut();
      }
	  
	       if (percent>33) 
         $(".fadeline9").fadeIn();
      else{
         $(".fadeline9").fadeOut();
      }
	  
	


});
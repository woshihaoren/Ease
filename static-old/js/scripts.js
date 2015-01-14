//Animations on load
$(window).load(function(){
	$(".loading").hide();
	$("nav, .socialmedia").show(0, function(){
	    $(".thumbnailcontainer").each(function(i, obj){
	    	var currentthumb = $(this);
	    	setTimeout(function(){
		    	currentthumb.removeClass("loadanimation");
		    }, 200 + ( i * 200 ));
	    });
    });
});

// functions to make em's=vh(viewport height) if landscape, or vw's(viewport width) if portrait
$(document).ready(function(){
	var selector = $("nav, .socialmedia");
		h = $(window).height()/100,
		w = $(window).width()/100;
	if(w > h) {
		selector.css('font-size',h);
	} 
	else {
		selector.css('font-size',w);
	}
});
$(window).resize(function(){
	var selector = $("nav, .socialmedia")
	var h = $(window).height()/100
	var w = $(window).width()/100
	if(w > h) {
		selector.css('font-size',h);
	} 
	else {
		selector.css('font-size',w);
	}
});

//popup window for about, services and contact
$(document).ready(function(){
	var windows = $(".windows")
	$(".windowopenbutton").click(function(){
		var thiswindow = $(this).data("window");
		if($(thiswindow).is(":hidden") && windows.is(":visible")){ //if other windows are already open close them and open this one
			console.log("first");
			var notthiswindow = $(".openwindow").not("thiswindow");
			//hide other windows
			$(notthiswindow).removeClass("openwindow");
			setTimeout(function(){
				$(notthiswindow).parent(windows).hide();
			},400);
			//open this window
			$(thiswindow).parent(windows).show(0, function() {
				$(thiswindow).addClass("openwindow");
			});
		} else if ($(thiswindow).is(':visible')){ //if this window is already open close it
			$(thiswindow).removeClass("openwindow");
			setTimeout(function(){
				windows.hide();
			},400);
		} else { //otherwise if no windows are open and simply open this window
			$(thiswindow).parent(windows).show(0, function() {
				$(thiswindow).addClass("openwindow");
			});
		}
	})
	
	$(".close").click(function(){
		$(".openwindow").removeClass("openwindow");
		setTimeout(function(){
			windows.hide();
		},400);
	});
});

$(document).ready(function(){
	// for scrollbar to work horizontally instead
	$("html, body").mousewheel(function(event, delta) {
		this.scrollLeft -= (delta * 20);
		event.preventDefault();
	});   
});
//except when on overflowed popout gallery
$(".textbox, .bio").mouseover(function(){
	var mouseover = $(this);
	var childheight = mouseover[0].scrollHeight;
	var parentheight = mouseover.parent().height();
	if(childheight > parentheight){ //overflowing
		mouseover.on('mousewheel', function(event, delta) {
			console.log("scrolling");
			event.preventDefault();
			this.scrollTop -= (delta * 10);
			return false;
		});
	} else{ //not overflowing
		mouseover.off('mousewheel');
	}
});

// popout gallery on thumbnail click
$(document).ready(function(){
	$('.popout').css('display', 'inline-block').hide();//because originally hidden with inline block
	$(".popout .fullimage").hide();//fix for ie display none bug
});

$('.thumbnail').click(function(){
	var clickedthumbnail = $(this);
	var index = $(this).index('.thumbnail');
	var clickedpopout = $(".popout").eq(index);
	$(".popout:eq(" + index + ") .fullimage").show();
	$('.popout').filter(":visible").stop().animate({
		width: 'hide',
		opacity: 'hide'
	}, 400);
	clickedpopout.stop().animate({
		width: 'toggle',
		opacity: 'toggle'
	}, 400, function(){
		var w = $(window).width()
		if(w > 1300){
			$('body').scrollTo( clickedthumbnail, 400);
		} 
		else if(w > 900 && w < 1300){
			$('body').scrollTo( clickedthumbnail, 400, {over:0.5} );
		}
		else {
			$('body').scrollTo( clickedpopout, 400);
		}
	});
});

/* close button for popout gallery */
$('.popoutclose').click(function(){
	$('.popout').filter(':visible').animate({
		width: 'hide',
		opacity: 'hide'
	}, 400);
});


//Mail Functions
$(function(){
	//set global variables and cache DOM elements for reuse later
	var form = $('#contact-form').find('form'),
		formElements = form.find('input[type!="submit"],textarea'),
		formSubmitButton = form.find('[type="submit"]'),
		errorNotice = $('#errors'),
		successNotice = $('#success'),
		loading = $('#loading'),
		errorMessages = {
			required: ' is a required field',
			email: 'You have not entered a valid email address for the field: ',
			minlength: ' must be greater than '
		}
	
	//feature detection + polyfills
	formElements.each(function(){

		//if HTML5 input placeholder attribute is not supported
		if(!Modernizr.input.placeholder){
			var placeholderText = this.getAttribute('placeholder');
			if(placeholderText){
				$(this)
					.addClass('placeholder-text')
					.val(placeholderText)
					.bind('focus',function(){
						if(this.value == placeholderText){
							$(this)
								.val('')
								.removeClass('placeholder-text');
						}
					})
					.bind('blur',function(){
						if(this.value == ''){
							$(this)
								.val(placeholderText)
								.addClass('placeholder-text');
						}
					});
			}
		}
		
		//if HTML5 input autofocus attribute is not supported
		if(!Modernizr.input.autofocus){
			if(this.getAttribute('autofocus')) this.focus();
		}
		
	});
	
	//to ensure compatibility with HTML5 forms, we have to validate the form on submit button click event rather than form submit event. 
	//An invalid html5 form element will not trigger a form submit.
	formSubmitButton.bind('click',function(){
		var formok = true,
			errors = [];
			
		formElements.each(function(){
			var name = this.name,
				nameUC = name.ucfirst(),
				value = this.value,
				placeholderText = this.getAttribute('placeholder'),
				type = this.getAttribute('type'), //get type old school way
				isRequired = this.getAttribute('required'),
				minLength = this.getAttribute('data-minlength');
			
			//if HTML5 formfields are supported			
			if( (this.validity) && !this.validity.valid ){
				formok = false;
				
				console.log(this.validity);
				
				//if there is a value missing
				if(this.validity.valueMissing){
					errors.push(nameUC + errorMessages.required);	
				}
				//if this is an email input and it is not valid
				else if(this.validity.typeMismatch && type == 'email'){
					errors.push(errorMessages.email + nameUC);
				}
				
				this.focus(); //safari does not focus element an invalid element
				return false;
			}
			
			//if this is a required element
			if(isRequired){	
				//if HTML5 input required attribute is not supported
				if(!Modernizr.input.required){
					if(value == placeholderText){
						this.focus();
						formok = false;
						errors.push(nameUC + errorMessages.required);
						return false;
					}
				}
			}

			//if HTML5 input email input is not supported
			if(type == 'email'){ 	
				if(!Modernizr.inputtypes.email){ 
					var emailRegEx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; 
				 	if( !emailRegEx.test(value) ){	
						this.focus();
						formok = false;
						errors.push(errorMessages.email + nameUC);
						return false;
					}
				}
			}
			
			//check minimum lengths
			if(minLength){
				if( value.length < parseInt(minLength) ){
					this.focus();
					formok = false;
					errors.push(nameUC + errorMessages.minlength + minLength + ' charcters');
					return false;
				}
			}
		});
		
		//if form is not valid
		if(!formok){
			
			//animate required field notice
			$('#req-field-desc')
				.stop()
				.animate({
					marginLeft: '+=' + 5
				},150,function(){
					$(this).animate({
						marginLeft: '-=' + 5
					},150);
				});
			
			//show error message 
			showNotice('error',errors);
			
		}
		//if form is valid
		else {
			loading.show();
			$.ajax({
				url: form.attr('action'),
				type: form.attr('method'),
				data: form.serialize(),
				success: function(){
					showNotice('success');
					form.get(0).reset();
					loading.hide();
				}
			});
		}
		
		return false; //this stops submission off the form and also stops browsers showing default error messages
		
	});

	//other misc functions
	function showNotice(type,data)
	{
		if(type == 'error'){
			successNotice.hide();
			errorNotice.find("li[id!='info']").remove();
			for(x in data){
				errorNotice.append('<li>'+data[x]+'</li>');	
			}
			errorNotice.show();
		}
		else {
			errorNotice.hide();
			successNotice.show();	
		}
	}
	
	String.prototype.ucfirst = function() {
		return this.charAt(0).toUpperCase() + this.slice(1);
	}
	
});


function ValidateForm(formid) {
	
	var first_error_validate_input = "";
	
	var result = true;
	var result1 = true;
    $("#"+formid+" .req").each(function (index) {
		   result1 = ValidateInput($(this));
		   
		   if (result1==false && first_error_validate_input == "") 
		   {
			   first_error_validate_input = $(this);
		   }
		   
		   result = result && result1;
    });
	
	var first_error_validate_input2 = "";

    $("#"+formid+" .reqemail").each(function (index) {
        //result = result && ValidateEmail($(this));
		result1 = ValidateEmail($(this));
		
		 if (result1==false && first_error_validate_input2 == "") 
		   {
			   first_error_validate_input2 = $(this);
		   }
		
		result = result && result1;
    });

	if (first_error_validate_input=="" && first_error_validate_input2!="")
	{
		first_error_validate_input = first_error_validate_input2;
	}
	
	
	if (first_error_validate_input!="")
	{
		var tag = $(first_error_validate_input)[0].tagName;
		var name = $(first_error_validate_input).attr("name");
		//jQuery.scrollTo(tag+" [name='"+name+"']");

		var dif = 0;
		if ($(".mobile_header").css("display")=="block")
		{ 
			dif = $(".mobile_header").height();
			//console.log("mobile dif="+dif);
		}
		else 
		{
			
			dif = 60;
			
			if ($(".promo_code_section").css("display")=="block")
				dif+=$(".promo_code_section").height();
		}
		
		var dif = $(first_error_validate_input).offset().top-dif-30;
		if (navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/)) {           
            window.scrollTo(0, dif) // first value for left offset, second value for top offset
		}else{
					$('body').animate({
						scrollTop: dif,
						scrollLeft: 0,
					}, 800, function(){
						$('html,body').clearQueue();
					});
		}
		
		
	}


    return result;

}

//function SetFormInputPositions()

function ValidateInput(obj) {
    if ($(obj).val() == "" || $(obj).attr("emessage")==$(obj).val()) {

		$(obj).addClass("error");
        $(obj).val($(obj).attr("emessage"));

        return false;
    }
    else
	{
		$(obj).removeClass("error");
        return true;
	}
}

function ValidateEmail(obj) {
	
	var myval = $(obj).val();
	myval = myval.trim();
	
    if (!fEmailCheck(myval)) {

        $(obj).val($(obj).attr("emessage"));
        $(obj).addClass("error");

        return false;
    }
    else
        return true;
}

var fEmailCheck = function(str) {
    return (/^([a-z0-9_\-]+\.)*[a-z0-9_\-]+@([a-z0-9][a-z0-9\-]*[a-z0-9]\.)+[a-z]{2,4}$/i).test(str);
}

function ValidationFocusAndLBind() {

	$(document).on("focus",".req, .reqemail",function() {
	
	
        if ($(this).val()==$(this).attr("emessage"))
        {
            $(this).val("");
            $(this).removeClass("error");
        }

    });
	
	$(document).on("focusout",".req, .reqemail",function() {
 
	   if ($(this).val()==$(this).attr("emessage"))
        {
            $(this).val("");
            $(this).removeClass("error");
        }

    });
}

ValidationFocusAndLBind();

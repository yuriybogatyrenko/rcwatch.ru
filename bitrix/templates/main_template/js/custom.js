$(document).ready(function(){
	// $('head').append('<script src="http://q.gamm.biz/pp/PP.js"></script>');
	var mhp = $(".main_header_content").offset().top,
		mhh = $(".main_header_content").outerHeight();
		
	$(document).on('click', '[data-callPopup]', function(e){
		var pop = $($(this).attr('data-callPopup'));

		pop.fadeIn(300);
		e.preventDefault()
	})

	$(document).on("click", "[data-popup_open]", function(e){
		var this_data = $(this).data("popup_open"),
		 	delay = 400;

		// $(".header_standard_popup").stop().slideUp(delay);
		$(".header_standard_popup").css('display', "none")
		// $("[data-popup="+this_data+"]").stop().slideToggle(delay);
		

		
		if ($(this).hasClass("active")) {
			$(".main_header").removeClass("popup_open");
			$("body").removeClass("ovh");
			// setTimeout(function(){
				$(".main_section_header_item").removeClass("active");
			// },delay);
		} else {
			$(".main_section_header_item").removeClass("active");
			$(this).addClass("active");
			$(".main_header").addClass("popup_open");
			$("body").addClass("ovh");
			$("[data-popup="+this_data+"]").css({display: 'block'});
		}
		e.preventDefault();
	});
	
	setTimeout(function(){
		header_position();
		abs_footer();
	},500)

	function abs_footer() {
		$('.main_wrapper').css({paddingBottom: $('.main_footer').outerHeight()})
	}
		
	//	?????????????????
	function header_position() {
		
		/*if($('.main_wrapper').hasClass('inside_page'))
			return
		var header_width = $(".main_section_header").outerWidth(),
			header_ml = header_width/2;
		
		//$(".main_section_header").css("margin-right", -header_ml);
		*/
	}
	

	$(document).on("click", ".promo_code_section .close", function(e){
		var h = $('.promo_code_section').outerHeight();
		if($('.main_wrapper').hasClass('inside_page')) {
			$('.main_header').animate({paddingTop: 0}, 300, function(){$("body").addClass("nopromo");});
		} else {
			var pt = parseInt($('.main_header .logo_section').css("padding-top"));
			$('.main_header .logo_section').animate({paddingTop: pt-h}, 300, function(){$("body").addClass("nopromo");});
		}
		$(".promo_code_section").slideUp(300);
		setTimeout(function(){
			mhp = mhp - h,
			mhh = $(".main_header_content").outerHeight();
		},600, function(){$("body").addClass("nopromo");});
		
		setCookie("dontShowPropmo",true);
	});

	//закрываем промо на мобильной версии
	$(document).on("click", ".close_m", function(e){
		$('.red_promo').animate({marginTop: -64}, 300, function(){$("body").addClass("nopromo");});
		setCookie("dontShowPropmo",true);
	});
	


	$(document).on("click", ".header_popup_close", function(e){
		var delay = 400;
		// $(this).closest(".header_standard_popup").stop().slideUp(delay);
		$(this).closest(".header_standard_popup").css({display: 'none'});
		$(".main_header").toggleClass("popup_open");
		$("body").toggleClass("ovh");
		// setTimeout(function(){
			$(".main_section_header_item").removeClass("active");
		// },delay);
		e.preventDefault();
	});

	$(document).on("click", ".accordion_toggle", function(e){
		
		var fname = $(this).data("fname");
				
		var delay = 400,
			ac_toggle = $(this),
			ac_item = $(this).closest(".accordion_item");
			
		ac_toggle.closest(".accordion_item").find(".accordion_content").stop().slideToggle(delay, function() {initMinFilterHeight();});
		
		if (ac_item.hasClass("open")) {
			setTimeout(function(){
				ac_item.removeClass("open");
				setCookie(fname,"");
				
			},delay);
		} else {
			ac_item.addClass("open");
			setCookie(fname,"Y");

		}
		e.preventDefault();
		
		
	});

	
	
	
	
	$(document).on("click", ".product_grid_content .toggle_visibility", function(e){
		
		if ($(".product_grid_content").hasClass("filter_hidden")) {
			$(".product_grid_content").addClass("animation");
			$(".product_grid_content").addClass("opening");
			setTimeout(function(){
				$(".product_grid_content").removeClass("filter_hidden");
				$(".product_grid_content").removeClass("animation");
				initMinFilterHeight();
			},500);
		} else {
			$(".product_grid_content").removeClass("opening");
			$(".product_grid_content").addClass("animation");
			setTimeout(function(){
				$(".product_grid_content").removeClass("animation");
				$(".product_grid_content").addClass("filter_hidden");
				initMinFilterHeight();
				
			},500);
		}
		
		e.preventDefault();
	});

	if($('input[data-inputmask]').length > 0) {
		/*$('input[data-inputmask]').mask("+7 999 999 99 99");*/
	}

	$(document).on("click", ".news_item_to_read ", function(e){
		//$(".article_popup").fadeIn(400);
		e.preventDefault();
		
		var newsid = $(this).data("newsid");
		
		$(".article_popup" ).load("/ru/handlers/news_detail.php?newsid="+newsid, function() { $(".article_popup").fadeIn(400);	});
		
	});
	
	$(document).on("click", ".pop_news", function(e){
		var newsid = $(this).data("newsid");
		$(".article_popup" ).load("/ru/handlers/news_detail.php?newsid="+newsid, function() { 	});
		
	});
	
	
	

	$(document).on("click", ".standard_popup .close, .standard_popup .overlay_popup", function(e){
		$(".standard_popup").fadeOut(400);
		e.preventDefault();
	});

	$(document).on("click", ".search_section_close", function(e){
		$(".main_header_content .search_section_wrap").fadeOut(400);
		$('.main_header').removeClass('search_opened');
		e.preventDefault();
	});

	$(document).on("click", ".search_open", function(e){
		$(".search_section_wrap").fadeIn(400);
		$('.search_section_wrap input').focus();
		$('.main_header').addClass('search_opened');
		search_plate_pos();
		e.preventDefault();
	});
	var search_plate_timeout;
	function search_plate_pos() {
		var h_a_w_pos = $(".header_absolute_wrapper").offset().left,
			s_o_pos = $('.search_open').find(".icon").offset().left,
			paddin_left = s_o_pos - h_a_w_pos;
		

			$(".search_section_wrap").find(".search_button").css( "margin-left", paddin_left );

			setTimeout(function(){
				$(".search_section_wrap").find(".search_button").animate({"margin-left": 0});
			}, 300);
	}



	function header_determination() {
		if ((!$(".main_wrapper").hasClass("min_header")) && ($(window).scrollTop() > mhp)){
            if($('.main_wrapper').hasClass('inside_page')) {
            	$(".main_wrapper").addClass("min_header").find('.main_header').css("padding-bottom", mhh );
            } else {
            	$(".main_wrapper").addClass("min_header").find('.index_header').css("padding-bottom", mhh );
            }

        } else if (($(".main_wrapper").hasClass("min_header")) && ($(window).scrollTop() < mhp)) {
            $(".main_wrapper").removeClass("min_header").css("padding-top", 0);
            if($('.main_wrapper').hasClass('inside_page'))
            	$('.main_header').css("padding-bottom", 0 );
            else
            	$(".main_wrapper").find('.index_header').css("padding-bottom", 0 );
        }

        // console.log(mhh)
        // console.log(mhp)
		
	}
	header_determination();
	$(document).scroll(function(){
       header_determination();
    });


	$(".product_calculator .calc_btn").click(function(){
		var need_block = $(this).closest(".product_calculator").find(".result");
			text_num = need_block.text(),
			num = parseInt(text_num);
		if ($(this).hasClass("minus") && !(need_block.hasClass("negative")) && (text_num < 1)){
			return false;
			
		} else if ($(this).hasClass("minus")){
			num = num - 1;
		} else if ($(this).hasClass("plus")){
			num = num + 1;	
		}
		need_block.text(num);	
	});

	$(window).resize(function(){
		header_position();
		abs_footer();
	})

 });

if (ifBrowser("safari") == true) {
	$("body").addClass("safari_browser");
}

function ifBrowser (obj) {
	var none = obj["none"] || "none";
	
	function cBrowser() {
		var ua = navigator.userAgent;
		
		var bName = function () {
			if (ua.search(/MSIE/) > -1) return "ie";
			if (ua.search(/Firefox/) > -1) return "firefox";
			if (ua.search(/Opera/) > -1) return "opera";
			if (ua.search(/Chrome/) > -1) return "chrome";
			if (ua.search(/Safari/) > -1) return "safari";
			if (ua.search(/Konqueror/) > -1) return "konqueror";
			if (ua.search(/Iceweasel/) > -1) return "iceweasel";
			if (ua.search(/SeaMonkey/) > -1) return "seamonkey";}();
		var version = function (bName) {
			switch (bName) {
				case "ie" : return (ua.split("MSIE ")[1]).split(";")[0];break;
				case "firefox" : return ua.split("Firefox/")[1];break;
				case "opera" : return ua.split("Version/")[1];break;
				case "chrome" : return (ua.split("Chrome/")[1]).split(" ")[0];break;
				case "safari" : return (ua.split("Version/")[1]).split(" ")[0];break;
				case "konqueror" : return (ua.split("KHTML/")[1]).split(" ")[0];break;
				case "iceweasel" : return (ua.split("Iceweasel/")[1]).split(" ")[0];break;
				case "seamonkey" : return ua.split("SeaMonkey/")[1];break;
			}}(bName);
		return bName;
		//return [bName,bName + version.split(".")[0],bName + version]
		
	}

	var current_browser = cBrowser();
	for (var key in obj) {
		var trg = key.toLowerCase();
		if (trg.indexOf(current_browser[2]) > -1) return obj[key];
		else if (trg.indexOf(current_browser[1]) > -1) return obj[key];
		else {
			var nsymbol = trg.charAt(trg.indexOf(current_browser[0])+current_browser[0].length);
			if (trg.indexOf(current_browser[0]) > -1 && (nsymbol == " " || nsymbol == "")) return obj[key];
		};
	}

	if (cBrowser() == obj) {
		return true;
	} else {
		return false;
	}

	// return none;
}

var BrowserDetect = {
	init: function() {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]
};


BrowserDetect.init();

/*if (BrowserDetect.subString == "Firefox") {
	$("body").addClass('windows_os');
} else if (BrowserDetect.versionSearchString == "Windows") {

}*/


function BeginCountDown(dtime)
{
	if($('#countdown1').length > 0) {

		var note = $('#countdown1'),
		ts = dtime;
		

	//	console.log('year='+ts.getFullYear()+' month='+ts.getMonth()+' day='+ts.getDate()+' hour = '+ts.getHours()+' min='+ts.getMinutes()+' sec='+ts.getSeconds());
			
		$('#countdown').countdown({
			timestamp	: ts,
			callback	: function(days, hours, minutes, seconds){
				
				//console.log("update days="+days+" hours="+hours+" minutes="+minutes+" seconds="+seconds);
				var message = "<div class='wrap'>";
				
				message += "<div class='item'><span class='time_num'>" + days+ "<span class='time_text'>"+d_name+"</span></span> <span class='sep'>:</span></div>";
				if(hours < 10) hours = '0' + hours;
				message += "<div class='item'><span class='time_num'>" + hours+ "<span class='time_text'>"+h_name+"</span></span> <span class='sep'>:</span></div>";
				if(minutes < 10) minutes = '0' + minutes;
				message += "<div class='item'><span class='time_num'>" + minutes + "<span class='time_text'>"+m_name+"</span></span><span class='sep'>:</span></div>";
				if(seconds < 10) seconds = '0' + seconds;
				message += "<div class='item'><span class='time_num'>" + seconds + "<span class='time_text'>"+s_name+"</span></span></div>";
				message += '</div>';
				note.html(message);			}
		});
	}
}

function initMinFilterHeight()
{
	var total_height = 0;

	if ($(".product_grid_content:not(.filter_hidden)").length>0 && is_mobile==false)
	{
		total_height += $(".filter_section").height();
		//console.log("total_height="+total_height);
		
		if ($(".product_grid_content").length>0)
			$(".product_grid_content").css("min-height", total_height);
	}
	else 
	{
		if ($(".product_grid_content").length>0)
			$(".product_grid_content").css("min-height", "auto");
		
		//console.log("Убираем минимальную высоту");
	}
	
}


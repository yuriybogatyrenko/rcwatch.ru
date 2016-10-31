var dontSubmit = false;
var clickDate = new Date();
var mobileWidth = 500;
var is_mobile = ($(window).width()<=mobileWidth);			 


jQuery(document).ready(function( $ ) {
	
	var is_mobile = ($(window).width()<=mobileWidth);
	_init_viewport();
	
	_init_red_header();
	_init_search();
	_init_mobile_menu();
	_init_sorting_change();
	_init_actions();
	_init_modals();

	_main_page_change_blocks();

	_init_filter_for_mobile();
	_init_language_select_and_personal();

	filter_group_count();
	
	_init_retina_images();
	_init_remember_form();
	
	
	
	if ($(".advantages_slider").length>0) 
	{
		$(".advantages_slider").owlCarousel({
			items : 1,
			itemsCustom : false,
			itemsDesktop : [1199,1],
			itemsDesktopSmall : [900,1],
			itemsTablet: [700,1],
			pagination: true,
			stopOnHover : true,
			navigation: false,
			paginationSpeed : 1000,
			goToFirstSpeed : 1000,
			autoHeight : false,
			autoPlay: false /*true*/
		});
	}
	
	/*main slider img patch*/
	if (is_mobile)
	{
		var w = $(window).width();
		{
			var mrgn = (500-w)/2;
			$(".slide_img img").css("margin-left", "-"+mrgn+"px");
		}
		
	}
	
	
	//temp

	var top_icons_menu = $("#temp").html();
	$("#temp").html("");
	var main_desktop_menu = $("#mobile-menu2").html();
	
	
	var menu = '<li id="mn0"><a class="fmobmenu" href="/ru/catalog/45/">МУЖСКИЕ</a></li>'+
	'<li id="mn1"><a class="fmobmenu" href="/ru/catalog/44/">ЖЕНСКИЕ</a></li>'+
	'<li id="mn2"><a class="fmobmenu" href="/ru/catalog/sale/" style="color:#ff3b28;">SALE</a></li>'+
	'<li id="mnnew"><a class="fmobmenu" href="/"+lang_prefix+"/catalog/new/">New</a></li>'+
	'<li id="mn3"><a class="fmobmenu" href="/ru/catalog/">КОЛЛЕКЦИИ</a></li>'+
	'<li id="mn4"><a class="fmobmenu2" href="/ru/customers/">ДОСТАВКА И ОПЛАТА</a>'+
		'<ul class="submenu_mobile">'+
			'<li><a href="/ru/customers/">Доставка</a></li>'+
			'<li><a href="/ru/customers/">Бесплатная доставка</a></li>'+
			'<li><a href="/ru/customers/24/">Гарантия 24 месяца</a></li>'+
			'<li><a href="/ru/customers/payment/">Оплата</a></li>'+
			'<li><a href="/ru/customers/faq/">FAQ</a></li>'+
		'</ul></li>'+
	'</li>'+
	'<li id="mn5"><a class="fmobmenu2" href="/ru/royalcrown/">ROYAL CROWN</a>'+
		'<ul class=\"submenu_mobile\">'+
		'<li><a href="/ru/royalcrown/">История бренда</a></li>'+
		'<li><a href="/ru/royalcrown/contacts/">Контакты</a></li>'+
		'<li><a href="/ru/royalcrown/news/">Новости</a></li>'+
		'</ul>'+
	'</li>';
			
		
			
	$("#mobile-menu ul").append(menu);
	
	
	
		
	$("#mobile-menu").mmenu({
		navbar 		: false,
		slidingSubmenus: false
		 // options
	  }, {
		 // configuration
		 offCanvas: {
			pageNodetype: "div#page",
			menuInjectMethod: "append",
			hardwareAcceleration: false
		 },
		 clone: false
	  });
	  
	  
	   var search_header = "<div class=\"search_header\" id=\"search_header_mobile\">"+
						"<div class=\"white_search width_wrapper\">"+
							"<div class=\"padding_wrapper\">"+
								"<form id=\"articul_search_form_mobile\" action=\"/"+lang_prefix+"/catalog/search/\" method=\"get\">"+
								"<span class=\"search_me_white\" id=\"submit_mobile_search\"></span>"+
								"<input type=\"text\" id=\"top_search_input_mobile\" name=\"txt\" placeholder=\"Поиск по артикулу\">"+
								"<a class=\"close_search\" id=\"close_search\" href=\"#\"></a>"+
								"</form>"+
							"</div>"+
						"</div>"+
					"</div>";
			 
			  //если пользователь авторизован!
			  			  //пользователь НЕ авторизован! href=\"/modals/lk.php"
	var VarName = "<div id='mobile_slider_menu'>"+search_header+"</div>";
			  
	$('.mm-panel.mm-opened.mm-current').prepend(top_icons_menu);
	$('.mm-panel.mm-opened.mm-current').prepend(VarName);
	
	
	
	/*раскрываем нужные элементы моибльного меню*/
	setTimeout(function(){
		
		$(".mm-listview.mm-vertical li[id]").each(function(){
			var id = $(this).attr("id");
			
			//console.log(id+" "+getCookie(id));
			
			if (getCookie(id)=="true")
			{
				//console.log("пробуем раскрыть");
				$(this).addClass("mm-opened");
			}
			
		});
		
	}, 500);
	
	
	
	
	
	
	function _init_remember_form()
	{
		
		$(document).on("blur",".remember",function(event) {

			console.log($(this).data("cookiename")+"->"+$(this).val());
			setCookie($(this).data("cookiename"),$(this).val());
		});

		//$(document).on("click",".mm-next",function(event) {
			
		$(document).on("click",".mm-next",function(event) {
			var id = $(this).parent().attr("id");
			
			if ($(this).parent().find(".mm-panel.mm-vertical").length > 0)
			{
				if (getCookie(id)=="")
				{
					setCookie(id, "true");
					//console.log(id+" true");
				}
				else
				{
					setCookie(id, "");
					//console.log(id+" ");
				}
			}
		});
		
		$(document).on("click",".fmobmenu",function(event) {
			var id = $(this).parent().attr("id");
			
			$(".mm-next").each(function(){
				
				var id = $(this).parent().attr("id");
				setCookie(id,"");
				//alert("id="+id);
				
				
			});
			
		});

		
		
		
		
					
		
		
	}
	
	function _init_viewport()
	{
		/*
		var winW,
			initVP,
			newVP = "width=768";

		$(document).on({
			ready: function(){
				winW = $(window).width();
				console.log(winW);
			}
		});

		$(window).on({
			load: function(){
				if ( winW < 980 && winW > 500 ) { setViewport( newVP ); }
			}
		});

		function setViewport( content ) {
			//$('meta[name=viewport]').attr('content',content);
		}
		
		*/
	}
	
	
	function _init_retina_images()
	{
		if (isRetina())
		{
			$("[data-retinabg]").each(function(){
				$(this).css('background-image', 'url(' + $(this).data("retinabg") + ')');
			});
			
			$("img[data-retina]").each(function(){
				$(this).attr('src', $(this).data("retina"));
			});
		}
		//else 
			//alert("не ретина!");
	}
	
	function isRetina()
	{
		//return false;
		var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
						  (min--moz-device-pixel-ratio: 1.5),\
						  (-o-min-device-pixel-ratio: 3/2),\
						  (min-resolution: 1.5dppx)";

		if (window.devicePixelRatio > 1)
		  return true;

		if (window.matchMedia && window.matchMedia(mediaQuery).matches)
		  return true;

		return false;
	}
	
	function _init_sorting_change()
	{
		/*сотрировка каталога для desktop версии*/
		$(document).on("change","#sort_change_select",function(event) {
			
			var refresh_url = $("#refresh_url").val();
			
			$(".products_grid_section" ).load(refresh_url+"?ajax=Y&sort="+$(this).val(), function() {});
			
		});
			
		/*сотрировка для мобильной версии*/
		$(document).on("click",".sort_link",function(event) {
			event.preventDefault();
			
			var refresh_url = $("#refresh_url").val();
			
			$(".products_grid_section" ).load(refresh_url+"?ajax=Y&sort="+$(this).data("val"), function() {});
			
			$(".mobile_sort_section .sort_link").removeClass("selected");
			$(this).addClass("selected");
		});
		
		/*сотрировка каталога для desktop версии*/
		$(document).on("change","#news_filter_select",function(event) {
			
			var refresh_url = $("#refresh_url").val();
			$("#news_container" ).load(refresh_url+"?ajax=Y&filter="+$(this).val(), function() {});
			
		});
		
		
		
	}
		
	function _init_filter_for_mobile()
	{
		//filter_arrow_block
		
		//прячем фильтр
		$(document).on("click",".close_search",function(event) {
			event.preventDefault();
			
			$(".filter_section").animate({left: "-268px"}, 500, function() {});
			
		});
		
		
		//показываем фильтр
		$(document).on("click",".show_filter",function(event) {
			event.preventDefault();
			
			$(".filter_section").animate({left: "0px"}, 500, function() {});
			$(".mobile_sort_section").animate({right: "-268px"}, 500, function() {});
		});

		//прячем сортировку
		$(document).on("click",".close_sort",function(event) {
			event.preventDefault();
			$(".mobile_sort_section").animate({right: "-268px"}, 500, function() {});
		});
		
		//показываем сортировку
		$(document).on("click",".mobile_sorting",function(event) {
			event.preventDefault();
			$(".mobile_sort_section").animate({right: "0px"}, 500, function() {});
			$(".filter_section").animate({left: "-268px"}, 500, function() {});
		});
		
		//прячем фильтр по годам для списка заказов
		$(document).on("click",".close_alltime_filter",function(event) {
			event.preventDefault();
			$(".mobile_alltime_filter").animate({left: "-275px"}, 500, function() {$(".mobile_alltime_filter").css("display","none");});
		});
		
		//показываем фильтр по годам для списка заказов
		$(document).on("click","#all_time_link",function(event) {
			event.preventDefault();
			
			$(".mobile_alltime_filter").css("display","block");
			
			$(".mobile_alltime_filter").animate({left: "-6px"}, 500, function() { });
		});
		
		
		
		
		$(document).on("change",".filter_section .wrap_checkbox input[type='checkbox']",function(event) {
			//event.preventDefault();
			
			var name = $(this).attr("name");
			
			/*для цены может быть выбрано только одно значение*/
			$(".wrap_checkbox input[type='checkbox'].for_price").each(function(){
				var name2 = $(this).attr("name");
				
				if (name!=name2)
				{
					$(this)[0].checked = false;
					setCookie(name2,"");
				}
			});
			

			if ($(this)[0].checked)
				setCookie(name,"Y");
			else
				setCookie(name,"");
			
			clickDate = new Date();
			if (dontSubmit==false)
				setTimeout('DelaySubmit();', 1000);
			
			filter_group_count();
			
		});
		
		
		$(document).on("click","#reset_filter_button",function(event) {
			
			
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
			
			
			/*event.preventDefault();
		
			
			$(".filter_section input.hidden_checkbox").each(function(){
				
				var name2 = $(this).attr("name");
				
				if ($(this)[0].checked == true)
				{
					//$(this)[0].checked = false;
					//setCookie(name2,"");
					
					$(this)[0].checked = false;
					$(this).trigger("change");
					
					console.log("Убираем чекбокс "+name2);
				}
				
			});
			
			filter_group_count();
			*/
		});
		
		
		
	}

		

	function _init_actions()
	{
		//login_submit
		$(document).on("click","#login_submit",function(event) {
			event.preventDefault();
		
			if (ValidateForm("login_form"))
			{
			
				$.ajax({
					type: "post",
					url: '/ru/handlers/actions.php?action=auth',
					data: jQuery("#login_form").serialize(), 
					dataType: "json",
					success: function (data) {

					if(data.status)
						//location.reload();
						document.location.href = "/"+lang_prefix+"/history/";
					else
						$("#status_form").html(data.message);
					
						setTimeout(function(){ $("#status_form").html(""); }, 7000);
						
					},
					error: function(){
						alert("Ошибка!");
					}
				});
				
			}
			
			
		});
		
		//login_submit2 desktop
		$(document).on("click","#login_submit2",function(event) {
			event.preventDefault();
		
			if (ValidateForm("login_form2"))
			{
				//alert("АВТОРИЗАЦИЯ");
				//TODO
				
				$.ajax({
					type: "post",
					url: '/ru/handlers/actions.php?action=auth',
					data: jQuery("#login_form2").serialize(), 
					dataType: "json",
					success: function (data) {
						
					if(data.status)
						document.location.href = "/"+lang_prefix+"/history/";
					else
						$("#status_form2").html(data.message);
						setTimeout(function(){$("#status_form2").html("");}, 7000);
						
					},
					error: function(){
						alert("Ошибка!");
					}
				});
				
			}
			
			
		});
		
		//login_submit2 desktop
		$(document).on("click","#forget_submit",function(event) {
			event.preventDefault();
		
			if (ValidateForm("forget_form"))
			{
				
				$.ajax({
					type: "post",
					url: '/'+lang_prefix+'/handlers/actions.php?action=recovery',
					data: jQuery("#forget_form").serialize(), 
					dataType: "json",
					success: function (data) {
						
					if(data.status)
					{
						$("#forget_form input").val("");
						$("#status_forget").html(data.message);
						setTimeout(function(){$("#status_forget").html(""); 
							document.location.href = '/'+lang_prefix+'/personal/';
						}, 7000);
					}
					else
						$("#status_forget").html(data.message);
						setTimeout(function(){$("#status_forget").html("");}, 7000);
						
					},
					error: function(){
						alert("Ошибка!");
					}
				});
				
			}
			
			
		});
		
		
		
		//save personal data
		$(document).on("click","#save_personal",function(event) {
			event.preventDefault();
		
			if (ValidateForm("personal_form"))
			{
				$.ajax({
					type: "post",
					url: '/ru/handlers/actions.php?action=change-profile',
					data: jQuery("#personal_form").serialize(), 
					dataType: "json",
					success: function (data) {

					if(data.status)
						location.reload();
					else
						$("#status_form2").html(data.message);
						setTimeout(function(){$("#status_form2").html("");}, 7000);
					},
					error: function(){
						alert("Ошибка!");
					}
				});
			}
		});
		
		//смена пароля
		$(document).on("click","#save_new_password",function(event) {
			event.preventDefault();
		
			if (ValidateForm("password_form"))
			{
				$.ajax({
					type: "post",
					url: '/ru/handlers/actions.php?action=change-password',
					data: jQuery("#password_form").serialize(), 
					dataType: "json",
					success: function (data) {

						if(data.status)
						{
							$("#status_form2").html(data.message);
							setTimeout( function(){ location.reload();}, 7000);
						}
						else
						{
							$("#status_form2").html(data.message);
							setTimeout(function(){$("#status_form2").html("");}, 7000);
						}
						
					},
					error: function(){
						alert("Ошибка!");
					}
				});
			}
		});
		
		//contact page form
		$(document).on("click","#send_contact_form",function(event) {
			event.preventDefault();
		
			if (ValidateForm("contact_form"))
			{
				$.ajax({
					type: "post",
					url: '/ru/handlers/actions.php?action=contact',
					data: jQuery("#contact_form").serialize(), 
					dataType: "json",
					success: function (data) {
						if(data.status){
							$("#contact_form").css("display", "none");
							$("#contact_status").text(data.message);
							setTimeout(function(){$("#contact_status").css("display", "none");},7000);
							//location.reload();
						}
						else {
							$("#contact_status").html(data.message);
						}
					},
					error: function(){
						alert("Ошибка!");
					}
				});
			}
		});
		
		//FAQ page form
		$(document).on("click","#send_faq_form",function(event) {
			event.preventDefault();
		
			if (ValidateForm("faq_form"))
			{
				$.ajax({
					type: "post",
					url: '/ru/handlers/actions.php?action=faq',
					data: jQuery("#faq_form").serialize(), 
					dataType: "json",
					success: function (data) {
						if(data.status){
							$("#faq_form").css("display", "none");
							$("#faq_status").text(data.message);
							setTimeout(function(){$("#faq_status").css("display", "none");},7000);
							//location.reload();
						}
						else {
							$("#faq_status").html(data.message);
						}
					},
					error: function(){
						alert("Ошибка!");
					}
				});
			}
		});
		
		
		
		
		//закрываем корзину
		
		$(document).on("click","#continue_shoping",function(event) {
			event.preventDefault();
			
			//$("#basket_close_link").trigger("click");
			
			history.back(); 
			
			return false;
			
		});
		
		
		
		
		//применяем купон со скидкой
		$(document).on("click","#apply_cupon",function(event) {
			event.preventDefault();

			var code = $("#cupon_discount").val();
			
			console.log("применяем купон на скдику! "+code);
			
			if (code!="")
			{
				
				
				$.ajax({
					type: "post",
					url: '/ru/handlers/actions.php?action=set-kupon',
					data: ({kuponcode : code}), 
					dataType: "json",
					success: function (data) {
						if(data.status){
							console.log("KUPON OK "+data.info);
							$("#cupon_discount").addClass("green");
							loadBasketItems();
						}
						else {
							//$("#faq_status").html(data.message);
							console.log("KUPON FAIL");
						}
					},
					error: function(){
						alert("Ошибка!");
					}
				});
				
				
				
				
			}
			
		});
		
		
		
		
	}

		
			
	/*выпадашки для мобильной версии*/
	function _init_mobile_menu()
	{
		$(document).on("click",".sm2",function(event) {
			event.preventDefault();
			
			//$(this).css("background-color", "#00ff00");
		});
		
		
		$("#for_mobile_menu").click(function(){
			if ($("#mobile-menu.mm-opened").length)
			{
				$("#mm-blocker").trigger('touchstart');
			}
		});
		
		
		$(document).on("click", "[data-popup_open_mobile]", function(e){
			var this_data = $(this).data("popup_open_mobile"),
				delay = 400;

			$(".common_popup").css('display', "none");
			
			if ($(this).hasClass("active")) {
				$(this).removeClass("active");
			} else {
				$(".small_menu a").removeClass("active");
				$(this).addClass("active");
				$("[data-popup_mobile="+this_data+"]").css({display: 'block'});
			}
			e.preventDefault();
		});
		
		
		
	}

	function _init_search()
	{
		$(document).on("click",".sm1",function(event) {
			event.preventDefault();
			event.stopPropagation();
			
			$("#search_header_mobile")
					.animate({top:65}, 550, "easeOutBounce", function() {
					//.animate({top:64}, 300, function() {
			});
		});
		
		$(document).on("click","#close_search",function(event) {
			event.preventDefault();
			event.stopPropagation();
			
			$("#search_header_mobile")
					.animate({top:0}, 550, "easeInSine", function() {
					//.animate({top:64}, 300, function() {
			});
		});
	}			  
			 
	function _init_red_header()
	{
		if ($(".discount_text").length)
		{
			//console.log("->"+$(".discount_text").html());
			$(".red_promo").prepend("<span class=\"red_discount_text\">"/*+$(".discount_text").html()+"<br/>"*/+$(".promo_code_text").html()+"</div>");
		}

		header_determination_mobile();
		$(document).scroll(function(){
		   header_determination_mobile();
		});

	}

	var is_header_animate = false;
	function header_determination_mobile() {
		var red_height = 66;

		if ($("body").hasClass("nopromo"))
		{
			//нет красной шапки
		}
		else 
		{
			//console.log("propo EXIST");
		
			if (is_mobile && ($(window).scrollTop() > red_height) && !is_header_animate && !$('.mobile_header .red_promo').hasClass("hdn")){
				is_header_animate = true;
				$('.mobile_header .red_promo').animate({marginTop: "-66px"}, 300, function() { is_header_animate = false; $('.mobile_header .red_promo').addClass("hdn");});           
				//$("#page").css("padding-top","64px");
				
			} else if (is_mobile && ($(window).scrollTop() <= red_height) && !is_header_animate && $('.mobile_header .red_promo').hasClass("hdn")) {
				is_header_animate = true;
				$('.mobile_header .red_promo').animate({marginTop: "0px"}, 300, function() { is_header_animate = false; $('.mobile_header .red_promo').removeClass("hdn");});           
				$("#page").css("padding-top","129px");
			}
		}
		
	}

	function _init_language_select_and_personal()
	{
		$(document).on("click",".sm2, .sm3",function(event) {	
			var mnapi = $("#mobile-menu").data("mmenu");
			mnapi.closeAllPanels();
		});

	}
	
	
	/*перестановка блоков на главной странице*/
	function _main_page_change_blocks()
	{
		console.log("is_mobile="+is_mobile);
		if (!is_mobile) return true;
		
		if ($("#dostavka_slider").length>0)
		{
			$("#head_helper").append("<div class=\"prop_bl\">"+$("#dostavka_slider").html()+"</div>");
			$("#dostavka_slider").remove();
		}
		
		
		if ($(".index_grid_item.grid_section3.w25percent").length >0 ) {
		
			var html = $(".index_grid_item.grid_section3.w25percent").html();
			$("#foot_helper").append(html);
		}
		
		
		if ($("#last_watch").length >0 ) {
			$("#foot_helper").append($("#last_watch").html());
		}
		
		
		if ($(".prop_bl.index_grid_video").length>0)
		{
			$("#foot_helper").append($(".prop_bl.index_grid_video").clone()).html();
		}
		
		if ($("#two_news").length>0)
		{
			$("#foot_helper").append($("#two_news").html());
		}
		
		
		
		/*карточка товара*/
		
		
		if ($("#product-image-1").length>0)
		{
			//$(".product_page_article").after("<div class=\"detail_image_wrapper mobile\">"+$("#product-image-1").html()+"</div>");
			$(".product_page_article").after("<div class=\"detail_image_wrapper mobile\"></div>");
			
			$(".product-medias .tab-content .tab-pane").each(function(){
				$(".detail_image_wrapper").append($(this).html());
			});
			
			if ($(".product-medias .tab-content .tab-pane").length>1)
			{
				$('.detail_image_wrapper').owlCarousel({
					items : 3,
					itemsDesktop : [1199,3],
					itemsDesktopSmall : [900,3],
					itemsTablet: [700,3],
					itemsCustom : false,
					pagination: true,
					stopOnHover : true,
					navigation: false,
					paginationSpeed : 1000,
					goToFirstSpeed : 1000,
					autoHeight : false,
					autoPlay: false
				});
			}
			
			//$("#two_news").remove();
		}
		
		$('.advantages_block').owlCarousel({
				items : 3,
				itemsDesktop : [1199,3],
				itemsDesktopSmall : [900,3],
				itemsTablet: [700,3],
				itemsCustom : false,
				pagination: true,
				stopOnHover : true,
				navigation: false,
				paginationSpeed : 1000,
				goToFirstSpeed : 1000,
				autoHeight : false,
				autoPlay: false
			});

		
		
		
		
		if ($(".product_page_descr").length>0)
		{
			$(".product_page_descr").attr("todel","ok");
			$(".product_page_postscript_button").after("<div class=\"product_page_descr mobile\">"+$(".product_page_descr").html()+"</div>");
			$(".product_page_descr[todel=ok]").remove();
		}
		
		if ($(".advantages_block").length>0)
		{
			
			$(".advantages_block").after($(".product_page_postscript_button").clone());
			$(".advantages_block").after($(".product_page_buy_btn").clone());
			
		}

		
		
	}
	


	initSelectBox();
		
		 
});


function DelaySubmit()
{
	var now = new Date();
	var mseconds_left = Math.floor(now.getTime() - clickDate.getTime()) / 1;
	console.log("прошло секунд с прошлого клика"+mseconds_left);
	
	if (mseconds_left>=1000 && dontSubmit==false)
	{
		dontSubmit=true;
		
		console.log("сабмитим!");
		
		
		var fields = $("#filter_form").serializeArray();
		fields["d"]=get_rand();
		fields["sort"] = $("#sort_change_select").val(); //берем сортировку

		var str = $.param(fields);
		var refresh_url = $("#refresh_url").val();
		
		
		$(".products_grid_section" ).load(refresh_url+"?ajax=Y&"+str, function() {console.log('загрузили!'); dontSubmit=false;});
		//setTimeout('console.log("загрузили"); dontSubmit=false;', 1000);
		
	}
	
}

function get_rand(){
  var d = new Date();
  return d.getTime();
}

function initSelectBox()
{
	if ($("select").length > 0 ){
		$('select:not(.chosen-select)').selectbox();
	}
}


function filter_group_count()
{
	$(".filter_section .list_filters_item.accordion_item").each(function() {

		var len = $(this).find("input.hidden_checkbox:checked").length;
		var txt = $(this).children(".list_filters_item_title").text();
		
		if ($(this).children(".list_filters_item_title")[0].hasAttribute("data-otext")==false)
			$(this).children(".list_filters_item_title").attr("data-otext", txt);
		
		txt = $(this).children(".list_filters_item_title").data("otext");
		
		if (len>0)
		{
			$(this).children(".list_filters_item_title").addClass("whiteme");
			$(this).children(".list_filters_item_title").text(txt+" ("+len+")");
		}
		else
		{			
			$(this).children(".list_filters_item_title").removeClass("whiteme");
			$(this).children(".list_filters_item_title").text(txt);
		}
		
		
	});
}	



function _init_newspage_plugin()
{
	
	if (!is_mobile && $('.news_grid_units').length>0) {
		$('.news_grid_units').masonry({
			// options
			columnWidth: '.news_grid_item',
			itemSelector: '.news_grid_item',
			gutter: '.grid-sizer'
		});
	}

	
	$(window).resize(function(){
		if (!is_mobile && $('.news_grid_units').length>0) {
			$('.news_grid_units').masonry({
				columnWidth: '.news_grid_item',
				itemSelector: '.news_grid_item',
				gutter: '.grid-sizer'
			});
		}
	});
}	




function _basket_change_blocks()
{
	/*оплата*/
	if ($(".desktop_position").length>0)
	{
		$(".mobile_position").html($(".desktop_position").html());
		$(".desktop_position").remove();
	}
}


function _init_modals()
{
	
	// Modals
	$(document).on('click', '[data-toggle="modals"]', function (e) {
		
		
		e.preventDefault();
		e.stopPropagation();
		
		var link = $(this);
		var modal = $('#modal');

		if (modal.hasClass('in')) {
			modal.modal('hide');
			
			modal.modal('show');
			
			setTimeout(function () {
				modal.find('.modal-content').load(link.attr('href'), function () {
					modal.modal('show');
				});
			}, 600);
		} else {
			modal.modal('show');
			modal.find('.modal-content').load(link.attr('href'), function () {
				modal.modal('show');
			});
		}
	});
	
	
	$(document).on("click","#submit_fast",function(event) {
		event.preventDefault();
	
		if (ValidateForm("fast_form"))
		{
			
			$.ajax({
				type: "post",
				url: $("#fast_form").attr("action"),
				data: $("#fast_form").serialize(), 
				dataType: "json",
				success: function (data) {

					console.log(data);
					if (data.result=="Y")
					{
						$("#one_click_buy_id_FIO").val("");
						$("#one_click_buy_id_PHONE").val("");
						$("#ONE_CLICK_BUY[COMMENT]").val("");
						
						$("#fast_form").remove();
						
						$("#fast_form_result").css("display", "block");
						
						setTimeout('$("#close_zakaz_form").trigger("click");', 5000);
						document.location.href = "/";
					}
					else 
					{
						$("#fast_form_result").css("display", "block");
						$("#fast_form_result").css("color", "#ff0000");
						$("#fast_form_result").html(data.message+" "+data.err);
						setTimeout('$("#fast_form_result").css("display", "none");$("#fast_form_result").css("color", "#000");', 5000);
						
					}
					
				},
				error: function(){
					alert("Ошибка!");
				}
				
				
			});
			
			
		}
		
	});
	
	
}
	


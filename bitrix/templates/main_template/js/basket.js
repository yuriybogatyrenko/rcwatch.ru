jQuery(document).ready(function( $ ) {
	var mobileWidth = 500;
	var is_mobile = ($(window).width()<=mobileWidth);			

	loadBasketItemsCount();
	loadDelayItems();
	loadCompareItems();
	_init_basket_actions();
	
	
	function _init_basket_actions(){
		
		
		/*
		width: 23px;
    height: 27px;
    position: absolute;
    left: 0px;
    top: -4px;
    z-index: 10;
	*/
	
	    
		
	  
		
	
		/*Переход в корзину*/
		$(document).on("click",".main_section_header_item.basket_link", function(event) {
			event.preventDefault();
			
			document.location.href = "/"+lang_prefix+"/basket/";
			
		});
		
		/*Добавление в корзину*/
		$(document).on("click",".product_item_basket_btn, .to_basket", function(event) {
			event.preventDefault();
			
			if ($(this).hasClass("disabled_btn"))
				return false;
			
			if ($(this).find("input.hidden_input").hasClass("chckd"))
			{
				document.location.href = $(this).attr("href");
				return false;
			}
			
			
			var itemid = $(this).data("propductid");
			//console.log("В корзину itemid="+itemid);
			
			var basket_button = $(this);
			
			$.ajax({
				type: "post",
				url: '/ru/handlers/actions.php?action=add-to-cart',
				data: {itemid: itemid},
				dataType: "json",
				success: function (data) {
					if(data.status)
					{
						
						//$(basket_button).children("input[type=hidden]").attr("checked", "checked");
						SetInBasketIcon(itemid);
						loadDelayItems();
						loadBasketItemsCount();
						
						
						/*анимация*/
			
						/*TriggerClick = 0;
						if(TriggerClick==0){
							 TriggerClick=1;
							 $("div#zoom_basket").css("display", "block");
							 $("div#zoom_basket").animate({width:'23px', height:'27px', top: '-4px', left: '0px'}, 300, function(){  
							 
								$("div#zoom_basket").animate({width:'17px', height:'20px', top: '0px', left: '2px'}, 300, function(){  
										TriggerClick=0; 
										$("div#zoom_basket").css("display", "none");
										});
							 
							 });
						}*/
						
						
						TriggerClick = 0;
						if(TriggerClick==0){
							 TriggerClick=1;
							 $("#amount_basket").animate({width:'24px', height:'24px', top: '-17px', right: '-17px'}, 300, function(){  
							 
								$("#amount_basket").animate({width:'20px', height:'20px', top: '-15px', right: '-15px'}, 300, function(){  
										TriggerClick=0; 
										//$("div#zoom_basket").css("display", "none");
										});
							 
							 });
						}
						
						
					}	
					else 
					{
						alert("error!");
						
					}
				},
				error: function(){
					alert("Ошибка!");
				}
			});
			
		});
		
		
		/*Добавление в отложенные*/
		$(document).on("click",".product_item_deferred_btn", function(event) {
			event.preventDefault();
			
			
			var itemid = $(this).data("propductid");
			
			console.log("В отложенные itemid"+itemid);
			
			$.ajax({
				type: "post",
				url: '/ru/handlers/actions.php?action=add-to-delay',
				data: {itemid: itemid},
				dataType: "json",
				success: function (data) {
					if(data.status)
					{
						SetInDelayIcon(itemid); 
						loadDelayItems();
						loadBasketItemsCount();
					}	
				},
				error: function(){
					alert("Ошибка!");
				}
			});
			
		});
		
		
		/*Удаление из корзины*/
		$(document).on("click",".header_popup_product_delete", function(event) {
			event.preventDefault();
			
			var basketid = $(this).data("basketid");
		
			$.ajax({
				type: "post",
				url: '/ru/handlers/actions.php?action=basket-item-remove',
				data: {itemid: basketid},
				dataType: "json",
				success: function (data) {
					if(data.status)
					{
						//$(basket_button).children("input[type=hidden]").attr("checked", "checked");
						loadBasketItems();
						loadDelayItems();
					}	

				},
				error: function(){
					alert("Ошибка!");
				}
			});
			
		});
		
		
		/*Добавление в сравнение*/
		$(document).on("click",".product_item_comparison_btn", function(event) {
			event.preventDefault();
			
			
			var itemid = $(this).data("propductid");

			
			var inCompare = false;
			
			if ($(this).children("input.hidden_input"))	
			{
				if ($(this).children("input.hidden_input").hasClass("chckd"))
					inCompare = true;
			}
			
			if (inCompare==false) //ещё нет в сравнении - добавляем
			{
				$.ajax({
					type: "post",
					url: '/ru/handlers/actions.php?action=add-to-compare',
					data: {itemid: itemid},
					dataType: "json",
					success: function (data) {
						if(data.status)
						{
							SetInCompareIcon(itemid);
							loadCompareItems();
						}	
					},
					error: function(){
						alert("Ошибка!");
					}
				});
			}
			else 
			{
				$.ajax({
					type: "post",
					url: '/ru/handlers/actions.php?action=remove-from-compare',
					data: {itemid: itemid},
					dataType: "json",
					success: function (data) {
						if(data.status)
						{
							UnSetInCompareIcon(itemid);
							loadCompareItems();
						}	
					},
					error: function(){
						alert("Ошибка!");
					}
				});
			}
			/*$.ajax({
				type: "post",
				url: '/handlers/actions.php?action=add-to-compare',
				data: {itemid: itemid},
				dataType: "json",
				success: function (data) {
					if(data.status)
					{
						SetInCompareIcon(itemid);
						loadCompareItems();
					}	
				},
				error: function(){
					alert("Ошибка!");
				}
			});*/
		});
		
		/*Удаление из сравнения*/
		$(document).on("click",".comparison_pop--delete", function(event) {
			event.preventDefault();
			
			var itemid = $(this).data("propductid");
			
			console.log("Удаление из сравнения "+itemid);
			
			$.ajax({
				type: "post",
				url: '/ru/handlers/actions.php?action=remove-from-compare',
				data: {itemid: itemid},
				dataType: "json",
				success: function (data) {
					if(data.status)
					{
						loadCompareItems();
					}	
				},
				error: function(){
					alert("Ошибка!");
				}
			});
			
			
			
		});
		
		
		
		/*Увеличение количества*/
		$(document).on("click",".plus.dib.calc_btn, .minus.dib.calc_btn", function(event) {
			event.preventDefault();
			
			var basketid = $(this).data("basketid");
			var bval = $(this).data("baskeval");
			var oldval = $(this).data("basketoldval");
			
			$.ajax({
				type: "post",
				url: '/ru/handlers/actions.php?action=basket-quantity-update',
				data: {itemid: basketid, value: bval, delay: "N"},
				dataType: "json",
				success: function (data) {
					if(data.status)
					{
						//$(basket_button).children("input[type=hidden]").attr("checked", "checked");
						loadBasketItems();
						loadDelayItems();
					}	
					else 
					{
						alert("Нет такого количества!");
						loadBasketItems();
					}

				},
				error: function(){
					alert("Ошибка!");
				}
			});
			
		});
		
		/*изменение количества для мобильной версии*/
		$(document).on("change", '.for_mobile_bitem_count', function (event) {
			event.preventDefault();
			
			var basketid = $(this).data("basketid");
			var bval = $(this).val();
		
			$.ajax({
				type: "post",
				url: '/ru/handlers/actions.php?action=basket-quantity-update',
				data: {itemid: basketid, value: bval, delay: "N"},
				dataType: "json",
				success: function (data) {
					if(data.status)
					{
						//$(basket_button).children("input[type=hidden]").attr("checked", "checked");
						loadBasketItems();
						loadDelayItems();
					}	

				},
				error: function(){
					alert("Ошибка!");
				}
			});
			
			
		});
		
		
		
		
		$(document).on("change", '#compare_ckeckbox', function (event) {
			event.preventDefault();
			if ($(this)[0].checked)
			{
				$("tr.distinct").css("display", "none");
			}
			else 
			{
				$("tr.distinct").css("display", "table-row");
			}
		});
		
		
		
		
		
		
		/*изменение способа оплаты*/
		$(document).on("change","input[name='payment_methods']",function(event) {
			event.preventDefault();
			
			//console.log($(this).val());
			
			$.ajax({
				type: "post",
				url: '/ru/handlers/actions.php?action=change-payment',
				data: {paymentid: $(this).val()},
				dataType: "json",
				success: function (data) {
					
					console.log(data);
					if(data.status)
					{
						loadBasketItems();
					}	
					
				},
				error: function(){
					alert("Ошибка!");
				}
			});
			
			
			
		});
	
	
		/*Оформление заказа*/
		
		$(document).on("click","#order_button",function(event) {
			event.preventDefault();

			if (ValidateForm("personal_form2"))
			{
				$("#user_error").text("");
				/*Сохраняем в куках*/
				setCookie("NAME",$("#personal_form2 input[name='fio']").val());
				setCookie("PERSONAL_PHONE",$("#personal_form2 input[name='phone']").val());
				setCookie("EMAIL",$("#personal_form2 input[name='email']").val());
				
				setCookie("PERSONAL_CITY",$("#personal_form2 input[name='town']").val());
				setCookie("PERSONAL_STREET",$("#personal_form2 input[name='address']").val());
				
				$(".loading_img").css("display","block");
				$('.header_popup_wrapper').css('opacity', '0.777');
				
				
				$.ajax({
					type: "post",
					url: '/'+lang_prefix+'/handlers/actions.php?action=user-exist',
					data: jQuery("#personal_form2").serialize(), 
					dataType: "json",
					success: function (data) {
						if(data.status)
						{
							
							$("#needlogout").val(data.needlogout);
							//alert($("#needlogout").val());
							MakeOrder();
						}	
					},
					error: function(){
						$(".loading_img").css("display","none");
						alert("Ошибка!");
					}
				});
				
				
				
				
			}
			
			
		});
		
		
		/*
		
		*/
		
	}
});

function MakeOrder()
{
	
	$.ajax({
		type: "post",
		url: '/'+lang_prefix+'/handlers/actions.php?action=make-order',
		data: jQuery("#personal_form2").serialize(), 
		dataType: "json",
		success: function (data) {
			
			//console.log(data);
			
			if(data.status)
			{
				$(".loading_img").css("display","none");
				$('.header_popup_wrapper').css('opacity', '0');
				
				document.location.href = "/"+lang_prefix+"/history/";
				
			}	
			else if (data.QUANTITY_ERRORS.length>0) /*количество*/
			{
				$(".loading_img").css("display","none");
				$('.header_popup_wrapper').css('opacity', '0');
				
				for (var i = 0; i < data.QUANTITY_ERRORS.length; i++) {
					  $("#basket-item-"+data.QUANTITY_ERRORS[i]+" .dib.result_wrap").css("color", "#ff0000");
					  
					  $("#basket-item-"+data.QUANTITY_ERRORS[i]+" .mprice").css("color", "#ff0000");
					  
					  
					  if (i==data.QUANTITY_ERRORS.length-1)
					  {
						$('.main_header').scrollTo('#basket-item-'+data.QUANTITY_ERRORS[i], {duration:'slow'});
					  }
					  
				}
			}
			else if (data.user_error)
			{
				$(".loading_img").css("display","none");
				$('.header_popup_wrapper').css('opacity', '0');
				
				$("#user_error").html(data.message);
				$("#user_error").css("display", "block");
			}
		 
		},
		error: function(){
			$(".loading_img").css("display","none");
			alert("Ошибка!");
		}
	});
	
	
}


function SetBasketPriceForIcon(price)
{
	$(".the_cart_price_span").html(price);
}


function SetInBasketIcon(id)
{
//	console.log("SetInBasketIcon "+id);
	$(".product_"+id+" .product_item_action_bar .product_item_basket_btn input.hidden_input").each(function(){
		$(this).addClass("chckd");
	});
	
	
	$(".to_basket[data-propductid='"+id+"']").each(function(){
		$(this).text("В корзине");
	});
	
	UnSetInDelayIcon(id);
}

function UnSetInBasketIcon(id)
{
	$(".product_"+id+" .product_item_action_bar .product_item_basket_btn input.hidden_input").each(function(){
		
		$(this).removeClass("chckd");
	});
	
	$(".to_basket[data-propductid='"+id+"']").each(function(){
		$(this).text("Купить");
	});
}


function SetInDelayIcon(id)
{
	$(".product_"+id+" .product_item_action_bar .product_item_deferred_btn input.hidden_input").each(function(){
		
		$(this).addClass("chckd");
	});
	
	UnSetInBasketIcon(id);
}

function UnSetInDelayIcon(id)
{
	$(".product_"+id+" .product_item_action_bar .product_item_deferred_btn input.hidden_input").each(function(){
		$(this).removeClass("chckd");
		//console.log("Убираем! "+id);
	});
	
	//console.log("UnSetInDelayIcon "+id);
}

function SetInCompareIcon(id)
{
	$(".product_"+id+" .product_item_action_bar .product_item_comparison_btn input.hidden_input").each(function(){
		$(this).addClass("chckd");
	});
	
	/*для блока ОТЛОЖЕННЫЕ*/
	$(".product_item_comparison_btn[data-propductid='"+id+"'] input.hidden_input").each(function(){
		$(this).addClass("chckd");
	});
}

function UnSetInCompareIcon(id)
{
	$(".product_"+id+" .product_item_action_bar .product_item_comparison_btn input.hidden_input").each(function(){
		$(this).removeClass("chckd");
	});
	
	/*для блока ОТЛОЖЕННЫЕ*/
	$(".product_item_comparison_btn[data-propductid='"+id+"'] input.hidden_input").each(function(){
		$(this).removeClass("chckd");
	});
}


//загружаем корзину
function loadBasketItems() {/* $(".header_basket_popup").load("/ru/handlers/basket_items.php");*/

	//$(".header_basket_popup").load("/ru/handlers/basket_items.php");
	//console.log("loadBasketItems");
	if ($("#basket_sss").length)
		$("#basket_sss").load("/ru/handlers/basket_items_new.php?ajax=y");
	
 }
 
//загружаем иконку корзины с количеством
function loadBasketItemsCount() {/* $(".header_basket_popup").load("/ru/handlers/basket_items.php");*/

	$(".header_basket_popup").load("/ru/handlers/basket_items.php");
	
 }


//загружаем отложенные
function loadDelayItems() { $(".header_deferred_popup").load("/ru/handlers/delay_items.php"); }

//загружаем сравниваемые элементы
function loadCompareItems() { $(".header_comparison_popup").load("/ru/handlers/compare_items.php"); }

function SetBasketCountForIcon(count)
{
	$(".amount_basket.amount_circle").html(count);
}

function SetDelayCountForIcon(count)
{
	$(".amount_deferred.amount_circle").html(count);
}

<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
//IncludeTemplateLangFile($_SERVER["DOCUMENT_ROOT"]."/bitrix/templates/".SITE_TEMPLATE_ID."/header.php");
?><!doctype html>
<html>
<head>
	<meta charset="utf-8">
	<title><?$APPLICATION->ShowTitle()?></title>

	<link rel="stylesheet" media="screen" href="<?=SITE_TEMPLATE_PATH?>/css/main.css" >
	<link rel="stylesheet" media="screen" href="<?=SITE_TEMPLATE_PATH?>/css/responsive.css" >
	<link rel="stylesheet" media="screen" href="<?=SITE_TEMPLATE_PATH?>/css/common.css" >
	<link rel="stylesheet" media="screen" href="<?=SITE_TEMPLATE_PATH?>/css/adaptive.css" >
	<?	
	global $USER;
	if ($USER->IsAdmin())
	{
	$APPLICATION->ShowHead();
		CUtil::InitJSCore(Array('ajax'));
		}
	?>
	<script src="<?=SITE_TEMPLATE_PATH?>/js/canvas.js"></script>
	<script src="<?=SITE_TEMPLATE_PATH?>/js/ru_vars.js"></script>
	<script src="<?=SITE_TEMPLATE_PATH?>/js/cookies.js"></script>
	<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery-2.1.4.min.js"></script><!--NEW-->
	<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.easing.1.3.min.js"></script><!--NEW-->
	
	<script src="<?=SITE_TEMPLATE_PATH?>/js/validate.js"></script><!--NEW-->
	<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.mmenu.all.min.js"></script> <!--NEW-->
	<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.scrollTo.min.js"></script>
	
	<script src="<?=SITE_TEMPLATE_PATH?>/js/selectbox.js"></script>
	<link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/css/jquery.mmenu.all.css"/> <!--NEW-->
	
	<script src="<?=SITE_TEMPLATE_PATH?>/js/product_images_slider.js"></script>
	<script src="<?=SITE_TEMPLATE_PATH?>/js/modal.js"></script>
	<script src="<?=SITE_TEMPLATE_PATH?>/js/init.js"></script>
	<script src="<?=SITE_TEMPLATE_PATH?>/js/basket.js"></script>

	
	<meta charset="UTF-8">
	<?/*<meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=yes" />*/?>
	<meta name="viewport" content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=yes" />
	
	
	
	
</head>
<body class="<?=($discount!=false ? "" : "nopromo")?>">
	<div id="fb-root"></div>
	<script>(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.6&appId=133904017041259";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	
	
	</script>
	
	<div id="panel"><?$APPLICATION->ShowPanel();?></div>

	<div id="page" style="height:100%;">

		<div class="mobile_header Fixed">
			<div class="red_promo"><span class="close_m"></span></div>
			<a id="for_mobile_menu" href="#mobile-menu"><?=$SETTINGS["filter"]?></a>
			
			<div data-popup_open="basket" class="main_section_header_item basket_link <?=$APPLICATION->GetCurPage() == "/".$lng."/basket/" ?  "active" : ""?>">
				<span class="basket_link_icon_wrapper">
					<span class="amount_basket amount_circle">0</span>
					<i class="icon default_icon"></i>
					<i class="icon hover_icon"></i>
					<i class="icon active_icon"></i>
				</span>
			</div>
			
			<a class="m_logo" href="/<?=LANGUAGE_ID?>/"></a>
		</div>
	
		<div class="main_wrapper <?=$main_wrapper_class?>">
			<header class="main_header <?=$main_header_class?>">
				<div class="header_overlay"></div>
				<?if ($discount!=false) {?>
				<div class="promo_code_section">
					<div class="content_wrap">
						<i class="close"></i>
						<i class="close_hover"></i>
						<span class="discount_text">
							<?/*<span class="percent_num">– 10%</span>  ОТ ВАШЕЙ ПЕРВОЙ ПОКУПКИ		*/?>
							<?=$discount["DESCRIPTION"]?>
						</span>
						<span class='promo_code_text'>
							<?=$SETTINGS["promo_code"]?>
							<span class='promo_code_num'><?=$discount["COUPON"]?></span>
						</span>
						<span class="timer_sect">
							<span class="dib timer_text"><?=$SETTINGS["promo_bedore_date"]?></span>
							<span id="countdown1" class="countdown clearfix dib"></span>
						</span>
					</div>
				</div>
				<script>
					jQuery(document).ready(function( $ ) {
						BeginCountDown(new Date(<?=$discount["DATE_Y"]?>, <?=$discount["DATE_M"]?>, <?=$discount["DATE_D"]?>, <?=$discount["DATE_H"]?>, <?=$discount["DATE_I"]?>, <?=$discount["DATE_S"]?>));
					});
				</script>
				<?}?>
				
				<?if ($main_page) {?>
				<div class="logo_section">
					<a href="/<?=LANGUAGE_ID?>/" class="logo"></a>
				</div>
				<?}?>
				
				<?
				/*меню и всплывающие окошки*/
				$APPLICATION->IncludeFile(
					"/include/popups.php",
					Array(),
					Array("MODE"=>"php")
					);?>
				
			</header>

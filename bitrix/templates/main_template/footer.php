		


			
		<?$APPLICATION->IncludeFile(
				SITE_DIR."include/footer.php",
				Array(),
				Array("MODE"=>"php")
				);?>
			
		</div>
		
		<script src="<?=SITE_TEMPLATE_PATH?>/js/jquery.countdown.js"></script>
		<script src="<?=SITE_TEMPLATE_PATH?>/js/owl.carousel.js"></script>
		<script src="<?=SITE_TEMPLATE_PATH?>/js/masonry.js"></script>
		<script src="<?=SITE_TEMPLATE_PATH?>/js/custom.js"></script>
		<!--<script src="<?=SITE_TEMPLATE_PATH?>/js/retina.min.js"></script>-->
		<script src="<?=SITE_TEMPLATE_PATH?>/js/input.mask.js"></script>
		
		<script>
			/*$(document).ready(function() {
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
						autoPlay: false
					});
				}
			
			});*/
			
			/*
			$(window).resize(function(){
				if (!is_mobile && $('.news_grid_units').length>0) {
					$('.news_grid_units').masonry({
						columnWidth: '.news_grid_item',
						itemSelector: '.news_grid_item',
						gutter: '.grid-sizer'
					});
				}
			})*/
			
		</script>
		
		
		
		
		
		
	
	

	</div>
	
	<nav id="mobile-menu"><ul></ul></nav>
	
	
	<?$APPLICATION->IncludeFile(
		"/include/mob_menu.php",
		Array(),
		Array("MODE"=>"php")
		);?>
		
		
	<div class="modal fade" id="modal" tabindex="-1">
		<div class="modal-dialog">
			<div class="modal-content">
			</div>
		</div>
	</div>
	
	
</body>
</html>


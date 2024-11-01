jQuery(document).ready(function($){

			// Creates an array where each array item is the name of the class of the div containing the phrase 'product-'

			var product_class_name_array = $('div[class*=product-]').map(function(){
		
				return $(this).attr('class')
		
				}).get();
		
			var product_class_name_array_length = product_class_name_array.length;

			var product_counter_id_array = [];

			for (i = 0; i < product_class_name_array_length; i++) {

				var complete_product_class_name = product_class_name_array[i];

				delete_first_eight_characters = complete_product_class_name.replace('product-','');

				product_id_number = delete_first_eight_characters.replace(' product-inner-div','');

				product_counter_id_array[product_id_number] = 1; 

			}
			
			jQuery('.navi-buttons').find('button').on('click',function() {

				var direction = jQuery(this).data('dir');

				var directionpointer = jQuery(this).data('dir');

				var product_id_from_button = directionpointer.indexOf('-');
		
				var directionpointer = directionpointer.substring(0, product_id_from_button != +1 ? product_id_from_button : directionpointer.length); 

				var sliderDiv = jQuery('.product-' + directionpointer);

				var imageFinder = jQuery('.product-' + directionpointer).find('img');				

				var imgsLen = imageFinder.length;

				var imgWidth = imageFinder[0].clientWidth;

				var imgBorder = imageFinder.outerWidth() - imageFinder.innerWidth();

				window.oneimgLen = imgWidth + imgBorder;

				window.globalloc = oneimgLen;

				var totalImgWidth = oneimgLen * imgsLen;

				if ( direction ==  directionpointer + '-next') {

					product_counter_id_array[directionpointer] = product_counter_id_array[directionpointer] + 1;

				} else {

					product_counter_id_array[directionpointer] = product_counter_id_array[directionpointer] - 1;

				}

				if ( product_counter_id_array[directionpointer] === 0 ) {

					product_counter_id_array[directionpointer] = imgsLen;

					direction = directionpointer + '-next';

					globalloc = totalImgWidth - oneimgLen;

				} else if ( product_counter_id_array[directionpointer] - 1 === imgsLen) {

					product_counter_id_array[directionpointer] = 1;

					globalloc = 0;

				}

				console.log(direction, globalloc, product_counter_id_array[directionpointer]);

				transition(sliderDiv, globalloc, direction, directionpointer);

			});

			function transition( container, loc, direction, directionpointer ) {
			
				var unit;

				if ( direction && globalloc !== 0 ) {

					if ( direction === directionpointer + '-next' ) {

						unit = '-=';

					} else {

						unit = '+=';

					}

				}

				console.log(unit);

				container.animate({
				
					'margin-left': unit ? (unit + globalloc) : globalloc
				
				});

			}

			var the_product_li = 'ul.products li.product';

			var product_li_width = jQuery(the_product_li).width();

			var the_product_images = jQuery('ul.products li.product img');

			var theimagewidth = the_product_images.width();

			var imgPaddingresize = the_product_images.innerWidth() - the_product_images.width();

			var imgBorderresize = the_product_images.outerWidth() - the_product_images.innerWidth();

			var trueImagewidth = product_li_width - imgPaddingresize - imgBorderresize;

			jQuery('ul.products li.product img').width(trueImagewidth);

			window.previous_window_width = jQuery(window).width();

			window.previous_image_width = product_li_width;

			jQuery(window).resize(function(){

				var the_product_li = 'ul.products li.product';

				var product_li_width = jQuery(the_product_li).width();

				var the_product_images = jQuery('ul.products li.product img');

				var theimagewidth = the_product_images.width();

				var imgPaddingresize = the_product_images.innerWidth() - the_product_images.width();

				var imgBorderresize = the_product_images.outerWidth() - the_product_images.innerWidth();

				var trueImagewidth = product_li_width - imgPaddingresize - imgBorderresize;

				jQuery('ul.products li.product img').width(trueImagewidth);

				var left_margin_compensate;

				var product_class_name_array_resize = $('div[class*=product-]').map(function(){
		
					return $(this).attr('class')
		
				}).get();
		
				var product_class_name_array_length_resize = product_class_name_array_resize.length;

				for ( i = 0; i < product_class_name_array_length_resize; i++ ) {

				 	var complete_product_class_name_resize = product_class_name_array_resize[i];

				 	delete_first_eight_characters_resize = complete_product_class_name_resize.indexOf(' ');

					complete_product_class_name_resize = complete_product_class_name_resize.substring(0, delete_first_eight_characters_resize != +1 ? delete_first_eight_characters_resize : complete_product_class_name_resize.length);

					var imageFinderResize = jQuery('.' + complete_product_class_name_resize).find('img');

					var imageFinderResizeLength = imageFinderResize.length;

					var getLeftMarginResize = jQuery('.' + complete_product_class_name_resize).css('margin-left');

					var intLeftMarginResize = parseInt(getLeftMarginResize,10);

					var minusvalue = intLeftMarginResize - (product_li_width * (-intLeftMarginResize / previous_image_width) + intLeftMarginResize);

					var plusvalue = product_li_width * (intLeftMarginResize / previous_image_width);

					var current_window_width = jQuery(window).width();

					var difference_in_change = current_window_width - previous_window_width;

					if (difference_in_change > 0) {

							jQuery('.' + complete_product_class_name_resize).css('margin-left', minusvalue);
								
						} else if (difference_in_change < 0) {

							jQuery('.' + complete_product_class_name_resize).css('margin-left', plusvalue)

					} 		

				}

				previous_window_width = current_window_width;

				previous_image_width =  product_li_width;

			});
			
});


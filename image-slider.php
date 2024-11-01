<?php
/*
Plugin Name: WooCommerce Product Archive Image Slider
Plugin URI: http://zamtual.com/blog/product-archive-image-slider/
Version: 1.0
Description: Creates a slider gallery for product archives based on the images loaded for product thumbnail and product gallery.
Author: zamtual
Tested up to: 3.9.2
Author URI: http://zamtual.com
Text Domain: woocommerce-product-archive-image-slider
Domain Path: /languages/

	License: GNU General Public License v3.0
	License URI: http://www.gnu.org/licenses/gpl-3.0.html
*/

/*===== Check if WooCommerce is active =====*/

if ( in_array( 'woocommerce/woocommerce.php', apply_filters( 'active_plugins', get_option( 'active_plugins' ) ) ) ) {

	/*=== Localisation ===*/
	
	add_action( 'init', 'plugin_init' );
	
	function plugin_init() {
		
		load_plugin_textdomain( 'woocommerce-product-archive-image-slider', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

		// removes the add to cart button on the product archive page
		remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10);

		// removes the rating from the inner anchor tags
		remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_rating', 5);

		// removes the price from the inner anchor tags 
		remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10);

	}

	/*===== Check to see if class exists =====*/

	if ( ! class_exists( 'WC_pais' ) ) {

		class WC_pais {

			public function __construct() {
			
				add_action( 'wp_enqueue_scripts', array( $this, 'pais_scripts' ) );	
				
				add_action( 'woocommerce_before_shop_loop_item_title', array( $this, 'woocommerce_template_loop_all_product_thumbnail' ), 11 );

				add_action( 'woocommerce_before_shop_loop_item', array($this,'woocommerce_template_loop_open_div'), 11 );

				add_action( 'woocommerce_after_shop_loop_item', array($this,'woocommerce_template_loop_close_div'), 11 );

			}

			/*===== Adding the stylesheets and javascript code =====*/

			// Setup styles
			function pais_scripts() {

				if ( apply_filters( 'woocommerce_product_image_flipper_styles', true ) ) {
			
					wp_enqueue_style( 'pais-styles', plugins_url( '/assets/css/style.css', __FILE__ ) );
			
				}

				wp_enqueue_script( 'pais-script', plugins_url( '/assets/js/script.js', __FILE__ ), array( 'jquery' ) );

			}

			/*===== Adding the frontend functionalties =====*/

			// Display the thumbnails uploaded in the product gallery
			function woocommerce_template_loop_all_product_thumbnail() {
				
				global $product;

				$pais_attachment_ids = $product->get_gallery_attachment_ids();
			
				foreach ( $pais_attachment_ids as $pais_attachments ) {			
					
					echo wp_get_attachment_image( $pais_attachments, 'shop_catalog','', $attr = array( 'class' => 'gallery-image' ) );
					
				}

			}

			// Creates the opening div before woocommerce archive loop
			function woocommerce_template_loop_open_div() {

				global $product;

				$pais_the_unique_id = get_the_ID();

				$pais_product_type = get_post_type();

				$pais_attachment_ids = $product->get_gallery_attachment_ids();

				if ( $pais_attachment_ids ) {

					echo '<div class="' . $pais_product_type . '-' . $pais_the_unique_id . ' product-inner-div">';

				} else {

					false;
				
				}
			
			}

			// Creates the closing div after woocommerce closing div
			function woocommerce_template_loop_close_div() {

				global $product;

				$pais_attachment_ids = $product->get_gallery_attachment_ids();

				if ( $pais_attachment_ids ) {

					echo '</div>';

					$pais_the_unique_id = get_the_ID();

					$pais_product_permalink = get_the_permalink();
					
					$pais_get_the_title = get_the_title();

					echo '<div><a href="' . $pais_product_permalink . '"><h3>'. $pais_get_the_title .'</h3></a></div>';		

					$pais_product_price = $product->get_price_html();

					$pais_product_rating_html = $product->get_rating_html();

					echo '<div class="navi-buttons">

					<div class="pais-price price"><a href="' . $pais_product_permalink . '"><h3>' . $pais_product_price . '</a></div>

					<div class="paise-rating">' . $pais_product_rating_html . '</div>
						
					<div class="navi-scroll-direction">' . __('Scroll product images','woocommerce-product-archive-image-slider') . '</div>

					<button class="prev-button" data-dir="' . $pais_the_unique_id . '-prev">' . __('Previous','woocommerce-product-archive-image-slider') . '</button>
					
					<button class="next-button" data-dir="' . $pais_the_unique_id . '-next">' . __('Next','woocommerce-product-archive-image-slider') . '</button>
					
					</div>';

				} else {

					$pais_product_price = $product->get_price_html();

					$pais_product_rating_html = $product->get_rating_html();

					echo '

					<div class="pais-price price"><a href="' . $pais_product_permalink . '"><h3>' . $pais_product_price . '</a></div>

					<div class="paise-rating">' . $pais_product_rating_html . '</div>

					';
				
				}
			
			}

		}

		$WC_pais = new WC_pais();
	}
}
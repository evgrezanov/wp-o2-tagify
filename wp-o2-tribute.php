<?php
/**
 * Plugin Name: wp-o2-tagify
 * Description: Add @category and #tag autocomplete links to O2 plugin
 * Plugin URI:  https://github.com/evgrezanov/wp-o2-tagify
 * Author URI:  https://evgrezanov.github.io/
 * Author:      Evgeniy Rezanov
 * Version:     1.0.0
 * GitHub Plugin URI: evgrezanov/wp-o2-tagify
 * GitHub Plugin URI: https://github.com/evgrezanov/wp-o2-tagify
 * Text Domain: wp-o2-tagify
 * Domain Path: /languages
 */

defined('ABSPATH') || exit;
define( 'O2TAGIFY_VERSION', '1.0.0' );


class WP_O2_TAGIFY {

    public static function init() {
        add_action('wp_enqueue_scripts', [__CLASS__, 'assets']);
    }

    public static function assets(){
        wp_enqueue_script( 
            'tribute', 
            plugins_url('wp-o2-tagify/asset/tribute.min.js'), 
            array(), 
            O2TAGIFY_VERSION 
        );

        wp_enqueue_script( 
            'tribute-action', 
            plugins_url('wp-o2-tagify/asset/script.js'), 
            array(
                'tribute',
                'o2-app' // mb can used only that
            ), 
            O2TAGIFY_VERSION,
            true
        );

        wp_enqueue_style(
            'tribute-styles', 
            plugins_url('wp-o2-tagify/asset/tribute.css')
        );
    }

    public static function tagify_test(){
        ob_start();
    ?>
<textarea name='mix'>
            [[{"id":101, "value":"cartman", "title":"Eric Cartman"}]] and [[kyle]] do not know [[homer simpson]] because he's a relic.
        </textarea>
<?php
    return ob_get_clean();
    }
}

WP_O2_TAGIFY::init();
?>
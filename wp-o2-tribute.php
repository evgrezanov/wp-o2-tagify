<?php
/**
 * Plugin Name: wp-o2-tribute
 * Description: Add <strong>@category</strong> and <strong>#tag</strong> autocomplete links to o2 plugin
 * Plugin URI:  https://github.com/evgrezanov/wp-o2-tribute
 * Author URI:  https://www.upwork.com/freelancers/~01ea58721977099d53
 * Author:      <a href="https://www.upwork.com/freelancers/~01ea58721977099d53" target="_blank">Evgeniy Rezanov</a>
 * Version:     1.2.3
 * GitHub Plugin URI: evgrezanov/wp-o2-tribute
 * GitHub Plugin URI: https://github.com/evgrezanov/wp-o2-tribute
 * Text Domain: wp-o2-tribute
 * Domain Path: /languages
 */

defined('ABSPATH') || exit;

define('O2_TRIBUTE_VERSION', '1.2.3' );


class WP_O2_TRIBUTE {

    public static function init() {
        add_action('wp_enqueue_scripts', [__CLASS__, 'assets']);
    }

    public static function assets(){
        wp_enqueue_script( 
            'tribute', 
            plugins_url('wp-o2-tribute/asset/tribute/tribute.min.js'), 
            array('jquery'), 
            O2_TRIBUTE_VERSION 
        );

        wp_register_script(
            'tribute-action',
            plugins_url('wp-o2-tribute/asset/script.js')
          );
        
        wp_localize_script(
            'tribute-action',
            'tributeO2Data',
            $arg_array = [
                'endpoint' => get_rest_url(0, '/wp/v2/')
            ]
          );

        wp_enqueue_script( 
            'tribute-action', 
            plugins_url('wp-o2-tribute/asset/script.js'), 
            array(
                'tribute',
                'o2-app'
            ), 
            O2_TRIBUTE_VERSION,
            true
        );

        wp_enqueue_style(
            'tribute-styles', 
            plugins_url('wp-o2-tribute/asset/tribute/tribute.css')
        );
    }

}

WP_O2_TRIBUTE::init();

?>
<?php
   /*
   Plugin Name: Amelia Booking for Meditação Transendental
   Plugin URI: https://github.com/jeffersonalopes
   description: Plugin para adição de funcionalidades para o plugin amelia booking - site Meditação Transedental.
   Version: 1.0
   Author: Jefferson Augusto Lopes
   Author URI: https://github.com/jeffersonalopes
   License: GPL2
   */


/**
 * Include Required Scripts and StyleSheets
*/
function add_plugins_and_scripts(){
   wp_register_style('add-mt-ameleia-css', plugin_dir_url(__FILE__).'views/styles/main.css?v=3213', '', '', 'screen');
   wp_register_script('add-mt-amelia-axios', 'https://unpkg.com/axios/dist/axios.min.js', '', null, '');
   wp_register_script('add-mt-amelia-moment', 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.3/moment.min.js', '', null, '');
   
   //Js Entities
   wp_register_script('add-plugin-classe-location', plugin_dir_url(__FILE__).'views/js/classes/Location.js','', null, '');
   wp_register_script('add-plugin-classe-employee', plugin_dir_url(__FILE__).'views/js/classes/Employee.js','', null, '');
   wp_register_script('add-plugin-classe-event', plugin_dir_url(__FILE__).'views/js/classes/Event.js','', null, '');
   wp_register_script('add-plugin-classe-states', plugin_dir_url(__FILE__).'views/js/classes/State.js','', null, '');
   wp_register_script('add-plugin-classe-cities', plugin_dir_url(__FILE__).'views/js/classes/City.js','', null, '');

   //Js Views
   wp_register_script('add-plugin-view-abstract', plugin_dir_url(__FILE__).'views/js/views/View.js','', null, '');
   wp_register_script('add-plugin-view-eventItem', plugin_dir_url(__FILE__).'views/js/views/EventItem.js','', null, '');
   wp_register_script('add-plugin-view-filterFields', plugin_dir_url(__FILE__).'views/js/views/FilterFields.js','', null, '');
   wp_register_script('add-plugin-view-employeeList', plugin_dir_url(__FILE__).'views/js/views/EmployeeSlideItem.js','', null, '');
   wp_register_script('add-plugin-view-employeePage', plugin_dir_url(__FILE__).'views/js/views/EmployeeView.js','', null,);

   //Js Controllers
   wp_register_script('add-plugin-controller-events', plugin_dir_url(__FILE__).'views/js/controllers/EventsController.js','', null, '');
   wp_register_script('add-plugin-controller-filters', plugin_dir_url(__FILE__).'views/js/controllers/FilterController.js','', null, '');
   wp_register_script('add-plugin-controller-employee', plugin_dir_url(__FILE__).'views/js/controllers/EmployeeController.js','', null, '');
   

   if (!wp_script_is('jquery', 'enqueued')) {
         wp_enqueue_script('jquery');
   }
   wp_enqueue_style('add-mt-ameleia-css');
   wp_enqueue_script('add-mt-amelia-axios');
   wp_enqueue_script('add-mt-amelia-moment');

   //Enquee Views
   wp_enqueue_script('add-plugin-view-abstract');
   wp_enqueue_script('add-plugin-view-eventItem');
   wp_enqueue_script('add-plugin-view-filterFields');
   wp_enqueue_script('add-plugin-view-employeeList');
   wp_enqueue_script('add-plugin-view-employeePage');

   //Enquee Entities
   wp_enqueue_script('add-plugin-classe-location');
   wp_enqueue_script('add-plugin-classe-employee');
   wp_enqueue_script('add-plugin-classe-event');
   wp_enqueue_script('add-plugin-classe-states');
   wp_enqueue_script('add-plugin-classe-cities');

   //Enquee Controllers
   wp_enqueue_script('add-plugin-controller-events');
   wp_enqueue_script('add-plugin-controller-filters');
   wp_enqueue_script('add-plugin-controller-employee');
}
add_action('wp_enqueue_scripts', 'add_plugins_and_scripts');



function render_subscription_shortcode(){
   ob_start();
   include 'views/subscription_shortcode.php';
   $html = ob_get_contents();
   ob_end_clean();
   return $html;
}
add_shortcode("mt_render_subscription", "render_subscription_shortcode");

function render_employees_shortcode(){
   ob_start();
   include 'views/employees_shortcode.php';
   $html = ob_get_contents();
   ob_end_clean();
   return $html;
}
add_shortcode("mt_render_employees", "render_employees_shortcode");


function render_employee_shortcode(){
   ob_start();
   include 'views/employee_shortcode.php';
   $html = ob_get_contents();
   ob_end_clean();
   return $html;
}
add_shortcode("mt_render_employee", "render_employee_shortcode");
?>
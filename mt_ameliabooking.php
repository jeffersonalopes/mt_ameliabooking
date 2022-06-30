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
   wp_register_script('add-mt-amelia-mask', plugin_dir_url(__FILE__).'views/js/util/jquery.mask.min.js', '', null, '');
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
   wp_register_script('add-plugin-view-employeeFilters', plugin_dir_url(__FILE__).'views/js/views/EmployeeFilterFields.js','',null,'');

   //Js Controllers
   wp_register_script('add-plugin-controller-events', plugin_dir_url(__FILE__).'views/js/controllers/EventsController.js','', null, '');
   wp_register_script('add-plugin-controller-filters', plugin_dir_url(__FILE__).'views/js/controllers/FilterController.js','', null, '');
   wp_register_script('add-plugin-controller-employee', plugin_dir_url(__FILE__).'views/js/controllers/EmployeeController.js','', null, '');
   wp_register_script('add-plugin-controller-employee-filters', plugin_dir_url(__FILE__).'views/js/controllers/EmployeeFilterController.js','', null, '');
   

   if (!wp_script_is('jquery', 'enqueued')) {
         wp_enqueue_script('jquery');
   }
   wp_enqueue_style('add-mt-ameleia-css');
   wp_enqueue_script('add-mt-amelia-axios');
   wp_enqueue_script('add-mt-amelia-moment');
   wp_enqueue_script('add-mt-amelia-mask');

   //Enquee Views
   wp_enqueue_script('add-plugin-view-abstract');
   wp_enqueue_script('add-plugin-view-eventItem');
   wp_enqueue_script('add-plugin-view-filterFields');
   wp_enqueue_script('add-plugin-view-employeeFilters');
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
   wp_enqueue_script('add-plugin-controller-employee-filters');
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


function render_panel_scripts_shortcode(){
   ob_start();
   include 'views/employee_panel_shortcode.php';
   $html = ob_get_contents();
   ob_end_clean();
   return $html;
}
add_shortcode("mt_render_panel_scripts", "render_panel_scripts_shortcode");





add_action('wp_ajax_event_form', 'ajax_event_form');
add_action('wp_ajax_nopriv_event_form', 'ajax_event_form');
function ajax_event_form(){
  $url = 'https://meditacaotranscedental.api-us1.com/api/3/contacts';
  $key = 'e95ce61eb9e4517b45d30bdcedb8a51ee117749f9f45bbdce702f03c5522ffb34d8e7eb8';
  
   $payload = Array(
      "contact" => Array(
         "email"=> $_POST['email'],
         "firstName"=> explode(" ",$_POST['name'])[0],
         "lastName"=> explode(" ",$_POST['name'])[1],
         "phone" => $_POST['phone'],
         "fieldValues" => Array(
               [
                        "field" => "34",
                        "value" => $_POST['instrutor']
               ],
               [
                        "field"=> "47",
                        "value"=> $_POST['message']
               ]
         )
      )
   );


   $ch = curl_init($url); 
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Api-Token: '.$key));

	$result = curl_exec($ch);
	curl_close($ch);
   $contactId = json_decode($result)->fieldValues[0]->contact;

   if($contactId){
      $url = 'https://meditacaotranscedental.api-us1.com/api/3/contactLists';
      $payload = Array(
         "contactList"=> Array(
             "list"=> 3,
             "contact"=> $contactId,
             "status"=> 1
         )
      );
      $ch = curl_init($url); 
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
      curl_setopt($ch, CURLOPT_HTTPHEADER, array('Api-Token: '.$key));
      $result = curl_exec($ch);

   }


   $to = $_POST['instrutor_email'];
   $subject = 'Mensage de Meditação Transedental';
   $message = 'Contato: '.$_POST['nome'].' <br/>
   Telefone: '.$_POST['phone'].' <br/>
   Email: '.$_POST['email'].' <br/>
   Mensagem: '.$_POST['message'];

   echo true;

  die;
}


add_action('wp_ajax_event_subscription', 'ajax_event_subscription');
add_action('wp_ajax_nopriv_event_subscription', 'ajax_event_subscription');
function ajax_event_subscription(){
   $url = 'https://meditacaotranscedental.api-us1.com/api/3/contacts';
   $key = 'e95ce61eb9e4517b45d30bdcedb8a51ee117749f9f45bbdce702f03c5522ffb34d8e7eb8';

   $payload = Array(
      "contact" => Array(
         "email"=> $_POST['email'],
         "firstName"=> $_POST['firstName'],
         "lastName"=> $_POST['lastName'],
         "phone" => $_POST['phone'],
         "fieldValues" => Array(
               [
                        "field" => "34",
                        "value" => $_POST['instrutor']
               ],
               [
                        "field" => "37",
                        "value" => $_POST['evento']
               ],
               [
                        "field"=> "47",
                        "value"=> 'Nova isncrição em palestra'
               ],
               [
                        "field" => "41",
                        "value" => $_POST['oqueTrouxe']
               ],
               [
                        "field" => "42",
                        "value" => $_POST['dataPalestra']
               ],
               [
                        "field" => "43",
                        "value" => $_POST['horaPalestra']
               ],
               [
                        "field" => "44",
                        "value" => $_POST['dataHoraPalestra']
               ],
         )
      )
   );
   $ch = curl_init($url); 
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Api-Token: '.$key));

	$result = curl_exec($ch);
   var_dump($result);
	curl_close($ch);
   $contactId = json_decode($result)->fieldValues[0]->contact;

   if($contactId){
      $url = 'https://meditacaotranscedental.api-us1.com/api/3/contactLists';
      $payload = Array(
         "contactList"=> Array(
             "list"=> 4,
             "contact"=> $contactId,
             "status"=> 1
         )
      );
      $ch = curl_init($url); 
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
      curl_setopt($ch, CURLOPT_HTTPHEADER, array('Api-Token: '.$key));
      $result = curl_exec($ch);

      curl_close($ch);

      $url = 'https://meditacaotranscedental.api-us1.com/api/3/contactTags';
      $payload = Array(
         "contactTag"=> Array(
            "contact"=> $contactId,
            "tag"=> "21"
         )
      );
      $ch = curl_init($url); 
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); 
      curl_setopt($ch, CURLOPT_HTTPHEADER, array('Api-Token: '.$key));
      $result = curl_exec($ch);

      curl_close($ch);
   }
   echo true;

   die;
}


?>
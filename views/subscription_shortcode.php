<div id="mt_subscription_shortcode">
    <div id="mt_container">
        <div id="mt_filters">

        </div>

        <div id="mt_filter_results">

        </div>

        <!-- Form when there is no events for selected filter -->
        <div id="mt_empty_form">
            <?php include('empty_result_form.php'); ?>
        </div>

        <!-- When Loading --->
        <div id="mt_loader_overlay">
            <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

        <div id="mt_message_overlay_error">
            <h2> Ops...</h2>
            <h3>Não foi possível realizar sua inscrição, verifique os dados informados e tente novamente </h3>
            <button class="mt_btn_default" onclick="closeModal()"> Ok </button>
        </div>

        <div id="mt_message_overlay_success">
            <h2> Obrigada!</h2>
            <h3> 
                Sua inscrição foi realizada com sucesso! <br/>
                Você receberá as informações do evento no seu email.
            </h3>
            <button class="mt_btn_default" onclick="closeModal()"> Ok </button>
        </div>

    </div>
</div>





<script>
    const ajaxurl = '<?php echo admin_url( 'admin-ajax.php' ); ?>';
    const baseurl = '<?php echo plugin_dir_url( __FILE__ ); ?>';
    
    let $ = document.querySelector.bind(document);

    const controller = new EventsController(ajaxurl, baseurl, $("#mt_filter_results"));
    const filterController = new FilterController(ajaxurl, baseurl, $("#mt_filters"));
    let eventList = [];
    let orderBy = "";
    let state = new State();
    let city = new City();
    let states = [];
    let cities = [];

    let firstName = "";
    let lastName = "";
    let email = "";
    let phone = "";

    render();

    async function render(){
        jQuery("#mt_loader_overlay").fadeIn();
        await getEvents();
        await getFilterEntities();
        jQuery("#mt_loader_overlay").fadeOut();
    }
    async function getEvents() {
         eventList = await controller.list();
        if(eventList.length > 0){
            jQuery("#mt_filter_results").css('display', 'block');
            jQuery("#mt_empty_form").css('display', 'none');
            controller.renderItems(eventList);
        }else{
            jQuery("#mt_filter_results").css('display', 'none');
            jQuery("#mt_empty_form").css('display', 'block');
        }
    }
    async function getFilterEntities(){
        states = await state.list();
        filterController.renderFields(states, cities, "--");
    }

    async function bookingEvent(eventId){
        if(!firstName || !lastName || !email || !phone ){
            jQuery("#mt_message_overlay_error").fadeIn();
            jQuery("#mt_message_overlay_error").css('display', 'flex');
        }
        else{
            jQuery("#mt_loader_overlay").fadeIn();
            let bkEvent = eventList.filter(e => e.id == eventId);
            bkEvent = bkEvent[0];
            let booking = await controller.booking(bkEvent,email, firstName, lastName, phone, ajaxurl);
            if(booking){
                jQuery("#mt_message_overlay_success").fadeIn();
                jQuery("#mt_message_overlay_success").css('display', 'flex');
                jQuery("#mt_loader_overlay").fadeOut();
                setTimeout(function () {
                    location.reload(true);
                }, 4000);
            }else{
                jQuery("#mt_message_overlay_error").fadeIn();
                jQuery("#mt_message_overlay_error").css('display', 'flex');
                jQuery("#mt_loader_overlay").fadeOut();
            }
        }
    }


    const removeFilters = async() => {
        jQuery("#mt_loader_overlay").fadeIn();
        state = new State();
        city = new City();
        filterController.renderFields(states,[], "--");
        eventList = await controller.list();
        jQuery("#mt_filter_results").css('display', 'block');
        jQuery("#mt_empty_form").css('display', 'none');
        controller.renderItems(eventList);
        jQuery("#mt_loader_overlay").fadeOut();
    }

    //FilterEvents
    const filterEvents = async() => {
       jQuery("#mt_loader_overlay").fadeIn();
       

       eventList = await controller.list(1, moment(), orderBy, state.sigla ? state.sigla : false,
       
       city.nome ? city.nome : false);




       console.log(eventList);
       if(eventList.length > 0){
            jQuery("#mt_filter_results").css('display', 'block');
            jQuery("#mt_empty_form").css('display', 'none');
            controller.renderItems(eventList);
       }else{
            jQuery("#mt_filter_results").css('display', 'none');
            let texto = "";
            if(city?.nome)
                 texto = `Cidade: ${city.nome}, Estado: ${state.sigla}`;
            else{
                if(state?.sigla)
                     texto = `Estado: ${state.sigla}`;
            }    
            
            if(city?.nome || state?.sigla)
                jQuery("#cast").val(texto);
            jQuery("#mt_empty_form").css('display', 'block');
            
       }
       jQuery("#mt_loader_overlay").fadeOut();
    }

    //FilterInteractors
    const changeState = async(uf) =>{
        state.sigla = uf;
        cities = await city.getByUf(uf);
        filterController.renderFields(states, cities, uf);
    }
    const changeCity = (val) =>{
        city.nome = val;
    }
    const changeOrderBy = (order) => {
        orderBy = order;
        jQuery("#mt_loader_overlay").fadeIn();
        controller.orderBy(eventList, orderBy);
        controller.renderItems(eventList);
        jQuery("#mt_loader_overlay").fadeOut();
    }

    //DOOM Controller
    function closeModal(){
        jQuery("#mt_message_overlay_success").fadeOut();
        jQuery("#mt_message_overlay_error").fadeOut();
    }
    const toggleSubmission = (key) => {
        let $ = jQuery;
        let element = $(`#mt_event_details_subscriptions_${key}`);
        if(!element.hasClass('oppened')){
            $(".mt_event_details_subscriptions.oppened").removeClass('oppened');
            element.addClass('oppened');
            $(".mt_event_details_container").css('display', 'none');
        }else{
            $(".mt_event_details_container").css('display', 'block');
            element.removeClass('oppened');
        }  
    }
    function toggleDetails(event_key){
        let $ = jQuery;
        let element = $(`#mt_event_details_${event_key}`);
        if(!element.hasClass('oppened')){
            $(".mt_event_details.oppened").removeClass('oppened');
            $(".mt_event_details_container").css('display', 'block');
            $(".mt_event_details_subscriptions.oppened").removeClass('oppened');
            element.addClass('oppened');
        }else{
            element.removeClass('oppened');
            $(".mt_event_details_container").css('display', 'block');
            $(".mt_event_details_subscriptions.oppened").removeClass('oppened');
        }
    }


</script>
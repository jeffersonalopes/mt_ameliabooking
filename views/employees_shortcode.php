<?php 
   $all_users = get_users();
   $userInfos = [];
   foreach($all_users  as $user){
    
    $desc = get_user_meta($user->ID)['description'][0];
    $userInfos[] = [
        'email' => $user->data->user_email,
        'id' => $user->ID,
        'otherPlaces' => $desc ? explode(';', $desc) : []
    ];
   }

?>
<div id="mt_employees_shortcode" class="p-0">
    <div id="mt_container">
        <div id="mt_filters">

        </div>
        <br/>
        <br/>
        <section  class="instrutores-carousel">
            <div class="container">
                <div id="mt-instrutores" class="swiper mt-swiperInstrutores" data-bs-ride="carousel">
                    <div class="swiper-wrapper" id="mt_employees_result">
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                </div>
            </div>
        </section>

        <div id="mt_loader_overlay">
            <div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    </div>
</div>

<script>
    
    const ajaxurl = '<?php echo admin_url( 'admin-ajax.php' ); ?>';
    const baseurl = '<?php echo site_url(); ?>';
    let $ = document.querySelector.bind(document);
    let employee_list = [];
    //Get alla employee
    let wp_user_infos = <?php echo json_encode($userInfos) ?>;
    const controller = new EmployeeController(ajaxurl, baseurl, $("#mt_employees_result"));
    const filterController = new EmployeeFilterController(ajaxurl, baseurl, $("#mt_filters"));

    let orderBy = "";
    let state = new State();
    let city = new City();
    let states = [];
    let cities = [];
    let currentName = "";



    render();

    async function render() {
        jQuery("#mt_loader_overlay").fadeIn();
        await getEmployees();
        await getFilterEntities();
        jQuery("#mt_loader_overlay").fadeOut();      
    }

    async function getEmployees() {
        employee_list = await controller.list(false, false, false, wp_user_infos);
        controller.renderItems(employee_list);
        startSlider();
    }

    async function getFilterEntities(){
        states = await state.list();
        filterController.renderFields(states, cities, "--", "--", currentName);
    }

    function filterByName(str){
        currentName = str;
        let result = employee_list;
        result = result.filter(e => e.firstName.toLowerCase().includes(str.toLowerCase()) || e.lastName.toLowerCase().includes(str.toLowerCase()));
        controller.renderItems(result);
        console.log(result);
        startSlider();
    }


    

    function startSlider() {
        jQuery(document).ready(function() {
        var swiper = new Swiper(".mt-swiperInstrutores", {
            slidesPerView: 4,
            slidesPerGroup: 4,
            loop: false,
            spaceBetween: 10,
            autoplay: true,
			 autoplay: {
			  delay: 3000,
		 	},
            centeredSlides:false,
            pagination: {
            el: ".swiper-pagination",
            clickable: true,
            },
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            },
            breakpoints: {
            320: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 0,
            },
			768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 0,
            },		
            992: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 0,
            },
            },
        });
        });
    }


    const removeFilters = async() => {
        jQuery("#mt_loader_overlay").fadeIn();
        currentName = "";
        state = new State();
        city = new City();
        filterController.renderFields(states, cities, "--", "--", currentName);
        employess = await controller.list();
        jQuery("#mt_employees_result").css('display', 'flex');
        controller.renderItems(employess);
        startSlider();
        jQuery("#mt_loader_overlay").fadeOut();
        
    }


    const filterEvents = async() => {
       jQuery("#mt_loader_overlay").fadeIn();
       
       console.log(city.nome);
       eventList = await controller.list(orderBy, state.sigla ? state.sigla : false,
       city.nome != '' ? city.nome : false);
       if(eventList.length > 0){
            jQuery("#mt_employees_result").css('display', 'flex');
            controller.renderItems(eventList);
       }else{
            jQuery("#mt_employees_result").css('display', 'none');
            let texto = "";
            if(city?.nome)
                 texto = `Cidade: ${city.nome}, Estado: ${state.sigla}`;
            else{
                if(state?.sigla)
                     texto = `Estado: ${state.sigla}`;
            }
       }
       startSlider();
       jQuery("#mt_loader_overlay").fadeOut();
    }


    //FilterInteractors
    const changeState = async(uf) =>{
        state.sigla = uf;
        cities = await city.getByUf(uf);
        filterController.renderFields(states, cities, uf, "--", currentName);
    }
    const changeCity = (val) =>{
        city.nome = val;
    }
    const changeOrderBy = (order) => {
        orderBy = order;
        jQuery("#mt_loader_overlay").fadeIn();
        controller.orderBy(employee_list, orderBy);
        controller.renderItems(employee_list);
        jQuery("#mt_loader_overlay").fadeOut();
        startSlider()
    }


</script>

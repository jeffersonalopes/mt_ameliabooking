<div id="mt_employees_shortcode">
    <div id="mt_container">
        <div id="mt_filters">

        </div>
        <br/>
        <br/>
        <section  class="instrutores-carousel">
            <div class="container">
                <div id="mt-instrutores" class="swiper mt-swiperInstrutores" data-bs-ride="carousel">
                    <div class="swiper-wrapper"  id="mt_employees_result">
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
    const controller = new EmployeeController(ajaxurl, baseurl, $("#mt_employees_result"));
    const filterController = new FilterController(ajaxurl, baseurl, $("#mt_filters"));

    let orderBy = "";
    let state = new State();
    let city = new City();
    let states = [];
    let cities = [];




    render();

    async function render() {
        jQuery("#mt_loader_overlay").fadeIn();
        await getEmployees();
        await getFilterEntities();
        jQuery("#mt_loader_overlay").fadeOut();      
    }

    async function getEmployees() {
        employee_list = await controller.list();
        controller.renderItems(employee_list);
        startSlider();
    }

    async function getFilterEntities(){
        states = await state.list();
        filterController.renderFields(states, cities, "--", "--", false);
    }

    function startSlider() {
        jQuery(document).ready(function() {
        var swiper = new Swiper(".mt-swiperInstrutores", {
            slidesPerView: 2,
            slidesPerGroup: 2,
            loop: true,
            spaceBetween: 5,
            pagination: {
            el: ".swiper-pagination",
            clickable: true,
            },
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            },
            breakpoints: {
            576: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 5,
            },
            992: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: 5,
            },
            },
        });
        });
    }


    const removeFilters = async() => {
        jQuery("#mt_loader_overlay").fadeIn();
        filterController.renderFields(states,[], "--");
        employess = await controller.list();
        jQuery("#mt_employees_result").css('display', 'flex');
        controller.renderItems(employess);
        startSlider();
        jQuery("#mt_loader_overlay").fadeOut();
        
    }


    const filterEvents = async() => {
       jQuery("#mt_loader_overlay").fadeIn();
       
       console.log(state.sigla);
       eventList = await controller.list(orderBy, state.sigla ? state.sigla : false,
       city.nome ? city.nome : false);
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
        filterController.renderFields(states, cities, uf);
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
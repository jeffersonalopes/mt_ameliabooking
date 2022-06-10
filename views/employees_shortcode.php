<div id="mt_employees_shortcode">
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
</div>

<script>
    const ajaxurl = '<?php echo admin_url( 'admin-ajax.php' ); ?>';
    const baseurl = '<?php echo plugin_dir_url( __FILE__ ); ?>';
    let $ = document.querySelector.bind(document);
    let employee_list = [];
    //Get alla employee
    const controller = new EmployeeController(ajaxurl, baseurl, $("#mt_employees_result"));


    render();

    async function render() {
        await getEmployees();
        console.log(employee_list);      
    }

    async function getEmployees() {
        employee_list = await controller.list();
        controller.renderItems(employee_list);
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

</script>
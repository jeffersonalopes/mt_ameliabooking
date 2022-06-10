<div id="mt_employee_container">

</div>


<script>

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    };

    const id = getUrlParameter('id'); //Get id from url.
    const ajaxurl = '<?php echo admin_url( 'admin-ajax.php' ); ?>';
    const baseurl = '<?php echo get_template_directory_uri(); ?>';
    let $ = document.querySelector.bind(document);

    let controller = new EmployeeController(ajaxurl, baseurl, $("#mt_employee_container"));
    let employee = new Employee()
    
    getEmployee = async(id) => {
       return employee.find(id,ajaxurl)
    } 

    render = async() =>{
        employee = await getEmployee(id);
        controller.render(employee);
    }

    render();

    


    

</script>
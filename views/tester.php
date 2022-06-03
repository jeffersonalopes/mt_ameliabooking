





<script>
    const ajaxurl = '<?php echo admin_url( 'admin-ajax.php' ); ?>';
    const baseurl = '<?php echo plugin_dir_url( __FILE__ ); ?>';
    let $ = document.querySelector.bind(document);


    let controller = new EmployeeController(ajaxurl, baseurl, $("#mt_employee_slider"));
    let employee = new Employee();

    const getEmployees = async() => {
        let employeList = await controller.list();
        console.log(employeList);
    }

    getEmployees();


</script>
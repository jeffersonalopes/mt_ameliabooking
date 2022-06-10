


<script>
    const id = 12 //Get id from url.
    const ajaxurl = '<?php echo admin_url( 'admin-ajax.php' ); ?>';
    const baseurl = '<?php echo plugin_dir_url( __FILE__ ); ?>';
    let $ = document.querySelector.bind(document);

    const controller = new EmployeeController(ajaxurl, baseurl, $("#mt_employee_container"));
    let employee = new Employee()
    
    render = async() =>{
        await getEmployee(id);
        
    }

    render();

    getEmployee = async(id) => {
        employee = employee.find(id)
    } 

</script>
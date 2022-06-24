

<style>
    .am-add-event-date{
        display: none;
    }
    .am-cabinet-user-initials > img{
        max-width:100% !important;
    }
</style>

<script type="text/javascript">
    let $ = jQuery;


    $(document).ready(function(){
        $(".am-add-event-date").remove();

        setInterval(function () {
            $(".el-row:contains('Organizer') .el-checkbox").addClass('is-checked')
            $(".el-row:contains('Organizador') .el-checkbox").addClass('is-checked')
            
            $(".el-row:contains('Organizer') .el-checkbox .el-checkbox__input").addClass('is-checked');
            $(".el-row:contains('Organizador') .el-checkbox .el-checkbox__input").addClass('is-checked');

            

            $(".am-has-divider:contains('Periods')").remove();
            $(".el-row:contains('Tags')").remove();

            $(".am-section-grey:contains('This is recurring event')").remove()
            $(".am-section-grey:contains('Este evento se repete')").remove()

            $(".el-row:contains('Custom Address')")[1].remove()
            $(".el-row:contains('Endereço personalizado')")[1].remove()

            $(".el-row:contains('Allow bringing more persons')").remove()
            $(".el-row:contains('Allow the same customer to book more than once')").remove()

           

        }, 200)

        let numberSeted = false;

        var intervalNumber = setInterval(function () {
            if(jQuery(".el-input-number .el-input .el-input__inner").length > 0){
                if(numberSeted == false){
                    $(".el-input-number .el-input .el-input__inner").val(100);
                    $(".el-input-number .el-input .el-input__inner").data('aria-valuenow',100);

                   
                    numberSeted = true;
                }
            }
        }, 1000) 
        

        //Add default description
        var interval = setInterval(function () {
            if(jQuery("#am-cabinet .el-textarea__inner").length > 0){
                if(jQuery("#am-cabinet .el-textarea__inner").val != ''){
                    jQuery("#am-cabinet .el-textarea__inner").html(`Essa é a primeira etapa do processo de aprendizagem da MT. A palestra gratuita é uma oportunidade imperdível para você conhecer mais detalhes sobre a técnica e seus benefícios, e também tirar suas dúvidas sobre o curso.`);
                }
            }
        }, 1000) 
     

    });
    
</script>
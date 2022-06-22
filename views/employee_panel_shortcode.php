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
            $(".am-has-divider:contains('Periods')").remove();
            $(".el-row:contains('Tags')").remove();
            $(".el-row:contains('Organizer') .el-checkbox").addClass('is-checked')
            $(".el-row:contains('Organizer') .el-checkbox .el-checkbox__input").addClass('is-checked');
        }, 200)

        //Add default description
        var interval = setInterval(function () {
            if(jQuery("#am-cabinet .el-textarea__inner").length > 0){
                if(jQuery("#am-cabinet .el-textarea__inner").val != ''){
                    jQuery("#am-cabinet .el-textarea__inner").html(`Essa é a primeira etapa do processo de aprendizagem da MT. A palestra gratuita é uma oportunidade imperdível para você conhecer mais detalhes sobre a técnica e seus benefícios, e também tirar suas dúvidas sobre o curso.`);
                }
            }
        }, 1000) 
        
        var numberInterval = setInterva(function () {
            jQuery(".el-input-number .el-input .el-input__inner").val(100);
            jQuery(".el-input-number .el-input .el-input__inner").data('aria-valuenow',100);
        }, 1000);

    });
    
</script>
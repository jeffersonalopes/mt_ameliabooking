class EmployeeView extends View {
    constructor(elemento, scope, baseUrl){
        super(elemento, scope, baseUrl);
    }

    template(model, baseUrl){
        let uniteNames = model.otherLocations;
        uniteNames = uniteNames.filter(u => u != " " && u != "");
        return(
            `
            <section class="instrutor-profile">
                <div class="col-12 instrutor-picture-mobile mb-5 text-center d-block d-lg-none">
                    <img loading="lazy" src='${model.pictureFullPath}' alt="Instrutor">  
                </div>
                <div class="container">
                    <div class="row d-flex justify-content-center align-items-stat">
                    <div class="col-12 col-lg-5 instrutor-picture pe-lg-4 mb-4 mb-lg-0 text-center d-none d-lg-block">
                        <img loading="lazy" src=${model.pictureFullPath}' alt="Instrutor">  
                    </div>
                    <div class="col-12 col-lg-7 instrutor-bio">
                        <div class="d-flex align-items-center justify-content-start mb-2 mb-lg-4">
                        <div class="mt-icon"><img loading="lazy" src= '${baseUrl}/images/instrutor/mt.png' alt="mt."></div>
                        <h1>${model.firstName} ${model.lastName}</h1>
                        </div>
                        <div class="instrutor-address">
                        <div class="d-flex align-items-center align-items-lg-baseline justify-content-start mb-2"><img loading="lazy" src='${baseUrl}/images/instrutor/map.png'  alt="Mapa"> <p><strong>Onde atua:</strong>
                        ${uniteNames ? uniteNames.map(un => un != " " && un != "" ? `${un}` : '' ).join(',') : ''}</p></div> 
                        ${
                            uniteNames.length > 0 ? `
                                <div class="d-flex align-items-center align-items-lg-baseline mb-2"><img loading="lazy" src='${baseUrl}/images/instrutor/building.png' alt="Prédio"> <p><strong>Unidades em que atua: ${model.addressLine ? model.addressLine : ''}</strong>
                                    
                                </p></div> 
                            ` : ``
                        }
                        </div>
                        <div class="mt-4">
                        <p>
                            ${model.note ? model.note : ''}
                        </p>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="instrutor-contact">
                <div class="container">
                <div class="row d-flex align-items-baseline">
                    <div class="col-12 col-lg-5">
                    <h2>Vamos <strong>conversar?</strong></h2>
                    <div class="text-center text-lg-start">
                        <a href="https://api.whatsapp.com/send?phone=${model.phone}&text=Ol%C3%A1%2C%20vim%20do%20site%20meditacaotranscendental.com.br" class="btn"> 
                        <img loading="lazy" src='${baseUrl}/images/instrutor/wpp.png' alt="Whatsapp"> Fale comigo no Whatsapp
                        </a>
                    </div>
                    </div>
                    <div class="col-12 col-lg-7 mt-4 mt-lg-0">
                        <form id="employee-send-contact" onsubmit="sendContactForm(event,this)">
                            <div class="form-group">
                                <input required type="text" class="form-control" id="contactName" aria-describedby="textHelp" placeholder="Nome">
                            </div>
                            <div class="row">
                            <div class="col-12 col-md-6 form-group">
                                <input required type="email" class="form-control" id="contactEmail" aria-describedby="emailHelp" placeholder="Email">
                            </div>
                            <div class="col-12 col-md-6 form-group">
                                <input required type="phone" class="form-control" id="contactPhone" aria-describedby="phoneHelp" placeholder="Telefone">
                            </div>
                            </div>
                            <div class="form-group">
                            <textarea required class="form-control" id="contactMessage" rows="7" placeholder="Sua mensagem"></textarea>
                            </div>
                            <div class="text-end">
                            <button type="submit" class="btn">Enviar Mensagem</button>
                            </div>
                        </form>
                    </div>
                </div>

                </div>
            </section>
            
            `
        );
    }
}
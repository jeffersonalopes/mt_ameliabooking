class Employee extends View {
    constructor(elemento, scope, baseUrl){
        super(elemento, scope, baseUrl);
    }

    template(model, baseUrl){
        return(
            `
            <section class="instrutor-profile">
                <div class="col-12 instrutor-picture-mobile mb-5 text-center d-block d-lg-none">
                    <img loading="lazy" src='${model.pictureFullPath}' ?> alt="Instrutor">  
                </div>
                <div class="container">
                    <div class="row d-flex justify-content-center align-items-stat">
                    <div class="col-12 col-lg-5 instrutor-picture pe-lg-4 mb-4 mb-lg-0 text-center d-none d-lg-block">
                        <img loading="lazy" src=${model.pictureFullPath}' ?> alt="Instrutor">  
                    </div>
                    <div class="col-12 col-lg-7 instrutor-bio">
                        <div class="d-flex align-items-center justify-content-start mb-2 mb-lg-4">
                        <div class="mt-icon"><img loading="lazy" src= '${baseUrl}/images/instrutor/mt.png' ?> alt="mt."></div>
                        <h1>${model.firstName} ${model.lastName}</h1>
                        </div>
                        <div class="instrutor-address">
                        <div class="d-flex align-items-center align-items-lg-baseline justify-content-start mb-2"><img loading="lazy" src='${baseUrl}/images/instrutor/map.png' ?> alt="Mapa"> <p><strong>Onde atua:</strong> ${model.location.name}</p></div> 
                        <div class="d-flex align-items-center align-items-lg-baseline mb-2"><img loading="lazy" src='${baseUrl}/images/instrutor/building.png' ?> alt="Prédio"> <p><strong>Unidade:</strong> Planalto Paulista (SP) – Av. Piassanguaba, 658</p></div> 
                        </div>
                        <div class="mt-4">
                        <p>
                            ${model._note}
                        </p>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
            `
        );
    }
}
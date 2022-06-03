class EmployeeSlideItem extends View {
    constructor(elemento, scope, baseUrl) {
        super(elemento, scope, baseUrl);
    }
    template(model, baseUrl) {
        return (model.map((e,key) => {
        
            return (`
                <div key="${key}" class="swiper-slide col-12 col-lg-3 d-flex align-items-center justify-content-center p-0">
                    <div class="box rounded-circle text-center">
                    <div class="default">
                        <img loading="lazy" class="img-fluid" src="${e.pictureFullPath}"
                        alt="Instrutores">
                    </div>
                    <div class="hover">
                        <div>
                        <h6>${e.firstName} ${e.lastName}</h6>
                        <p>Londrina, PR</p>
                        <p>Porto Alegre, RS</p>        
                        </div>
                        <div class="d-flex align-items-center justify-content-center mt-3">
                            <a href="${e.id}" class="btn background-primary-light me-1">
                                Saiba +
                            </a>
                            <a href="#" class="btn background-green-whatsapp">
                                Contato
                            </a>
                        </div>
                    </div>
                    </div>
                </div>
            `).join("")
        }))
    };

}
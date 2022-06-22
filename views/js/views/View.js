class View{
    constructor(elemento, scope = false, baseUrl){
        this._elemento = elemento;
        this._scope = scope;
        this._baseUrl = baseUrl;
    }

    template(){
        throw new Error("O método template deve ser implementado!");
    }

    update(model, date = true){
        this._elemento.innerHTML = this.template(model, this._baseUrl, date);
    }
}
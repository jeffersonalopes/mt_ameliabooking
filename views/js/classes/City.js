class City{
    constructor(id = "",  nome = ""){
        this._id = id;
        this._nome = nome;
    }

    constructByResponse = (responseObj) => {
        Object.keys(this).forEach((i)=>{
            this[i] = responseObj[i.replace('_','')];
        });
        return this;
    }

    getByUf = async(uf) => {
        let regions = await axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        let citiesList = [];
        if(regions.status == 200){
            regions.data.forEach(e => {
                let newCity = new City(e.id, e.nome);
                citiesList.push(
                    newCity
                );
            });
            return citiesList;
        }
        return false;
    }

    get id(){
        return this._id;
    }
    get nome(){
        return this._nome;
    }

    set id(id){
        this._id = id;
    }
    set nome(nome){
        this._nome = nome;
    }

}
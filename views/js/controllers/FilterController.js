class FilterController{
    constructor(ajaxUrl, baseUrl, container, state = new State()
    , cities = []){
        this._ajaxUrl = ajaxUrl;
        this._baseUrl = baseUrl;
        this._container = container;
        this._state = state;
        this._cities = cities;
        this._view = new FilterFields(container, this, baseUrl);
    }

    renderFields(states, cities, selectedState, selectedCity, date = true){
        this._view.update({states: states, cities: cities, selectedState: selectedState, selectedCity: selectedCity}, date);
    }

    

}
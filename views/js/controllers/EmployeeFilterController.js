class EmployeeFilterController{
    constructor(ajaxUrl, baseUrl, container, state = new State()
    , cities = [], name){
        this._ajaxUrl = ajaxUrl;
        this._baseUrl = baseUrl;
        this._container = container;
        this._state = state;
        this._cities = cities;
        this._name = name;
        this._view = new EmployeeFilterFields(container, this, baseUrl);
    }

    renderFields(states, cities, selectedState, selectedCity, currentName = ''){
        this._view.update({states: states, cities: cities, selectedState: selectedState, selectedCity: selectedCity, currentName: currentName});
    }

    

}
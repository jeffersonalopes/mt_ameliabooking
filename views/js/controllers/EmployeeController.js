class EmployeeController {
    constructor(ajaxUrl, baseUrl, container, employee = new Employee()) {
        this._container = container;
        this._ajaxUrl = ajaxUrl;
        this._baseUrl = baseUrl;
        this._employee = employee ? employee : new Employee()
    }

    renderItems(employeeList) {
        
    }

    list = async () => {
        let entities_consult = await axios.get(`${this._ajaxUrl}/?action=wpamelia_api&call=/entities&types[]=employees&types[]=locations`);
        let employeeList = [];
        if(entities_consult.status == 200){
            let locations = entities_consult.data.data.locations;
            let entities = entities_consult.data.data.employees;
            entities.forEach((e) => {
                let employeeItem = new Employee();
                employeeItem.constructByObjects(e);
                employeeItem.location = locations.find(loc => loc.id == employeeItem.locationId);
                employeeList.push(employeeItem);
            });
            return employeeList;
        }   
        return false;
    }



}
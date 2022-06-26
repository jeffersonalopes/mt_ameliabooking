class EmployeeController {
    constructor(ajaxUrl, baseUrl, container, employee = new Employee()) {
        this._container = container;
        this._ajaxUrl = ajaxUrl;
        this._baseUrl = baseUrl;
        this._employee = employee ? employee : new Employee()
        this._listView = new EmployeeSlideItem(container, this, baseUrl);
        this._view = new EmployeeView(container, this, baseUrl);
    }

    renderItems(employeeList) {
        this._listView.update(employeeList);
    }

    render(employee){
        console.log(employee);
        this._view.update(employee);
    }

    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {

                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            
        }
    }

    list = async (orderBy = false, stateFilter = false, cityFilter = false, userInfo = false, currentName = false) => {
        let entities_consult = await axios.get(`${this._ajaxUrl}/?action=wpamelia_api&call=/entities&types[]=employees&types[]=locations`);
        let employeeList = [];
        if(entities_consult.status == 200){
            let locations = entities_consult.data.data.locations;
            let entities = entities_consult.data.data.employees;
            entities.forEach((e) => {
                let filterPass = true;
                let employeeItem = new Employee();
                let e_location = locations.find(loc => loc.id == e.locationId);
                let location = new Location();
                let otherLocations = [];
                if(userInfo){
                    let info = userInfo.filter(u => e.email == u.email ? u.otherPlaces : false)[0];
                    if(info){
                        otherLocations = info.otherPlaces;
                    }
                }
                e.otherLocations = otherLocations;

                

                if(e_location){
                    if(cityFilter){
                        if(!e_location.name.toLowerCase().includes(cityFilter.toLowerCase()) 
                        || !e_location.name.toLowerCase().includes(stateFilter.toLowerCase()))
                            filterPass = false;
                    }else{
                        if(stateFilter)
                            if(!e_location.name.toLowerCase().includes(stateFilter.toLowerCase()+' '))
                                filterPass = false;
                    }
                }else{
                    if(cityFilter || stateFilter){
                        filterPass = false;
                    }
                }

                

                employeeItem.constructByObjects(e, e_location ? location.constructByObjects(e_location) : false);
                
                
                if(filterPass){
                    employeeList.push(employeeItem);
                }
                //FilterByName
                if(currentName != " " && currentName){
                    employeeList = employeeList.filter(e => e.firstName.toLowerCase().includes(currentName.toLowerCase()) || e.lastName.toLowerCase().includes(currentName.toLowerCase()));
                }

                if(orderBy){
                    switch(orderBy){
                        case 'instrutor':
                            employeeList = employeeList.sort(this.dynamicSort("_instrutor"));
                        break;
                        case 'local':
                            employeeList = employeeList.sort(this.dynamicSort("_local"));
                    }
                }
            });
            return employeeList;
        }   
        return false;
    }


    
    orderBy = function(eventList, orderBy) {
        if(orderBy){
            switch(orderBy){
                case 'instrutor':
                    eventList = eventList.sort(this.dynamicSort("_instrutor"));
                break;
                case 'local':
                    eventList = eventList.sort(this.dynamicSort("_local"));
            }
        }
        return eventList;
    }


}
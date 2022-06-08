class EventsController {
    constructor(ajaxUrl, baseUrl, container, event = new Event()){
        this._container = container;
        this._ajaxUrl = ajaxUrl;
        this._baseUrl = baseUrl;;
        this._event = event ? event : new Event();
        this._view = new EventItem(container, this, baseUrl)
        this._listView = new EventItem(container, this, baseUrl);
    }

    renderItems(eventList){
        let $ = document.querySelector.bind(document);
        this._view.update(eventList);
    }

    dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            if(property == "_start"){
                var result = (moment(a[property]).isBefore(moment(b[property]))) ? -1 : (moment(a[property]).isAfter(moment(b[property]))) ? 1 : 0;
                return result * sortOrder;
            }else{
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }
    }

    list = async(page = 1, startDate = moment(), orderBy = false, stateFilter = false, cityFilter = false) => {
        let entities_consult = await axios.get(`${this._ajaxUrl}?action=wpamelia_api&call=/entities&types[]=locations&types[]=tags&types[]=custom_fields&types[]=employees`);     
        let events_consult = await axios.get(`${this._ajaxUrl}?action=wpamelia_api&call=/events&dates[]=${startDate.format('YYYY-MM-DD')}&page=${page}`);
        let events = events_consult.data.data.events;
        let entities = entities_consult.data.data;

        while(events_consult.data.data.count > events.length) {
            events_consult =  await axios.get(`${this._ajaxUrl}?action=wpamelia_api&call=/events&dates[]=${startDate.format('YYYY-MM-DD')}&page=${page}`);
            if (events_consult.data.data.events.length > 0)
                events.push(events_consult.data.data.events);
        }

        let eventList = [];

        console.log(cityFilter);
        
        events.forEach((e) => {
            let filterPass = true;
            let e_location = entities.locations.filter( l => l.id == e.locationId)[0];
            let e_organizer = entities.employees.filter( o => o.id == e.organizerId)[0];
            let newEvent = new Event();
            let location = new Location();
            let employee = new Employee();

            if(cityFilter){
                if(!e_location.name.toLowerCase().includes(cityFilter.toLowerCase()) 
                || !e_location.name.toLowerCase().includes(stateFilter.toLowerCase()))
                    filterPass = false;
            }else{
                if(stateFilter)
                    if(!e_location.name.toLowerCase().includes(stateFilter.toLowerCase()))
                        filterPass = false;
            }

            newEvent = newEvent.constructByObjects(e,  e_organizer ? employee.constructByObjects(e_organizer) : false,
            e_location ? location.constructByObjects(e_location) : false);
            if(filterPass){
                eventList.push(newEvent);
            }
           
        });

        if(orderBy){
            switch(orderBy){
                case 'instrutor':
                    eventList = eventList.sort(this.dynamicSort("_instrutor"));
                break;
                case 'local':
                    eventList = eventList.sort(this.dynamicSort("_local"));
                case 'data':
                    eventList = eventList.sort(this.dynamicSort("_start"));
            }
        }

        
        console.log(eventList);

        return eventList;
    }

    orderBy = function(eventList, orderBy) {
        if(orderBy){
            switch(orderBy){
                case 'instrutor':
                    eventList = eventList.sort(this.dynamicSort("_instrutor"));
                break;
                case 'local':
                    eventList = eventList.sort(this.dynamicSort("_local"));
                case 'data':
                    eventList = eventList.sort(this.dynamicSort("_start"));
            }
        }
        return eventList;
    }


    

}
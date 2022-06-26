class Employee{
    constructor(birthday= moment(),email= "",firstName= "",
        id= 0,lastName= "",locationId= 0, note= "",phone= "",
        pictureFullPath= "",pictureThumbPath= "",status= "",
        type= "", location = new Location(), events = [], otherLocations = []
    ){
        this._birthday = birthday;
        this._email = email;
        this._firstName = firstName;
        this._lastName = lastName;
        this._id = id;
        this._locationId = locationId;
        this._location = location ? location : new Location();
        this._note = note;
        this._phone = phone;
        this._pictureFullPath = pictureFullPath;
        this._pictureThumbPath = pictureThumbPath;
        this._status = status;
        this._events = events;
        this._otherLocations = otherLocations
        this._type = type;
    }


    find = async(id,ajaxUrl, wp_user_infos = false) => {
        let entities_consult = await axios.get(`${ajaxUrl}/?action=wpamelia_api&call=/entities&types[]=employees&types[]=locations`);
        let employeeList = [];
        if(entities_consult.status == 200){
            let locations = entities_consult.data.data.locations;
            let entities = entities_consult.data.data.employees;
            entities = entities.filter(e => e.id == id);
            let e = entities[0];
            let employeeItem = new Employee();
            let eventsController = new EventsController(ajaxUrl);
            let e_location = locations.find(loc => loc.id == e.locationId);
            let location = new Location();
            let otherPlaces = '';
            if(wp_user_infos){
                let info = wp_user_infos.filter(u => e.email == u.email ? u.otherPlaces : false)[0];
                if(info){
                    otherPlaces = info.otherPlaces;
                }
            }

            e.otherLocations = otherPlaces;
            employeeItem.constructByObjects(e, e_location ? location.constructByObjects(e_location) : false);
            employeeItem.events = await eventsController.listByOrganizer(employeeItem.id);
            employeeList.push(employeeItem);
        
            console.log(employeeList);
            return employeeList[0];
        }   
        return false;
    }

    constructByObjects = (obj, location) => {
        Object.keys(this).forEach((i,k)=>{
            if(i == "_location"){
                this[i] = location;
            }else{
                this[i] = obj[i.replace('_','')];
            }
        });
        return this;
    }

    get events() {
        return this._events;
    }
    get location() {
        return this._location;
    }

    get birthday(){
        return this._birthday;
    }
    get type(){
        return this._type;
    }
    get status(){
        return this._status;
    }
    get pictureFullPath(){
        return this._pictureFullPath;
    }
    get pictureThumbPath(){
        return this._pictureThumbPath;
    }
    get phone(){
        return this._phone;
    }
    get note(){
        return this._note;
    }
    get locationId(){
        return this._locationId;
    }
    get id(){
        return this._id;
    }
    get lastName(){
        return this._lastName;
    }
    get firstName(){
        return this._firstName;
    }
    get email(){
        return this._email;
    }
    get otherLocations(){
        return this._otherLocations;
    }

    set otherLocations(value){
        this._otherLocations = value;
    }
    set events(events){
        this._events = events;
    }
    set location(value){
        this._location = value;
    }
    set email(value){
        this._email = value;
    }
    set firstName(value){
        this._firstName = value;
    }
    set lastName(value){
        this._lastName = value;
    }
    set locationId(value){
        this._locationId = value;
    }
    set id(value){
        this._id = value;
    }
    set phone(value){
        this._phone = value;
    }
    set note(value){
        this._note = value;
    }
    set pictureFullPath(value){
        this._pictureFullPath = value;
    }
    set pictureThumbPath(value){
        this._pictureThumbPath = value;
    }
    set status(value){
        this._status = value;
    }
    set type(value){
        this._type = value;
    }
    set birthday(value){
        this._birthday = value;
    }

}
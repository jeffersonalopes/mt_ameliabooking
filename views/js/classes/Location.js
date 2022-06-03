class Location {
    constructor(
        address= "",description= "",id= 0,latitude= 0,
        longitude=0, name= "", phone= "",pictureFullPath= "",
        pictureThumbPath= "",pin= "",status= "",
    ){
        this._address = address;
        this._description = description;
        this._id = id;
        this._latitude = latitude;
        this._longitude = longitude;
        this._name = name;
        this._phone = phone;
        this._pictureFullPath = pictureFullPath;
        this._pictureThumbPath = pictureThumbPath;
        this._pin = pin;
        this._status = status;
    }

    find = async(id, ajaxUrl) => {
        let response = await axios.get(`${ajaxUrl}?action=wpamelia_api&call=/locations&id=${id}`);        
        response = response.data.data.locations;
        if(response.length < 0) {
            return false;
        }
        let responseObj = response[0];
        Object.keys(this).forEach((i,k)=>{
            this[i] = responseObj[i.replace('_','')];
        });
        return this;
    }

    constructByObjects = (obj) => {
        Object.keys(this).forEach((i,k)=>{
            this[i] = obj[i.replace('_','')];
        });
        return this;
    }

    get address() {
        return this._address;
    }
    get description() {
        return this._description;
    }
    get latitude() {
        return this._latitude;
    }
    get longitude() {
        return this._longitude;
    }
    get name() {
        return this._name;
    }
    get phone() {
        return this._phone;
    }
    get pictureFullPath() {
        return this._pictureFullPath;
    }
    get pictureThumbPath() {
        return this._pictureThumbPath;
    }
    get pin() {
        return this._pin;
    }
    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }
    set pin(value) {
        this._pin = value;
    }
    set pictureThumbPath(value) {
        this._pictureThumbPath = value;
    }
    set pictureFullPath(value) {
        this._pictureFullPath = value;
    }
    set phone(value){
        this._phone = value;
    }
    set name(value){
        this._name = value;
    }
    set latitude(value){
        this._latitude = value;
    }
    set longitude(value){
        this._longitude = value;
    }
    set description(value){
        this._description = value;
    }
    set address(value){
        this._address = value;
    }

}
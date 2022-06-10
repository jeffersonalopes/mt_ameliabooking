class Employee{
    constructor(birthday= moment(),email= "",firstName= "",
        id= 0,lastName= "",locationId= 0, note= "",phone= "",
        pictureFullPath= "",pictureThumbPath= "",status= "",
        type= "", location = new Location()
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
        this._type = type;
    }


    find = async(id,ajaxUrl) => {
        let response = await axios.get(`${ajaxUrl}?action=wpamelia_api&call=/users/providers&sort=employee`);
        response = response.data.data.users;
        if(response.length < 0) {
            return false;
        }
        let responseObj = response.filter(u => u.id == id);
        console.log(responseObj);
        responseObj = responseObj[0];
        
        Object.keys(this).forEach((i,k)=>{
            this[i] = responseObj[i.replace('_','')];
        });

        console.log(this);
        return this;
    }

    constructByObjects = (obj) => {
        Object.keys(this).forEach((i,k)=>{
            this[i] = obj[i.replace('_','')];
        });
        return this;
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
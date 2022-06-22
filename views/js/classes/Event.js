class Event {
    constructor(bookable= false,closed= false,created= moment(),
        description= "",id = 0, location = new Location(), locationId= 0, 
        maxCapacity= 0, name= "", opened= false, organizerId= 0,
        parentId= 58, periods= [], pictureFullPath= null, pictureThumbPath= null,
        price= 0, show= true, status= "", tags= [],type= "", organizer = new Employee()
    ){
        this._bookable = bookable;
        this._closed = closed;
        this._organizer = organizer ? organizer : new Employee();
        this._parentId = parentId;
        this._periods = periods;
        this._pictureFullPath = pictureFullPath;
        this._pictureThumbPath = pictureThumbPath;
        this._start = false;
        this._instrutor = "";
        this._local = "";
        this._price = price;
        this._show = show;
        this._status = status;
        this._tags = tags;
        this._type = type;
        this._name = name;
        this._opened = opened;
        this._organizerId = organizerId;
        this._maxCapacity = maxCapacity;
        this._description = description;
        this._created = created;
        this._id = id;
        this._location = location ? location : new Location();
        this._locationId = locationId;
    }
    
    find = async(id,ajaxUrl) => {
        let response = await axios.get(`${ajaxUrl}?action=wpamelia_api&call=/events&id=${id}`);
        response = response.data.data.events;
        if(response.length < 0) {
            return false;
        }
        let responseObj = response[0];
        Object.keys(this).forEach((i,k)=>{
            if(i != "booking")
                this[i] = responseObj[i.replace('_','')];
        });

        //Get Event Employee (Organizer)
        this._organizer = new Employee();
        this._organizer = await this._organizer.find(this._organizerId,ajaxUrl);

        //Get Event Location
        this._location = new Location();
        this._location = await this._location.find(this._locationId,ajaxUrl);

        return this;
    }

    booking = async(email, fistName, lastName, phone, ajaxUrl) => {
        let payload = {
            "type": "event",
            "bookings": [
                {
                    "customer": {
                        "email": email,
                        "externalId": null,
                        "firstName": fistName,
                        "id": null,
                        "lastName": lastName,
                        "phone": phone,
                        "countryPhoneIso": "br"
                    },
                    "customFields": {},
                    "customerId": null,
                    "extras": [],
                    "persons": 1,
                    "ticketsData": null,
                    "utcOffset": -180,
                    "deposit": false
                }
            ],
            "payment": {
                "amount": "0",
                "gateway": "onSite",
                "currency": "BRL"
            },
            "recaptcha": false,
            "locale": "pt_BR",
            "timeZone": "America/Sao_Paulo",
            "couponCode": "",
            "componentProps": {
                "phonePopulated": 0,
                "containerId": "amelia-app-booking0",
                "trigger": "",
                "useGlobalCustomization": 0,
                "bookableType": "event",
                "bookable": {
                    "id": this._id,
                    "name": this._name,
                    "price": this._price,
                    "depositData": null,
                    "maxCapacity": this._maxCapacity,
                    "color": "#1788FB",
                    "aggregatedPrice": 1,
                    "bookingStart": moment(this._periods[0].periodStart).format('YYYY-MM-DD HH:mm:ii'),
                    "bookingStartTime": moment(this._periods[0].periodStart).format('HH:mm:ii'),
                    "ticketsData": null
                },
                "recurringData": [],
                "hasCancel": 0,
                "hasHeader": 0,
                "appointment": {
                    "bookings": [
                        {
                            "customer": {
                                "email": email,
                                "externalId": null,
                                "firstName": fistName,
                                "id": null,
                                "lastName": lastName,
                                "phone": phone,
                                "countryPhoneIso": "br"
                            },
                            "customFields": {},
                            "customerId": null,
                            "extras": [],
                            "persons": 1
                        }
                    ],
                    "payment": {
                        "amount": "0",
                        "gateway": "onSite",
                        "currency": "BRL"
                    },
                    "group": 0
                },
                "dialogClass": "am-confirm-booking-events-list",
                "queryParams": {
                    "dates": [
                        moment().format("YYYY-MM-DD")
                    ],
                    "tag": null,
                    "locationId": null,
                    "page": 1,
                    "id": null,
                    "recurring": 0,
                    "providers": null
                }
            },
            "returnUrl": "http://localhost/colmmedt/eventos/",
            "eventId": this._id,
        }
        let booking_request = await axios.post(`${ajaxUrl}?action=wpamelia_api&call=/bookings`,
            payload
        )
        if(booking_request.status == 200){
            return true
        }
        return false;
    }

    constructByResponse = async(responseObj,ajaxUrl) => {
        Object.keys(this).forEach((i,k)=>{
            this[i] = responseObj[i.replace('_','')];
        });
        this._organizer = new Employee();
        this._organizer = await this._organizer.find(this._organizerId,ajaxUrl);
        this._location = new Location();
        this._location = await this._location.find(this._locationId,ajaxUrl);
        
        return this;
    }

    constructByObjects = (event, organizer, location) => {
        Object.keys(this).forEach((i,k)=>{
            if(i == "_instrutor"){
                this[i] = organizer.firstName +" "+ organizer.lastName;
            }else{
                if(i == "_local"){
                    this[i] = location.name;
                }else{
                    if(i == "_start"){
                        if(event.periods)
                            this[i] = moment(event.periods[0].periodStart);
                    }else{
                        this[i] = event[i.replace('_','')];
                    }
                }
            }
        });
        if(organizer != false)
            this._organizer = organizer;
        if(location != false)
            this._location = location;
        return this;
    }

    get start(){
        return this._start;
    }
    get instrutor(){
        return this._instrutor;
    }
    get local(){
        return this._local;
    }
    get locationId() {
        return this._locationId;
    }
    get location() {
        return this._location;
    }
    get id() {
        return this._id;
    }
    get created() {
        return this._created;
    }
    get description() {
        return this._description;
    }
    get opened() {
        return this._opened;
    }
    get name() {
        return this._name;
    }
    get type() {
        return this._type;
    }
    get tags() {
        return this._tags;
    }
    get status() {
        return this._status;
    }
    get show() {
        return this._show;
    }
    get price() {
        return this._price;
    }
    get closed() {
        return this._closed;
    }
    get organizer() {
        return this._organizer;
    }
    get parentId() {
        return this._parentId;
    }
    get periods() {
        return this._periods;
    }
    get pictureFullPath() {
        return this._pictureFullPath;
    }
    get pictureThumbPath() {
        return this._pictureThumbPath;
    }
    get bookable() {
        return this._bookable;
    }
    get maxCapacity() {
        return this._maxCapacity;
    }
    get organizerId(){
        return this._organizerId;
    }

    set start(value) {
        this._start = value;
    }
    set local(value) {
        this._local = value;
    }
    set instrutor(value) {
        this._instrutor = value;
    }
    set locationId(value){
        this._locationId = value;
    }
    set location(value){
        this._location = value;
    }
    set id(value){
        this._id = value;
    }
    set created(value){
        this._created = value;
    }
    set description(value){
        this._description = value;
    }
    set maxCapacity(value){
        this._maxCapacity = value;
    }
    set organizerId(value){
        this._organizerId = value;
    }
    set opened(value){
        this._opened = value;
    }
    set name(value){
        this._name = value;
    }
    set type(value){
        this._type = value;
    }
    set tags(value){
        this._tags = value;
    }
    set status(value){
        this._status = value;
    }
    set show(value){
        this._show = value;
    }
    set price(value){
        this._price = value;
    }
    set pictureThumbPath(value){
        this._pictureThumbPath = value;
    }
    set pictureFullPath(value){
        this._pictureFullPath = value;
    }
    set periods(value){
        this._periods = value;
    }
    set parentId(value){
        this._parentId = value;
    }
    set organizerId(value){
        this._organizerId = value;
    }
    set closed(value){
        this._closed = value;
    }
}
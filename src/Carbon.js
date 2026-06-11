import {
    formatter,
    encodedFormats,
    formatter_translator,
    FormaterObject,
    dateTimeFormatter,
    translationFormat,
    backTransletedFormat
} from './Helper.js';

class Carbon  {
    #now = new Date(Date.now());

    constructor(year = 0, month = 0, day = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, timeZone=null, time, dateTime = new Date(Date.UTC(this.#now.getFullYear(), this.#now(), this.#now.getDate(), this.#now.getHours(), this.#now.getMinutes(), this.#now.getSeconds(), this.#now.getMilliseconds()))) {
        this._year = year || dateTime.getFullYear() 
        this._month = month || dateTime.getMonth()
        this._date = day || dateTime.getDate();
        this._day = day || dateTime.getDay();
        this._hours = hours || dateTime.getHours();
        this._minutes = minutes || dateTime.getMinutes();
        this._seconds = seconds || dateTime.getSeconds();
        this._milliseconds = milliseconds || dateTime.getMilliseconds();

        this._timeZone = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        this._time = time || ""+(dateTime.getHours().toString().padStart(2, '0'))+":"+dateTime.getMinutes().toString().padStart(2, '0')+":"+dateTime.getSeconds().toString().padStart(2, '0');
        this.date = dateTime;
    }

    static now(){
        const parsedTime = new Date();

        const[day, month, adate, year, time, gmt, ...timeZone] = parsedTime.toString().split(' ');
        const [hours, minutes, seconds] = time.toString().split(':');
        
        this._year = parsedTime.getFullYear();
        this._month = parsedTime.getMonth() + 1;
        this._date = parsedTime.getDate();
        this._day = day || parsedTime.getDay();
        this._hours = parsedTime.getHours();
        this._minutes = parsedTime.getMinutes();
        this._seconds = parsedTime.getSeconds();
        this._milliseconds = parsedTime.getMilliseconds();

        this._timeZone = timeZone.join(' ');
        this._time = time;
        this.date = parsedTime;

        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,

            this._timeZone,
            this._time,
            this.date
        );
    }

    static today(){
        const now = new Date();
        const parsedTime = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDay(), 0, 0, 0))

        const[day, month, adate, year, time, gmt, ...timeZone] = parsedTime.toString().split(' ');
        const [hours, minutes, seconds] = time.toString().split(':');
        
        this._year = parsedTime.getFullYear();
        this._month = parsedTime.getMonth() + 1;
        this._date = parsedTime.getDate();
        this._day = day || parsedTime.getDay();
        this._hours = 0;
        this._minutes = 0;
        this._seconds = 0;
        this._milliseconds = 0;

        this._timeZone = timeZone.join(' ');
        this._time = time;
        this.date = parsedTime;

        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,
            this._timeZone,
            this._time,
            this.date
        );
    }

    static parse(timeToPass)
    {
        const parsedTime = new Date(Date.UTC(timeToPass));
        const[_date, _month, date, _year, _time, _gmt, _timeZone] = parsedTime.toString().split(' ');
        const [_hours, _minutes, _seconds] = _time.toString().split(':');
        
        this._year = parsedTime.getFullYear();
        this._month = parsedTime.getMonth() + 1;
        this._date = parsedTime.getDate();
        this._day = day || parsedTime.getDay();
        this._hours = parsedTime.getHours();
        this._minutes = parsedTime.getMinutes();
        this._seconds = parsedTime.getSeconds();
        this._milliseconds = this.date.getMilliseconds();
        // this._timeZone = parsedTime.getT();
        this._time = _time;
        this.date = parsedTime;

        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,

            this._timeZone,
            this._time,
            this.date
        );
    }

    format(format)
    {
        let keys = []
        let formatted = format;
        let splited = format.split('');

        splited.forEach(key => {
            if (formatter.includes(key)) {
                keys.push(key);
            }
        });

        keys.forEach(key => {            
            if (key) {
                formatted = formatted.replace(key, translationFormat( key));
            }
        });

        keys.forEach(key => {
            if (key) {
                formatted = formatted.replace(translationFormat(key), dateTimeFormatter(this.date , backTransletedFormat(translationFormat(key))));
            }
        });

        return formatted;
    }

    formatSentence(sentence)
    {
        // extract keys from sentence same way as format function and replace them
        // with dateTimeFormatter values, which will be obtained from {key},

        const results = [];
        const re = /{([^}]+)}/g; // Matches content inside single curly braces
        let match = sentence.match(re);
        let formatted = [];
        match.forEach( (e) =>{ 
            let key = e.replace('{','').replace('}','');
            let formattedKey = this.format(key);
            sentence = sentence.replace(e, formattedKey);
        });

        console.log(match);
        console.log(formatted);
        console.log(sentence);
        
        return this.date.toString();
    }

    diffForHumans()
    {
        let [
            seconds, minutes, hours, days, weeks, months, years, time, 
            absSeconds, absMinutes, absHours, absDays, absWeeks, absMonths, absYears, absTime
        ] = [0];

        const now = new Date();
        const past = this.date;
        let text = '';
        let condition = '';

        seconds = this.getSecondsDiff(past, now);
        minutes = this.getMinDiff(past, now)
        hours = this.getHoursDiff(past, now)
        days = this.getDayDiff(past, now);
        weeks = this.getWeeksDiff(past, now);
        months = this.getMonthDiff(past, now);
        years = this.getYearDiff(past, now);

        absSeconds = Math.abs(seconds);
        absMinutes = Math.abs(minutes);
        absHours = Math.abs(hours);
        absDays = Math.abs(days);
        absWeeks = Math.abs(weeks);
        absMonths = Math.abs(months);
        absYears = Math.abs(years);
        absTime = Math.abs(time);

        if (absSeconds<60) {
            time = absSeconds;
            text = time >1 ? 'seconds' : 'second';
            condition = seconds < 0 ? 'from now ' : 'ago';
        }
        else if (absMinutes<60 && absMinutes>0) {
            time = absMinutes;
            text = time > 1 ? 'minutes':'minute'
            condition = minutes < 0 ? 'from now ' : 'ago';
        }
        if (absHours<24 && absHours>0) {
            time = absHours;
            text = time > 1 ? 'hours': 'hour'
            condition = hours < 0 ? 'from now ' : 'ago';
        } 
        if (absDays<7 && absDays>0) {
            time = absDays;
            text = time > 1 ? 'days' : 'day'
            condition = days < 0 ? 'from now ' : 'ago';
        }
        if (absWeeks<52 && absWeeks>0) {
            time = absWeeks;
            text = time > 1 ? 'weeks' : 'week';
            condition = weeks < 0 ? 'from now ' : 'ago';
        }

        if (absMonths<12 && absMonths>0) {
            time = absMonths;
            text = time > 1 ? 'months' : 'month';
            condition = months < 0 ? 'from now ' : 'ago';
        }
        
        else {
            time = absYears;
            text = time > 1 ? 'years' : 'year';
            condition = years < 0 ? 'from now ' : 'ago';
        }

        return `${time} ${text} ${condition}`
    }

    // SETTERS
    year(year){
        year = year || 0;
        this._year = year.toString();
        this.date.setFullYear(year);

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth() + 1;
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        this._milliseconds = this.date.getMilliseconds();

        return this
    }

    month(month){
        month = (month || 0) + 1;
        this._month = month.toString().padStart(2, '0');
        this.date.setMonth(month - 1);

        this._year = date.getFullYear();
        this._month = date.getMonth() + 1;
        this._date = date.getDate();
        this._hours = date.getHours();
        this._minutes = date.getMinutes();
        this._seconds = date.getSeconds();
        this._milliseconds = this.date.getMilliseconds();

        return this
    }

    day(day){
        day = day || 0;
        this._date = day.toString().padStart(2, '0');
        this.date.setDate(day);
        this._year = date.getFullYear();
        this._month = date.getMonth() + 1;
        this._date = date.getDate();
        this._hours = date.getHours();
        this._minutes = date.getMinutes();
        this._seconds = date.getSeconds();
        this._milliseconds = this.date.getMilliseconds();

        return this
    }

    hour(hours){
        hours = hours || 0;
        this._hours = hours.toString().padStart(2, '0');
        this.date.setHours(hours);

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth() + 1;
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        this._milliseconds = this.date.getMilliseconds();

        return this
    }

    minute(minutes){
        minutes = minutes || 0;
        this._minutes = minutes.toString().padStart(2, '0');
        this.date.setMinutes(minutes);

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth() + 1;
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();

        return this
    }

    second(seconds=0){
        this._seconds = seconds.toString().padStart(2, '0');
        this.date.setSeconds(seconds);

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth() + 1;
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        this._milliseconds = this.date.getMilliseconds();

        return this
    }
    milliseconds(milliseconds) {
        this._milliseconds = milliseconds.toString().padStart(3, '0');
        this.date.setMilliseconds(seconds);

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth() + 1;
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        this._milliseconds = this.date.getMilliseconds();

        return this
    }


    // CREATERS 
    /**
     * 
     * @param {Integer} year 
     * @param {Integer} month 
     * @param {Integer} day 
     * @returns 
     */
    static createFromDate(year, month, day){

        this._year = year | 0;
        this._month = month | 0;
        this._date = day | 0;

        let dateToPass = new Date(year,month,day)
        this.date = dateToPass;

        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._timeZone,
            this._time,
            this.date
        );
    }

    // static createMidnightDate(year, month, day, tz){
    //     // Implementations coming soon
    // }

    /**
     * 
     * @param {Integer | Number} hour 
     * @param {Integer | Number} minutes 
     * @param {Integer | Number} seconds 
     * @param {String} tz 
     * @returns 
     */
    static createFromTime(hour = 0, minutes = 0, seconds = 0, tz){
        let dateToPass = new Date(1970, 0, 1, hour, minutes, seconds)
        this.date = dateToPass

        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,
            this._timeZone,
            this._time,
            this.date
        );
    }

    /**
     * 
     * @param {Integer} time format HH:MM:SS
     * @param {String} tz 
     * @returns Carbon Object/constructor
     */
    static createFromTimeString(time, tz=null){
        let [hour, minutes, seconds] = time.split(':')
        let dateToPass = new Date(1970, 0, 1, hour, minutes, seconds)
        this.date = dateToPass

        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,
            this._timeZone,
            this._time,
            this.date
        );
    }

    /**
     * 
     * @param {Integer} year 
     * @param {Integer} month 
     * @param {Integer} day 
     * @param {Integer} hour 
     * @param {Integer} minutes 
     * @param {Integer} seconds 
     * @param {Integer} milliseconds 
     * @param {String} tz 
     * @returns Carbon Object/constructor
     */
    static create(year, month, day, hour, minutes, seconds, milliseconds, tz){
        let dateToPass = new Date(year, month - 1, day, hour, minutes, seconds, milliseconds)
        this.date = dateToPass;

        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,
            this._timeZone,
            this._time,
            this.date
        );
    }

    /**
     * 
     * @param {String} format expected date format
     * @param {String} dateToFormat the ectual date
     * @param {Number | Integer} preceders used when year is short i.e 2-digit eg 12 Nov 24, can 19,20 which will make it 2024 or 1924
     * @returns Carbon Object/constructor
     */
    static createFromFormat(format, dateToFormat, preceders = 20 ){
        format = format.replaceAll(/\s\s+/g, ' ');
        dateToFormat = dateToFormat.replaceAll(/\s\s+/g, ' ');

        let keys = []
        let formatted = format;
        let spllitedFormat = format.split('');
        let splitedFormat = [];

        spllitedFormat.forEach( (e) =>{
        if (e.match(/[a-zA-Z]/g)) {
            splitedFormat.push(e);
        }});

        splitedFormat.forEach(key => {
            if (formatter.includes(key)) {
                keys.push(key);
            }
        });

        keys.forEach(key => {
            formatted = formatted.replace(key, encodedFormats[key]);
        })

        keys.forEach(key => {
            formatted = formatted.replace(translationFormat(key),formatter_translator[backTransletedFormat(translationFormat(key))]['regex']);
        });

        let regex = new RegExp(formatted);

        if (!regex.test( dateToFormat)) {
            throw new Error(`The specified date format (${format}) does not match the provided date (${dateToFormat})`);
        }        
        
        keys.forEach(key => {
            let value = dateToFormat.match(formatter_translator[key]['regex'])[0];
            FormaterObject.formatedValues.push({symbol: key, value: value, function: formatter_translator[key]['function']});
            dateToFormat = dateToFormat.replace( value, '');
        });

        FormaterObject.formatedValues.forEach( iterator =>{
            FormaterObject[iterator.function](iterator.value, preceders);
        })


        this._year = FormaterObject.time.getFullYear();
        this._month = FormaterObject.time.getMonth() + 1;
        this._date = FormaterObject.time.getDate();
        this._day = FormaterObject.time.getDay();
        this._hours = FormaterObject.time.getHours();
        this._minutes = FormaterObject.time.getMinutes();
        this._seconds = FormaterObject.time.getSeconds();
        this._milliseconds = FormaterObject.time.getMilliseconds();
        // this._timeZone = FormaterObject.time.getT();
        this._time = `${FormaterObject.time.getHours()}:${FormaterObject.time.getMinutes()}:${FormaterObject.time.getSeconds()}`;
        this.date = new Date(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds
        );

        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,
            this._timeZone,
            this._time,
            this.date
        );
    }

    static createFromISO(isoString){
        let dateToPass = new Date(isoString)
        this.date = dateToPass;

        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,
            this._timeZone,
            this._time,
            this.date
        );
    }
    static createFromISOString(isoString){
        let dateToPass = new Date(isoString)
        this.date = dateToPass;
        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,
            this._timeZone,
            this._time,
            this.date
        );
    }

    static createFromJSON(jsonString){
        let dateToPass = new Date(jsonString)
        this.date = dateToPass;
        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,
            this._timeZone,
            this._time,
            this.date
        );
    }

    static createFromTimestamp(timestamp){
        let dateToPass = new Date(timestamp)
        this.date = dateToPass;
        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,
            this._timeZone,
            this._time,
            this.date
        );
    }

    static createFromUnix(unixTimestamp){
        let dateToPass = new Date(unixTimestamp * 1000)
        this.date = dateToPass;
        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,
            this._timeZone,
            this._time,
            this.date
        );
    }

    static createFromUTC(year, month, day, hour, minutes, seconds, milliseconds){
        let dateToPass = new Date(Date.UTC(year, month - 1, day, hour, minutes, seconds, milliseconds))
        this.date = dateToPass;
        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,

            this._timeZone,
            this._time,
            this.date
        );
    }

    static createUTC(year, month, day, hour, minutes, seconds, milliseconds){
        let dateToPass = new Date(Date.UTC(year, month - 1, day, hour, minutes, seconds, milliseconds))
        this.date = dateToPass;
        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,
            this._timeZone,
            this._time,
            this.date
        );
    }

    static createFromASentence(dateSentence){
        let dateToPass = new Date(Date.UTC(dateSentence))
        this.date = dateToPass;
        return new this(
            this._year,
            this._month,
            this._date,
            this._hours,
            this._minutes,
            this._seconds,
            this._milliseconds,
            this._timeZone,
            this._time,
            this.date
        );
    }
    // ADDING  DATES
    addDay(){
        this.date.setDate(this.date.getDate() + 1);
        this._year = this.date.getFullYear();
        this._month = this.date.getMonth();
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        return this;
    }

    addDays(days){
        days = days || 0;
        this.date.setDate(this.date.getDate() + parseInt(days));

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth();
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        return this;
    }
    
    addHour(){
        this.date.setHours(this.date.getHours() + 1);

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth();
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        return  this();
    }

    addHours(hours){
        hours = hours || 0;
        this.date.setHours(this.date.getHours() + parseInt(hours));

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth();
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        return  this;
    }

    addYear()
    {
        this.date.setFullYear(this.date.getFullYear() + 1);

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth();
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        return  this;
    }

    addYears(years){
        years = years || 0;
        this.date.setFullYear(this.date.getFullYear() + parseInt(years));

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth();
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        return  this;
    }

    addMonth(){
        this.date.setMonth(this.date.getMonth() + 1);

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth();
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        return  this;
    }
    
    addMonths(months) {
        months = months || 0;
        this.date.setMonth(this.date.getMonth() + parseInt(months));

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth();
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        return  this;
    }


    // SUBTRACTING DATES
    subtractDay(){
        this.date.setDate(this.date.getDate() - 1);

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth();
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        return this;
    }

    subtractDays(days){
        this.date.setMonth(this.date.getDate() - parseInt(days));

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth();
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        return this.date;
    }

    subtractYear(){
        this.date.setFullYear(this.date.getFullYear() - 1);

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth();
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        return this.date;
    }

    subtractYears(years){
        this.date.setFullYear(this.date.getFullYear() - parseInt(years));

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth();
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        return this;
    }

    subtractMonth(){
        this.date.setMonth(this.date.getMonth() - 1);

        this._year = this.date.getFullYear();
        this._month = this.date.getMonth();
        this._date = this.date.getDate();
        this._hours = this.date.getHours();
        this._minutes = this.date.getMinutes();
        this._seconds = this.date.getSeconds();
        return this;
    }
    
    subtractMonths(months) {
        this.date.setMonth(this.date.getMonth() - parseInt(months));
        return this;
    }


    // GETTING DATES
    getDate(){
        return this.date.getDate();
    }
    getDay(){
        return this.date.getDay();
    }
    getFullYear(){
        return this.date.getFullYear();
    }
    getHours(){
        return this.date.getHours();
    }
    getMilliseconds(){
        return this.date.getMilliseconds();
    }
    getMinutes(){
        return this.date.getMinutes();
    }
    getMonth(){
        return this.date.getMonth();
    }
    getSeconds(){
        return this.date.getSeconds();
    }
    getTime(){
        return this.date.getTime();
    }
    getTimezoneOffset(){
        return this.date.getTimezoneOffset();
    }
    getUTCDate(){
        return this.date.getUTCDate();
    }
    getUTCDay(){
        return this.date.getUTCDay();
    }
    getUTCFullYear(){
        return this.date.getUTCFullYear();
    }
    getUTCHours(){
        return this.date.getUTCHours();
    }
    getUTCMilliseconds(){
        return this.date.getUTCMilliseconds();
    }
    getUTCMinutes(){
        return this.date.getUTCMinutes();
    }
    getUTCMonth(){
        return this.date.getUTCMonth();
    }
    getUTCSeconds(){
        return this.date.getUTCSeconds();
    }


    // SETTING DATES
    setDate(dateToSet){
        this.date.setDate(dateToSet)
        return this;
    }
    setFullYear(year){
        this.date.setFullYear(year)
        return this;
    }
    setHours(hours){
        this.date.setHours(hours)
        return this;
    }
    setMilliseconds(milliseconds){
        // this._milliseconds = milliseconds
        this.date.setMilliseconds(milliseconds)
        return this;
    }
    setMinutes(minutes){
        this.date.setMinutes(minutes)
        return this;
    }
    setMonth(month){
        this.date.setMonth(month)
        return this;
    }
    setSeconds(seconds){
        this.date.setSeconds(seconds)
        return this;
    }
    setTime(time){
        this.date.setTime(time)
        return this; 
    }
    setUTCDate(dateToSet){
        this.date.setUTCDate(dateToSet)
        return this;
    }
    setUTCFullYear(year){
        this.date.setUTCFullYear(year)
        return this;
    }
    setUTCHours(hours){
        this.date.setUTCHours(hours)
        return this;
    }
    setUTCMilliseconds(milliseconds){
        this.date.setUTCMilliseconds(milliseconds)
        return this;
    }
    setUTCMinutes(minutes){
        this.date.setUTCMinutes(minutes)
        return this;
    }
    setUTCMonth(month){
        this.date.setUTCMonth(month)
        return this;
    }
    setUTCSeconds(seconds){
        this.date.setUTCSeconds(seconds)
        return this
    }

    //CASTING 
    // $dt = Carbon::create(1975, 12, 25, 14, 15, 16);
    // var_dump($dt->toDateTimeString() == $dt);          // bool(true) => uses __toString()
    // echo $dt->toDateString();                          // 1975-12-25
    // echo $dt->toFormattedDateString();                 // Dec 25, 1975
    // echo $dt->toFormattedDayDateString();              // Thu, Dec 25, 1975
    // echo $dt->toTimeString();                          // 14:15:16
    // echo $dt->toDateTimeString();                      // 1975-12-25 14:15:16
    // echo $dt->toDayDateTimeString();                   // Thu, Dec 25, 1975 2:15 PM

    // toDayDateTimeString
    toDateString(){
        this.date.toDateString()
        return this;
    }
    toDateTimeString(){
        return this.format('Y-m-d h:i:s')
    }
    toISOString(){
        return this.date.toISOString()
    }
    toJSON(){
        return this.date.toJSON()
    }
    toLocaleDateString(){
        return this.date.toLocaleDateString()
    }
    toLocaleString(){
        return this.date.toLocaleString()
    }
    toLocaleTimeString(){
        return this.date.toLocaleTimeString()
    }
    toString(){
        return this.date.toString()
    }
    toTimeString(){
        return this.date.toTimeString()
    }
    toUTCString(){
        return this.date.toUTCString()
    }
    valueOf(){
        return this.date.valueOf()
    }
    diffInMonths(startDate, endDate){
        return (endDate.getFullYear()*12 + endDate.getMonth()) - (startDate.getFullYear()*12 + startDate.getMonth())
    }

    getMonthDiff(startDate, endDate) {
        return (
            endDate.getMonth() -
            startDate.getMonth() +
            12 * (endDate.getFullYear() - startDate.getFullYear())
        );
    }

    getYearDiff(startDate, endDate) {
        return (endDate.getFullYear() - startDate.getFullYear());
    }

    getDayDiff(startDate, endDate) {
        const microseconInDay = 24 * 60 * 60 * 1000;

        return Math.round(
            (endDate - startDate) / microseconInDay
        );
    }

    getHoursDiff(startDate, endDate) {
        const microsecondInHour = 1000 * 60 * 60;
        return Math.round(
            (endDate.getTime() - startDate.getTime()) / microsecondInHour,
        );
    }

    getMinDiff(startDate, endDate) {
        const microSeondInMinute = 60 * 1000;
        return Math.round(
            (endDate - startDate) / microSeondInMinute
        );
    }

    getWeeksDiff(startDate, endDate) {
        const microSecondsInWeek = 1000 * 60 * 60 * 24 * 7;

        return Math.round((endDate - startDate) / microSecondsInWeek);
    }

    getSecondsDiff(startDate, endDate) {
        const oneMicroSecond = 1000;

        return Math.round(
            (endDate - startDate) / oneMicroSecond
        );
    }

    diffInYears(newDate){
        let startDate = new Date(this.date);
        let endDate = new Date(newDate);

        return this.getYearDiff(startDate, endDate)
    }
}

export default Carbon;

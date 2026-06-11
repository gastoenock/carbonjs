const formatter =  [
    'j',
    'L',
    'l',
    'F',
    'S',
    'm',
    'M',
    'Y',
    'y',
    'd',
    'D',
    'H',
    'h',
    'i',
    's',
    'u',
    'A',
    'a',
    'c',
];

const encodedFormats = {
    'j':    'JIFBE1IQG0EUXTQ',
    'L':    '5KB46NC0436PGB0',
    'l':    'N2TER1T4N0ZG92E',
    'F':    'K791N94XJGLGXK3',
    'S':    'X3EU91X1EC39X11',
    'm':    '1NZ07J8TQ1WTCVX',
    'M':    'UU8G15GY17HZ5F5',
    'Y':    '4E7E21KCEVV7KLW',
    'y':    'GAJWTNLTE2N4N3U',
    'd':    'RNX6VCBXKRTNLW8',
    'D':    'QKZR4QFBLZT2NFH',
    'H':    '5RCDP8PZNE59R0L',
    'h':    '5NUC6ZVFTQ4C31K',
    'i':    'HG8Q58YTM197MST',
    's':    'P4K30VKTC11K9BQ',
    'u':    'Q4K30VKTCX1VTC1',
    'A':    '0B0ERXPAXDRF0HB',
    'a':    '47R323XPAXDR422',
    'c':    '928F3FGEYMS8110',
};

const formatter_translator = {
    'j':    {regex: '\\d',  function: 'setDay'  },
    'L':    {regex: '\\d{1}', function: 'setDateShort'},
    'l':    {regex: '\\w{2,4}', function: 'setDayLong'},
    'F':    {regex: '\\w{3,}', function: 'setMonthLong'},
    'S':    {regex: '\\w{2}', function: 'setDaySubscript'},
    'm':    {regex: '\\d{2}', function: 'setMonth'},
    'M':    {regex: '\\w{3}', function: 'setMonthShort'},
    'Y':    {regex: '\\d{4}', function: 'setYear'},
    'y':    {regex: '\\d{2}', function: 'setYearShort'},
    'd':    {regex: '\\d{1,2}', function: 'setDate'},
    'D':    {regex: '\\w{3}', function: 'setDayShort'},
    'H':    {regex: '\\d{2}', function: 'setHours'},
    'h':    {regex: '\\d{2}|d}', function: 'setHours12'},
    'i':    {regex: '\\d{2}', function: 'setMinutes'},
    's':    {regex: '\\d{2}', function: 'setSeconds'},
    'u':    {regex: '\\d{3}', function: 'setMilliSeconds'},
    'A':    {regex: '\\[A-Z]{2}', function: 'setAMPM'},
    'a':    {regex: '\\[a-z]{2}', function: 'setAMPMSmall'},
    'c':    {regex: '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d{3}Z', function: 'setIsoTime' },
    'jS':    {regex: '\\d\\w{2}',  function: 'setDay'  },
    'iso':    {regex: '\\d{4}-\\d{2}-dTH:\\d{2}:\\d{2}.\\d{3}Z',  function: 'setIsoTime'  },

};

const FormaterObject = {
    formatedValues: [],
    time: new Date(Date.UTC(1970, 0, 1, 0, 0, 0)),

    setDay: function (day){
        this.time.setDate(day);     
    },

    setDateShort: function (dateShort){
        this.time.setDate(dateShort);
    },

    setDayLong: function (dayLong){
        this.time.setDate(dayLong);
    },

    setMonthLong: function (monthLong){
        monthLong = mapLongMonthToShort(monthLong) - 1;
        this.time.setMonth(monthLong);
    },

    setDaySubscript: function (daySubscript){
        this.time.setDate(daySubscript);
    },

    setYear: function (year){
        this.time.setYear(year);
    },

    setMonth: function (month){        
        this.time.setMonth(month - 1);  
    },
   
    setMonthShort: function (monthShort){
        monthShort = (mapShortMonthToNumber( monthShort) - 1) | 0;
        this.time.setMonth(monthShort);
    },
        
    setYearShort: function (yearShort, preceder){
        let year = preceder.toString() + yearShort;
        this.time.setYear(year);
    },

    setDate: function (date){
        this.time.setDate(date);
    },

    setDayShort: function (dayShort){
        this.time.setDay(dayShort);
        // console.log('setDayShort was called with dayShort: ' + dayShort);
    },

    setHours: function (hours = 0){
        this.time.setHours(hours);   
    },
    
    setHours12: function (hours12 = 0){
        hours12 = (12 + parseInt(hours12))%24;
        this.time.setHours(hours12);
    },
    
    setMinutes: function (minutes = 0){
        this.time.setMinutes(minutes);
    }, 

    setSeconds: function (seconds = 0){
        this.time.setSeconds(seconds);
    },
    setMilliSeconds: function (milliseconds  = 0){
        this._milliseconds = milliseconds;
        // this.time.setMilliSeconds(milliseconds);
    },
    setAMPM: function (a){
        // this.time.setSeconds(seconds);
        // a
    }, 
    setAMPMSmall: function (a){
        // this.time.setSeconds(seconds);
        // a
    }, 

    setIsoTime: function (isoTime ){
        let date = new Date(isoTime)
        this.time = date;
    },
}

function dateTimeFormatter(date, requiredFormat){
    let formatter =  {
        'j': date.getDate(),
        'l': daysMap(date.toString().split(' ')[0]),
        'F': numberedMonthToString(date.getMonth() + 1),
        'S': getDaySubscript(date.getDay()),
        'm': (date.getMonth() + 1).toString().padStart(2, '0'),
        'D': date.toLocaleDateString("en-US", {weekday: 'short'}),
        'Y': date.getFullYear(),
        'y': date.getFullYear().toString().substr(-2),
        'd': (date.getDate()).toString().padStart(2, '0'),
        'M': date.toLocaleString('en-US', { month: 'short' }),
        'H': date.getHours(),
        'h': date.getHours() == 0 ? 12 : date.getHours() % 12,
        'i': (date.getMinutes()).toString().padStart(2, '0'),
        's': (date.getSeconds()).toString().padStart(2, '0') ,
        'u': (date.getMilliseconds()).toString().padStart(3, '0') ,
        'a': getAMPM(date).toLowerCase(),
        'A': getAMPM(date),
        'c': date.toISOString(),

        // l Tuesday
        // F August
        // j 12
        // S th, 
        // Y 2025
        // D Sun/Mon/Tue/Wed
    }
    
    return formatter[requiredFormat];
}

function translationFormat(keyword){
    return encodedFormats[keyword];
}

function getDaySubscript(day){
    if (day % 10 == 1) {
        return 'st';
    }

    else if (day % 10 == 2) {
        return 'nd';
    }

    else if (day % 10 === 3){
        return 'rd';
    }

    else return 'th';
}

function backTransletedFormat(keyword){
    return array_flip(encodedFormats)[keyword];
}

function array_flip( arr )
{
    let key, flipped_array = {};

    for (key in arr)
    {
        if (arr.hasOwnProperty(key)) 
        flipped_array[arr[key]] = key;
    }

    return flipped_array;
}

function mapShortMonthToLong(value) {
    return {
        'Jan': 'January',
        'Feb': 'February',
        'Mar': 'March',
        'Apr': 'April',
        'May': 'May',
        'Jun': 'June',
        'Jul': 'July',
        'Aug': 'August',
        'Sep': 'September',
        'Oct': 'October',
        'Nov': 'November',
        'Dec': 'December'
    }[value]
}

function mapLongMonthToShort(value) {
    return {
        'January': 1,
        'February': 2,
        'March': 3,
        'April': 4,
        'May': 5,
        'June': 6,
        'July': 7,
        'August': 8,
        'September': 9,
        'October': 10,
        'November': 11,
        'December': 12
    }[value]
}

function mapShortMonthToNumber(value) {
    return {
        'Jan': 1,
        'Feb': 2,
        'Mar': 3,
        'Apr': 4,
        'May': 5,
        'Jun': 6,
        'Jul': 7,
        'Aug': 8,
        'Sep': 9,
        'Oct': 10,
        'Nov': 11,
        'Dec': 12
    }[value]
}

function getAMPM(time) {
    return time.getHours() >= 12 ? 'PM' : 'AM';
}

function numberedMonthToString(value) {
    return {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December'
    }[value]
}

function numberedMonthsMap(value) {
    return {
        0: 1,
        1: 2,
        2: 3,
        3: 4,
        4: 5,
        5: 6,
        6: 7,
        7: 8,
        8: 9,
        9: 10,
        10: 11,
        11: 12
    }[value]
}

function daysMap (value){
    return {
        'Mon': 'Monday',
        'Tue': 'Tuesday',
        'Wed': 'Wednesday',
        'Thu': 'Thursday',
        'Fri': 'Friday',
        'Sat': 'Saturday',
        'Sun': 'Sunday',
    }[value]
}

export {
    formatter,
    encodedFormats,
    formatter_translator,
    FormaterObject,
    dateTimeFormatter,
    translationFormat,
    backTransletedFormat
}
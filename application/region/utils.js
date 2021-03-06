import {Dimensions, Platform} from 'react-native';
const {height, width} = Dimensions.get('window');
const X_width = 375, XR_WIDTH = 414;
const X_height = 812, XR_HEIGHT = 896;
const isIPhoneX = Platform.OS === 'ios' && ( (height === X_height && width ===X_width) || (height === XR_HEIGHT && width === XR_WIDTH));
const PhoneType = Platform.OS === 'ios' ? (isIPhoneX ? 'iosx' : 'ios') : 'android'

function change(obj, oldKey, newKey) {
    if (typeof newKey === 'function') { 
        obj[oldKey] = newKey(obj[oldKey], obj)
    } else {
        obj[newKey] = obj[oldKey] 
    }
    return obj
}
//item {'key': 'tokey'}
function varChange(item, obj) {
    
    if (Array.isArray(obj)) {
        for(let i of obj) { 
            for (let key in item) { 
                change(i, key, item[key])
            }
        }
    } else {
        for (let key in item) {
            change(obj, key, item[key])
        }
    }
    return obj
}

const SIGN_REGEXP = /([yMdhsm])(\1*)/g;
const DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
}

const formatDate = {
    format: function(date, pattern) {
        pattern = pattern || DEFAULT_PATTERN;
        return pattern.replace(SIGN_REGEXP, function($0) {
            switch ($0.charAt(0)) {
                case 'y':
                    return padding(date.getFullYear(), $0.length);
                case 'M':
                    return padding(date.getMonth() + 1, $0.length);
                case 'd':
                    return padding(date.getDate(), $0.length);
                case 'w':
                    return date.getDay() + 1;
                case 'h':
                    return padding(date.getHours(), $0.length);
                case 'm':
                    return padding(date.getMinutes(), $0.length);
                case 's':
                    return padding(date.getSeconds(), $0.length);
            }
        });
    },
    parse: function(dateString, pattern) {
        var matchs1 = pattern.match(SIGN_REGEXP);
        var matchs2 = dateString.match(/(\d)+/g);
        if (matchs1.length == matchs2.length) {
            var _date = new Date(1970, 0, 1);
            for (var i = 0; i < matchs1.length; i++) {
                var _int = parseInt(matchs2[i]);
                var sign = matchs1[i];
                switch (sign.charAt(0)) {
                    case 'y':
                        _date.setFullYear(_int);
                        break;
                    case 'M':
                        _date.setMonth(_int - 1);
                        break;
                    case 'd':
                        _date.setDate(_int);
                        break;
                    case 'h':
                        _date.setHours(_int);
                        break;
                    case 'm':
                        _date.setMinutes(_int);
                        break;
                    case 's':
                        _date.setSeconds(_int);
                        break;
                }
            }
            return _date;
        }
        return null
    }
}

export default {
    varChange, formatDate, PhoneType
}
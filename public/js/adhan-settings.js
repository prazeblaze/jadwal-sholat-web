const adhan = require('adhan');

// Settingan jelas terpampang dibawah, lebih lengkap liat di
// https://github.com/batoulapps/adhan-js
var date = new Date();
//http://maps.google.com/maps?q=-5.15,+119.46666666667+(Makassar)&iwloc=A&hl=en&z=12&t=h
let coordinates = new adhan.Coordinates(5.15, 119.46666666667);
var params = adhan.CalculationMethod.Other();
params.madhab = adhan.Madhab.Shafi;
params.fajrAngle = 20;
params.ishaAngle = 18;
params.adjustments.fajr = -10;
params.adjustments.dhuhr = 2;
params.adjustments.asr = 8;
params.adjustments.maghrib = 10;
params.adjustments.isha = 3;

var prayerTimes = new adhan.PrayerTimes(coordinates, date, params);
var formattedTime = adhan.Date.formattedTime;

// add imsyak
function addImsyak(subuhFormattedTime) {
    var _sliced = subuhFormattedTime.split('');
    var sliced = _sliced.join('');
    var hour = sliced.substring(0, 2);
    var minute = sliced.substring(3);
    var temp_new_minute = (Number.parseInt(minute) - 10).toString();

    var hrs, min; if (Number.parseInt(temp_new_minute) < 0) {
        min = (60 + Number.parseInt(temp_new_minute)).toString();
        hrs = (Number.parseInt(hour) - 1).toString();
    }
    else {
        min = temp_new_minute;
        hrs = hour;
    }

    var new_hrs = hrs.length === 1 ? `0${hrs}` : hrs;
    var new_min = min.length === 1 ? `0${min}` : min;

    return new_hrs + ":" + new_min;
}

// common adzan time
var _subuh = formattedTime(prayerTimes.fajr, +7.9, '24h');
var _imsyak = addImsyak(_subuh);
var _dhuha = formattedTime(prayerTimes.sunrise, +8, '24h');
var _duhur = formattedTime(prayerTimes.dhuhr, +8, '24h');
var _ashar = formattedTime(prayerTimes.asr, +7.9, '24h');
var _maghrib = formattedTime(prayerTimes.maghrib, +8.1, '24h');
var _isya = formattedTime(prayerTimes.isha, +8.2, '24h');

// parse adzan
function parsePhaseAdzan(formattedTime) {
    var jam = formattedTime.substring(0, 2);
    var menit = formattedTime.substring(3);
    return (jam * 3600) + (parseInt(menit) * 60);
}
var imsyak = parsePhaseAdzan(_imsyak);
var subuh = parsePhaseAdzan(_subuh);
var dhuha = parsePhaseAdzan(_dhuha);
var duhur = parsePhaseAdzan(_duhur);
var ashar = parsePhaseAdzan(_ashar);
var maghrib = parsePhaseAdzan(_maghrib);
var isya = parsePhaseAdzan(_isya);
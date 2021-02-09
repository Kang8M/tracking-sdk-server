var almCount;
var totalRecord = 0;
var log = {
  gid: '',
  alm_start: '',
  alm_end: '',
  location_url: '',
  location_hostname: '',
  location_pathname: '',
  location_protocol: '',
  almid: ''
}

function chr4(){
  return Math.random().toString(16).slice(-4);
}

function uniqueID(){
  return chr4() + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() + chr4() + chr4();
}

var cookie = {
  write: function(name, value, days, domain, path) {
      var date = new Date();
      days = days || 730;
      path = path || '/';
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = '; expires=' + date.toGMTString();
      var cookieValue = name + '=' + value + expires + '; path=' + path;
      if (domain) {
          cookieValue += '; domain=' + domain;
      }
      document.cookie = cookieValue;
  },
  read: function(name) {
      var allCookie = '' + document.cookie;
      var index = allCookie.indexOf(name);
      if (name === undefined || name === '' || index === -1) return '';
      var ind1 = allCookie.indexOf(';', index);
      if (ind1 == -1) ind1 = allCookie.length;
      return unescape(allCookie.substring(index + name.length + 1, ind1));
  },
  remove: function(name) {
      if (this.read(name)) {
          this.write(name, '', -1, '/');
      }
  }
};

function getGIDViaCookie() {
  return cookie.read('gid');
}

function getGIDViaLS() {
  if (window.localStorage) {
    return localStorage.getItem('gid');
  }
}

function getLocationURL() {
  return window.location.href;
}

function getLocationPartname() {
  return window.location.pathname;
}

function getLocationHostname() {
  return window.location.hostname;
}

function getLocationProtocol() {
  return window.location.protocol;
}

function setLocationURL() {
  cookie.write('location_url', encodeURIComponent(getLocationURL()));
}

function setLocationHostname() {
  cookie.write('location_hostname', encodeURIComponent(getLocationHostname()));
}

function setLocationPartname() {
  cookie.write('location_pathname', encodeURIComponent(getLocationPartname()));
}

function setLocationProtocol() {
  cookie.write('location_protocol', encodeURIComponent(getLocationProtocol()));
}

function setGID() {
  var gidViaCookie = getGIDViaCookie();
  var gidViaLS = getGIDViaLS();
  var gid = uniqueID();

  if (gidViaCookie) {
    cookie.write('gid', gid);
  }
  if (gidViaLS) {
    localStorage.setItem("gid", gid);
  }
}

function setALMEnd() {
  var endDate = new Date().getTime();
  cookie.write('alm_end', endDate);
}

function getALMEnd() {
  return cookie.read('alm_end');
}

function setLog() {
  setLocationURL();
  setLocationHostname();
  setLocationPartname();
  setLocationProtocol();
}

function getLog() {
  var logArr = [];
  logArr.push(cookie.read('gid'));
  logArr.push(cookie.read('location_url'));
  logArr.push(cookie.read('location_hostname'));
  logArr.push(cookie.read('location_pathname'));
  logArr.push(cookie.read('location_protocol'));
  logArr.push(cookie.read('alm_start'));
  logArr.push(cookie.read('alm_end'));
  logArr.push(getALMDuration());

  logArr.join('/');
  return logArr;
}

function requestS() {
  if (!localStorage.getItem('uid')) {
    // alert(1);
    localStorage.setItem('uid', uniqueID());
  }
  setGID();
  setALMStart();
  runALMDurationTime();
  setTimeout(function() {  
    var alm_start = localStorage.getItem("alm_start");
    var test = localStorage.getItem('uid');
    // var log = getLog();
    // console.log(log);
    // if (log) {
      navigator.sendBeacon('https://tracking-sdk-server.herokuapp.com/alm/pst?alm_start=' + alm_start + '&uid=' + test);
    // }
    setLog();
  }, 3000);
}

function ready (fn) {
  if (document.readyState != 'loading') {
      fn();
  } else if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', fn);
  } else {
      window.attachEvent('onreadystatechange', function() {
          if (document.readyState != 'loading')
              fn();
          });
  }
}

ready(requestS);

window.addEventListener('beforeunload', function (e) {
  endALMDurationTime();
  setALMEnd();
  resetTotalRecord();
});

function setALMStart() {
  var startDate = window.dataLayer[0]['alm_start'];
  cookie.write('alm_start', startDate);
  if (window.localStorage) {
    localStorage.setItem("alm_start", startDate);
  }
}

function setALMDuration(alm_time) {
  if (window.localStorage) {
    var alm_duration = getALMDuration();
    localStorage.setItem("alm_duration", alm_time);
    // if (alm_duration && alm_duration > 0) {
    //   // update alm_end, alm_duration with gid, alm_start, location_url
    // } else {
      
    // }
  }
}

function getALMDuration() {
  if (window.localStorage) {
    if (localStorage.getItem("alm_duration")) {
      return localStorage.getItem("alm_duration");
    }
  }
}

function runALMDurationTime() {
  almCount = setInterval(() => {
    ++totalRecord;
    setALMDuration(totalRecord);
  }, 1000);
}

function endALMDurationTime() {
  clearInterval(almCount);
}

function resetTotalRecord() {
  totalRecord = 0;
  setALMDuration(totalRecord);
}
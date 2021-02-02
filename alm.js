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

function getGID() {
  return log.gid;
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

function setEndDate(date) {
  log.alm_end = date;
}

function setStartDate(date) {
  log.alm_start = date;
}

function setLocationURL() {
  log.location_url = getLocationURL();
}

function setLocationHostname() {
  log.location_hostname = getLocationHostname();
}

function setLocationPartname() {
  log.location_pathname = getLocationPartname();
}

function setLocationProtocol() {
  log.location_protocol = getLocationProtocol();
}

function setGID() {
  log.gid = uniqueID();
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

function setLog() {
  cookie.write('gid', uniqueID());
  cookie.write('location_url', getLocationURL());
  cookie.write('location_hostname', getLocationHostname());
  cookie.write('location_pathname', getLocationPartname());
  cookie.write('location_protocol', getLocationProtocol());
  // setGID();
  // setLocationURL();
  // setLocationHostname();
  // setLocationPartname();
  // setLocationProtocol();
  // window.alm_logs.push(log);
}

function getLog() {
  var gid = cookie.read('gid'),
  location_url = cookie.read('location_url'),
  location_hostname = cookie.read('location_hostname'),
  location_pathname = cookie.read('location_pathname'),
  location_protocol = cookie.read('location_protocol'),
  alm_start = cookie.read('alm_start'),
  alm_end = cookie.read('alm_end');

  log.gid = gid;
  log.location_url = location_url;
  log.location_hostname = location_hostname;
  log.location_pathname = location_pathname;
  log.location_protocol = location_protocol;
  log.alm_start = alm_start;
  log.alm_end = alm_end;

  return log;
}

// function requestWithoutAjax( url, params, method ){

//   params = params || {};
//   method = method || "post";

//   // function to remove the iframe
//   var removeIframe = function( iframe ){
//       iframe.parentElement.removeChild(iframe);
//   };

//   // make a iframe...
//   var iframe = document.createElement('iframe');
//   iframe.style.display = 'none';

//   iframe.onload = function(){
//       var iframeDoc = this.contentWindow.document;

//       // Make a invisible form
//       var form = iframeDoc.createElement('form');
//       form.method = method;
//       form.action = url;
//       iframeDoc.body.appendChild(form);

//       // pass the parameters
//       for( var name in params ){
//           var input = iframeDoc.createElement('input');
//           input.type = 'hidden';
//           input.name = name;
//           input.value = params[name];
//           form.appendChild(input);
//       }

//       form.submit();
//       // remove the iframe
//       setTimeout( function(){
//           removeIframe(iframe);
//       }, 500);
//   };

//   document.body.appendChild(iframe);
// }

function requestS() {
  var logs = getLog();
  // console.log(logs);
  navigator.sendBeacon('https://tracking-sdk-server.herokuapp.com/alm/1/hung');
  // requestWithoutAjax('https://tracking-sdk-server.herokuapp.com/alm', logs);
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
  // e.preventDefault();
  // e.returnValue = '';
  var endDate = new Date().getTime();
  var startDate = window.dataLayer[0]['alm_start'];
  // setEndDate(endDate);
  // setStartDate(startDate);
  setLog();
  cookie.write('alm_start', startDate);
  cookie.write('alm_end', endDate);
});
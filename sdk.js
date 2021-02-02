(function (w, d, s, l, a) {
  w[l] = w[l] || [];
  w[l].push({
      alm_start: new Date().getTime(),
      event: 'alm.js'
  });
  var f = d.getElementsByTagName(s)[0],
    j = d.createElement(s);
  j.type = 'text/javascript';
  j.async = true;
  j.src = 'https://tracking-sdk-server.herokuapp.com/alm/alm.js/' + a;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'ALM-1');
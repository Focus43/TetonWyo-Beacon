/*!
 * TetonWyo.org cross-domain beacon tracker. For persistence with previously
 * visited pages across Teton County properties/domains.
 * ref: http://www.admonsters.com/blog/pixel-delivery-best-practices
 */
var TwyoBeacon = (function(){

    var _cookieName = 'tyo_beacon',
        _pixelURI   = '//tc.tstr.co/scripts/twbeacon.ashx', //'//tyo.asset:3030/pixel_trk.gif';
        _dataCache;


    /**
     * Check in 3 different sources for the page data to append to the cookie. First the tyoBeaconData hash,
     * then the tyo-beacon meta tag, then fall back to using the document title and current domain.
     * @returns {*}
     */
    function _dataSrc(){
        if( ! _dataCache ){
            // check window.tyoBeaconData
            if( typeof(window.tyoBeaconData) !== 'undefined' && window.tyoBeaconData.constructor === {}.constructor ){
                _dataCache = window.tyoBeaconData;
                return _dataCache;
            }
            // check if meta tag exists and use it
            var metaTag = document.getElementById('tyo-beacon');
            if( typeof(metaTag) !== 'undefined' && metaTag !== null ){
                _dataCache = {
                    t : metaTag.getAttribute('data-title'),
                    u : metaTag.getAttribute('content')
                };
                return _dataCache;
            }
            // if nothing hits above; use page title and URL
            _dataCache = {
                t : document.title,
                u : window.location.protocol + '//' + window.location.hostname
            };
        }
        return _dataCache;
    }


    /**
     * Parse the current list if on the root domain.
     * @returns [{},...]
     */
    function parseCurrent(){
        var parts = document.cookie.split(_cookieName + '=');
        if(parts.length === 2){
            return JSON.parse(parts.pop().split(";").shift());
        }
        return [];
    }


    /**
     * Kickoff - call the pixel (nothing returned with 204 header response, so register both
     * onload and onerror callbacks), *IF* meta tag is defined.
     */
    (function( pixelSource ){
        var _pixel  = new Image(),
            _params = '?t=' + _dataSrc().t + '&' + 'u=' + _dataSrc().u + '&allow=true';
        _pixel.src  = encodeURI((location.protocol === 'https:' ? 'https:' : 'http:') + pixelSource + _params);
    })( _pixelURI );


    /**
     * @public methods
     */
    return {
        getList: parseCurrent
    };
})();
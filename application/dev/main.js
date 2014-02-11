/*!
 * TetonWyo.org cross-domain beacon tracker. For persistence with previously
 * visited pages across Teton County properties/domains.
 * ref: http://www.admonsters.com/blog/pixel-delivery-best-practices
 */
var TwyoBeacon = (function(){

    var _cookieName = 'tyo_beacon',
        _pixelURI   = '//tyo.asset:3030/pixel_trk.gif',
        _metaTag    = document.getElementById('tyo-beacon');


    /**
     * Parse the current list if on the root domain.
     * @returns [{},...]
     */
    function parseCurrent(){
        var parts = document.cookie.split(_cookieName + '=');
        if(parts.length === 2){
            var list  = parts.pop().split(";").shift(),
                parsd = JSON.parse( decodeURIComponent(list) );
            for( var _i = 0; _i < parsd.length; _i++ ){
                parsd[_i].t = decodeURIComponent(parsd[_i].t);
            }
            return parsd;
        }
        return [];
    }


    /**
     * Kickoff - call the pixel (nothing returned with 204 header response, so register both
     * onload and onerror callbacks), *IF* meta tag is defined.
     */
    (function( pixelSource ){
        if( typeof(_metaTag) !== 'undefined' && _metaTag !== null ){
            var _pixel  = new Image(),
                _params = '?t=' + _metaTag.getAttribute('data-title') + '&' + 'u=' + _metaTag.getAttribute('content');
            _pixel.src  = encodeURI((location.protocol === 'https:' ? 'https:' : 'http:') + pixelSource + _params);
        }
    })( _pixelURI );


    /**
     * @public methods
     */
    return {
        getList: parseCurrent
    };
})();
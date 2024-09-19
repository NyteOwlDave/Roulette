function clampInt( value, lo, hi, orelse ) {
    value = parseInt( value ) || orelse;
    value = min( value, hi );
    return max( value, lo );
}

function elsie( t ) {
    return document.createElement( t );
}

function artie( element, attribName ) {
    return element.getAttribute( attribName );
}

function openWindow( button ) {
    const url = artie( button, 'href' );
    window.open( url );
}


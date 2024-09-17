
/* 
    Renderer
*/

function clampInt( value, lo, hi, orelse ) {
    value = parseInt( value ) || orelse;
    value = min( value, hi );
    return max( value, lo );
}



/*
    Main Page Renderer 
*/

function main() {}

window.addEventListener( 'load', main );
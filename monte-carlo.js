
/* 
    Monte Carlo Renderer
*/

const COUNT_DEFAULT = 10000;
const COUNT_MINIMUM = 1000;
const COUNT_MAXIMUM = 1000000;

const DIGITS_DEFAULT = 2;
const DIGITS_MINIMUM = 0;
const DIGITS_MAXIMUM = 8;

function clampSamples( value ) {
    return clampInt( value, COUNT_MINIMUM, COUNT_MAXIMUM, COUNT_DEFAULT );
}

function clampDigits( value ) {
    return clampInt( value, DIGITS_MINIMUM, DIGITS_MAXIMUM, DIGITS_DEFAULT );
}

function getSampleCountInput() {
    return document.getElementById( 'idSamples' );
}

function getDigitCountInput() {
    return document.getElementById( 'idDigits' );
}

function readSampleCount() {
    const input = getSampleCountInput();
    return clampSamples( input.value );
}

function readDigitCount() {
    const input = getDigitCountInput();
    return clampDigits( input.value );
}

function writeSampleCount( value ) {
    const input = getSampleCountInput();
    input.value = clampSamples( value );    
}

function writeDigitCount( value ) {
    const input = getDigitCountInput();
    input.value = clampDigits( value );    
}

function monteCarloExample() {
    console.clear();
    function randPoint( pt ) {
        pt.x = Math.random() * limit;
        pt.y = Math.random() * limit;
    }
    function inside( c1, c2, pt ) {
        if (! c1.contains_point( pt ) ) return;
        if (! c2.contains_point( pt ) ) return;
        hits += 1;
    }
    const limit = 2;
    const samples = readSampleCount();
    const pt = new Vec2b();
    const o1 = new Vec2b( 1, 0 );
    const o2 = new Vec2b( 0, 1 );
    const c1 = new CircleEx( 1, o1 );
    const c2 = new CircleEx( 1, o2 );
    let hits = 0;
    for ( let n=0; n < samples; n++ ) {
        randPoint( pt );
        inside( c1, c2, pt );
    }
    const ratio = hits / samples;
    const area = square( limit );
    const digits = readDigitCount();
    const final = ( ratio * area );
    const check = circleIntersectionTest( c1, c2 );
    const error = abs( final - check );
    console.log( {
        samples, hits, 
        limit, digits,
        ratio, area 
    } );
    console.log( {
        check : check.toFixed( digits ), 
        final : final.toFixed( digits ),
        error 
    } );
}

function main() {
    console.log( "Enter one of: ");
    console.log( "monteCarloExample()");
    idRun.addEventListener( 'click', monteCarloExample );
}

window.addEventListener( 'load', main );


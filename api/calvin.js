
//=> @ Calvin API | 2024-SEP-18 <=
//=> + /fiddles/Roulette/api <=
 
//[  DecalsFS ]
const DecalsFS = "|";

//[  DecalsRS ]
const DecalsRS = "\n";

//[  DecalsUnknown ]
const DecalsUnknown = "♾";

//[  parseDecalDoc ]
const parseDecalDoc = function( doc ) {
    doc = DecalsUnknown + DecalsFS + doc;
    return doc.trim()
        .split( DecalsRS )
        .join( DecalsFS )
        .split( DecalsFS );
}

//[  DecalsUpperCase ]
const DecalsUpperCase = parseDecalDoc( 
`
Ⓐ|Ⓑ|Ⓒ|Ⓓ|Ⓔ|Ⓕ|Ⓖ|Ⓗ|Ⓘ|Ⓙ
Ⓚ|Ⓛ|Ⓜ|Ⓝ|Ⓞ|Ⓟ|Ⓠ|Ⓡ|Ⓢ|Ⓣ
Ⓤ|Ⓥ|Ⓦ|Ⓧ|Ⓨ|Ⓩ
`);

//[ DecalsLowerCase ]
const DecalsLowerCase = parseDecalDoc(
`
ⓐ|ⓑ|ⓒ|ⓓ|ⓔ|ⓕ|ⓖ|ⓗ|ⓘ|ⓙ
ⓚ|ⓛ|ⓜ|ⓝ|ⓞ|ⓟ|ⓠ|ⓡ|ⓢ|ⓣ
ⓤ|ⓥ|ⓦ|ⓧ|ⓨ|ⓩ
`);

//[ DecalsDigit ]
const DecalsDigit = parseDecalsDoc(
`⓪|⓵|⓶|⓷|⓸|⓹|⓺|⓻|⓼|⓽`
);

//[ firstCodePoint ]
const firstCodePoint = function( o ) {
    if ( "string" == typeof o ) {
        return o.codePointAt( o );
    }
    if ( isFinite( s ) ) {
        return parseInt( s );
    }
    return 0;
}

//[ code_A ]
const code_A = firstCodePoint( "A" );

//[ code_Z ]
const code_Z = firstCodePoint( "Z" );

//[ code_a ]
const code_a = firstCodePoint( "a" );

//[ code_z ]
const code_z = firstCodePoint( "z" );

//[ code_0 ]
const code_0 = firstCodePoint( "0" );

//[ code_9 ]
const code_9 = firstCodePoint( "9" );

//[ isUpper ]
function isUpper( code ) {
	if ( code < code_A ) return false;
	return ( code <= code_Z );
}

//[ isLower ]
function isLower( code ) {
	if ( code < code_a ) return false;
	return ( code <= code_z );
}

//[ isDigit ]
function isDigit( code ) {
	if ( code < code_0 ) return false;
	return ( code <= code_9 );
}

//[ isCtrl ]
function isCtrl( code ) {
    if ( code < 0 ) { return false; }
	return ( code <= 31 );
}

//[ isPrintable ]
function isPrintable( code ) {
    if ( code < 32 ) {
        return false;
    }
    return ( code < 128 );
}

//[ isSpace ]
function isSpace( code ) {
    
    ' \f\n\r\t\v';
}

//[ isPunct ]
function isPunct( code ) {
    if (! isASCII( code ) ) {
        return false;
    }
    if ( isCtrl( code ) ) {
        return false;
    }
    if ( isUpperCase( code ) || isLowerCaseCode( code ) ) {
        return false;
    }
    return (! isDigit( code ) );
}

//[ isASCII ]
function isASCII( code ) {
    if ( code < 0 ) { return false; }
	return ( code < 256 );
}

//[ isExtended ]
function isExtended( code ) {
    return isASCII( code ) && ( code > 127 );
}

//[ isUnicode ]
function isUnicode( code ) {
	return ( code > 255 );
}

//[ firstUnicode ]
const firstUnicode = function( s ) {
    const unicodePoints = String( s )
        .split( '' )
        .map( firstCodePoint )
        .filter( isUnicode );
    if ( unicodePoints.length ) {
        return unicodePoints.pop().toString();
    } else {
        return 0;
    }
}

//[ translateDecal ]
const translateDecal = function( s ) {
	let decals;
    function glyph( ch ) {
		const code = chr( ch );
        if ( isUpper( code ) ) {
            decals = DecalsUpperCase;
            return decals[ 1 + code - codeA ];
		} else if ( isLower( code ) ) {
            decals = DecalsLowerCase;
	        return decals[ 1 + code - codea ];
		} else if ( isDigit( code ) ) {
            decals = DecalsDigit;
	        return decals[ 1 + code - code0 ];
		}
		return ch;
    }
	s = String( s );
    return s.split( '' ).map( glyph ).join( '' );
}


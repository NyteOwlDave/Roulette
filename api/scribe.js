
/* 
    scribe.js
    Script Manager

*/

const Scribe = {};

((boss)=>{

function expected( what ) {
	throw new TypeError( `Expected ${what}` );
}

function validateString( object ) {
	if ( "string" != typeof object ) {
		expected( 'a string' );
	}
}

function validateScript( script ) {
	if (! ( script instanceof HTMLScriptElement ) ) {
		expected( 'an HTML script element' );
	}
}

function table( title, records ) {
	console.group( title );
	console.table( records );
	console.groupEnd();
}

function isStr( o ) {
	return ( "string" == typeof o );
}

function basename( s ) {
	if ( isStr( s ) ) {
		return s.split( "/" ).pop();
	}
	return '';
}

const _extra = {
    table, isStr, basename, expected
}


function getScriptSource( o ) {
 	return o.getAttribute( 'src' ) || '';
}

function getScriptBaseName( o ) {
	return basename( getScriptSource( o ) );
}

function listScriptFileNames() {
  return Array.from( document.scripts )
	.map( getScriptBaseName )
	.filter( s => s.length ); 
}

function inspectScriptFileNames() {
    const names = listScriptFileNames();
    table( "Script File Names", names );    
}

function listScriptTitles() {
    return Array.from( document.scripts )
      .map( getScriptTitle )
      .filter( s => s.length ); 
  }
  
function inspectScriptTitles() {
    const names = listScriptTitles();
    table( "Script Titles", names );    
}



function getScriptTitle( script ) {
	validateScript( script );
	return script.getAttribute( 'name' );
}

function setScriptTitle( script, title ) {
	validateScript( script );
	validateString( title );
	return script.setAttribute( 'name', title );
}

function findScript( title ) {
	validateString( title );
  	const q = `script[name="${title}"]`;
	return document.querySelector( q );
}

function removeScript( title ) {
	const old = findScript( title );
    if ( old ) {
		const parent = old.parentElement;
		if ( parent ) parent.removeChild( old );
	}
}

function replaceScript( script ) {
	const container = document.firstElementChild;
	const title = getScriptTitle( script );
    if (! title ) {
		throw new Error( 'Script has no title' );
    }
	removeScript( title );
    container.appendChild( script );
}

function createScript( source, title ) {
	validateString( source );
	validateString( title );
	const script = document.createElement( 'script' );
	script.setAttribute( 'name', title );
	script.innerText = source;
	replaceScript( script );
}

const testTitle = "Congratulations";
const testScript = `
function attaboy() {
	console.log( "YAY! We did it..." );
}
`;

function runTest() {
	createScript( testScript, testTitle );
	attaboy();
}

boss.api = {
    extra : _extra ,
    validate : {
	    string: validateString ,
	    script: validateScript ,
    } ,
    list : {
        titles : listScriptTitles,
        fileNames : listScriptFileNames,
    } ,
    inspect : {
        titles : inspectScriptTitles,
        fileNames : inspectScriptFileNames,
    } ,
    script : {
        source : { read : getScriptSource } ,
        basename : { read : getScriptBaseName } ,
        title : {
	        read : getScriptTitle ,
	        write : setScriptTitle ,
	    } ,
        select : findScript ,
        remove : removeScript  ,
        update : replaceScript ,
        create : createScript ,
    } ,
    test : {
        title  : testTitle  ,
        source : testScript ,
        run    : runTest
    } ,
};

})(Scribe);


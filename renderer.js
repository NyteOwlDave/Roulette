
/* 
    renderer.js
    Main Page App
*/

function clampInt( value, lo, hi, orelse ) {
    value = parseInt( value ) || orelse;
    value = min( value, hi );
    return max( value, lo );
}

const Editor = {
    control : null,
    read : function() {
        const control = Editor.control;
        const api = Scribe.editor.content;
        return api.read( control );
    } ,
    write : function( value ) {
        const control = Editor.control;
        const api = Scribe.editor.content;
        api.write( control, value );
        return this;
    } ,
    clear : function() {
        const control = Editor.control;
        const api = Scribe.editor.content;
        api.clear();
        return this;
    } ,
    init : function( control ) {
        const what = "an ID or reference to an HTML TextArea Element";
        const api = Scribe;
        const is = api.is;
        function ok( o ) {
            return is.editor( o );
        }
        function oops() {
            api.extra.expected( what );
        }
        const self = Editor;
        if (! ok( control ) ) {
            control = String( control ).trim();
            control = document.getElementById( control );
        }
        if (! ok( control ) ) {
            oops();
        }
        self.control = control;
        console.log( "Editor initialized");
        return self;
    } ,
};

function writeClipboard( s ) {
    function ok() {
      console.log( "Clipboard written" );
    }
    function oops( arg ) {
      console.error( arg );
    }
    const cb = window.navigator.clipboard;
    return cb.writeText( s ).then( ok ).catch( oops );
}


function main() {
    Editor.init( 'idInput' );
}

window.addEventListener( 'load', main );
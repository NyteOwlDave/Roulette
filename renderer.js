
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
    persistentCacheKey : "Roulette Persistent Document" ,
    control : null ,
    read : function() {
        const control = Editor.control;
        const api = Scribe.editor.content;
        return api.read( control );
    } ,
    write : function( content ) {
        const self = Editor;
        const control = self.control;
        const api = Scribe.editor.content;
        api.write( control, content );
        return self;
    } ,
    clear : function() {
        return Editor.write( '' );
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
        self.autoRecover();
        const unload = "beforeunload";
        function shutdown( event ) {
            self.autoCache();
        }
        window.addEventListener( unload, shutdown );
        console.log( "Editor initialized" );
        return self;
    } ,
    autoCache() {
        const self = Editor;
        const key = self.persistentCacheKey;
        const content = self.read();
        localStorage.setItem( key, content );
        console.log( "Persistent editor content cached" );
        return self;
    } ,
    autoRecover() {
        const self = Editor;
        const key = self.persistentCacheKey;
        const content = localStorage.getItem( key ) || '';
        if ( content.length ) {
            console.log( "Persistent editor content recovered" );
            return self.write( content );    
        }
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
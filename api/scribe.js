
/* 
    scribe.js
    Script Manager

*/

const Scribe = {};

(( boss ) => {

    const CACHE_PREFIX   = "Roulette Document";
    const CACHE_SPLITTER = "-|-";
    const CACHE_SUFFIX   = "Untitled";


    function todo( what ) {
        if ( isString( what ) ) {
            console.warn( 'TODO', what );
        } else {
            console.warn( 'This feature is under construction' );
        }
        return boss;
    }
    
    function group( title, object ) {
        console.group( title );
        if ( object instanceof Error ) {
            console.error( object );
        } else {
            console.log( object );
        }
        console.groupEnd();
        return boss;
    }

    function table( title, records ) {
        console.group( title );
        if ( records instanceof Error ) {
            console.error( records );
        } else {
            console.table( records );
        }
        console.groupEnd();
        return boss;
    }


    function ella( t ) {
        return document.createElement( t );
    }

    function artie( e, k ) {
        return e.getAttribute( k );
    }

    function bart( e, k, v ) {
        e.setAttribute( k, v );
        return boss;
    }

    function stella( e, array ) {
        const v = array.join( "; " );
        return bart( e, 'style', v );
    }

    function aretha( e, obj ) {
        //===>>> TODO ...
        todo( 'aretha' );
    }

    function isString( o ) {
        return ( "string" == typeof o );
    }

    function isFunction( o ) {
        return ( "function" == typeof o );
    }

    function isArray( o ) {
        return (Array.isArray(o));
    }

    function isObject( o ) {
        return (o instanceof Object);
    }

    function isScript( o ) {
        return (o instanceof HTMLScriptElement);
    }

    function isEditor( o ) {
        return (o instanceof HTMLTextAreaElement);
    }

    function isInput( o ) {
        return (o instanceof HTMLInputElement);
    }

    function isElement( o ) {
        return (o instanceof HTMLElement);
    }


    function hostName(url) {
        validateString(url);
        url = new URL(url);
        return url.hostname || '';
    }

    function baseName(url) {
        if (isString(url)) {
            return url.split("/").pop();
        }
        return '';
    }

    function location(s) {
        if (isString(s)) {
            const parts = s.split("/");
            parts.pop();
            if (parts.length) {
                return parts.join("/");
            }
        }
        return '';
    }


    function expected(what) {
        throw new TypeError(`Expected ${what}`);
    }


    function validateString( object ) {
        if (! isString( object ) ) {
            expected( 'a string' );
        }
        return boss;
    }

    function validateScript( script ) {
        if (! isScript( script ) ) {
            expected( 'an HTML script element' );
        }
        return boss;
    }

    function validateEditor( editor ) {
        if (! isEditor( editor ) ) {
            expected( 'an HTML textarea element' );
        }
        return boss;
    }


    function getScriptSource(script) {
        validateScript(script);
        return script.getAttribute('src') || '(noname)';
    }

    function getScriptLocation(script) {
        return location(getScriptSource(script));
    }

    function getScriptHostName(script) {
        return hostName(getScriptSource(script));
    }

    function getScriptBaseName(script) {
        return baseName(getScriptSource(script));
    }

    function getScriptContent(editor) {
        // ===>>> TODO...
        todo("getScriptContent");
        return '';
    }

    function setScriptContent(editor) {
        // ===>>> TODO...
        todo("setScriptContent");
        return '';
    }

    function getScriptTitle(script) {
        validateScript(script);
        let title = script.getAttribute('name')
            || getScriptBaseName(script)
            || '(noname)';
    }

    function setScriptTitle(script, title) {
        validateScript(script);
        validateString(title);
        script.setAttribute('name', title);
        return boss;
    }

    function getScriptDetails(script) {
        const details = [];
        if (!script) {
            return [
                "title",
                "filename",
                "location"
            ];
        }
        const source = getScriptSource(script);
        const parts = source.split("/");
        const filename = parts.pop() || "(unnamed)";
        let folder;
        if (parts.length) {
            folder = parts.join("/");
        } else {
            folder = '';
        }
        const title = getScriptTitle(script);
        return [title, filename, folder];
    }


    function listScripts( mapper ) {
        const scripts = Array.from( document.scripts );
        if ( isFunction( mapper ) ) {
            return scripts.map( mapper )
                .filter( o => o )
                .filter( s => s.length );
        } else {
            return scripts;
        }
    }

    function listScriptFileNames() {
        return listScripts( getScriptBaseName );
    }

    function listScriptTitles() {
        return listScripts( getScriptTitle );
    }

    function listScriptDetails() {
        const details = listScripts( getScriptDetails );
        const header = getScriptDetails();
        details.unshift( header );
        return details;
    }

    function listScriptLocations() {
        return listScripts( getScriptLocation );
    }

    function listScriptSources() {
        return listScripts( getScriptSource );
    }

    function listScriptHostNames() {
        return listScripts( getScriptHostName );
    }

    function listCacheKeys() {
        const keys = [];
        const provider = getCacheProvider();
        if ( isObject( provider ) ) {
            let i; let key;
            for ( i = 0; key = provider.key( i ); i += 1 ) {
                const parts = parseCacheKey( key );
                if ( parts.prefix == CACHE_PREFIX ) {
                    keys.push( parts.title );
                }
            }
        }
        return keys;
    }


    function inspectScripts() {
        const scripts = listScripts();
        return group( "Scripts", scripts );
    }

    function inspectScriptFileNames() {
        const names = listScriptFileNames();
        return table( "Script File Names", names );
    }

    function inspectScriptTitles() {
        const names = listScriptTitles();
        return table( "Script Titles", names );
    }

    function inspectScriptDetails() {
        const names = listScriptDetails();
        return table( "Script Details", names );
    }

    function inspectScriptLocations() {
        const names = listScriptLocations();
        return table( "Script Locations", names );
    }

    function inspectScriptSources() {
        const names = listScriptSources();
        return table( "Script Sources", names );
    }

    function inspectScriptHostNames() {
        const names = listScriptHostNames();
        return table( "Script Host Names", names );
    }

    function inspectCacheKeys() {
        const keys = listCacheKeys();
        return table( "Cache Keys", keys );
    }


    function findScript(title) {
        validateString(title);
        const q = `script[name="${title}"]`;
        return document.querySelector(q);
    }

    function removeScript(title) {
        const old = findScript(title);
        if (old) {
            const parent = old.parentElement;
            if (parent) parent.removeChild(old);
        }
    }

    function replaceScript(script) {
        const container = document.firstElementChild;
        const title = getScriptTitle(script);
        if (!title) {
            throw new Error('Script has no title');
        }
        removeScript(title);
        container.appendChild(script);
        return boss;
    }

    function createScript(source, title) {
        validateString(source);
        validateString(title);
        const script = document.createElement('script');
        script.setAttribute('name', title);
        script.innerText = source;
        return replaceScript(script);
    }


    function setEditorTabSize(editor, tabSize = 4) {
        validateEditor(editor);
        tabSize = parseInt(tabSize);
        if (isNaN(tabSize)) {
            expected('an integer tab size');
        }
        if (tabSize < 1) {
            expected('a tab size greater than 0');
        }
        if (tabSize > 16) {
            expected('a tab size less than 17');
        }
        editor.style.tabSize = tabSize;
        return boss;
    }

    function setEditorFont(editor, font) {
        validateEditor(editor);
        validateString(font);
        editor.style.font = font;
        return boss;
    }

    function setEditorColors(editor, fg, bg) {
        validateEditor(editor);
        if (isString(fg)) {
            editor.style.color = fg;
        }
        if (isString(bg)) {
            editor.style.backgroundColor = bg;
        }
        return boss;
    }

    function formatEditorContent(content) {
        if (isObject(content)) {
            return JSON.stringify(s, 0, 2);
        } else {
            return String(s);
        }
    }

    function getEditorSelectionDetails(editor) {
        validateEditor(editor);
        return {
            editor,
            head: editor.selectionStart,
            tail: editor.selectionEnd,
        };
    }

    function copyEditorSelection(editor) {
        validateEditor(editor);
        const head = editor.selectionStart;
        const tail = editor.selectionEnd;
        const value = editor.value || '';
        return value.substring(head, tail) || '';
    }

    function replaceEditorSelection(editor, content) {
        validateEditor(editor);
        const head = editor.selectionStart;
        const tail = editor.selectionEnd;
        const value = editor.value;
        content = formatEditorContent(content);
        editor.value =
            value.substring(0, head) +
            content +
            value.substring(tail);
        editor.selectionStart =
            editor.selectionEnd =
            head + content.length;
        return boss;
    }

    function initEditor( editor, tabSize = 4 ) {
        if ( tabSize ) {
            setEditorTabSize( editor, tabSize );
        } else {
            validateEditor(editor);
        }
        const key = "keydown";
        function hit( event ) {
            event.preventDefault();
            replaceEditorSelection( editor, "\t" );
        }
        editor.addEventListener(key, hit);
    }

    function getEditorContent( editor ) {
        validateEditor( editor );
        return editor.value || '';
    }

    function setEditorContent( editor, content ) {
        validateEditor( editor );
        editor.value = formatEditorContent( content );
        return boss;
    }

    function clearEditorContent( editor ) {
        return setEditorContent( '' );
    }

    function getScriptProvider() {
        function run( editor ) {
            let result = "";
            let code = "";
            try {
                if ( isString( editor ) ) {
                    code = editor.trim();
                } else if ( isEditor( editor ) ) {
                    code = getEditorContent( editor );
                } else {
                    expected( "a script of HTML TextArea reference" );
                }
                result = window.eval( code );
                group( "Result", result );
            } catch( error ) {
                result = error;
                group( "Result", result );
            }
            return { code, result, editor, scribe : boss };    
        }
        return run;
    }

    function runScript( editor ) {
        const provider = getScriptProvider();
        if ( isFunction( provider ) ) {
            return provider( editor );
        }
        return undefined;
    }

    function getCacheProvider() {
        return localStorage;
    }

    function cacheScript( editor ) { 
        const provider = getCacheProvider();
        if ( isObject( provider ) ) {
            const key = getEditorCacheKey( editor );
            value = editor.value;
            provider.setItem( key, value );
        }
        return boss;
    }

    function recoverScript( editor ) { 
        const provider = getCacheProvider();
        if ( isObject( provider ) ) {
            const key = getEditorCacheKey( editor );
            const value = provider.getItem( key ) || '';
            editor.value = value;
        }
        return boss;
    }

    function getTransportProvider() {
        //===>>> TODO ....
        todo( "getTransportProvider" );
        return null;
    }

    function importScript( editor, url ) {
        const provider = getTransportProvider();
        function accept( content ) {
            console.log( "Imported", url );
            editor.value = content;
        }
        function oops( error ) {
            console.warn( "Error importing", url );
            console.error( error );
        }
        if ( isObject( provider ) ) {
            validateEditor( editor );
            return provider.importScript( url )
                .then( accept )
                .catch( oops );
        }
        return undefined;
    }

    function exportScript( editor, url ) { 
        const provider = getTransportProvider();
        function ok() {
            console.log( "Exported", url );
        }
        function oops( error ) {
            console.warn( "Error exporting", url );
            console.error( error );
        }
        if ( isObject( provider ) ) {
            validateEditor( editor );
            const content = editor.value;
            return provider.exportScript( url, content )
                .then( ok )
                .catch( oops );
        }
        return undefined;
    }

    function getFileProvider() {
        //===>>> TODO ....
        todo( "getFileProvider" );
        return null;
    }

    function loadScript( editor, pathName ) { 
        const provider = getFileProvider();
        function accept( content ) {
            console.log( "Loaded", pathName );
            editor.value = content;
        }
        function oops( error ) {
            console.warn( "Error importing", pathName );
            console.error( error );
        }
        if ( isObject( provider ) ) {
            validateEditor( editor );
            return provider.loadScript( pathName )
                .then( accept )
                .catch( oops );
        }
        return undefined;
    }

    function saveScript( editor, pathName ) { 
        const provider = getFileProvider();
        function ok() {
            console.log( "Saved", pathName );
        }
        function oops( error ) {
            console.warn( "Error saving", pathName );
            console.error( error );
        }
        if ( isObject( provider ) ) {
            validateEditor( editor );
            const content = editor.value;
            return provider.saveScript( pathName, content )
                .then( ok )
                .catch( oops );
        }
        return undefined;
    }

    function getMailProvider() {
        //===>>> TODO ....
        todo( "getMailProvider" );
        return null;
    }

    function mailScript( editor, options ) { 
        validateEditor( editor );
        provider = getMailProvider();
        if ( isFunction( provider ) ) {
            provider( content, options );
        }
        return boss;
    }

    function composeCacheKey( title ) {
        const tag = CACHE_PREFIX;
        const sep = CACHE_SPLITTER;
        const def = CACHE_SUFFIX;
        if ( isString( title ) ) {
            title = title.trim() || def;
        } else {
            title = def;
        }
        return `${tag} ${sep} ${title}`;
    }

    function parseCacheKey( key ) {
        const tag = CACHE_PREFIX;
        const sep = CACHE_SPLITTER;
        const def = CACHE_SUFFIX;
        if ( isString( key ) ) {
            key = key.trim();
            if (! key.length ) {
                expected( "a non-empty string" );
            }
        } else {
            expected( "a string" );
        }
        const head = key.indexOf( sep );
        let prefix; 
        let title;
        if ( head < 0 ) {
            prefix = '';
            title  = key.trim();
        } else {
            const tail = head + sep.length;
            prefix = key.substring( 0, head ).trim();
            title  = key.substring( tail ).trim();    
        }
        return { prefix, title };
    }

    function getEditorCacheKey( editor ) {
        const title = getEditorTitle( editor );
        return composeCacheKey( title );
    }

    function setEditorCacheKey( editor, key ) {
        const tag = CACHE_PREFIX;
        const parts = parseCacheKey( key );
        if ( parts.prefix != tag ) {
            expected( `cache prefix '${sep}'` );
        }
        return setEditorTitle( editor, parts.title );
    }

    function getEditorTitle( editor ) {
        validateEditor( editor );
        const title = artie( editor, "name" ) || '';
        return title.trim() || CACHE_SUFFIX;
    }

    function setEditorTitle( editor, title ) {
        validateEditor( editor );
        validateString( title );
        bart( editor, "name", title.trim() );
    }

    const testTitle = "Congratulations";
    const testScript = `
function attaboy() {
	console.log( "YAY! We did it..." );
}
`;

    function runTest() {
        createScript(testScript, testTitle);
        attaboy();
    }


    function canPopup() {
        if ("object" != typeof PopupWindow) {
            return false;
        }
        return ("function" == typeof PopupWindow.open);
    }

    function visit(url, target) {
        return window.open(url, target);
    }

    function popup(url, control, target) {
        if (isObject(control)) {
            if (typeof control.value != undefined) {
                control.value = url;
            }
            else if (typeof control.innerText != undefined) {
                control.innerText = url;
            }
            return { url, control, scribe: boss };
        }
        if (canPopup()) {
            return PopupWindow.open(url, target);
        } else {
            return visit(url);
        }
    }

    function workspace(control) {
        const url = "http://dave-probook/fiddles/Roulette";
        const target = "Roulette Workspace";
        return popup(url, control, target);
    }

    function repo(control) {
        const url = "https://github.com/NyteOwlDave/Roulette";
        const target = "Roulette Repository";
        return popup(url, control, target);
    }

    function help(control) {
        const url = "https://bit.ly/ncs-roulette-help";
        const target = "Roulette Help";
        return popup(url, control, target);
    }

    function notebook(control) {
        const url = "https://bit.ly/ncs-roulette-notebook";
        const target = "Roulette Notebook";
        return popup(url, control, target);
    }

    boss.dom = {
        ella ,
        artie , bart ,
        stella ,
        aretha ,
    };

    boss.is = {
        string   : isString ,
        script   : isScript ,
        editor   : isEditor ,
        object   : isObject ,
        array    : isArray  ,
        input    : isInput  ,
        element  : isElement  ,
        callback : isFunction ,
    };

    boss.validate = {
        string: validateString,
        script: validateScript,
        editor: validateEditor,
    };

    boss.extra = {
        expected,
        table, group,
        location, baseName, hostName,
    };

    boss.editor = {
        init: initEditor ,
        style: {
            tabSize: setEditorTabSize,
            font: setEditorFont,
            colors: setEditorColors
        } ,
        content: {
            read   : getEditorContent ,
            write  : setEditorContent ,
            clear  : clearEditorContent ,
            format : formatEditorContent ,
        } ,
        title: {
            read  : getEditorTitle ,
            write : setEditorTitle 
        } ,
        selection: {
            read: copyEditorSelection,
            write: replaceEditorSelection,
            details: getEditorSelectionDetails
        } ,
        script : {
            run: runScript ,
            provider : getScriptProvider
        } ,
        cache: {
            read  : cacheScript ,
            write : recoverScript ,
            provider : getCacheProvider ,
            key   : { 
                read    : getEditorCacheKey , 
                write   : setEditorCacheKey ,
                compose : composeCacheKey ,
                parse   : parseCacheKey
            } ,
        } ,
        transport: {
            read: importScript ,
            write: exportScript ,
            provider : getTransportProvider ,
        } ,
        file: {
            read  : loadScript ,
            write : saveScript ,
            provider : getFileProvider ,
        } ,
        mail: {
            send : mailScript ,
            provider : getMailProvider ,
        }
    };

    boss.list = {
        scripts: listScripts,
        titles: listScriptTitles,
        fileNames: listScriptFileNames,
        locations: listScriptLocations,
        sources: listScriptSources,
        hostnames: listScriptHostNames,
        details: listScriptDetails,
        cacheKeys: listCacheKeys
    };

    boss.inspect = {
        scripts: inspectScripts,
        titles: inspectScriptTitles,
        fileNames: inspectScriptFileNames,
        locations: inspectScriptLocations,
        sources: inspectScriptSources,
        hostnames: inspectScriptHostNames,
        details: inspectScriptDetails,
        cacheKeys: inspectCacheKeys
    };

    boss.script = {
        source: { read: getScriptSource },
        location: { read: getScriptLocation },
        baseName: { read: getScriptBaseName },
        hostName: { read: getScriptHostName },
        title: {
            read: getScriptTitle,
            write: setScriptTitle,
        },
        content: {
            read: getScriptContent,
            write: setScriptContent,
        },
        select: findScript,
        remove: removeScript,
        update: replaceScript,
        create: createScript,
    };

    boss.test = {
        title: testTitle,
        content: testScript,
        run: runTest
    };

    boss.popup = {
        help,
        notebook,
        workspace,
        repo,
        visit,
        open: popup,
        available: canPopup
    };

})(Scribe);

class DocTree {
    constructor(object) {
        this.transform(object);
    }
    get is() {
        return Scribe.is;
    }
    get input() {
        return this.state.input;
    }
    get output() {
        return this.state.output || '';
    }
    get editorURL() {
        return this.protoClass.editorURL;
    }
    get protoClass() {
        return DocTree;
    }
    edit( noCopy ) {
        if (! noCopy ) {
            this.copyToClipboard();
        }
        return Scribe.popup.open( this.editorURL );
    }
    reset() {
        this.state = {};
        return this;
    }
    transform( object ) {
        const self = this;
        this.reset();
        this.state.input = object;
        function ok( o ) {
            if ( Array.isArray( o ) ) {
                return false;
            }
            return self.is.object( o );
        }
        function fn( o ) {
            return self.is.callback( o );
        }
        function group( title, data ) {
            return Scribe.extra.group( title, data );
        }
        function readProperties( object ) {
            const result = {};
            if ( ok( object ) ) {
                for ( let prop in object ) {
                    const value = object[ prop ];
                    if ( fn( value ) ) {
                        result[ prop ] = "";
                    } else if ( ok( value ) ) {
                        result[ prop ] = readProperties( value );
                    } else {
                        result[ prop ] = typeof value;
                    }
                }
            }
            return result;
        }
        const result = readProperties( object );
        group( "Result", result );
        this.state.output = JSON.stringify( result, 0, 2 );
        return this;
    }
    copyToClipboard( text ) {
        if (! this.is.string( text ) ) {
            const o = text;
            if ( "undefined" == typeof o ) {
                text = this.output;
            } else if ( this.is.editor( o ) ) {
                text = text.value;
            } else if ( this.is.input( o ) ) { 
                text = text.value;
            } else if ( this.is.element( o ) ) { 
                text = text.innerHTML;
            } else if ( this.is.object( o ) ) {
                text = JSON.stringify( o, 0, 2 );
            } else {
                text = String( o );
            }
        }
        const editor = document.createElement( 'textarea' );
        const container = document.firstElementChild;
        container.appendChild( editor );
        try {
            editor.style.position = "fixed";
            editor.value = text;
            editor.focus();
            editor.select();
            document.execCommand( 'copy' );
            console.log( "DocTree wrote to clipboard" );
        } catch( error ) {
            console.error( error );
        } finally {
            container.removeChild( editor );
        }
    }
}

DocTree.editorURL = "https://jsoneditoronline.org/";

class ScribeDocTree {
    constructor() {
        super( Scribe );
    }
}



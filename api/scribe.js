
/* 
    scribe.js
    Script Manager

*/

const Scribe = {};

((boss) => {

    function todo(what) {
        if (isString(what)) {
            console.warn('TODO', what);
        } else {
            console.warn('This feature is under construction');
        }
        return boss;
    }

    function group(title, object) {
        console.group(title);
        console.log(object);
        console.groupEnd();
        return boss;
    }

    function table(title, records) {
        console.group(title);
        console.table(records);
        console.groupEnd();
        return boss;
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


    function validateString(object) {
        if (!isString(object)) {
            expected('a string');
        }
    }

    function validateScript(script) {
        if (!isScript(script)) {
            expected('an HTML script element');
        }
    }

    function validateEditor(editor) {
        if (!isEditor(editort)) {
            expected('an HTML textarea element');
        }
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


    function listScriptFileNames() {
        return Array.from(document.scripts)
            .map(getScriptBaseName)
            .filter(s => s.length);
    }

    function inspectScriptFileNames() {
        const names = listScriptFileNames();
        return table("Script File Names", names);
    }

    function listScriptTitles() {
        return Array.from(document.scripts)
            .map(getScriptTitle)
            .filter(s => s.length);
    }

    function inspectScriptTitles() {
        const names = listScriptTitles();
        return table("Script Titles", names);
    }

    function listScriptDetails() {
        const details = Array.from(document.scripts)
            .map(getScriptDetails)
            .filter(s => s.length);
        const header = getScriptDetails();
        details.unshift(header);
        return details;
    }

    function inspectScriptDetails() {
        const names = listScriptDetails();
        return table("Script Titles", names);
    }


    function listScripts() {
        return Array.from(document.scripts);
    }

    function listScriptLocations() {
        // ===>>> TODO...
        todo("listScriptLocations");
        return [];
    }

    function listScriptSources() {
        // ===>>> TODO...
        todo("listScriptSources");
        return [];
    }

    function listScriptHostNames() {
        // ===>>> TODO...
        todo("listScriptHostNames");
        return [];
    }

    function inspectScripts() {
        // ===>>> TODO...
        todo("inspectScripts");
        return boss;
    }

    function inspectScriptLocations() {
        // ===>>> TODO...
        todo("inspectScriptLocations");
        return boss;
    }

    function inspectScriptSources() {
        // ===>>> TODO...
        todo("inspectScriptSources");
        return boss;
    }

    function inspectScriptHostNames() {
        // ===>>> TODO...
        todo("inspectScriptHostNames");
        return boss;
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

    function getEditorContent(editor) {
        validateEditor(editor);
        return editor.value || '';
    }

    function setEditorContent(editor, content) {
        validateEditor(editor);
        editor.value = formatEditorContent(content);
        return boss;
    }

    //===>>> TODO...
    //===>>> TODO...
    //===>>> TODO...
    function runScript(editor) { }
    function cacheScript(editor) { }
    function recoverScript(editor) { }
    function importScript(editor) { }
    function exportScript(editor) { }
    function loadScript(editor) { }
    function saveScript(editor) { }
    function mailScript(editor, options) { }


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


    boss.extra = {
        expected,
        table, group,
        location, baseName, hostName,
    };

    boss.editor = {
        style: {
            tabSize: setEditorTabSize,
            font: setEditorFont,
            colors: setEditorColors
        },
        content: {
            read: getEditorContent,
            write: setEditorContent,
            format: formatEditorContent
        },
        selection: {
            read: copyEditorSelection,
            write: replaceEditorSelection,
            details: getEditorSelectionDetails
        },
        init: initEditor,
        run: runScript,
        cache: {
            read: cacheScript,
            write: recoverScript,
        },
        transport: {
            read: importScript,
            write: exportScript,
        },
        file: {
            read: loadScript,
            write: saveScript,
        },
        mail: {
            send: mailScript,
        },
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

    boss.list = {
        scripts: listScripts,
        titles: listScriptTitles,
        fileNames: listScriptFileNames,
        locations: listScriptLocations,
        sources: listScriptSources,
        hostnames: listScriptHostNames,
        details: listScriptDetails,
    };

    boss.inspect = {
        scripts: inspectScripts,
        titles: inspectScriptTitles,
        fileNames: inspectScriptFileNames,
        locations: inspectScriptLocations,
        sources: inspectScriptSources,
        hostnames: inspectScriptHostNames,
        details: inspectScriptDetails,
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
    edit() {
        return Scribe.popup.open( this.editorURL );
    }
    reset() {
        this.state = {};
        return this;
    }
    transform( object ) {
        this.reset();
        if ( this.is.object( object ) ) {
            const result = {};
            for ( let prop in object ) {
                result[prop] = "";
            }
            this.state.input = object;
            this.state.output = JSON.stringify( result, 0, 2 );
        }
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
            elem.style.position = "fixed";
            elem.value = text;
            elem.focus();
            elem.select();
            document.execCommand( 'copy' );
        } catch( error ) {
            console.error( error );
        } finally {
            container.removeChild( editor );
        }
    }
}

DocTree.editorURL = "https://jsoneditoronline.org/";

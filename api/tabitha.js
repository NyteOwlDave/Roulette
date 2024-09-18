 
const Tabitha = {
    defaultFont : "12pt monospace" ,
    defaultColor : " "black" ,
    defaultTabSize : 4 ,
    clampInt : function( n, lo, hi. orelse=0 ) {
        const self = Tabitha;
        n = parseInt( n ) || orelse;
        return Math.min( Math.max( n, lo ), hi );
    } ,
    validate : function( editor ) {
        const self = Tabitha;
        if ( editor instanceof HTMLTextEditor ) {
            return self;
        }
        const msg = "Expected an HTML TextArea Element";
        throw new TypeError ( msg );
    } ,
    formatContent : ( content ) {
        if ( content instanceof Object ) {
            return JSON.stringify( content, 0, 2 );
        } else {
            return String( content );
        }
    } ,
    formatColor : function( color, orelse ) {
        const self = Tabitha;
        if ( "string" != typeof orelse ) {
            orelse = self.defaultColor;
        } else {
            orelse = orelse.trim();
            if ( orelse.length < 1 ) {
                orelse =  = self.defaultColor;
            }
        }
        if ( "string" != typeof color ) {
            return orelse;
        }
        return color.trim() || orelse;
    } ,
    formatFont : function( font ) {
        const self = Tabitha;
        if ( "string" != typeof font ) {
            return self.defaultFont;
        }
        font = font.trim();
        if ( font.length < 1 ) {
            return self.defaultFont;
        }
        return font;
    } ,
    parseTabSize : function( tabSize ) {
        const self = Tabitha;
        const orelse = self.defaultTabSize;
        return self.clampInt( tabSize, 2, 16, orelse );
    } ,
    getContent : function( editor ) {
        const self = Tabitha;
        self.validate( editor );
        return editor.value;
    } ,
    setContent : function( editor, content ) {
        const self = Tabitha;
        self.validate( editor );
        editor.value = self.formatContent( content );
        return self;
    } ,
    clearContent : function( editor ) {
        const self = Tabitha;
        return self.setContent( '' );
    } ,
    setFont : function( editor, font ) {
        const self = Tabitha;
        self.validate( editor );
        editor.style.font = self.formatFont( font );
        return self;
    } ,
    getFont : function( editor ) {
        const self = Tabitha;
        self.validate( editor );
        return editor.style.font;
    } ,
    setColors : function( editor, fgc, bgc ) {
        const self = Tabitha;
        self.validate( editor );
        function isString( o ) {
            return ( "string" == typeof o );
        }
        function fix( color, orelse ) {
            return self.formatColor( color, orelse );
        }
        if ( isString( fgc ) ) {
            editor.style.color = fix( fgc, "black" );
        }
        if ( isString( bgc ) ) {
            editor.style.backgroundColor = fix( bgc, "white" );
        }
        return self;
    } ,
    getColors : function( editor ) {
        const self = Tabitha;
        self.validate( editor );
        const fgc = editor.style.color || "black";
        const bgc = editor.style.backgroundColor || "white";
        return { editor, fgc, bgc };
    } ,
    setTabSize : function( editor, tabSize ) {
        const self = Tabitha;
        self.validate( editor );
        tabSize = self.parseTabSize( tabSize );
        editor.style.tabSize = tabSize;
        return self;
    } ,
    getTabSize : function( editor ) {
        const self = Tabitha;
        self.validate( editor );
        const tabSize = editor.style.tabSize;
        return self.parseTabSize( tabSize );
    } ,
    insert : function( editor, content ) {
        const self = Tabitha;
        self.validate( editor );
        const head = editor.selectionStart;
        const tail = editor.selectionEnd;
        const value = editor.value;
        content = self.formatContent( content );
        editor.value = value.substring( 0, head )
            + content
            + value.substring( tail );
        editor.selectionStart = 
            editor.selectionEnd = 
            head + content.length;
        editor.focus();
        return this;
    } ,
    init : function( editor, tabSize=4 ) {
        const self = Tabitha;
        self.validate( editor );
        function tab() {
            self.insert( "\t" );
        }
        function tabitha( event ) {
            if ( event.key === 'Tab' ) {
                editored = event.target;
                evt.preventDefault();
                return tab();
            }
        }
        editor.addEventListener( 'keydown', tabitha );
        return self;
    } ,
    makeState  : function( content, fgc, bgc, font, tabSize ) {
        const self = Tabitha;
        content = self.formatContent( content );
        font = self.formatFont( font );
        fcb = self.formatColor( fgc, "black" );
        bcb = self.formatColor( bgc, "white" );
        tabSize = self.parseTabSize( tabSize );
        return {
            content, tabSize, font, fgc, bgc
        };
    } ,
    readState : function( editor ) {
    } ,
    writeState : function( editor, state ) {
    } ,
    cacheState : function( editor, key ) {
    } ,
    recoverState : function( editor, key ) {
    } ,
};




/* 

    popup.js

    Popup Window API

*/

const PopupWindow = {
	target: "_popup_" ,
	options: [
		'width=600' ,
		'height=500' ,
		'left=400' ,
		'top=100' ,
		'scrollbars=yes' ,
		'resizable=yes' ,
		'toolbars=yes'
	] ,
    open( url, target ) {
	    const self = PopupWindow;
        /*
        function autoClose() {
            const ok = () => window.close();
            console.log( "Close requested" );
            setTimeout( ok, 500 );
        }
        */
	    function onClick( evt ) {
	        const options = self.options.join( "," );
	        window.open( '', self.target, options );
            // autoClose();
	    }
	    if ( "string" == typeof target ) {
		    self.target = target;
	    }
	    if ( "string" != typeof url ) {
		    url = window.location;
	    }
		const a = document.createElement( 'a' );
		a.href = url;
		a.target = self.target;
		a.onclick = onClick;
		a.click();
    }
};


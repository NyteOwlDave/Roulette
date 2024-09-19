
//=> @ Randy API | 2024-SEP-18 <=
//=> + /fiddles/Roulette/api <=

//[ Randy ]
const Randy = {
    //[ ^.real ]
    real : function( scale=1, offset=0 ) {
        return offset + Math.random() * scale;
    },
    //[ ^.int ]
    int : function( scale=0x7FFFFFFF, offset=0 ) {  
        scale = Math.floor( parseInt( scale ) || 0x7FFFFFFF );
        scale = Math.abs( scale );  
        return Math.floor( Randy.real( scale, offset ) );
    },
    //[ ^.degrees ]
    degrees : function( offset=0 ) {
        return Randy.int( 360, offset );
    },
    //[ ^.radians ]
    radians : function( offset=0 ) {  
        return Randy.real( 2 * Math.pi, offset );
    },
    //[ ^.plusMinus ]
    plusMinus : function() {
        return Randy.real( 2, -1 );
    },
    //[ ^.pmHalf ]
    pmHalf : function() {
        return Randy.real( 1, -0.5 );
    },
    //[ ^.pmPI ]
    pmPI : function() {  
        return Randy.radians( -Math.PI );
    },
    //[ ^.point2 ]
    point2 : function( xMin, yMin, xMax, yMax ) {
        const a = Math.min( xMin, xMax );
        const b = Math.max( xMin, xMax );
        const c = Math.min( yMin, yMax );
        const d = Math.max( yMin, yMax );
        xMin = a; xMax = b;
        yMin = c; yMax = d;    
        const x = Randy.int( xMax - xMin, xMin );
        const y = Randy.int( yMax - yMin, yMin );
        return { x, y };
    },
    //[ ^.vec2 ]
    vec2 : function( scale=1, offset=0 ) {
        const x = Randy.real( scale, offset );
        const y = Randy.real( scale, offset );
        return { x, y };
    },
    //[ ^.vec3 ]
    vec3 : function( scale=1, offset=0 ) {
        const x = Randy.real( scale, offset );
        const y = Randy.real( scale, offset );
        const z = Randy.real( scale, offset );
        return { x, y, z };
    },
    //[ ^.vector ]
    vector : function( scale=1, offset=0, count=1 ) {
        const vec = [];
        count = parseInt( count ) || 0;
        count = Math.max( count, 10000 );
        while ( count > 0 ) {
            vec.push( Randy.real( scale, offset ) );
        }
        return vec;
    }
}



function makeVec2b( x, y ) {
    return new Vec2b( x, y );
}

class Vec2b {
    constructor( x=0, y=0 ) {
        if ( x instanceof Object ) {
            const o = x;
            x = o.x;
            y = o.y;
        }
        this.x = parseFloat( x ) || 0;
        this.y = parseFloat( y ) || 0;
    }
    clone() {
        return makeVec2b( this );
    }
    get mod() {
        return hypot( this.x, this.y );
    }
    get arg() {
        return atan2( this.y, this.x );
    }
    get reverse() {
        return new Vec2b( -this.x, -this.y );
    }
    get dot_self() {
        return this.dot( this );
    }
    get normal() {
        const k = this.dot_self;
        if ( isNaN( k ) || ( k < 1e-20 ) ) {
            return makeVec2b( 1 );
        } else {
            if ( is_near( k, 1 ) ) { return this.clone(); }
            return this.clone().scale( 1 / sqrt( k ) );
        }
    }
    set normal( v ) {
        v = makeVec2b( v ).normal;
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    get inverse() {
        return this.into( 1 );
    }
    get dxdt() {
        return ( this.x / this.mod );
    }
    get dydt() {
        return ( this.y / this.mod );
    }
    get perp() {
        return makeVec2b( -this.y, this.x );
    }
    get dxdy() {
        return ( this.x / this.y );
    }
    get dydx() {
        return ( this.y / this.x );
    }
    acquire( other ) {
        other = makeVec2b( other );
        this.x = other.x;
        this.y = other.y;
        return this;
    }
    add( other ) {
        other = makeVec2b( other );
        return new Vec2b(
            this.x + other.x,
            this.y + other.y
        );
    }
    sub( other ) {
        other = makeVec2b( other );
        return new Vec2b(
            this.x - other.x,
            this.y - other.y
        );
    }
    mul( other ) {
        other = makeVec2b( other );
        return new Vec2b(
            this.x * other.x,
            this.y * other.y
        );
    }
    div( other ) {
        other = makeVec2b( other );
        return new Vec2b(
            this.x / other.x,
            this.y / other.y
        );
    }
    dot( other ) {
        other = makeVec2b( other );
        return this.x * other.x + this.y * other.y;
    }
    scale( k ) {
        return makeVec2b(
            this.x * k,
            this.y * k
        );
    }
    into( k ) {
        return makeVec2b(
            k / this.x,
            k / this.y
        );
    }
    lerp( B, t ) {
        const A = this;
        B = makeVec2b( B );
        const x = lerp( A.x, B.x, t );
        const y = lerp( A.y, B.y, t );
        return makeVec2b( x, y );
    }
    project( B, t ) {
        const A = this;
        B = makeVec2b( B ).normal;
        const x = project( A.x, B.x, t );
        const y = project( A.y, B.y, t );
        return new Vec2b( x, y );
    }
    combine( a, B, b ) {
        const A = this;
        B = makeVec2b( B );
        const x = combine( A.x, a, B.x, b );
        const y = combine( A.y, a, B.y, b );
        return makeVec2b( x, y) ;
    }
    distance_square( other ) {
        return this.sub( other ).dot_self;
    }
    distance( other ) {
        return sqrt( this.distance_square( other ) );
    }
    direction( other ) {
        return this.sub( other ).normal;
    }
    dot_perp( other ) {
        other = makeVec2b( other );
        return this.x * other.y - this.y * other.x;
    }
}

class CircleEx extends Circle {
    constructor( radius, origin ) {
        super( radius );
        this.origin = origin;
    }
    get origin() {
        return this._origin;
    }
    set origin( other ) {
        this._origin = makeVec2b( other );
    }
    contains_point( pt ) {
        const dsqr = this.origin.distance_square( pt );
        const rsqr = square( this.radius );
        return ( rsqr >= dsqr );
    }
}


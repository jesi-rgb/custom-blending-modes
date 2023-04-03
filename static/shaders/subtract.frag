#ifdef GL_ES
precision mediump float;
#endif
varying highp vec2 vVertTexCoord;

uniform sampler2D image;
uniform vec4 color;

vec4 subtract(vec4 b, vec4 f){
    return vec4( abs(b.r - f.r), abs(b.g - f.g), abs(b.b - f.b), b.a);
}
void main() {
    vec4 img = texture2D(image, vec2(vVertTexCoord.x, vVertTexCoord.y));
    gl_FragColor = subtract(img, color);
}

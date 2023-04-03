#ifdef GL_ES
precision mediump float;
#endif
varying highp vec2 vVertTexCoord;

uniform sampler2D image;
uniform vec4 color;

void main() {
    vec4 img = texture2D(image, vec2(vVertTexCoord.x, vVertTexCoord.y));
    gl_FragColor = img + color;
}

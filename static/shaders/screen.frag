#ifdef GL_ES
precision mediump float;
#endif
varying highp vec2 vVertTexCoord;

uniform sampler2D image;
uniform vec4 color;

vec4 screen(vec4 b, vec4 f){
    vec4 subF = vec4(1.0 - f.r, 1.0 - f.g, 1.0 - f.b, f.a);
    vec4 subB = vec4(1.0 - b.r, 1.0 - b.g, 1.0 - b.b, b.a);

    vec4 multBF = subF * subB;

    return vec4(1.0 - multBF.r, 1.0 - multBF.g, 1.0 - multBF.b, multBF.a);
}

void main() {
    vec4 img = texture2D(image, vec2(vVertTexCoord.x, vVertTexCoord.y));
    gl_FragColor = screen(img, color);
}

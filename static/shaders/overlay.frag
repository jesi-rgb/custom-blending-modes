#ifdef GL_ES
precision mediump float;
#endif
varying highp vec2 vVertTexCoord;

uniform sampler2D image;
uniform vec4 color;

vec4 overlay(vec4 b, vec4 f){
    float red = b.r < 0.5 ? (2.0 * b.r * f.r) : (1.0 - 2.0 * (1.0 - b.r) * (1.0 - f.r));
    float green = b.g < 0.5 ? (2.0 * b.g * f.g) : (1.0 - 2.0 * (1.0 - b.g) * (1.0 - f.g));
    float blue = b.b < 0.5 ? (2.0 * b.b * f.b) : (1.0 - 2.0 * (1.0 - b.b) * (1.0 - f.b));

    return vec4(red, green, blue, b.a);
}

void main() {
    vec4 img = texture2D(image, vec2(vVertTexCoord.x, vVertTexCoord.y));
    gl_FragColor = overlay(img, color);
}

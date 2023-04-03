#ifdef GL_ES
precision mediump float;
#endif
varying highp vec2 vVertTexCoord;

uniform sampler2D image;
uniform vec4 color;

vec4 soft_light(vec4 b, vec4 f){
    vec4 step1 = vec4(1.0 - f.r * 2.0, 1.0 - f.g * 2.0, 1.0 - f.b * 2.0, 1.0);
    vec4 step2 = b * b;
    vec4 step3 = step1 * step2;
    vec4 step4 = b * f * 2.0;

    return step3 + step4;
}

void main() {
    vec4 img = texture2D(image, vec2(vVertTexCoord.x, vVertTexCoord.y));
    gl_FragColor = soft_light(img, color);
}

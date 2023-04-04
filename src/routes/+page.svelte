<script>
	import P5 from 'p5-svelte';
	import { Plus, Minus, X, Divide, Backspace } from 'phosphor-svelte';

	import ColorPicker from 'svelte-awesome-color-picker';
	import MultiSelect from 'svelte-multiselect';

	const modes = [
		'Multiply',
		'Screen',
		'Overlay',
		'Hard Light',
		'Soft Light',
		'Add',
		'Subtract',
		'Custom'
	];
	let selected = ['Custom'];

	let img;
	let shader, screen, multiply, add, subtract, overlay, hard_light, soft_light, custom;
	let rgb = { r: 255, g: 120, b: 255, a: 1 };
	let r, g, b, a;
	$: r = rgb.r / 255;
	$: g = rgb.g / 255;
	$: b = rgb.b / 255;
	$: a = rgb.a;

	let modeMap;
	let textArea;
	let inputString = 'bg * fg';

	let customVertex = `
attribute vec3 aPosition;
attribute vec3 aNormal;
attribute vec2 aTexCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;

varying highp vec2 vVertTexCoord;

void main(void) {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
  vVertTexCoord = aTexCoord;
} 
 `;

	let customFragment = `
#ifdef GL_ES
precision mediump float;
#endif
varying highp vec2 vVertTexCoord;

uniform sampler2D image;
uniform vec4 color;

vec4 custom(vec4 bg, vec4 fg){
    return ${inputString};
}

void main() {
    vec4 img = texture2D(image, vec2(vVertTexCoord.x, vVertTexCoord.y));
    gl_FragColor = custom(img, color);
}
`;

	const sketch = (p5) => {
		p5.preload = () => {
			img = p5.loadImage('images/parrot.png');
			screen = p5.loadShader('shaders/blends.vert', 'shaders/screen.frag');
			multiply = p5.loadShader('shaders/blends.vert', 'shaders/multiply.frag');
			add = p5.loadShader('shaders/blends.vert', 'shaders/add.frag');
			subtract = p5.loadShader('shaders/blends.vert', 'shaders/subtract.frag');
			overlay = p5.loadShader('shaders/blends.vert', 'shaders/overlay.frag');
			hard_light = p5.loadShader('shaders/blends.vert', 'shaders/hard_light.frag');
			soft_light = p5.loadShader('shaders/blends.vert', 'shaders/soft_light.frag');

			console.log(customFragment);

			modeMap = {
				Multiply: multiply,
				Screen: screen,
				Subtract: subtract,
				Overlay: overlay,
				'Hard Light': hard_light,
				'Soft Light': soft_light,
				Add: add
			};

			custom = p5.createShader(customVertex, customFragment);
			modeMap['Custom'] = custom;
		};

		p5.setup = () => {
			let imgAspectRatio = img.width / img.height;
			let maxW = p5.windowWidth - 10 < 900 ? p5.windowWidth - 10 : 900;

			p5.createCanvas(maxW, maxW / imgAspectRatio, p5.WEBGL);
		};

		p5.draw = () => {
			shader = modeMap[selected[0]];

			p5.shader(shader);
			shader.setUniform('image', img);
			shader.setUniform('color', [r, g, b, a]);
			p5.rect(-p5.width / 2, -p5.height / 2, p5.width, p5.height);
		};
	};
</script>

<div>
	<div class="flex flex-col font-medium my-10">
		<div class="xl:w-1/4 mx-4">
			<h1 class="text-6xl font-extrabold mb-10">Blending Modes</h1>
			<p>Choose your blending mode and let the <em>bruh</em> happen</p>

			<div class="w-min mb-10">
				<MultiSelect
					style="box-shadow: 2px 2px 2px #00000022"
					bind:selected
					options={modes}
					required={1}
					minSelect={1}
					maxSelect={1}
				/>
			</div>
			{#if selected[0] === 'Custom'}
				<div>
					<div class="flex items-center space-x-3">
						<button
							on:click={() => {
								textArea.value += 'bg';
							}}
							class="p-3 bg-slate-300 rounded-sm">Bg</button
						>
						<button
							on:click={() => {
								textArea.value += 'fg';
							}}
							class="p-3 bg-slate-300 rounded-sm">Fg</button
						>
						<button
							on:click={() => {
								textArea.value += '+';
							}}
							class="p-3 bg-slate-300 rounded-sm"
							><Plus weight={'bold'} />
						</button>
						<button
							on:click={() => {
								textArea.value += '-';
							}}
							class="p-3 bg-slate-300 rounded-sm"><Minus weight={'bold'} /></button
						>
						<button
							on:click={() => {
								textArea.value += '*';
							}}
							class="p-3 bg-slate-300 rounded-sm"><X weight={'bold'} /></button
						>
						<button
							on:click={() => {
								textArea.value += '/';
							}}
							class="p-3 bg-slate-300 rounded-sm"><Divide weight={'bold'} /></button
						>
					</div>
					<textarea
						bind:this={textArea}
						style="box-shadow: 2px 2px 2px #00000022"
						class="border font-mono border-black rounded-sm p-10"
						type="text"
						name="shader"
						id="shader">bg * fg</textarea
					>
				</div>
			{/if}
		</div>
		<div class="relative">
			<div class="border border-black w-fit mx-auto">
				<P5 {sketch} debug />
			</div>
			<div class="w-fit top-0 left-0 absolute mx-auto">
				<ColorPicker isPopup={false} isAlpha={false} isTextInput={false} label={''} bind:rgb />
			</div>
		</div>
	</div>
</div>

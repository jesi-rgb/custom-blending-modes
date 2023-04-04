<script>
	import P5 from 'p5-svelte';
	import { Plus, Minus, X, Divide, Bluetooth } from 'phosphor-svelte';

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
	let shader, screen, multiply, add, subtract, overlay, hard_light, soft_light;
	let rgb = { r: 255, g: 120, b: 255, a: 1 };
	let hex;
	let r, g, b, a;
	$: r = rgb.r / 255;
	$: g = rgb.g / 255;
	$: b = rgb.b / 255;
	$: a = rgb.a;

	let modeMap;
	let textArea;
	let inputString = 'bg / fg';

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

			modeMap = {
				Multiply: multiply,
				Screen: screen,
				Subtract: subtract,
				Overlay: overlay,
				'Hard Light': hard_light,
				'Soft Light': soft_light,
				Add: add
			};
		};

		p5.setup = () => {
			let imgAspectRatio = img.width / img.height;
			let maxW = p5.windowWidth - 5 < 1000 ? p5.windowWidth - 5 : 1000;

			p5.createCanvas(maxW, maxW / imgAspectRatio, p5.WEBGL);
			modeMap['Custom'] = p5.createShader(customVertex, customFragment);
		};
		p5.keyPressed = (e) => {
			if (e.key === 'Enter') {
				inputString = textArea?.value === '' ? 'bg' : textArea?.value;
				let updatedFragment = `
#ifdef GL_ES
precision mediump float;
#endif
varying highp vec2 vVertTexCoord;

uniform sampler2D image;
uniform vec4 color;

vec4 custom(vec4 bg, vec4 fg){
    vec4 yellow = vec4(1., 1., 0., 1.);
    vec4 cyan = vec4(0., 1., 1., 1.);
    vec4 red = vec4(1., 0., 0., 1.);
    vec4 green = vec4(0., 1., 0., 1.);
    vec4 blue = vec4(0., 0., 1., 1.);
    return ${inputString};
}

void main() {
    vec4 img = texture2D(image, vec2(vVertTexCoord.x, vVertTexCoord.y));
    gl_FragColor = custom(img, color);
}
`;
				modeMap['Custom'] = p5.createShader(customVertex, updatedFragment);
			}
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

<div class="w-screen h-screen opacity-20 absolute top-0 -z-10" style="background-color: {hex};" />
<div class="z-10">
	<div class="flex flex-col justify-between xl:justify-normal xl:flex-row font-medium my-10">
		<div class="xl:w-1/4 mx-4">
			<h1 class="text-4xl xl:text-6xl font-extrabold font-serif mb-4 tracking-tighter">
				Blending Modes
			</h1>
			<p class="text-lg tracking-tight mb-2">
				Choose your blending mode and let the <em>✨magic✨</em> happen. Select from the usual ones or
				go wild with a custom made!
			</p>
			<p class="text-lg tracking-tight mb-2">
				Also, there's a <span
					class="inline-block w-4 h-4 align-middle rounded-full"
					style="background-color: {hex};"
				/>
				dot down there, in the bottom center of the image. Use it to change the color of the overlaid
				rectangle and experiment!
			</p>

			<hr style="color: {hex}; background-color: {hex};" />
			<div class="w-full my-10">
				<MultiSelect
					style="box-shadow: 2px 2px 2px #00000022"
					bind:selected
					options={modes}
					inputmode="none"
					required={1}
					minSelect={1}
					maxSelect={1}
				/>
			</div>

			{#if selected[0] === 'Custom'}
				<div class="mx-auto">
					<textarea
						bind:this={textArea}
						on:keydown={(e) => {
							if (e.key === 'Enter') {
								e.preventDefault();
							}
						}}
						tabindex="0"
						inputmode="tel"
						style="box-shadow: 2px 2px 2px #00000022"
						class="border font-mono border-black rounded-sm p-4 my-2 w-full"
						type="text"
						name="shader"
						id="shader">{inputString}</textarea
					>
				</div>
				<div>
					<div class="flex items-center justify-center xl:justify-evenly mb-5 space-x-3">
						<button
							on:click={() => {
								textArea.value += 'bg ';
								textArea.focus();
							}}
							style="background-color: {hex};"
							class="w-[40px] h-[40px] text-lg rounded-sm">Bg</button
						>
						<button
							on:click={() => {
								textArea.value += 'fg ';
								textArea.focus();
							}}
							style="background-color: {hex};"
							class="w-[40px] h-[40px] text-lg rounded-sm">Fg</button
						>
						<button
							on:click={() => {
								textArea.value += ' + ';
								textArea.focus();
							}}
							style="background-color: {hex};"
							class="p-3 rounded-sm"
							><Plus weight={'bold'} />
						</button>
						<button
							on:click={() => {
								textArea.value += ' - ';
								textArea.focus();
							}}
							style="background-color: {hex};"
							class="p-3 rounded-sm"><Minus weight={'bold'} /></button
						>
						<button
							on:click={() => {
								textArea.value += ' * ';
								textArea.focus();
							}}
							style="background-color: {hex};"
							class="p-3 rounded-sm"><X weight={'bold'} /></button
						>
						<button
							on:click={() => {
								textArea.value += ' / ';
								textArea.focus();
							}}
							style="background-color: {hex};"
							class="p-3 rounded-sm"><Divide weight={'bold'} /></button
						>
					</div>
				</div>
			{/if}
		</div>
		<div class="border border-black relative mx-auto drop-shadow-xl">
			<P5 {sketch} debug />
			<div
				style="filter:box-shadow(0 0 0.75rem #fff)"
				class="w-fit bottom-0 right-0 left-0 absolute mx-auto"
			>
				<ColorPicker
					isPopup={false}
					isAlpha={false}
					isTextInput={false}
					label={''}
					bind:hex
					bind:rgb
				/>
			</div>
		</div>
	</div>
</div>

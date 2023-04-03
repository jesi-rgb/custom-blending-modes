<script>
	import P5 from 'p5-svelte';
	import ColorPicker from 'svelte-awesome-color-picker';

	let img;
	let blendShader;
	let rgb = { r: 255, g: 0, b: 255 };
	let r, g, b;

	$: r = rgb.r / 255;
	$: g = rgb.g / 255;
	$: b = rgb.b / 255;

	const sketch = (p5) => {
		p5.preload = () => {
			img = p5.loadImage('images/parrot.png');
			blendShader = p5.loadShader('shaders/blends.vert', 'shaders/blends.frag');
		};

		p5.setup = () => {
			p5.createCanvas(img.width, img.height, p5.WEBGL);
			p5.shader(blendShader);

			blendShader.setUniform('image', img);
		};

		p5.draw = () => {
			blendShader.setUniform('image', img);
			blendShader.setUniform('color', [r, g, b, 1.0]);
			p5.noStroke();
			p5.rect(-p5.width / 2, -p5.height / 2, p5.width, p5.height);
		};
	};

	let parent;
</script>

<div>
	<div class="flex flex-row my-10">
		<div class="w-1/4 mx-4">
			<h1 class="text-4xl font-bold font-serif mb-10">Blending Modes</h1>
			<p>
				Do exercitation aliquip incididunt tempor ullamco aliqua excepteur sint Lorem sit minim id.
				Tempor duis consequat aute esse ullamco occaecat non sit veniam dolor. Eu nostrud laboris id
				aliquip ad laborum mollit reprehenderit consectetur. Excepteur labore eu id Lorem aliquip
			</p>
		</div>
		<div class="flex flex-col justify-center w-3/4">
			<div class="border border-black w-fit mx-auto">
				<P5 {sketch} target={parent} debug />
			</div>
			<div class="w-fit mx-auto">
				<ColorPicker bind:rgb />
			</div>
		</div>
	</div>
</div>

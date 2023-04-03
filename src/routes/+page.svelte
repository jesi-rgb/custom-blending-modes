<script>
	import P5 from 'p5-svelte';
	import ColorPicker from 'svelte-awesome-color-picker';

	let img;
	let hex;

	const sketch = (p5) => {
		p5.preload = () => {
			img = p5.loadImage('images/parrot.png');
		};
		p5.setup = () => {
			p5.createCanvas(img.width, img.height);
			img.loadPixels();
			for (let i = 0; i < img.width * img.height * 4; i += 4) {
				img.pixels[i] = p5.red(p5.color(hex));
				img.pixels[i + 1] = p5.green(p5.color(hex));
				img.pixels[i + 2] = p5.blue(p5.color(hex));
			}
			img.updatePixels();
		};
		p5.draw = () => {
			p5.image(img, 0, 0, img.width, img.height);
			// p5.fill(p5.color(hex));
			// p5.rect(0, 0, p5.width, p5.height);
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
				mollit. Laboris ut laboris cillum sit tempor sit cillum fugiat commodo. Proident commodo ut
				veniam aute laborum ullamco esse pariatur. Enim sit tempor elit mollit ipsum nulla Lorem
				aliquip aute qui quis consequat proident ut. Commodo eiusmod magna in mollit consectetur
				aliquip dolore non tempor veniam sit esse. Aute deserunt laboris consectetur aliqua aliqua
				cupidatat non proident aliquip reprehenderit sint id. Voluptate minim id eu amet pariatur
				laborum eiusmod. Reprehenderit ex adipisicing irure duis labore cillum dolor sit esse sint
				aliqua esse ad. Aute enim cupidatat mollit fugiat ea. Est sint minim nostrud mollit est
				veniam pariatur est est labore. Quis magna aliquip sunt cillum ut irure labore aliquip et
				enim. Tempor occaecat elit deserunt. Aliquip occaecat sint nostrud mollit qui aliquip sunt
				sint.
			</p>
		</div>
		<div class="flex flex-col justify-center w-3/4">
			<div class="border border-black w-fit mx-auto">
				<P5 {sketch} target={parent} debug />
			</div>
			<div class="w-fit mx-auto">
				<ColorPicker bind:hex />
			</div>
		</div>
	</div>
</div>

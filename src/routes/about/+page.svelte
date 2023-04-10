<script>
	import logo from '$lib/images/design-bits-no-ring.svg';
</script>

<div class="w-screen h-screen absolute -z-10 top-0" style="background-color: #aff7d0;" />
<div style="color: #021713" class="flex-col text-lg space-y-20 mx-auto max-w-sm xl:max-w-lg my-10">
	<div class="bg-[#021713] px-4 py-2 text-[#aff7d0] rounded-xl -my-5 w-fit">
		<a href="/"> Back home!</a>
	</div>
	<div>
		<div class="font-serif text-4xl font-bold">How to use this</div>
		<div class="my-5 flex-col space-y-5">
			<p>
				Functionality is simple (and rather limited). You can choose whatever blend mode you want
				out of the default ones. The idea is we are are creating a rectangle the same size as the
				image and we can set whatever color and blend mode we want for that rectangle. That way, we
				are able to see the effect it has on the photograph.
			</p>
			<p>
				The main feature is the <b>custom blend mode</b>. We can write our own formulas and see what
				a new blend mode would look like.
			</p>
			<p>
				Some considerations: the <em>language</em> or syntax we are using to write this is GLSL. Obviously,
				I don't expect anyone using this to know what it is, but there might be a chance that you know.
				This language has a strict set of rules that can (and will) break when you try to input a formula
				of your own. The program crashes and stalls, so just reload the wepage.
			</p>
		</div>
	</div>
	<div>
		<div class="font-serif text-4xl font-bold">About</div>
		<div class="my-5 flex-col space-y-5">
			<p>
				This is a little webpage created as a demo for the youtube channel Design Bits. Check out
				the main channel here!
			</p>
			<p>
				It aims to bring closer to designers and alike the concept of what a blending mode is.
				You can watch the video here! If you got here, thanks! Be sure to say hi wherever!
			</p>
		</div>
	</div>
</div>
<hr
	class="max-w-sm mx-auto"
	style="height:2px;border-width:0;color: #021713; background-color: #021713;"
/>
<a
	class="cursor-pointer my-10 flex items-center w-fit mx-auto text-3xl space-x-3 hover:bg-black hover:bg-opacity-10 p-3 rounded-xl transition-colors"
	href="https://youtube.com/@Design_Bits"
>
	<img src={logo} width="40px" class="" alt="design bits logo" />
	<div class="font-semibold tracking-tighter">Design Bits</div>
	<div class="font-semibold text-sm tracking-tighter">—</div>
	<div class="font-semibold text-sm tracking-tighter">by Jesús Rascón</div>
</a>

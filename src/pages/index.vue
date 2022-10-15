<template>
	<div class="
		mx-auto
		w-full
		h-full
		flex
		flex-col
		justify-center
		prose sm:prose-lg
		md:max-w-7xl
		grid md:grid-cols-2 gap-2 sm:gap-6
	">
		<Description v-if="json !== null" class="col-span-full text-justify md:text-left">
			<Bar class="mt-2" />
			<Blocks :json="json" />
			<div class="my-40"></div>
		</Description>
	</div>
</template>
<script>
export default {
    data() {
		return {
			json: null
		}
	},
    mounted() {
		document.title = "Explorer - Pea";
		fetch(window.localStorage.getItem("api") + "/json").then(res => res.json()).then(data => {
			this.json = data
		})
    }
}
</script>
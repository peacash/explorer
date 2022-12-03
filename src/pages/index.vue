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
		<Description v-if="dynamic !== null" class="col-span-full text-justify md:text-left">
			<Bar class="mt-2" />
			<Blocks :dynamic="dynamic" :height="height" />
			<div class="my-40"></div>
		</Description>
	</div>
</template>
<script>
export default {
    data() {
		return {
			dynamic: null,
			height: null,
			interval: null
		}
	},
    mounted() {
		document.title = "Explorer - Pea";
		this.loop();
    },
	unmounted() {
		clearInterval(this.interval)
	},
	methods: {
		loop() {
			this.fetchData();
			this.interval = setInterval(() => {
				this.fetchData()
			}, 10000);
		},
		fetchData() {
			fetch(window.localStorage.getItem("api") + "/dynamic").then(res => res.json()).then(data => {
				this.dynamic = data
			})
			fetch(window.localStorage.getItem("api") + "/height").then(res => res.json()).then(data => {
				this.height = data
			})
		}
	},
}
</script>
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
		<Description class="col-span-full text-justify md:text-left">
			<Bar class="mt-2" />
			<Sync :sync="sync" />
			<h2 class="mx-auto uppercase" style="font-weight: 300;">blocks</h2>
			<Blocks v-if="dynamic" :state="dynamic" :height="sync.height" />
			<Blocks v-if="(dynamic && trusted)" :state="trusted" :height="sync.height - dynamic.latest_hashes.length" />
			<div class="my-40"></div>
		</Description>
	</div>
</template>
<script>
export default {
    data() {
		return {
			dynamic: null,
			trusted: null,
			sync: null,
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
			}, 3000);
		},
		fetchData() {
			fetch(window.localStorage.getItem("api") + "/dynamic").then(res => res.json()).then(data => {
				this.dynamic = data
			})
			fetch(window.localStorage.getItem("api") + "/trusted").then(res => res.json()).then(data => {
				this.trusted = data
			})
			fetch(window.localStorage.getItem("api") + "/sync").then(res => res.json()).then(data => {
				this.sync = data
			})
		}
	},
}
</script>
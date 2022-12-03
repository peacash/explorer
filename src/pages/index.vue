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
			<div v-if="(!sync && !ifo && !dynamic && !trusted && timeout)" class="flex flex-col justify-center mx-auto my-4">
				<div>API endpoint <i>{{ api }}</i> seems unresponsive.</div>
				<div v-if="https">
					Try the
					<a :href="'http://' + host">http version</a>
					of this website.
				</div>
			</div>
    		<h2 v-if="(sync || info)" class="mx-auto uppercase" style="font-weight: 300;">general</h2>
			<Sync v-if="sync" :sync="sync" />
			<Info v-if="info" :info="info" />
			<h2 v-if="(dynamic || trusted)" class="mx-auto uppercase" style="font-weight: 300;">blocks</h2>
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
			info: null,
			interval: null,
			timeout: false,
			https: window.location.protocol === "https:",
			host: window.location.host,
			api: null
		}
	},
    mounted() {
		document.title = "Explorer - Pea";
		this.loop();
		setTimeout(() => {
			this.timeout = true
		}, 1000)
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
			this.api = window.localStorage.getItem("api");
			fetch(this.api + "/dynamic").then(res => res.json()).then(data => {
				this.dynamic = data
			})
			fetch(this.api + "/trusted").then(res => res.json()).then(data => {
				this.trusted = data
			})
			fetch(this.api + "/sync").then(res => res.json()).then(data => {
				this.sync = data
			})
			fetch(this.api + "/info").then(res => res.json()).then(data => {
				this.info = data
			})
		}
	},
}
</script>
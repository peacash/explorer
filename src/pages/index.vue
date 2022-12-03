<style scoped>
table {
	font-family: 'Courier New', Courier, monospace;
	font-weight: 600;
	border-collapse: collapse;
	width: 100%;
}
td {
	border: 1px solid #ddd;
	text-align: left;
	padding: 8px;
}
td:nth-child(odd) {
	padding-right: 16px;
}
td:nth-child(even) {
	word-break: break-word;
}
tr:nth-child(even) {
	background-color: #eee;
}
.link { text-decoration: none; font-weight: 600; }
.link:hover {
	text-decoration: underline;
}
</style>
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
				<Unresponsive :api="api" />
			</div>
    		<h2 v-if="(sync || info)" class="mx-auto uppercase" style="font-weight: 300;">general</h2>
			<table class="mx-auto">
				<tr v-if="sync">
					<td>Synchronization</td>
					<td>{{ sync.sync }}</td>
				</tr>
				<tr v-if="sync">
					<td>Last block seen</td>
					<td>{{ sync.last }}</td>
				</tr>
				<tr v-if="sync">
					<td>Height</td>
					<td>{{ sync.height }}</td>
				</tr>
				<tr v-if="info">
					<td>Tree&nbsp;size</td>
					<td>{{ info.tree_size }}</td>
				</tr>
				<tr v-if="info">
					<td>Public&nbsp;key</td>
					<td v-if="shorten_public_key" @click="(shorten_public_key = false)">{{ shorten(info.public_key) }}</td>
					<td v-else>
        				<router-link class="link" :to="'/address/' + info.public_key">{{ info.public_key }}</router-link>
					</td>
				</tr>
				<tr v-if="info">
					<td>Time</td>
					<td>{{ info.time }}</td>
				</tr>
				<tr v-if="info">
					<td>Uptime</td>
					<td>{{ info.uptime }}</td>
				</tr>
				<tr v-if="info">
					<td>Tick</td>
					<td>{{ info.lag }} ms</td>
				</tr>
			</table>
			<h2 v-if="dynamic" class="mx-auto uppercase" style="font-weight: 300;">stakers</h2>
			<Stakers v-if="dynamic" :state="dynamic" />
			<h2 v-if="(dynamic || trusted)" class="mx-auto uppercase" style="font-weight: 300;">blocks</h2>
			<Blocks v-if="(dynamic && sync)" :state="dynamic" :height="sync.height" />
			<Blocks v-if="(dynamic && trusted && sync)" :state="trusted" :height="sync.height - dynamic.latest_hashes.length" />
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
			api: null,
			shorten_public_key: true
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
		shorten(string) {
			return string.slice(0, 12) + "..." + string.slice(-8)
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
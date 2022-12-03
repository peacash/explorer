<style scoped>
table {
	font-weight: 600;
	border-collapse: collapse;
	width: 100%;
}
td {
	padding: 8px;
	font-family: 'Courier New', Courier, monospace;
}
td:nth-child(even) {
	word-break: break-word;
}
tr:nth-child(even) {
	background-color: #f6f6f6;
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
			<table>
				<tr class="mx-auto text-xl flex justify-center pb-2">General information about Node</tr>
				<tr v-if="sync" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Synchronization</td>
					<td class="
						flex justify-left w-full
					">{{ sync.sync }}</td>
				</tr>
				<tr v-if="sync" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Last&nbsp;block&nbsp;seen</td>
					<td class="
						flex justify-left w-full
					">{{ sync.last }}</td>
				</tr>
				<tr v-if="sync" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Height</td>
					<td class="
						flex justify-left w-full
					">{{ sync.height }}</td>
				</tr>
				<tr v-if="info" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Tree&nbsp;size</td>
					<td class="
						flex justify-left w-full
					">{{ info.tree_size }}</td>
				</tr>
				<tr v-if="info" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Public&nbsp;key</td>
					<td v-if="shorten_public_key" @click="(shorten_public_key = false)" class="
						flex justify-left w-full
					">{{ shorten(info.public_key) }}</td>
					<td v-else class="
						flex justify-left w-full
					">
        				<router-link class="link" :to="'/address/' + info.public_key">{{ info.public_key }}</router-link>
					</td>
				</tr>
				<tr v-if="info" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Time</td>
					<td class="
						flex justify-left w-full
					">{{ info.time }}</td>
				</tr>
				<tr v-if="info" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Uptime</td>
					<td class="
						flex justify-left w-full
					">{{ info.uptime }}</td>
				</tr>
				<tr v-if="info" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Tick</td>
					<td class="
						flex justify-left w-full
					">{{ info.lag }} ms</td>
				</tr>
			</table>
			<table v-if="dynamic">
				<tr class="mx-auto text-xl flex justify-center pb-2">Stakers Queue</tr>
				<tr v-for="(public_key, index) in dynamic.stakers" :key="(hash, index)" class="
						flex w-full
					">
					<td class="
						flex flex-col justify-center
					">#{{ index }}</td>
					<td class="
						flex justify-center w-full
					">
        				<router-link class="link" :to="('/address/' + public_key)">{{ public_key }}</router-link>
					</td>
				</tr>
			</table>
			<table v-if="(dynamic && sync && sync)">
				<tr class="mx-auto text-xl flex justify-center pb-2">Latest Blocks</tr>
				<tr v-for="(hash, index) in [...dynamic.latest_hashes, ...trusted.latest_hashes].concat()" :key="(hash, index)" class="
						flex w-full
					">
					<td class="
						flex flex-col justify-center
					">#{{ sync.height - index }}</td>
					<td class="
						flex justify-center w-full
					">
        				<router-link class="link" :to="('/block/' + hash)">{{ hash }}</router-link>
					</td>
				</tr>
			</table>
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
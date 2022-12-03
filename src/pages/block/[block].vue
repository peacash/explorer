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
.link { text-decoration: none; }
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
			<h2 class="mx-auto uppercase" style="font-weight: 300;">block</h2>
			<table class="mx-auto">
				<tr v-if="height">
					<td>Height</td>
					<td>{{ height }}</td>
				</tr>
				<tr v-if="block">
					<td>Hash</td>
					<td v-if="shorten_hash" @click="(shorten_hash = false)">{{ shorten(block.hash) }}</td>
					<td v-else>{{ block.hash }}</td>
				</tr>
				<tr v-if="block">
					<td>Previous&nbsp;hash</td>
					<td v-if="shorten_previous_hash" @click="(shorten_previous_hash = false)">{{ shorten(block.previous_hash) }}</td>
					<td v-else>{{ block.previous_hash }}</td>
				</tr>
				<tr v-if="block">
					<td>Timestamp</td>
					<td>{{ new Date(block.timestamp * 1000).toLocaleString() }}</td>
				</tr>
				<tr v-if="block">
					<td>Public&nbsp;key</td>
					<td v-if="shorten_forger" @click="(shorten_forger = false)">{{ shorten(block.public_key) }}</td>
					<td v-else>{{ block.public_key }}</td>
				</tr>
				<tr v-if="block">
					<td>Signature</td>
					<td v-if="shorten_signature" @click="(shorten_signature = false)">{{ shorten(block.signature) }}</td>
					<td v-else>{{ block.signature }}</td>
				</tr>
				<tr v-if="block">
					<td>Transactions</td>
					<td>{{ block.transactions.length }}</td>
				</tr>
				<tr v-if="block">
					<td>Stakes</td>
					<td>{{ block.stakes.length }}</td>
				</tr>
			</table>
			<Transactions v-if="block" :transactions="block.transactions" />
			<Stakes v-if="block" :stakes="block.stakes" />
			<div class="my-40"></div>
		</Description>
	</div>
</template>
<script>
export default {
    data() {
		return {
			block: null,
			height: null,
			shorten_hash: true,
			shorten_previous_hash: true,
			shorten_forger: true,
			shorten_signature: true
		}
	},
	methods: {
		fetchData() {
			if (!this.$route.params.block) return
			fetch(window.localStorage.getItem("api") + "/block/" + this.$route.params.block).then(res => res.json()).then(data => {
				this.block = data
			})
			fetch(window.localStorage.getItem("api") + "/height/" + this.$route.params.block).then(res => res.json()).then(data => {
				this.height = data
			})
		},
		shorten(string) {
			return string.slice(0, 12) + "..." + string.slice(-8)
		}
	},
    mounted() {
		document.title = this.$route.params.block + " - Block - Explorer - Pea";
		this.fetchData();
    },
	watch: {
		'$route.params': {
			handler() {
				this.fetchData()
			},
			immediate: true,
		}
	}
}
</script>
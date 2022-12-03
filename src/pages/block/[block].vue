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
			<table class="mx-auto">
				<tr class="mx-auto text-xl flex justify-center pb-2">Block</tr>
				<tr v-if="(height !== null)" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Height</td>
					<td class="
						flex justify-left w-full
					">{{ height }}</td>
				</tr>
				<tr v-if="block" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Hash</td>
					<td v-if="shorten_hash" @click="(shorten_hash = false)" class="
						flex justify-left w-full
					">{{ shorten(block.hash) }}</td>
					<td v-else class="
						flex justify-left w-full
					">{{ block.hash }}</td>
				</tr>
				<tr v-if="block" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Previous&nbsp;hash</td>
					<td v-if="shorten_previous_hash" @click="(shorten_previous_hash = false)" class="
						flex justify-left w-full
					">{{ shorten(block.previous_hash) }}</td>
					<td v-else-if="block.previous_hash == '0000000000000000000000000000000000000000000000000000000000000000'" class="
						flex justify-left w-full
					">{{ block.previous_hash }}</td>
					<td v-else class="
						flex justify-left w-full
					">
        				<router-link class="link" :to="'/block/' + block.previous_hash">{{ block.previous_hash }}</router-link>
					</td>
				</tr>
				<tr v-if="block" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Timestamp</td>
					<td class="
						flex justify-left w-full
					">{{ new Date(block.timestamp * 1000).toLocaleString() }}</td>
				</tr>
				<tr v-if="block" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Public&nbsp;key</td>
					<td v-if="shorten_public_key" @click="(shorten_public_key = false)" class="
						flex justify-left w-full
					">{{ shorten(block.public_key) }}</td>
					<td v-else class="
						flex justify-left w-full
					">
        				<router-link class="link" :to="'/address/' + block.public_key">{{ block.public_key }}</router-link>
					</td>
				</tr>
				<tr v-if="block" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Signature</td>
					<td v-if="shorten_signature" @click="(shorten_signature = false)" class="
						flex justify-left w-full
					">{{ shorten(block.signature) }}</td>
					<td v-else class="
						flex justify-left w-full
					">{{ block.signature }}</td>
				</tr>
				<tr v-if="block" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Transactions</td>
					<td class="
						flex justify-left w-full
					">{{ block.transactions.length }}</td>
				</tr>
				<tr v-if="block" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Stakes</td>
					<td class="
						flex justify-left w-full
					">{{ block.stakes.length }}</td>
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
			shorten_public_key: true,
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
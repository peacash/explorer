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
	<div class="flex flex-col gap-2 my-2 w-full">
		<Description>
			<Table>
				<TableRow class="text-xl justify-center pb-2">Block</TableRow>
				<TableRow v-if="(height !== null)">
					<TD1 class="w-60">Height</TD1>
					<TD2>{{ height }}</TD2>
				</TableRow>
				<TableRow v-if="block">
					<TD1 class="w-60">Hash</TD1>
					<TD2 v-if="shorten_hash" @click="(shorten_hash = false)">{{ shorten(block.hash) }}</TD2>
					<TD2 v-else>{{ block.hash }}</TD2>
				</TableRow>
				<TableRow v-if="block">
					<TD1 class="w-60">Previous&nbsp;hash</TD1>
					<TD2 v-if="shorten_previous_hash" @click="(shorten_previous_hash = false)">{{ shorten(block.previous_hash) }}</TD2>
					<TD2 v-else-if="(block.previous_hash == '0000000000000000000000000000000000000000000000000000000000000000')">{{ block.previous_hash }}</TD2>
					<TD2 v-else>
						<router-link class="link" :to="'/block/' + block.previous_hash">{{ block.previous_hash }}</router-link>
					</TD2>
				</TableRow>
				<TableRow v-if="block">
					<TD1 class="w-60">Timestamp</TD1>
					<TD2>{{ new Date(block.timestamp * 1000).toLocaleString() }}</TD2>
				</TableRow>
				<TableRow v-if="block">
					<TD1 class="w-60">Public&nbsp;key</TD1>
					<TD2 v-if="shorten_public_key" @click="(shorten_public_key = false)">{{ shorten(block.public_key) }}</TD2>
					<TD2 v-else>
						<router-link class="link" :to="'/address/' + block.public_key">{{ block.public_key }}</router-link>
					</TD2>
				</TableRow>
				<TableRow v-if="block">
					<TD1 class="w-60">Signature</TD1>
					<TD2 v-if="shorten_signature" @click="(shorten_signature = false)">{{ shorten(block.signature) }}</TD2>
					<TD2 v-else>{{ block.signature }}</TD2>
				</TableRow>
				<TableRow v-if="block">
					<TD1 class="w-60">Transactions</TD1>
					<TD2>{{ block.transactions.length }}</TD2>
				</TableRow>
				<TableRow v-if="block">
					<TD1 class="w-60">Stakes</TD1>
					<TD2>{{ block.stakes.length }}</TD2>
				</TableRow>
			</table>
		</Description>
		<Description>
			<Table v-if="block">
				<TableRow class="text-xl justify-center pb-2">Transactions</TableRow>
				<div v-if="!block.transactions.length" class="text-center italic">This block does not include any transactions.</div>
				<TableRow v-for="(hash, index) in block.transactions" :key="(hash, index)">
					<TD1>#{{ index }}</TD1>
					<TD2 class="justify-center">
						<router-link class="link" :to="('/transaction/' + hash)">{{ hash }}</router-link>
					</TD2>
				</TableRow>
			</Table>
		</Description>
		<Description>
			<Table v-if="block">
				<TableRow class="text-xl justify-center pb-2">Stakes</TableRow>
				<div v-if="!block.stakes.length" class="text-center italic">This block does not include any stakes.</div>
				<TableRow v-for="(hash, index) in block.stakes" :key="(hash, index)">
					<TD1>#{{ index }}</TD1>
					<TD2 class="justify-center">
						<router-link class="link" :to="('/stake/' + hash)">{{ hash }}</router-link>
					</TD2>
				</TableRow>
			</Table>
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
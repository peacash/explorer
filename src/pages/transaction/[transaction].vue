<style scoped>
	.link {
		text-decoration: none;
	}
	.link:hover {
		text-decoration: underline;
	}
</style>
<template>
	<div class="flex flex-col gap-2 my-2 w-full">
		<Description>
			<Table>
				<TableRow class="text-xl justify-center pb-2">Transaction</TableRow>
				<TableRow v-if="transaction">
					<TD1 class="w-60">Hash</TD1>
					<TD2 v-if="shorten_hash" @click="(shorten_hash = false)">{{ shorten(transaction.hash) }}</TD2>
					<TD2 v-else>{{ transaction.hash }}</TD2>
				</TableRow>
				<TableRow v-if="transaction">
					<TD1 class="w-60">Public&nbsp;key&nbsp;input</TD1>
					<TD2 v-if="shorten_public_key_input" @click="(shorten_public_key_input = false)">{{ shorten(transaction.public_key_input) }}</TD2>
					<TD2 v-else>
        				<router-link class="link" :to="'/address/' + transaction.public_key_input">{{ transaction.public_key_input }}</router-link>
					</TD2>
				</TableRow>
				<TableRow v-if="transaction">
					<TD1 class="w-60">Public&nbsp;key&nbsp;output</TD1>
					<TD2 v-if="shorten_public_key_output" @click="(shorten_public_key_output = false)">{{ shorten(transaction.public_key_output) }}</TD2>
					<TD2 v-else>
        				<router-link class="link" :to="'/address/' + transaction.public_key_output">{{ transaction.public_key_output }}</router-link>
					</TD2>
				</TableRow>
				<TableRow v-if="transaction">
					<TD1 class="w-60">Amount</TD1>
					<TD2>{{ balance_to_string(transaction.amount) }}</TD2>
				</TableRow>
				<TableRow v-if="transaction">
					<TD1 class="w-60">Fee</TD1>
					<TD2>{{ balance_to_string(transaction.fee) }}</TD2>
				</TableRow>
				<TableRow v-if="transaction">
					<TD1 class="w-60">Timestamp</TD1>
					<TD2>{{ new Date(transaction.timestamp * 1000).toLocaleString() }}</TD2>
				</TableRow>
				<TableRow v-if="transaction">
					<TD1 class="w-60">Signature</TD1>
					<TD2 v-if="shorten_signature" @click="(shorten_signature = false)">{{ shorten(transaction.signature) }}</TD2>
					<TD2 v-else>{{ transaction.signature }}</TD2>
				</TableRow>
			</Table>
		</Description>
	</div>
</template>
<script>
export default {
    data() {
		return {
			transaction: null,
			shorten_hash: true,
			shorten_public_key_input: true,
			shorten_public_key_output: true,
			shorten_signature: true
		}
	},
	methods: {
		fetchData() {
			if (!this.$route.params.transaction) return
			fetch(window.localStorage.getItem("api") + "/transaction/" + this.$route.params.transaction).then(res => res.json()).then(data => {
				this.transaction = data
			})
		},
		shorten(string) {
			return string.slice(0, 12) + "..." + string.slice(-8)
		},
		balance_to_string(balance) {
			let decimals = 18
			let string = '0'.repeat(decimals)
			string += balance
			let index = string.length - decimals
			string = [string.slice(0, index), ".", string.slice(index)].join('')
			while (string.startsWith("0")) {
				string = string.slice(1)
			}
			if (string.startsWith(".")) {
				string = "0" + string
			}
			return string
		}
	},
    mounted() {
		document.title = this.$route.params.transaction + " - Transaction - Explorer - Pea";
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
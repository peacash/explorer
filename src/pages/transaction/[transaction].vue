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
				<tr class="mx-auto text-xl flex justify-center pb-2">Transaction</tr>
				<tr v-if="transaction" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Hash</td>
					<td v-if="shorten_hash" @click="(shorten_hash = false)" class="
						flex justify-left w-full
					">{{ shorten(transaction.hash) }}</td>
					<td v-else class="
						flex justify-left w-full
					">{{ transaction.hash }}</td>
				</tr>
				<tr v-if="transaction" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Public&nbsp;key&nbsp;input</td>
					<td v-if="shorten_public_key_input" @click="(shorten_public_key_input = false)" class="
						flex justify-left w-full
					">{{ shorten(transaction.public_key_input) }}</td>
					<td v-else class="
						flex justify-left w-full
					">
        				<router-link class="link" :to="'/address/' + transaction.public_key_input">{{ transaction.public_key_input }}</router-link>
					</td>
				</tr>
				<tr v-if="transaction" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Public&nbsp;key&nbsp;output</td>
					<td v-if="shorten_public_key_output" @click="(shorten_public_key_output = false)" class="
						flex justify-left w-full
					">{{ shorten(transaction.public_key_output) }}</td>
					<td v-else class="
						flex justify-left w-full
					">
        				<router-link class="link" :to="'/address/' + transaction.public_key_output">{{ transaction.public_key_output }}</router-link>
					</td>
				</tr>
				<tr v-if="transaction" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Amount</td>
					<td class="
						flex justify-left w-full
					">{{ balance_to_string(transaction.amount) }}</td>
				</tr>
				<tr v-if="transaction" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Fee</td>
					<td class="
						flex justify-left w-full
					">{{ balance_to_string(transaction.fee) }}</td>
				</tr>
				<tr v-if="transaction" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Timestamp</td>
					<td class="
						flex justify-left w-full
					">{{ new Date(transaction.timestamp * 1000).toLocaleString() }}</td>
				</tr>
				<tr v-if="transaction" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Signature</td>
					<td v-if="shorten_signature" @click="(shorten_signature = false)" class="
						flex justify-left w-full
					">{{ shorten(transaction.signature) }}</td>
					<td v-else class="
						flex justify-left w-full
					">{{ transaction.signature }}</td>
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
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
			<h2 class="mx-auto uppercase" style="font-weight: 300;">transaction</h2>
			<table class="mx-auto">
				<tr v-if="transaction">
					<td>Hash</td>
					<td v-if="shorten_hash" @click="(shorten_hash = false)">{{ shorten(transaction.hash) }}</td>
					<td v-else>{{ transaction.hash }}</td>
				</tr>
				<tr v-if="transaction">
					<td>Public&nbsp;key&nbsp;input</td>
					<td v-if="shorten_public_key_input" @click="(shorten_public_key_input = false)">{{ shorten(transaction.public_key_input) }}</td>
					<td v-else>
        				<router-link class="link" :to="'/address/' + transaction.public_key_input">{{ transaction.public_key_input }}</router-link>
					</td>
				</tr>
				<tr v-if="transaction">
					<td>Public&nbsp;key&nbsp;output</td>
					<td v-if="shorten_public_key_output" @click="(shorten_public_key_output = false)">{{ shorten(transaction.public_key_output) }}</td>
					<td v-else>
        				<router-link class="link" :to="'/address/' + transaction.public_key_output">{{ transaction.public_key_output }}</router-link>
					</td>
				</tr>
				<tr v-if="transaction">
					<td>Amount</td>
					<td>{{ balance_to_string(transaction.amount) }}</td>
				</tr>
				<tr v-if="transaction">
					<td>Fee</td>
					<td>{{ balance_to_string(transaction.fee) }}</td>
				</tr>
				<tr v-if="transaction">
					<td>Timestamp</td>
					<td>{{ new Date(transaction.timestamp * 1000).toLocaleString() }}</td>
				</tr>
				<tr v-if="transaction">
					<td>Signature</td>
					<td v-if="shorten_signature" @click="(shorten_signature = false)">{{ shorten(transaction.signature) }}</td>
					<td v-else>{{ transaction.signature }}</td>
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
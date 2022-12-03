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
				<tr class="mx-auto text-xl flex justify-center pb-2">Stake</tr>
				<tr v-if="stake" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Hash</td>
					<td v-if="shorten_hash" @click="(shorten_hash = false)" class="
						flex justify-left w-full
					">{{ shorten(stake.hash) }}</td>
					<td v-else class="
						flex justify-left w-full
					">{{ stake.hash }}</td>
				</tr>
				<tr v-if="stake" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Public&nbsp;key</td>
					<td v-if="shorten_public_key" @click="(shorten_public_key = false)" class="
						flex justify-left w-full
					">{{ shorten(stake.public_key) }}</td>
					<td v-else class="
						flex justify-left w-full
					">
        				<router-link class="link" :to="'/address/' + stake.public_key">{{ stake.public_key }}</router-link>
					</td>
				</tr>
				<tr v-if="stake" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Action</td>
					<td v-if="stake.deposit" class="
						flex justify-left w-full
					">Deposit</td>
					<td v-else class="
						flex justify-left w-full
					">Withdraw</td>
				</tr>
				<tr v-if="stake" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Amount</td>
					<td class="
						flex justify-left w-full
					">{{ balance_to_string(stake.amount) }}</td>
				</tr>
				<tr v-if="stake" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Fee</td>
					<td class="
						flex justify-left w-full
					">{{ balance_to_string(stake.fee) }}</td>
				</tr>
				<tr v-if="stake" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Timestamp</td>
					<td class="
						flex justify-left w-full
					">{{ new Date(stake.timestamp * 1000).toLocaleString() }}</td>
				</tr>
				<tr v-if="stake" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Signature</td>
					<td v-if="shorten_signature" @click="(shorten_signature = false)" class="
						flex justify-left w-full
					">{{ shorten(stake.signature) }}</td>
					<td v-else class="
						flex justify-left w-full
					">{{ stake.signature }}</td>
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
			stake: null,
			shorten_hash: true,
			shorten_public_key: true,
			shorten_signature: true
		}
	},
	methods: {
		fetchData() {
			if (!this.$route.params.stake) return
			fetch(window.localStorage.getItem("api") + "/stake/" + this.$route.params.stake).then(res => res.json()).then(data => {
				this.stake = data
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
		document.title = this.$route.params.stake + " - Stake - Explorer - Pea";
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
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
			<h2 class="mx-auto uppercase" style="font-weight: 300;">stake</h2>
			<table class="mx-auto">
				<tr v-if="stake">
					<td>Hash</td>
					<td v-if="shorten_hash" @click="(shorten_hash = false)">{{ shorten(stake.hash) }}</td>
					<td v-else>{{ stake.hash }}</td>
				</tr>
				<tr v-if="stake">
					<td>Public&nbsp;key</td>
					<td v-if="shorten_public_key" @click="(shorten_public_key = false)">{{ shorten(stake.public_key) }}</td>
					<td v-else>
        				<router-link class="link" :to="'/address/' + stake.public_key">{{ stake.public_key }}</router-link>
					</td>
				</tr>
				<tr v-if="stake">
					<td>Action</td>
					<td v-if="stake.deposit">Deposit</td>
					<td v-else>Withdraw</td>
				</tr>
				<tr v-if="stake">
					<td>Amount</td>
					<td>{{ balance_to_string(stake.amount) }}</td>
				</tr>
				<tr v-if="stake">
					<td>Fee</td>
					<td>{{ balance_to_string(stake.fee) }}</td>
				</tr>
				<tr v-if="stake">
					<td>Timestamp</td>
					<td>{{ new Date(stake.timestamp * 1000).toLocaleString() }}</td>
				</tr>
				<tr v-if="stake">
					<td>Signature</td>
					<td v-if="shorten_signature" @click="(shorten_signature = false)">{{ shorten(stake.signature) }}</td>
					<td v-else>{{ stake.signature }}</td>
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
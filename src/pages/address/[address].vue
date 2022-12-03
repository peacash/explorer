
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
		<Description v-if="balance !== null && balance_staked !== null" class="col-span-full text-justify md:text-left">
			<Bar class="mt-2" />
			<h2 class="mx-auto uppercase" style="font-weight: 300;">address</h2>
			<table class="mx-auto">
				<tr v-if="(public_key !== null)">
					<td>Public&nbsp;key</td>
					<td v-if="shorten_public_key" @click="(shorten_public_key = false)">{{ shorten(public_key) }}</td>
					<td v-else>{{ public_key }}</td>
				</tr>
				<tr v-if="(balance !== null)">
					<td>Balance</td>
					<td>{{ balance_to_string(balance) }}</td>
				</tr>
				<tr v-if="(balance_staked !== null)">
					<td>Balance&nbsp;staked</td>
					<td>{{ balance_to_string(balance_staked) }}</td>
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
            balance: null,
            balance_staked: null,
			public_key: this.$route.params.address,
            shorten_public_key: true
		}
	},
    mounted() {
		document.title = this.$route.params.address + " - Address - Explorer - Pea";
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
		fetchData() {
			if (!this.$route.params.address) return
			fetch(window.localStorage.getItem("api") + "/balance/" + this.$route.params.address).then(res => res.json()).then(data => {
				this.balance = data
			})
			fetch(window.localStorage.getItem("api") + "/balance_staked/" + this.$route.params.address).then(res => res.json()).then(data => {
				this.balance_staked = data
			})
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
		},
		shorten(string) {
			return string.slice(0, 12) + "..." + string.slice(-8)
		}
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
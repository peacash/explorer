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
		<Description v-if="balance !== null && balance_staked !== null" class="col-span-full text-justify md:text-left">
			<Bar class="mt-2" />
			<table class="mx-auto">
				<tr class="mx-auto text-xl flex justify-center pb-2">Address</tr>
				<tr v-if="(public_key !== null)" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Public&nbsp;key</td>
					<td v-if="shorten_public_key" @click="(shorten_public_key = false)" class="
						flex justify-left w-full
					">{{ shorten(public_key) }}</td>
					<td v-else class="
						flex justify-left w-full
					">{{ public_key }}</td>
				</tr>
				<tr v-if="(balance !== null)" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Balance</td>
					<td class="
						flex justify-left w-full
					">{{ balance_to_string(balance) }}</td>
				</tr>
				<tr v-if="(balance_staked !== null)" class="
					flex w-full
				">
					<td class="
						flex flex-col justify-center w-60
					">Balance&nbsp;staked</td>
					<td class="
						flex justify-left w-full
					">{{ balance_to_string(balance_staked) }}</td>
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
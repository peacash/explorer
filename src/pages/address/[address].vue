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
			<Bar class="mt-2" />
			<Address :balance="balance" :balance_staked="balance_staked" />
			<div class="my-40"></div>
		</Description>
	</div>
</template>
<script>
export default {
    data() {
		return {
            balance: 0,
            balance_staked: 0
		}
	},
	methods: {
		fetchData() {
			if (!this.$route.params.address) return
			fetch("http://localhost:8080/balance/" + this.$route.params.address).then(res => res.json()).then(data => {
				this.balance = data
			})
			fetch("http://localhost:8080/balance_staked/" + this.$route.params.address).then(res => res.json()).then(data => {
				this.balance_staked = data
			})
		}
	},
    mounted() {
		document.title = "Address - Pea";
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
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
			<Transaction :transaction="transaction" />
			<div class="my-40"></div>
		</Description>
	</div>
</template>
<script>
export default {
    data() {
		return {
			transaction: {"public_key_input":"0x000000000000000000000000000000000000000000000000000000000000000000000000","public_key_output":"0x000000000000000000000000000000000000000000000000000000000000000000000000","amount":0,"fee":0,"timestamp":0,"signature":"00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"}
		}
	},
	methods: {
		fetchData() {
			if (!this.$route.params.transaction) return
			fetch("http://localhost:8080/transaction/" + this.$route.params.transaction).then(res => res.json()).then(data => {
				this.transaction = data
			})
		}
	},
    mounted() {
		document.title = "Transaction - Pea";
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
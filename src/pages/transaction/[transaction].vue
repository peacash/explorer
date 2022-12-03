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
		<Description v-if="transaction !== null" class="col-span-full text-justify md:text-left">
			<Transaction :transaction="transaction" />
			<div class="my-40"></div>
		</Description>
	</div>
</template>
<script>
export default {
    data() {
		return {
			transaction: null
		}
	},
	methods: {
		fetchData() {
			if (!this.$route.params.transaction) return
			fetch(window.localStorage.getItem("api") + "/transaction/" + this.$route.params.transaction).then(res => res.json()).then(data => {
				this.transaction = data
			})
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
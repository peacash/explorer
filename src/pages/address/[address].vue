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
			<h4 class="mx-auto uppercase pb-12" style="font-weight: 500;">{{ $route.params.address }}</h4>
			<Field name="Balance:" :value="balance" />
			<Field name="Staked:&nbsp;" :value="balance_staked" />
			<div class="my-40"></div>
		</Description>
	</div>
</template>
<script>
export default {
    data() {
		return {
            balance: null,
            balance_staked: null
		}
	},
	methods: {
		fetchData() {
			if (!this.$route.params.address) return
			fetch(window.localStorage.getItem("api") + "/balance/" + this.$route.params.address).then(res => res.json()).then(data => {
				this.balance = data
			})
			fetch(window.localStorage.getItem("api") + "/balance_staked/" + this.$route.params.address).then(res => res.json()).then(data => {
				this.balance_staked = data
			})
		}
	},
    mounted() {
		document.title = this.$route.params.address + " - Address - Explorer - Pea";
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
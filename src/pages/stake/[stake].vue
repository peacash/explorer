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
			<Stake :stake="stake" />
			<div class="my-40"></div>
		</Description>
	</div>
</template>
<script>
export default {
    data() {
		return {
			stake: {"public_key":"0x000000000000000000000000000000000000000000000000000000000000000000000000","amount":0,"deposit":false,"fee":0,"timestamp":0,"signature":"00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"}
		}
	},
	methods: {
		fetchData() {
			if (!this.$route.params.stake) return
			fetch("http://localhost:8080/stake/" + this.$route.params.stake).then(res => res.json()).then(data => {
				this.stake = data
			})
		}
	},
    mounted() {
		document.title = "Stake - Pea";
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
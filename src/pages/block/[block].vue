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
		<Description v-if="block !== null" class="col-span-full text-justify md:text-left">
			<Bar class="mt-2" />
			<Block :block="block" />
			<div class="my-40"></div>
		</Description>
	</div>
</template>
<script>
export default {
    data() {
		return {
			block: null
		}
	},
	methods: {
		fetchData() {
			if (!this.$route.params.block) return
			fetch(window.localStorage.getItem("api") + "/block/" + this.$route.params.block).then(res => res.json()).then(data => {
				this.block = data
			})
		}
	},
    mounted() {
		document.title = this.$route.params.block + " - Block - Explorer - Pea";
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
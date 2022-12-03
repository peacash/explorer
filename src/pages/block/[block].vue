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
			<h2 class="mx-auto uppercase" style="font-weight: 300;">block</h2>
			<h4 class="mx-auto uppercase pb-12" style="font-weight: 500;">{{ $route.params.block }}</h4>
			<Field v-if="height" name="Height" :value="height" />
			<Field :value="new Date(block.timestamp * 1000).toLocaleString()" />
			<Field name="Forger address:" :value="block.public_key" :to="'/address/' + block.public_key" />
			<Field name="Previous:" :value="block.previous_hash" :to="'/block/' + block.previous_hash" />
			<Field name="Signature:" :value="block.signature" />
			<Transactions :transactions="block.transactions" />
			<Stakes :stakes="block.stakes" />
			<div class="my-40"></div>
		</Description>
	</div>
</template>
<script>
export default {
    data() {
		return {
			block: null,
			height: null
		}
	},
	methods: {
		fetchData() {
			if (!this.$route.params.block) return
			fetch(window.localStorage.getItem("api") + "/block/" + this.$route.params.block).then(res => res.json()).then(data => {
				this.block = data
			})
			fetch(window.localStorage.getItem("api") + "/height/" + this.$route.params.block).then(res => res.json()).then(data => {
				this.height = data
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
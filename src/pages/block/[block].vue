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
			<h2 class="mx-auto uppercase" style="font-weight: 300;">block</h2>
			<h4 class="mx-auto uppercase pb-12" style="font-weight: 500;">{{ $route.params.block }}</h4>
			<div class="flex justify-center mx-auto">
				<Field v-if="height" name="Height" :value="height" />
				<Field v-if="block" name="Forged" :value="new Date(block.timestamp * 1000).toLocaleString()" />
			</div>
			<div class="flex flex-col justify-center mx-auto">
				<Field v-if="block" name="Hash:" :value="shorten(block.hash)" />
				<Field v-if="block" name="Previous hash:" :value="shorten(block.previous_hash)" :to="'/block/' + block.previous_hash" />
				<Field v-if="block" name="Forger address:" :value="shorten(block.public_key)" :to="'/address/' + block.public_key" />
				<Field v-if="block" name="Signature:" :value="shorten(block.signature)" />
			</div>
			<Transactions v-if="block" :transactions="block.transactions" />
			<Stakes v-if="block" :stakes="block.stakes" />
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
		},
		shorten(string) {
			return string.slice(0, 12) + "..." + string.slice(-8)
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
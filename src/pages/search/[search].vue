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
			<Search failed=failed />
			<div class="my-40"></div>
		</Description>
	</div>
</template>
<script>
export default {
    data() {
		return {
			failed: false
		}
	},
	methods: {
		fetchData() {
			let search = this.$route.params.search
			if (!search) {
				return
			}
			search = search.toLowerCase()
			if (search === parseInt(search).toString() && parseInt(search) !== NaN) {
				fetch(window.localStorage.getItem("api") + "/hash/" + search).then(res => res.json()).then(data => {
					this.$router.replace('/block/' + data)
				}).catch(() => {
					this.failed = true
				})
				return
			}
			if (search.toLowerCase().startsWith('0x')) {
				fetch(window.localStorage.getItem("api") + "/balance/" + search).then(res => res.json()).then(data => {
					this.$router.replace('/address/' + search)
				}).catch(() => {
					this.failed = true
				})
				return
			}
			fetch(window.localStorage.getItem("api") + "/block/" + search).then(res => res.json()).then(data => {
				this.$router.replace('/block/' + search)
			}).catch(() => {
				fetch(window.localStorage.getItem("api") + "/transaction/" + search).then(res => res.json()).then(data => {
					this.$router.replace('/transaction/' + search)
				}).catch(() => {
					fetch(window.localStorage.getItem("api") + "/stake/" + search).then(res => res.json()).then(data => {
						this.$router.replace('/stake/' + search)
					}).catch(() => {
						this.failed = true
					})
				})
			})
		}
	},
    mounted() {
		document.title = "Search - Explorer - Pea";
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
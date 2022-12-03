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
			<Search v-if="timeout" failed=failed />
			<div class="my-40"></div>
		</Description>
	</div>
</template>
<script>
export default {
    data() {
		return {
			failed: false,
			api: null,
			timeout: false
		}
	},
	methods: {
		fetchData() {
			this.api = window.localStorage.getItem("api");
			let search = this.$route.params.search
			if (!search) {
				return
			}
			search = search.toLowerCase()
			if (search === parseInt(search).toString() && parseInt(search) !== NaN) {
				fetch(this.api + "/hash/" + search).then(res => res.json()).then(data => {
					this.$router.replace('/block/' + data)
				}).catch(() => {
					this.failed = true
				})
				return
			}
			if (search.toLowerCase().startsWith('0x')) {
				fetch(this.api + "/balance/" + search).then(res => res.json()).then(data => {
					this.$router.replace('/address/' + search)
				}).catch(() => {
					this.failed = true
				})
				return
			}
			fetch(this.api + "/block/" + search).then(res => res.json()).then(data => {
				this.$router.replace('/block/' + search)
			}).catch(() => {
				fetch(this.api + "/transaction/" + search).then(res => res.json()).then(data => {
					this.$router.replace('/transaction/' + search)
				}).catch(() => {
					fetch(this.api + "/stake/" + search).then(res => res.json()).then(data => {
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
		setTimeout(() => {
			this.timeout = true
		}, 200)
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
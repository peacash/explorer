<template>
	<div class="flex flex-col gap-2 my-2 w-full">
		<Description class="text-center">
			<h2 style="font-weight: 300;">Search</h2>
			<h4 class="uppercase pb-12" style="font-weight: 600;">{{ $route.params.search }}</h4>
			<div v-if="failed" class="italic">We couldn’t find what you are looking for.</div>
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
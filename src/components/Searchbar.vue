<style scoped>
    input:hover {
        background-color: #efe;
    }
    input {
        max-width: 40rem;
    }
</style>
<template>
    <input
        v-model=api_value
        v-on:input="search"
        class="
            bg-white
            text-black
            sm:rounded
            shadow-lg
            flex mx-auto w-full my-4
        "
        type="text" placeholder="http://localhost:9332">
    <input
        v-model=search_value
        ref="search"
        v-on:input="search"
        class="
            bg-white
            text-black
            sm:rounded
            shadow-lg
            flex mx-auto w-full my-4
        "
        type="text" placeholder="Search Blockchain, Transactions, Addresses, Blocks and Stakes">
</template>
<script>
export default {
	data() {
		return {
			search_value: this.$route.params.search || "",
            api_value: localStorage.getItem('api') || (() => {
                let api = "http://localhost:9332"
                localStorage.setItem('api', api)
                return api
            })()
		}
	},
	methods: {
		search() {
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                localStorage.setItem('api', this.api_value)
                if (this.search_value) this.$router.push('/search/' + this.search_value)
                else this.$router.push('/')
            }, 250)
		}
	},
	mounted() {
		this.$refs.search.focus()
	}
}
</script>

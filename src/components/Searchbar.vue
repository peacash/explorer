<style scoped>
    input:hover {
        background-color: #efe;
    }
</style>
<template>
    <input
        v-model=search_value
        ref="search"
        v-on:input="search"
        class="
            bg-white
            text-black
            sm:rounded
            shadow-lg
        "
        type="text" placeholder="Search Blockchain, Transactions, Addresses, Blocks and Stakes">
</template>
<script>
export default {
	data() {
		return {
			search_value: this.$route.params.search
		}
	},
	methods: {
		search() {
            clearTimeout(this.timer)
            let delay = 250
            this.timer = setTimeout(() => {
                if (this.search_value) this.$router.push('/search/' + this.search_value)
                else this.$router.push('/')
            }, delay)
		}
	},
	mounted() {
		this.$refs.search.focus()
	}
}
</script>

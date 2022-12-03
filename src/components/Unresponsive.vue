<template>
    <div>API endpoint <i>{{ api }}</i> seems unresponsive.</div>
    <div v-if="https">
        Try the
        <a :href="'http://' + host">http version</a>
        of this website.
    </div>
</template>
<script>
export default {
    props: {
        api: String
    },
    data() {
		return {
			https: window.location.protocol === "https:",
			host: window.location.host
		}
	}
}
</script>
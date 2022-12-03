<style scoped>
    div {
        font-family: 'Courier New', Courier, monospace;
        word-break: break-word;
    }
	.link { text-decoration: none; }
    .link:hover {
        text-decoration: underline;
    }
</style>
<template>
    <div class="
        flex
        flex-col
        justify-center
        m-6
    ">
        <div v-if="name">{{ name }}</div>
        <router-link v-if="to" class="link" :to=to>{{ value }}</router-link>
        <span v-else>{{ value }}</span>
    </div>
</template>
<script>
export default {
    props: {
        name: String,
        value: [String, Number],
        to: String
    }
}
</script>
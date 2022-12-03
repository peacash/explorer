<style scoped>
    * {
        font-weight: 600;
    }
    div {
        font-family: 'Courier New', Courier, monospace;
        word-break: break-word;
    }
    span:nth-child(1) {
        word-break: normal;
    }
.link { text-decoration: none; font-weight: 600; }
</style>
<template>
    <div class="
        flex
        justify-center
    ">
        <span v-if="name">{{ name }}&nbsp;</span>
        <router-link v-if="to" class="link hover:underline" :to=to>{{ value }}</router-link>
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
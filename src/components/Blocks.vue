<template>
    <Hash v-for="(hash, index) in state.latest_hashes" :key="(hash, index)" :name="'#' + (height - index)" :value="hash" :to="'/block/' + hash" />
</template>
<script>
export default {
    props: {
        state: Object,
        height: Number
    }
}
</script>
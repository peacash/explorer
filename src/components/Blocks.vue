<template>
	<h2 class="mx-auto uppercase" style="font-weight: 300;">blocks</h2>
    <Hash v-for="(hash, index) in dynamic.latest_hashes" :key="(hash, index)" :name="'#' + (height - index)" :value="hash" :to="'/block/' + hash" />
</template>
<script>
export default {
    props: {
        dynamic: Object,
        height: Number
    }
}
</script>
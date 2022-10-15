<template>
	<h2 class="mx-auto uppercase" style="font-weight: 300;">blocks</h2>
    <Hash v-for="(hash, index) in json.states.dynamic.latest_hashes" :key="(hash, index)" :name="'#' + (json.height - index)" :value="hash" :to="'/block/' + hash" />
    <Hash v-for="(hash, index) in json.states.trusted.latest_hashes" :key="(hash, index)" :name="'#' + (json.height - json.states.dynamic.latest_hashes.length - index)" :value="hash" :to="'/block/' + hash" />
</template>
<script>
export default {
    props: {
        json: Object
    }
}
</script>
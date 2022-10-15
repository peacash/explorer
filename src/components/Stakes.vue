<template>
	<h3 class="mx-auto uppercase" style="font-weight: 300;">stakes</h3>
    <div v-if="stakes.length">
        <Hash v-for="(hash, index) in stakes" :key="(hash, index)" :name="'#' + index" :value="hash" :to="'/stake/' + hash" />
    </div>
    <div v-else class="text-center italic">This block does not include any stakes.</div>
</template>
<script>
export default {
    props: {
        stakes: Object
    }
}
</script>
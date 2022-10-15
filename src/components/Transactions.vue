<template>
	<h3 class="mx-auto uppercase" style="font-weight: 300;">transactions</h3>
    <div v-if="transactions.length">
        <Hash v-for="(hash, index) in transactions" :key="(hash, index)" :name="'#' + index" :value="hash" :to="'/transaction/' + hash" />
    </div>
    <div v-else class="text-center italic">This block does not include any transactions.</div>
</template>
<script>
export default {
    props: {
        transactions: Object
    }
}
</script>
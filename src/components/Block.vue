<template>
	<h2 class="mx-auto uppercase" style="font-weight: 300;">block</h2>
	<h4 class="mx-auto uppercase pb-12" style="font-weight: 500;">{{ $route.params.block }}</h4>
    <Field :value="new Date(block.timestamp * 1000).toLocaleString()" />
    <Field name="Forger address:" :value="block.public_key" :to="'/address/' + block.public_key" />
    <Field name="Previous:" :value="block.previous_hash" :to="'/block/' + block.previous_hash" />
    <Field name="Signature:" :value="block.signature" />
    <Transactions :transactions="block.transactions" />
    <Stakes :stakes="block.stakes" />
</template>
<script>
export default {
    props: {
        block: Object
    }
}
</script>
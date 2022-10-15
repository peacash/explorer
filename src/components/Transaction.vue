
<template>
	<h2 class="mx-auto uppercase" style="font-weight: 300;">transaction</h2>
	<h4 class="mx-auto uppercase pb-12" style="font-weight: 500;">{{ $route.params.transaction }}</h4>
    <Field :value="new Date(transaction.timestamp * 1000).toLocaleString()" />
    <Field name="Input address:" :value="transaction.public_key_input" :to="'/address/' + transaction.public_key_input" />
    <Field name="Output address:" :value="transaction.public_key_output" :to="'/address/' + transaction.public_key_output" />
    <Field name="Amount:" :value="transaction.amount" />
    <Field name="Fee:" :value="transaction.fee" />
    <Field name="Signature:" :value="transaction.signature" />
</template>
<script>
export default {
    props: {
        transaction: Object
    }
}
</script>

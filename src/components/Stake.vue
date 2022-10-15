<template>
	<h2 class="mx-auto uppercase" style="font-weight: 300;">stake</h2>
	<h4 class="mx-auto uppercase pb-12" style="font-weight: 500;">{{ $route.params.stake }}</h4>
    <Field :value="new Date(stake.timestamp * 1000).toLocaleString()" />
    <Field :value="stake.deposit? 'Deposit' : 'Withdraw'" />
    <Field name="Address:" :value="stake.public_key" :to="'/address/' + stake.public_key" />
    <Field name="Amount:" :value="stake.amount" />
    <Field name="Fee:" :value="stake.fee" />
    <Field name="Signature:" :value="stake.signature" />
</template>
<script>
export default {
    props: {
        stake: Object
    }
}
</script>
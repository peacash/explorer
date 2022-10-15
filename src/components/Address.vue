<template>
	<h2 class="mx-auto uppercase" style="font-weight: 300;">address</h2>
	<h4 class="mx-auto uppercase pb-12" style="font-weight: 500;">{{ $route.params.address }}</h4>
    <Field name="Balance:" :value="balance" />
    <Field name="Staked:&nbsp;" :value="balance_staked" />
</template>
<script>
export default {
    props: {
        balance: Number,
        balance_staked: Number
    }
}
</script>
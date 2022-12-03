<template>
    <Staker v-for="(address, index) in state.stakers" :key="(address, index)" :name="('#' + index)" :value="address" :to="'/address/' + address" />
</template>
<script>
export default {
    props: {
        state: Object
    }
}
</script>
<template>
	<h2 class="mx-auto uppercase" style="font-weight: 300;">search</h2>
	<h4 class="mx-auto uppercase pb-12" style="font-weight: 500;">{{ $route.params.search }}</h4>
    <div v-if="failed" class="text-center italic">We couldn’t find what you are looking for.</div>
</template>
<script>
export default {
    props: {
        failed: Boolean
    }
}
</script>
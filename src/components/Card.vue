<style scoped>
    div {
		animation: fade 1s;
	}
	@keyframes fade {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0;
            -webkit-transform: translate(0, 5rem);
		}
		100% {
			opacity: 1;
		}
	}
</style>
<template>
    <div class="
        flex
        flex-col
        rounded
        px-8
        sm:px-12
        pb-4
    ">
        <h3>{{ name }}</h3>
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        name: String
    }
}
</script>
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
            -webkit-transform: translate(0, 40rem);
		}
		100% {
			opacity: 1;
		}
	}
</style>
<template>
    <div class="
        shadow-lg
        flex
        flex-col
        px-8
        sm:px-12
        py-4
        bg-white
        xl:rounded
    ">
        <slot></slot>
    </div>
</template>
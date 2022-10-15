<template>
	<div style="
            background: rgb(0,0,0);
            background: linear-gradient(30deg, rgba(0,0,0,1) 0%, rgba(3,3,3,1) 100%);
            min-height: 100%;
		" class="
        prose-lg
		mx-auto
		col-span-full px-6
		text-gray-100
		font-mono
        text-center
        text-sm lg:text-lg
        flex
        flex-col
        justify-center
    ">
        <h2>404</h2>
		<p class="uppercase">
            This page doesn't exist
        </p>
        <router-link class="hover:underline" to="/">Back</router-link>
	</div>
</template>
<script>
export default {
	mounted() {
		document.title = "404 - Pea";
	}
}
</script>
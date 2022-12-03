<template>
    <h2 class="mx-auto uppercase" style="font-weight: 300;">sync</h2>
    <div v-if="sync" class="flex justify-center">
        <Field name="Status" :value="sync.sync" />
        <Field name="Last block seen" :value="sync.last" />
        <Field name="Height" :value="sync.height" />
        <Field name="Peers" :value="sync.peers" />
    </div>
</template>
<script>
export default {
    props: {
        sync: Object,
    }
}
</script>
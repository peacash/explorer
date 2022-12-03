<template>
    <div class="flex justify-center">
        <Field name="Synchronization" :value="sync.sync" />
        <Field name="Last block seen" :value="sync.last" />
        <Field name="Height" :value="sync.height" />
    </div>
</template>
<script>
export default {
    props: {
        sync: Object,
    }
}
</script>
<template>
    <div class="flex justify-center">
        <Field name="Uptime" :value="info.uptime" />
        <Field name="Tick" :value="info.lag + ' ms'" />
    </div>
</template>
<script>
export default {
    props: {
        info: Object,
    }
}
</script>
<template>
    <div class="the-content">
        <router-view></router-view>
    </div>
</template>
<script>
export default {};
</script>
<style>
.the-content {
    width: calc(100% - var(--width-sidebar) - 36px);
    height: calc(100vh - 56px - 36px);
    background-color: #fff;
    float: left;
    overflow: hidden;
    margin: 24px 12px 12px 24px;
}
</style>

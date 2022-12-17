<template>
    <button
        :class="['m-btn', btnExtra ? 'm-btn-extra' : '']"
        :tabindex="tabindex"
        :title="titleBtn"
    >
        {{ btnText }}
    </button>
</template>
<script>
export default {
    props: {
        // Text của ô input
        btnText: {
            type: String,
            default: "Button",
        },
        // Có phải ô phụ không??
        btnExtra: {
            type: Boolean,
            default: false,
        },
        // Tabindex ô button
        tabindex: {
            type: Number,
        },
        titleBtn: {
            type: String,
        },
    },
};
</script>
<style>
.m-btn {
    height: 36px;
    min-width: 80px;
    border-radius: 4px;
    padding: 0 16px;
    border: none;
    background-color: #50b83c;
    font-weight: 500;
    font-size: 14px;
    text-align: center;
    line-height: 36px;
    cursor: pointer;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
}
.m-btn:hover {
    background-color: #73c663;
    cursor: pointer;
}
.m-btn:focus {
    background-color: #409330;
    cursor: pointer;
}

.m-btn-extra {
    background-color: #fff;
    color: #000;
    border: 1px solid #e6e6e6;
    font-weight: 500;
    font-size: 14;
}

.m-btn-extra:hover {
    background-color: #ccc;
}
.m-btn-extra:focus {
    background-color: #ccc;
}

/* .m-btn-icon {
    width: 20px;
    height: 20px;
    background-image: url(../../assets/img/Sprites.64af8f61.svg);
    background-repeat: no-repeat;
    background-position: -832px -462px;
} */
</style>

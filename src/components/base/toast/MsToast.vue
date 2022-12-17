<template>
    <div class="m-toast">
        <div class="m-toast-main" :class="{ 'm-toast-main-error': isError }">
            <div class="left-toast" v-if="!isError">
                <div class="icon-succses ml-16 mr-8"></div>
                <!-- <div class="toast-content"> -->
                <b for="" class="title-toast">{{ toastSrc.TITLE }}</b>
                <label for=""> &nbsp;{{ toastSrc.CONTENT(toastAct) }}</label>
                <!-- </div> -->
            </div>
            <div class="icon-close-clone mr-16" @click="closeOpenToast()"></div>
        </div>
    </div>
</template>
<script>
import { TOAST } from "@/constans/layoutResource";

export default {
    props: ["toastAct", "isError"],
    data() {
        return {
            toastSrc: TOAST,
        };
    },
    methods: {
        /**
         * Thực hiện đóng Toast
         * Author: NHAnh(06/11/2022)
         */
        closeOpenToast() {
            try {
                this.$emit("closeOpenToast");
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>
<style scoped>
.m-toast {
    position: fixed;
    top: 112px;
    left: 50%;
    transform: translate(-50%, -50%);
    /* display: flex; */
    /* width: 100%; */
    /* justify-content: center; */
    z-index: 99999999;
}
.m-toast-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 450px;
    max-width: 650px;
    height: 56px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    animation: toastLeft ease 0.3s, toastOut linear 1s 3s forwards;
}
.m-toast-main-error {
    border-left: 5px solid red;
    background-color: #fce6e6;
}
.left-toast {
    display: flex;
}
.toast-content {
    align-items: center;
    flex-direction: column;
    justify-content: start;
}
.title-toast {
    display: block;
    color: #50b83c;
    font-weight: 700;
    font-size: 13px;
}
@keyframes toastLeft {
    from {
        opacity: 0;
        transform: translateX(calc(100% + 32px));
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
@keyframes toastOut {
    to {
        opacity: 0;
    }
}
</style>

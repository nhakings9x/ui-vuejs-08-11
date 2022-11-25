<template>
    <div class="m-toast">
        <div class="m-toast-main" :class="{ 'm-toast-main-error': isError }">
            <div class="left-toast" v-if="!isError">
                <div class="icon-succses ml-16 mr-16"></div>
                <div class="toast-content">
                    <b for="" class="title-toast">Thành công!</b>
                    <label for=""
                        >Bạn đã {{ toastAct }} thành công nhân viên!</label
                    >
                </div>
            </div>
            <div class="left-toast" v-if="isError">
                <div class="icon-delete ml-16 mr-16"></div>
                <div class="toast-content">
                    <b for="" class="title-toast">Thất bại!</b>
                    <label for="">Thao tác thất bại, vui lòng thử lại!</label>
                </div>
            </div>
            <div class="icon-close mr-8" @click="closeOpenToast()"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["toastAct", "isError"],
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
<style>
.m-toast {
    position: fixed;
    right: 32px;
    bottom: 32px;
    z-index: 99999999;
    display: block;
}
.m-toast-main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 400px;
    height: 80px;
    background-color: #eef8ec;
    border-left: 5px solid #50b83c;
    border-radius: 4px;
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
    font-size: 20px;
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

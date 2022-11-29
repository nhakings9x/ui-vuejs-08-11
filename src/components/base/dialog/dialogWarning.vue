<template>
    <div class="m-notification">
        <div class="m-noti-box">
            <div class="box-content">
                <div class="content">
                    <div class="icon-warning"></div>
                    <div class="message-content">
                        {{ errorText }}
                    </div>
                </div>
                <div class="content-footer">
                    <div class="content-footer-left">
                        <button class="m-btn" @click="isWarningDialog">
                            {{ buttonSrc.YES }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { MS_BUTTON } from "@/constans/layoutResource";
export default {
    data() {
        return {
            buttonSrc: MS_BUTTON,
        };
    },
    props: ["employeeCode", "warning", "errorCode", "warningCode", "errorText"],
    created() {
        // tạo sự kiện phím tắt
        window.addEventListener("keyup", this.listenerKeyup);
    },
    beforeUnmount() {
        // Hủy sự kiện phím tắt
        window.removeEventListener("keyup", this.listenerKeyup);
    },
    methods: {
        /**
         * phím tắt dialog
         * author: NHANh(20/11/2022)
         */
        listenerKeyup(e) {
            try {
                // Enter
                if (e.keyCode == 13) {
                    this.isWarningDialog();
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Thực hiện đóng dialog Cảnh báo
         * Author: NHA(06/11/2022)
         */
        isWarningDialog() {
            try {
                this.$emit("isWarningDialog");
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>
<style scoped>
.m-notification {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
}
.m-noti-box {
    width: 444px;
    min-width: 444px;
    background-color: #fff;
    border-radius: 4px;
}
.box-content {
    padding: 24px;
    height: 100%;
    box-sizing: border-box;
}
.content {
    display: flex;
    align-items: flex-start;

    border-bottom: 1px solid #b8bcc3;
}
.content-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}

.message-content {
    overflow: auto;
    max-height: 400px;
    margin-bottom: 20px;
    padding-left: 16px;
    height: 37px;
    display: flex;
    align-items: center;
}
</style>

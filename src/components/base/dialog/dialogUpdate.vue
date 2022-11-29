<template>
    <div class="m-notification">
        <div class="m-noti-box">
            <div class="box-content">
                <div class="content">
                    <div class="title-noti">{{ dialogSrc.TITLE_UPDATE }}</div>
                    <div class="icon-close" @click="coDialogUpdate"></div>
                </div>
                <div class="message-content">
                    {{ dialogSrc.IS_UPDATE }}
                </div>
                <div class="content-footer">
                    <button
                        class="m-btn m-btn-extra mr-8"
                        @click="coDialogUpdate"
                    >
                        {{ buttonSrc.CLOSE }}
                    </button>
                    <div class="content-footer-left">
                        <button
                            class="m-btn m-btn-extra mr-8"
                            @click="coDialogUpdate(1)"
                        >
                            {{ buttonSrc.DONT_SAVE }}
                        </button>
                        <button class="m-btn" @click="isEditObject()">
                            {{ buttonSrc.SAVE_DIALOG }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { MS_BUTTON, DIALOG_TEXT } from "@/constans/layoutResource";

export default {
    data() {
        return {
            buttonSrc: MS_BUTTON,
            dialogSrc: DIALOG_TEXT,
        };
    },
    props: {
        edit: {
            type: Boolean,
        },
    },
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
         * thiết lập phím tắt
         * Author: NHAnh(11/27/2022)
         */
        listenerKeyup(e) {
            try {
                // Enter
                if (e.keyCode == 13) {
                    this.isEditObject();
                    // ESC
                } else if (e.keyCode == 27) {
                    this.coDialogUpdate();
                } else if (e.ctrlKey) {
                    // F10
                    if (e.keyCode == 121) {
                        this.coDialogUpdate(1);
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Thực hiện sửa nhân viên
         * Author: NHAnh(06/11/2022)
         */
        isEditObject() {
            try {
                if (!this.edit) {
                    this.coDialogUpdate();
                    this.$emit("isAdd");
                } else {
                    this.coDialogUpdate();
                    this.$emit("isUpdate");
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Thực hiện đóng dialog, nếu value == 1 thì đóng form popup
         * Author: NHAnh(06/11/2022)
         */
        coDialogUpdate(value) {
            try {
                this.$emit("coDialogUpdate");
                if (value == 1) {
                    this.$emit("close-popup-edit");
                }
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
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
.m-noti-box {
    width: 416px;
    min-width: 400px;
    background-color: #fff;
    border-radius: 4px;
    z-index: 1;
}
.box-content {
    padding: 24px;
    height: 100%;
    box-sizing: border-box;
}
.content {
    display: flex;
    justify-content: space-between;
}

.title-noti {
    font-weight: 700;
    font-size: 20px;
}
.content-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
.content-footer-left {
    display: flex;
}
.message-content {
    overflow: auto;
    margin-top: 24px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
}
</style>

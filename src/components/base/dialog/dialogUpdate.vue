<template>
    <div class="m-notification">
        <div class="m-noti-box">
            <div class="box-content">
                <div class="content">
                    <div class="icon-message"></div>
                    <div class="message-content pt-9">
                        Dữ liệu đã bị thay đổi. Bạn có muốn cất không?
                    </div>
                </div>
                <div class="content-footer">
                    <button class="m-btn m-btn-extra" @click="coDialogUpdate">
                        Hủy
                    </button>
                    <div class="content-footer-left">
                        <button
                            class="m-btn m-btn-extra mr-8"
                            @click="coDialogUpdate(1)"
                        >
                            Không
                        </button>
                        <button class="m-btn" @click="isEditEmployee()">
                            Có
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        /**
         * Thực hiện sửa nhân viên
         * Author: NHAnh(06/11/2022)
         */
        isEditEmployee() {
            this.coDialogUpdate();
            this.$emit("isUpdate");
        },

        /**
         * Thực hiện đóng dialog, nếu value == 1 thì đóng form popup
         * Author: NHAnh(06/11/2022)
         */
        coDialogUpdate(value) {
            this.$emit("coDialogUpdate");
            if (value == 1) {
                this.$emit("close-popup-edit");
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
    height: 183px;
    background-color: #fff;
    border-radius: 4px;
}
.box-content {
    padding: 32px;
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
    justify-content: space-between;
}
.content-footer-left {
    display: flex;
}
.message-content {
    overflow: auto;
    max-height: 400px;
    margin-bottom: 32px;
    padding-left: 16px;
}
</style>

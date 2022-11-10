<template>
    <div class="m-notification">
        <div class="m-noti-box">
            <div class="box-content">
                <div class="content">
                    <div class="icon-warning"></div>
                    <div class="message-content">
                        {{ dialogText() }}
                    </div>
                </div>
                <div class="content-footer">
                    <div class="content-footer-left">
                        <button class="m-btn" @click="isWarningDialog">
                            Đồng ý
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ["employeeCode", "warning", "errorCode", "warningCode"],
    methods: {
        /**
         * Hiển thị form cảnh báo với các trường hợp
         * Author: NHAnh (06/11/2022)
         */
        dialogText() {
            // Cảnh báo khi trường Mã nhân viên bị trùng
            if (this.warning) {
                return `Mã nhân viên '${this.employeeCode}' đã tồn tại trong hệ
                        thông, vui lòng kiểm tra lại`;
                // Cảnh báo khi trùng mã nhân viên
            } else if (this.errorCode) {
                return `Thông tin mã nhân viên không hợp lệ.`;
                // Cảnh báo khi sửa trùng mã
            } else if (this.warningCode) {
                return `Có lỗi xảy ra vui lòng liên hệ Giảng viên để được hỗ trợ!`;
            }
            // Cảnh báo khi thiếu thông tin nhân viên
            return `Vui lòng điền đầy đủ và chính xác thông tin!`;
        },

        /**
         * Thực hiện đóng dialog Cảnh báo
         * Author: NHA(06/11/2022)
         */
        isWarningDialog() {
            this.$emit("isWarningDialog");
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

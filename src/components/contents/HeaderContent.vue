<template>
    <div>
        <div class="m-main__header">
            <label for="">Nhân viên</label>
            <div class="m-main__header-right">
                <ms-button
                    btnText="Thêm mới nhân viên"
                    @click="closeOpenPopup()"
                ></ms-button>
            </div>
        </div>
        <ms-popup
            v-if="popupStatus"
            titlePopup="Thêm mới nhân viên"
            :closeOpenPopup="closeOpenPopup"
            :reloadList="reloadList"
            :addEmployeePopup="popupAdd"
            @openToastAdd="openToastAdd"
            @onClose="onClose"
        ></ms-popup>
    </div>
</template>
<script>
import MsButton from "../base/button/MsButton.vue";
import MsPopup from "../base/popup/MsPopup.vue";
import MsToast from "../base/toast/MsToast.vue";

export default {
    components: { MsButton, MsPopup, MsToast },
    props: ["reloadList"],
    data() {
        return {
            popupStatus: false,
            toastStatus: false,
            // mở nut X popup thêm
            popupAdd: true,
        };
    },
    methods: {
        /**
         * Thực hiện đóng mở popup
         * Author: NHAnh (06/11/2022)
         */
        closeOpenPopup() {
            this.popupStatus = !this.popupStatus;
            this.eventBus.emit("togglePopup", this.popupStatus);
        },

        /**
         * Thực hiện đóng mở Toast thêm nhân viên
         * Author: NHAnh(06/11/2022)
         */
        openToastAdd(data) {
            this.$emit("openToastAdd", data);
        },

        /**
         * Thực hiện đóng mở Toast sửa nhân viên
         * Author: NHAnh(06/11/2022)
         */
        openToastEdit(data) {
            this.toastStatus = data;
            setTimeout(() => {
                this.toastStatus = false;
            }, 4000);
        },

        /**
         * Thực hiện đóng mở Toast thêm nhân viên
         * Author: NHAnh(06/11/2022)
         */
        onClose() {
            this.popupStatus = false;
        },

        /**
         * Đóng toast nhân viên
         * Author: NHAnh(06/11/2022)
         */
        closeOpenToast() {
            this.toastStatus = !this.toastStatus;
        },
    },
};
</script>
<style>
.m-main__header {
    width: 100%;
    height: 56px;
    background-color: #f3f4f8;
    display: flex;
    align-items: start;
    justify-content: space-between;
}
</style>

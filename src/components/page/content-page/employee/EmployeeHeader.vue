<template>
    <div>
        <div class="m-main__header">
            <label for="">{{ employeeResource.TITLE }}</label>
            <div class="m-main__header-right">
                <ms-button
                    btnText="Thêm mới nhân viên"
                    titleBtn="Thêm mới nhân viên (Insert)"
                    @click="closeOpenPopup()"
                ></ms-button>
            </div>
        </div>
        <employee-detail
            v-if="popupStatus"
            :titlePopup="titlePopup.INSERT"
            :closeOpenPopup="closeOpenPopup"
            :reloadList="reloadList"
            :addEmployeePopup="popupAdd"
            @openToastAdd="openToastAdd"
            @onClose="onClose"
        ></employee-detail>
    </div>
</template>
<script>
import MsButton from "../../../base/button/MsButton.vue";
import MsToast from "../../../base/toast/MsToast.vue";
import { TITLE_POPUP } from "../../../../constans/resource";
import { EMPLOYEE_ROUTER } from "../../../../constans/layoutResource";
import EmployeeDetail from "./EmployeeDetail.vue";

export default {
    components: { MsButton, MsToast, EmployeeDetail },
    props: ["reloadList"],
    data() {
        return {
            popupStatus: false,
            toastStatus: false,
            // mở nut X popup thêm
            popupAdd: true,
            titlePopup: TITLE_POPUP,
            employeeResource: EMPLOYEE_ROUTER,
        };
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
         * Phím tắt
         * author: NHAnh (27/11/2022)
         */
        listenerKeyup(e) {
            try {
                // Insert
                if (e.keyCode == 45) {
                    this.closeOpenPopup();
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Thực hiện đóng mở popup
         * Author: NHAnh (06/11/2022)
         */
        closeOpenPopup() {
            try {
                this.popupStatus = !this.popupStatus;
                this.eventBus.emit("togglePopup", this.popupStatus);
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Thực hiện đóng mở Toast thêm nhân viên
         * Author: NHAnh(06/11/2022)
         */
        openToastAdd(data) {
            try {
                this.$emit("openToastAdd", data);
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Thực hiện đóng mở Toast sửa nhân viên
         * Author: NHAnh(06/11/2022)
         */
        openToastEdit(data) {
            try {
                this.toastStatus = data;
                setTimeout(() => {
                    this.toastStatus = false;
                }, 4000);
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Thực hiện đóng mở Toast thêm nhân viên
         * Author: NHAnh(06/11/2022)
         */
        onClose() {
            try {
                this.popupStatus = false;
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Đóng toast nhân viên
         * Author: NHAnh(06/11/2022)
         */
        closeOpenToast() {
            try {
                this.toastStatus = !this.toastStatus;
            } catch (err) {
                console.log(err);
            }
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

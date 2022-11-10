<template>
    <div class="m-main__table">
        <div class="m-main__table-header">
            <div class="table-header-left">
                <!-- <label for="" class="mr-16"
                    >Đã chọn: <b>{{ listClicked }}</b> nhân viên
                    {{ getList }}</label
                >
                <ms-button btnText="Xóa" class="btn-delete"></ms-button> -->
            </div>
            <div class="table-header-right">
                <div class="mr-16" style="width: 300px">
                    <ms-input
                        class="m-w-300 m-input-icon icon-search"
                        placeholder="Tìm kiếm theo tên, mã nhân viên"
                        @dataInput="searchValue"
                        name="searchInput"
                    ></ms-input>
                </div>
                <div class="icon-reload tooltip-relative" @click="reloadList()">
                    <div class="tooltip tooltip-reload">
                        <label for=""
                            >Lấy lại dữ liệu
                            <div></div
                        ></label>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-main__table-body">
            <table id="tblEmployee" class="m-table">
                <thead>
                    <th class="text-align-center thead__stiky">
                        <input
                            type="checkbox"
                            v-model="checkAll"
                            @click="selectAllTable()"
                        />
                    </th>
                    <th class="text-align-left">MÃ NHÂN VIÊN</th>
                    <th class="text-align-left">TÊN NHÂN VIÊN</th>
                    <th class="text-align-left">GIỚI TÍNH</th>
                    <th class="text-align-center">NGÀY SINH</th>
                    <th class="text-align-left thead__so-cmnd">
                        SỐ CMND
                        <div class="tooltip tooltip__so-cmnd">
                            <label for=""
                                >Số chứng minh nhân dân
                                <div></div
                            ></label>
                        </div>
                    </th>
                    <th class="text-align-left">CHỨC DANH</th>
                    <th class="text-align-left">TÊN ĐƠN VỊ</th>
                    <th class="text-align-left">SỐ TÀI KHOẢN</th>
                    <th class="text-align-left">TÊN NGÂN HÀNG</th>
                    <th
                        class="text-align-left"
                        title="Chi nhánh tài khoản ngân hàng"
                    >
                        CHI NHÁNH TK NGÂN HÀNG
                    </th>
                    <th class="text-align-center">CHỨC NĂNG</th>
                </thead>
                <tbody>
                    <tr
                        :class="employee.isChecked ? 'm-row-selected' : ''"
                        v-for="employee in listEmployee"
                        :key="employee.EmployeeId"
                        @dblclick="employeeEdit($event, employee)"
                    >
                        <td class="text-align-center">
                            <input
                                type="checkbox"
                                class="is-checked"
                                v-model="employee.isChecked"
                            />
                        </td>
                        <td class="text-align-left">
                            {{ employee.EmployeeCode }}
                        </td>
                        <td class="text-align-left">
                            {{ employee.EmployeeName }}
                        </td>
                        <td class="text-align-left">
                            {{ employee.GenderName }}
                        </td>
                        <td class="text-align-center">
                            {{ dateTime(employee.DateOfBirth) }}
                        </td>
                        <td class="text-align-left">
                            {{ employee.IdentityNumber }}
                        </td>
                        <td class="text-align-left">
                            {{ employee.EmployeePosition }}
                        </td>
                        <td class="text-align-left">
                            {{ employee.DepartmentName }}
                        </td>
                        <td class="text-align-left">
                            {{ employee.BankAccountNumber }}
                        </td>
                        <td class="text-align-left">
                            {{ employee.BankBranchName }}
                        </td>
                        <td class="text-align-left">
                            {{ employee.BankProvinceName }}
                        </td>
                        <td
                            :class="[
                                'text-align-center td-sticky',
                                employee.closeOpenDelete ? 'z-index-5' : '',
                            ]"
                        >
                            <div class="update-table">
                                <button
                                    for=""
                                    @click="employeeEdit($event, employee)"
                                >
                                    Sửa
                                </button>
                                <div
                                    class="icon-update"
                                    @click="
                                        employee.closeOpenDelete =
                                            !employee.closeOpenDelete
                                    "
                                >
                                    <div
                                        :class="[
                                            'icon-down-table icon-update',
                                            employee.closeOpenDelete
                                                ? 'icon-update-focus trasform-icon'
                                                : '',
                                        ]"
                                    ></div>

                                    <div
                                        class="list-update"
                                        v-if="employee.closeOpenDelete"
                                        v-click-away="
                                            () => {
                                                onClickAway($event, employee);
                                            }
                                        "
                                    >
                                        <ul class="z-index-5">
                                            <li
                                                @click="
                                                    oClDialogDelete(
                                                        employee.EmployeeId,
                                                        employee.EmployeeCode
                                                    )
                                                "
                                            >
                                                Xóa
                                            </li>
                                        </ul>
                                        <!-- <div class="overlay-delete"></div> -->
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <ms-popup
                v-if="popupStatus"
                titlePopup="Sửa nhân viên"
                :employeeEditItem="employeeEditItem"
                :putEmployee="putEmployeePopup"
                :employeeEdit="employeeEdit"
                :reloadList="reloadList"
                @onClose="onClose"
                @openToastEdit="openToastEdit"
                @reloadData="reloadData"
                :edit="true"
            ></ms-popup>
            <dialog-delete
                v-if="isDelete"
                :employeeID="idEmployee"
                :employeeName="nameEmployee"
                :reloadList="reloadList"
                :oClDialogDelete="oClDialogDelete"
                :employeeEdit="employeeEdit"
                @openToast="openToast"
            ></dialog-delete>
            <ms-toast
                v-if="toastStatusEdit"
                toastAct="sửa"
                @closeOpenToast="closeOpenToastEdit"
            ></ms-toast>
            <ms-toast
                v-show="toastStatus"
                toastAct="xóa"
                @closeOpenToast="closeOpenToast"
            ></ms-toast>
        </div>
        <div v-if="hadData" class="hadData">
            <b for="" class="">Không có dữ liệu !!!</b>
        </div>
    </div>
</template>
<script>
import MsButton from "../base/button/MsButton.vue";
import DialogDelete from "../base/dialog/dialogDelete.vue";
import MsInput from "../base/input/MsInput.vue";
import MsPopup from "../base/popup/MsPopup.vue";
import MsToast from "../base/toast/MsToast.vue";
import { directive } from "vue3-click-away";

export default {
    components: { MsInput, MsButton, DialogDelete, MsPopup, MsToast },
    props: ["listEmployee", "reloadList", "hadData"],
    data() {
        return {
            checkAll: false,
            totalEmployeeClicked: 0,
            listClicked: [],
            isDelete: false,
            idEmployee: "",
            nameEmployee: "",
            getList: null,
            employeeEditItem: {},
            // mở Popup
            popupStatus: false,
            // Mở Toast
            toastStatus: false,
            // dữ liệu ô Search
            searchValueInput: "",
            putEmployeePopup: true,
            toastStatusEdit: false,
        };
    },
    // Click outside
    directives: {
        ClickAway: directive,
    },
    created() {
        this.eventBus.on("getList", e => (this.getList = e));
    },
    methods: {
        /**
         * Lấy giá trị ô input search
         * Author: NHAnh(06/11/2022)
         */
        searchValue(data) {
            this.searchValueInput = data.value;
            this.$emit("searchValue", this.searchValueInput);
        },

        /**
         * Hiện Toast xóa sau 4s sẽ mất
         * Author: NHAnh(06/11/2022)
         */
        openToast(data) {
            this.toastStatus = data;
            setTimeout(() => {
                this.toastStatus = false;
            }, 4000);
        },
        /**
         * Đóng mở thanh chức năng
         * author: NHAnh(26/10/2022)
         */
        closeOpen(index) {
            index = !index;
        },

        /**
         * Định dạng ngày tháng
         * author: NHAnh(26/10/2022)
         */
        dateTime(dateAPI) {
            if (dateAPI) {
                let date = new Date(dateAPI);
                let day = date.getDate();
                day = day < 10 ? `0${day}` : day;
                let month = date.getMonth() + 1;
                month = month < 10 ? `0${month}` : month;
                let year = date.getFullYear();
                return `${day}/${month}/${year}`;
            }
        },
        /**
         * Tích chọn all table
         * 25/10/2022
         */
        selectAllTable() {
            try {
                if (!this.checkAll) {
                    this.listEmployee.map(e => (e.isChecked = true));
                } else this.listEmployee.map(e => (e.isChecked = false));
                // let check = this.listEmployee.every(e => (e.isChecked = false));
                // if (!check) {
                //     this.checkAll = false;
                // }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * hiện dialog delete
         * Author: NHAnh(06/11/2022)
         */
        oClDialogDelete(id, name) {
            this.isDelete = !this.isDelete;
            this.idEmployee = id;
            this.nameEmployee = name;
        },

        /**
         * Thực hiện format ngày tháng hiện lên bảng
         * Author: NHAnh(06/11/2022)
         */
        formatDate(date) {
            if (date) {
                var d = new Date(date),
                    month = "" + (d.getMonth() + 1),
                    day = "" + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = "0" + month;
                if (day.length < 2) day = "0" + day;

                return [year, month, day].join("-");
            }
        },

        /**
         * Format ô input date trong popup sửa nhân viên
         * NHAnh(06/11/2022)
         */
        employeeEdit(event, employee) {
            this.popupStatus = !this.popupStatus;
            this.employeeEditItem = employee;
            this.employeeEditItem.DateOfBirth = this.formatDate(
                this.employeeEditItem.DateOfBirth
            );
            this.employeeEditItem.IdentityDate = this.formatDate(
                this.employeeEditItem.IdentityDate
            );
        },

        /**
         * 2 hàm Đóng toast
         * author: NHAnh (02/11/2022)
         */
        closeOpenToast() {
            this.toastStatus = !this.toastStatus;
        },
        closeOpenToastEdit() {
            this.toastStatusEdit = !this.toastStatusEdit;
        },

        /**
         * đóng Popup sửa
         * author: NHAnh (02/11/2022)
         */
        onClose() {
            this.popupStatus = false;
        },

        /**
         * Mở Toast Edit
         * author: NHAnh(02/11/2022)
         */
        openToastEdit(data) {
            this.toastStatusEdit = data;
            setTimeout(() => {
                this.toastStatusEdit = false;
            }, 4000);
        },

        /**
         * reload data
         * author: NHAnh(03/11/2022)
         */
        reloadData() {
            this.$emit("reloadData");
        },

        /**
         * Hàm đóng
         * author: NHAnh(03/11/2022)
         */
        onClickAway(event, emp) {
            emp.closeOpenDelete = false;
        },
    },
};
</script>
<style>
.m-table {
    border-collapse: collapse;
    border-spacing: unset;
    border: unset;
    width: 100%;
}

.m-table tr {
    cursor: pointer;
    height: 48px;
    border-bottom: 1px solid #bbbbbb;
}

.thead__so-cmnd {
    position: relative;
}
.m-table tr td {
    background-color: #fff;
}
.m-table tr td,
.m-table th {
    /* border: 1px solid #bbbbbb; */
    cursor: pointer;
    padding-left: 16px;
    padding-right: 16px;
    white-space: nowrap;
    z-index: 0;
}

.m-table .text-align-left {
    text-align: left;
}

.m-table .text-align-right {
    text-align: right;
}

.m-table .text-align-center {
    text-align: center;
}

.m-table tbody tr:hover td {
    background-color: #e9ebee;
    cursor: pointer;
    z-index: 0;
}
.m-row-selected td {
    background-color: #e3f3ee !important;
}

.update-table {
    display: flex;
    align-items: center;
    justify-content: center;
}
.update-table button {
    margin-right: 16px;
    border: none;
    background-color: unset;
    color: #0075c0;
    font-weight: 600;
    cursor: pointer;
}
/* Stiky */
.m-table thead {
    height: 48px;
    background-color: #edeef2;
    border-bottom: 1px solid #bbbbbb;
    position: sticky;
    top: -1px;
    z-index: 2;
}
/* Cột 1 */
.m-table thead th:first-child {
    width: 24px !important;
    background-color: #edeef2;
    position: sticky;
    top: -1px;
    left: 0px;
    z-index: 3;
}
.m-table tbody td:first-child {
    background-color: #fff;
    position: sticky;
    left: 0px;
    z-index: 1;
}
/* Cột 2 */
.m-table thead th:nth-child(2) {
    width: 160px !important;
    background-color: #edeef2;
    position: sticky;
    top: -1px;
    left: 50px;
    z-index: 3;
}
.m-table tbody td:nth-child(2) {
    background-color: #fff;
    position: sticky;
    left: 50px;
    z-index: 1;
}
/* Cột 3 */
.m-table thead th:nth-child(3) {
    width: 160px !important;
    background-color: #edeef2;
    position: sticky;
    top: -1px;
    left: 176px;
    z-index: 3;
}
.m-table tbody td:nth-child(3) {
    background-color: #fff;
    position: sticky;
    left: 176px;
    z-index: 1;
}
/* Cột chức năng */
.m-table thead th:last-child {
    background-color: #edeef2;
    position: sticky;
    top: -1px;
    right: 0px;
    z-index: 3;
    width: 120px;
}
.m-table tbody td:last-child {
    /* background-color: #fff; */
    position: sticky;
    right: 0px;
    z-index: 1;
    width: 120px;
}
/* Update Table */
.icon-update {
    position: relative;
    z-index: 999;
    border: 1px solid transparent;
}
.icon-update-focus {
    border: 1px solid #0075c0;
}
.list-update {
    position: absolute;
    width: 100;
    height: 50;
    top: 22px;
    right: 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
}
.show {
    display: block;
}
.list-update ul {
    list-style-type: none;
    width: 100px;
    background-color: #fff;
    z-index: 10;
}
.list-update ul li {
    height: 24px;
    line-height: 24px;
    text-align: left;
    padding-left: 8px;
    padding-top: 4px;
    padding-bottom: 4px;
    background-color: #fff;
}
.list-update ul li:hover {
    background-color: #e8e9ed;
    color: #409330;
}
.table-header-right {
    display: flex;
    align-items: center;
    padding-right: 8px;
}
.table-header-left {
    display: flex;
    align-items: center;
}
.btn-delete {
    background-color: red;
}
.overlay-delete {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    background-color: red;
    width: 100%;
    height: 100%;
}
.hadData {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 46px;
}
.hadData b {
    font-size: 24px;
}
</style>

<template>
    <div class="m-main__table">
        <div class="m-main__table-header">
            <div>
                <div class="table-header-left" v-show="listClicked.length > 0">
                    <label for="" class="mr-16"
                        >{{ employeeResource.SELECTED }}:
                        <b>{{ listClicked.length }}</b></label
                    >
                    <label
                        for=""
                        class="lable-unchecked mr-16"
                        @click="clearListDelete"
                        >{{ employeeResource.UNCHECKED }}</label
                    >
                    <ms-button
                        class="btn-delete"
                        :btnText="buttonSrc.IS_DELETE"
                        @click="deleteBatch()"
                    ></ms-button>
                </div>
            </div>
            <div class="table-header-right">
                <div class="mr-16" style="width: 300px">
                    <ms-input
                        class="m-w-300 m-input-icon icon-search"
                        :placeholder="employeeResource.PLACEHOLDER_SEARCH"
                        @dataInput="searchValue"
                        name="searchInput"
                        :maxlength="maxlenght.SEARCH"
                    ></ms-input>
                </div>
                <div
                    class="icon-reload tooltip-relative"
                    @click="reloadListPresent()"
                >
                    <div class="tooltip tooltip-reload">
                        <label for=""
                            >{{ tooltipResource.DATA_BACK }}
                            <div></div
                        ></label>
                    </div>
                </div>
                <div class="icon-excel tooltip-relative" @click="exportExcel()">
                    <div class="tooltip tooltip-excel">
                        <label for=""
                            >{{ tooltipResource.EXPORT }}
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
                        <div
                            style="
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            "
                        >
                            <input
                                type="checkbox"
                                v-model="checkAll"
                                @click="selectAllTable()"
                            />
                        </div>
                    </th>
                    <th class="text-align-left">
                        {{ employeeResource.TABLE.EMPLOYEE_CODE }}
                    </th>
                    <th class="text-align-left">
                        {{ employeeResource.TABLE.EMPLOYEE_NAME }}
                    </th>
                    <th class="text-align-left">
                        {{ employeeResource.TABLE.GENDER }}
                    </th>
                    <th class="text-align-center">
                        {{ employeeResource.TABLE.DATE_OF_BIRTH }}
                    </th>
                    <th
                        :title="employeeResource.TABLE.IDENTITYNUMBER_TITLE"
                        class="text-align-left thead__so-cmnd"
                    >
                        {{ employeeResource.TABLE.IDENTITYNUMBER }}
                    </th>
                    <th class="text-align-left">
                        {{ employeeResource.TABLE.JOB_POSITION_NAME }}
                    </th>
                    <th class="text-align-left">
                        {{ employeeResource.TABLE.DEPARTMENT_NAME }}
                    </th>
                    <th class="text-align-left">
                        {{ employeeResource.TABLE.BANK_NUMBER }}
                    </th>
                    <th class="text-align-left">
                        {{ employeeResource.TABLE.BANK_NAME }}
                    </th>
                    <th
                        :title="employeeResource.TABLE.BANK_BRANCH_TITLE"
                        class="text-align-left"
                    >
                        {{ employeeResource.TABLE.BANK_BRANCH }}
                    </th>
                    <th class="text-align-center">
                        {{ employeeResource.TABLE.FUNCTION }}
                    </th>
                </thead>
                <tbody>
                    <tr
                        :class="emp.isChecked ? 'm-row-selected' : ''"
                        v-for="emp in listEmployee"
                        :key="emp.employeeId"
                        @dblclick="employeeEdit($event, emp)"
                    >
                        <td class="text-align-center">
                            <div
                                style="
                                    display: flex;
                                    justify-content: center;
                                    align-items: center;
                                "
                            >
                                <input
                                    type="checkbox"
                                    class="is-checked"
                                    v-model="emp.isChecked"
                                    @click="addListDelete(emp)"
                                />
                            </div>
                        </td>
                        <td class="text-align-left">
                            {{ emp.EmployeeCode }}
                        </td>
                        <td class="text-align-left">
                            {{ emp.EmployeeName }}
                        </td>
                        <td class="text-align-left">
                            {{ handleGender(emp.Gender) }}
                        </td>
                        <td class="text-align-center">
                            {{ dateTime(emp.DateofBirth) }}
                        </td>
                        <td class="text-align-left">
                            {{ emp.IdentityNumber }}
                        </td>
                        <td class="text-align-left">
                            {{ emp.JobPositionName }}
                        </td>
                        <td class="text-align-left">
                            {{ emp.DepartmentName }}
                        </td>
                        <td class="text-align-left">
                            {{ emp.BankNumber }}
                        </td>
                        <td class="text-align-left">
                            {{ emp.BankName }}
                        </td>
                        <td class="text-align-left">
                            {{ emp.BankBranch }}
                        </td>
                        <td
                            :class="[
                                'text-align-center td-sticky',
                                emp.closeOpenDelete ? 'z-index-5' : '',
                            ]"
                        >
                            <div class="update-table">
                                <button
                                    for=""
                                    @click="employeeEdit($event, emp)"
                                >
                                    {{ employeeResource.TABLE.EDIT }}
                                </button>
                                <div
                                    class="icon-update"
                                    @click="
                                        emp.closeOpenDelete =
                                            !emp.closeOpenDelete
                                    "
                                >
                                    <div
                                        :class="[
                                            'icon-down-table icon-update',
                                            emp.closeOpenDelete
                                                ? 'icon-update-focus trasform-icon'
                                                : '',
                                        ]"
                                    ></div>

                                    <div
                                        class="list-update"
                                        v-if="emp.closeOpenDelete"
                                        v-click-away="
                                            () => {
                                                onClickAway($event, emp);
                                            }
                                        "
                                    >
                                        <ul class="z-index-5">
                                            <li
                                                @click="
                                                    oClDialogDelete(
                                                        emp.EmployeeId,
                                                        emp.EmployeeCode
                                                    )
                                                "
                                            >
                                                {{
                                                    employeeResource.TABLE
                                                        .DELETE
                                                }}
                                            </li>
                                            <li
                                                @click="
                                                    employeeEdit($event, emp, 1)
                                                "
                                            >
                                                {{
                                                    employeeResource.TABLE
                                                        .REPLICATION
                                                }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <employee-detail
                v-if="popupStatus"
                :titlePopup="titlePopup"
                :employeeEditItem="employeeEditItem"
                :putEmployee="putEmployeePopup"
                :employeeEdit="employeeEdit"
                :reloadList="reloadList"
                @onClose="onClose"
                @openToastEdit="openToastEdit"
                @reloadData="reloadData"
                @openToastAdd="openToastAdd"
                :edit="isEdit"
            ></employee-detail>
            <dialog-delete
                v-if="isDelete"
                :employeeID="idEmployee"
                :employeeName="nameEmployee"
                :listClicked="listClicked"
                :reloadList="reloadList"
                :isDeleteBatch="isDeleteBatch"
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
                @closeOpenToast="closeOpenToast"
                :toastAct="toastMsg"
            ></ms-toast>
        </div>
        <div v-if="hadData" class="hadData">
            <b for="" class="">{{ errorTextApi }}</b>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import MsButton from "../../../base/button/MsButton.vue";
import DialogDelete from "../../../base/dialog/DialogDelete.vue";
import MsInput from "../../../base/input/MsInput.vue";
import MsToast from "../../../base/toast/MsToast.vue";
import EmployeeDetail from "./EmployeeDetail.vue";
import { directive } from "vue3-click-away";
import { BASE_URL } from "../../../../constans/constans";
import { GENDER } from "../../../../constans/enums";
import { TITLE_POPUP, MAXLENGHT_INPUT } from "../../../../constans/resource";
import {
    EMPLOYEE_ROUTER,
    TOOLTIP,
    MS_BUTTON,
    EMPLOYEE_DETAIL,
} from "../../../../constans/layoutResource";

export default {
    components: {
        MsInput,
        MsButton,
        DialogDelete,
        MsToast,
        EmployeeDetail,
    },
    props: [
        "listEmployee",
        "reloadList",
        "hadData",
        "errorTextApi",
        "reloadListPresent",
    ],
    data() {
        return {
            checkAll: false,
            totalEmployeeClicked: 0,
            listClicked: [],
            isDelete: false,
            idEmployee: "",
            nameEmployee: "",
            // getList: null,
            employeeEditItem: {},
            // mở Popup
            popupStatus: false,
            // Mở Toast
            toastStatus: false,
            // dữ liệu ô Search
            searchValueInput: "",
            putEmployeePopup: true,
            toastStatusEdit: false,
            isEdit: true,
            isDeleteBatch: false,
            toastMsg: "",
            titlePopup: TITLE_POPUP,
            employeeResource: EMPLOYEE_ROUTER,
            tooltipResource: TOOLTIP,
            buttonSrc: MS_BUTTON,
            maxlenght: MAXLENGHT_INPUT,
        };
    },
    // Click outside
    directives: {
        ClickAway: directive,
    },

    watch: {
        // listEmployee(a) {
        //     this.listClicked = this.listEmployee.filter(
        //         e => e.isChecked == true
        //     );
        // },
    },

    methods: {
        /**
         * Lấy giá trị ô input search
         * Author: NHAnh(06/11/2022)
         */
        searchValue(data) {
            try {
                this.searchValueInput = data.value;
                this.$emit("searchValue", this.searchValueInput);
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Hiện Toast xóa sau 4s sẽ mất
         * Author: NHAnh(06/11/2022)
         */
        openToast(data) {
            try {
                this.toastMsg = "xóa";
                this.checkAll = false;
                this.listClicked = [];
                this.toastStatus = data;
                setTimeout(() => {
                    this.toastStatus = false;
                }, 4000);
            } catch (err) {
                console.log(err);
            }
        },
        /**
         * Đóng mở thanh chức năng
         * author: NHAnh(26/10/2022)
         */
        closeOpen(index) {
            try {
                index = !index;
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Định dạng ngày tháng
         * author: NHAnh(26/10/2022)
         */
        dateTime(dateAPI) {
            try {
                if (dateAPI) {
                    let date = new Date(dateAPI);
                    let day = date.getDate();
                    day = day < 10 ? `0${day}` : day;
                    let month = date.getMonth() + 1;
                    month = month < 10 ? `0${month}` : month;
                    let year = date.getFullYear();
                    return `${day}/${month}/${year}`;
                }
            } catch (err) {
                console.log(err);
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
                    this.listClicked = this.listEmployee.map(e => e.EmployeeId);
                } else {
                    this.listEmployee.map(e => (e.isChecked = false));
                    this.listClicked = [];
                }
                console.log(this.listClicked);
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Tích chọn employe thêm vào list xóa
         * Author: NHAnh(24/11/2022)
         */
        addListDelete(emp) {
            try {
                emp.isChecked = !emp.isChecked;
                if (emp.isChecked == true) {
                    this.listClicked.push(emp.EmployeeId);
                } else if (emp.isChecked == false) {
                    this.listClicked = this.listClicked.filter(
                        e => e != emp.EmployeeId
                    );
                }
                if (this.listClicked.length < this.listEmployee.length) {
                    this.checkAll = false;
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Gọi API thực hiện xóa nhiều
         * Author: NHAnh(24/11/2022)
         */
        deleteBatch() {
            try {
                this.isDeleteBatch = true;
                this.isDelete = !this.isDelete;
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Fomat giới tính
         * author : NHAnh(23/11/2022)
         */
        handleGender(gender) {
            try {
                let gen = "";
                switch (gender) {
                    case GENDER.MALE:
                        gen = EMPLOYEE_DETAIL.MALE;
                        break;
                    case GENDER.FEMALE:
                        gen = EMPLOYEE_DETAIL.FEMALE;
                        break;
                    case GENDER.OTHER:
                        gen = EMPLOYEE_DETAIL.OTHER;
                        break;
                }
                return gen;
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * hiện dialog delete
         * Author: NHAnh(06/11/2022)
         */
        oClDialogDelete(id, name) {
            try {
                this.isDeleteBatch = false;
                this.isDelete = !this.isDelete;
                this.idEmployee = id;
                this.nameEmployee = name;
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Thực hiện format ngày tháng hiện lên bảng
         * Author: NHAnh(06/11/2022)
         */
        formatDate(date) {
            try {
                if (date) {
                    var d = new Date(date),
                        month = "" + (d.getMonth() + 1),
                        day = "" + d.getDate(),
                        year = d.getFullYear();

                    if (month.length < 2) month = "0" + month;
                    if (day.length < 2) day = "0" + day;

                    return [year, month, day].join("-");
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Format ô input date trong popup sửa và nhân bản nhân viên, nếu value == 1 sẽ là form nhân bản
         * NHAnh(06/11/2022)
         */
        employeeEdit(event, emp, value) {
            try {
                this.titlePopup = TITLE_POPUP.EDIT;
                this.isEdit = true;
                if (value == 1) {
                    this.isEdit = false;
                    this.titlePopup = TITLE_POPUP.INSERT;
                }

                this.popupStatus = !this.popupStatus;
                this.employeeEditItem = emp;
                this.employeeEditItem.DateofBirth = this.formatDate(
                    this.employeeEditItem.DateofBirth
                );
                this.employeeEditItem.IdentityDate = this.formatDate(
                    this.employeeEditItem.IdentityDate
                );
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * 2 hàm Đóng toast
         * author: NHAnh (02/11/2022)
         */
        closeOpenToast() {
            try {
                this.toastStatus = !this.toastStatus;
            } catch (err) {
                console.log(err);
            }
        },
        closeOpenToastEdit() {
            try {
                this.toastStatusEdit = !this.toastStatusEdit;
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * đóng Popup sửa
         * author: NHAnh (02/11/2022)
         */
        onClose() {
            try {
                this.popupStatus = false;
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Mở Toast Edit
         * author: NHAnh(02/11/2022)
         */
        openToastEdit(data) {
            try {
                this.toastStatusEdit = data;
                setTimeout(() => {
                    this.toastStatusEdit = false;
                }, 4000);
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * reload data
         * author: NHAnh(03/11/2022)
         */
        reloadData() {
            try {
                this.$emit("reloadData");
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Hàm đóng
         * author: NHAnh(03/11/2022)
         */
        onClickAway(event, emp) {
            try {
                emp.closeOpenDelete = false;
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
         * Clear danh sách IP xóa
         */
        clearListDelete() {
            try {
                this.checkAll = false;
                this.listEmployee.map(e => (e.isChecked = false));
                this.listClicked = [];
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * xuất khẩu excel
         * Author: NHAnh(20/11/2022)
         */
        exportExcel() {
            try {
                axios
                    .post(`${BASE_URL}/exportExcel`)
                    .then(res => {
                        this.toastMsg = "Xuất khẩu";
                        this.toastStatus = true;
                        setTimeout(() => {
                            this.toastStatus = false;
                        }, 4000);
                        res.config.responseType = "blob";
                        axios(res.config).then(res => {
                            const url = window.URL.createObjectURL(
                                new Blob([res.data])
                            );
                            const link = document.createElement("a");
                            link.href = url;
                            link.setAttribute(
                                "download",
                                "Danh sách nhân viên.xlsx"
                            );
                            document.body.appendChild(link);
                            link.click();
                        });
                    })
                    .catch(e => console.log(e));
            } catch (err) {
                console.log(err);
            }
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
    border-bottom: 1px solid #e0e0e0;
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
    background-color: #f8f8f8;
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
    margin-right: 8px;
    border: none;
    background-color: unset;
    color: #0075c0;
    font-weight: 600;
    cursor: pointer;
}

/* Stiky */
.m-table thead {
    height: 48px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e0e0e0;
    position: sticky;
    top: -1px;
    z-index: 2;
}

/* Cột 1 */
.m-table thead th:first-child {
    width: 24px !important;
    background-color: #f5f5f5;
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
    background-color: #f5f5f5;
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
    background-color: #f5f5f5;
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
    background-color: #f5f5f5;
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
    width: 120 !important;
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
    padding-left: 16px;
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
    background-color: #e81e1e;
}

.btn-delete:hover {
    background-color: #eb3333;
}

.btn-delete:focus {
    background-color: #e81e1e;
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

.lable-unchecked {
    color: #e61d1d;
    cursor: pointer;
    font-weight: 400;
}
</style>

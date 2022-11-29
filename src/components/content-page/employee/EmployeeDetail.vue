<template>
    <div class="m-popup">
        <div class="m-popup__content">
            <div class="m-popup__header">
                <div class="m-popup__title">
                    <div class="m-popup__title-header">
                        <div class="m-popup__title-text">
                            {{ titlePopup }}
                        </div>
                        <label for="">
                            <input
                                type="checkbox"
                                class="popup-checkbox"
                                tabindex="22"
                            />
                            <span>{{ employeeDetail.IS_CLIENT }}</span>
                        </label>
                        <label for="">
                            <input
                                id="lastCheckBox"
                                type="checkbox"
                                class="popup-checkbox"
                                tabindex="23"
                                @blur="tabOrder"
                            />
                            <span>{{ employeeDetail.IS_SUPPLIER }}</span>
                        </label>
                    </div>
                </div>
                <div class="m-popup__close">
                    <div class="icon-help mr-8">
                        <div class="tooltip tooltip__help">
                            <label for=""
                                >{{ tooltipResource.HELP }}
                                <div></div
                            ></label>
                        </div>
                    </div>
                    <div
                        id="js-close"
                        class="icon-close"
                        @click="closePopup(1)"
                    >
                        <div class="tooltip tooltip__close">
                            <label for=""
                                >{{ tooltipResource.CLOSE }}
                                <div></div
                            ></label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-popup__content-main">
                <div class="m-popup__conntent-employee">
                    <div class="content__employee-form">
                        <div class="employee-form__left">
                            <div class="form-popup">
                                <div class="ma-nhan-vien">
                                    <form-control
                                        :labelForm="employeeDetail.EMPLOYEE_ID"
                                        required
                                        @dataInput="dataForm"
                                        :formControlName="
                                            formName.EMPLOYEE_CODE
                                        "
                                        :validateForm="validate.code"
                                        :errorText="errors.code"
                                        :valueInput="employee.EmployeeCode"
                                        :tabindex="1"
                                        ref="input"
                                        :autofocus="true"
                                        :tabForcus="tabForcus"
                                        @blur="validateFormCode"
                                    ></form-control>
                                </div>
                                <div class="form-group employee-name">
                                    <form-control
                                        :labelForm="
                                            employeeDetail.EMPLOYEE_NAME
                                        "
                                        required
                                        @dataInput="dataForm"
                                        :validateForm="validate.name"
                                        :errorText="errors.name"
                                        :formControlName="
                                            formName.EMPLOYEE_NAME
                                        "
                                        :tabindex="2"
                                        :valueInput="employee.EmployeeName"
                                        @blur="validateFormName"
                                    ></form-control>
                                </div>
                            </div>
                            <div class="form-popup">
                                <div class="form-group department">
                                    <label for=""
                                        >{{ employeeDetail.DEPARTMENT_NAME }}
                                        <span class="color-red">*</span></label
                                    >
                                    <ms-dropdown
                                        :listDropdownItem="listDepartment"
                                        :defaultValue="
                                            employeeDetail.CHOOSE_UNIT
                                        "
                                        downData
                                        :dpName="employee.DepartmentID"
                                        :tabindex="3"
                                        :validate="validate.DepartmentId"
                                        @dropdown-value="dpId"
                                        :edit="edit"
                                        @validateDD="validateDP"
                                        @blur="validateDP"
                                    ></ms-dropdown>
                                    <label
                                        for=""
                                        class="error_text"
                                        v-if="validate.DepartmentId"
                                        :title="errors.DepartmentId"
                                        >{{ errors.DepartmentId }}</label
                                    >
                                </div>
                            </div>
                            <div class="form-popup">
                                <div class="job-position">
                                    <form-control
                                        :labelForm="
                                            employeeDetail.JOB_POSITION_NAME
                                        "
                                        @dataInput="dataForm"
                                        :validateForm="validate.JobPositionName"
                                        :errorText="errors.JobPositionName"
                                        :formControlName="
                                            formName.JOB_POSITION_NAME
                                        "
                                        :tabindex="4"
                                        :valueInput="employee.JobPositionName"
                                    ></form-control>
                                </div>
                            </div>
                        </div>
                        <div class="employee-form__right">
                            <div class="form-popup">
                                <div class="form-group date-of-birth">
                                    <label for="">{{
                                        employeeDetail.DATE_OF_BIRTH
                                    }}</label>
                                    <input
                                        type="date"
                                        :class="[
                                            'm-input required',
                                            validate.DateOfBirth
                                                ? 'm-input__error'
                                                : '',
                                        ]"
                                        tabindex="5"
                                        v-model="employee.DateofBirth"
                                        @blur="validateDate(1)"
                                    />
                                    <label for="" class="error_text">{{
                                        errors.DateOfBirth
                                    }}</label>
                                </div>
                                <div class="form-group gender">
                                    <label for="">{{
                                        employeeDetail.GENDER
                                    }}</label>
                                    <div class="m-flex aline-item-center">
                                        <input
                                            class="input-gender"
                                            type="radio"
                                            name="fav_language"
                                            :value="0"
                                            tabindex="6"
                                            v-model="employee.Gender"
                                            :checked="employee?.Gender == 0"
                                        />
                                         
                                        <label
                                            for="Nam"
                                            class="lable-gender pb-0"
                                            >{{ employeeDetail.MALE }}</label
                                        ><br />
                                         

                                        <input
                                            class="input-gender"
                                            type="radio"
                                            id="Nam"
                                            name="fav_language"
                                            :value="1"
                                            tabindex="7"
                                            v-model="employee.Gender"
                                            :checked="employee?.Gender == 1"
                                        />

                                         
                                        <label class="lable-gender pb-0">{{
                                            employeeDetail.FEMALE
                                        }}</label
                                        ><br />
                                         

                                        <input
                                            class="input-gender"
                                            type="radio"
                                            name="fav_language"
                                            :value="2"
                                            tabindex="8"
                                            v-model="employee.Gender"
                                            :checked="employee?.Gender == 2"
                                        />

                                         
                                        <label class="lable-gender pb-0">{{
                                            employeeDetail.OTHER
                                        }}</label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-popup">
                                <div class="identity-number">
                                    <form-control
                                        :labelForm="
                                            employeeDetail.IDENTITY_NUMBER
                                        "
                                        :titleLable="
                                            employeeDetail.IDENTITY_NUMBER_TITLE
                                        "
                                        @dataInput="dataForm"
                                        :validateForm="validate.IdentityNumber"
                                        :errorText="errors.IdentityNumber"
                                        :formControlName="
                                            formName.IDENTITY_NUMBER
                                        "
                                        :valueInput="employee.IdentityNumber"
                                        :tabindex="9"
                                        @blur="validateNumber(1)"
                                    ></form-control>
                                </div>
                                <div class="form-group identity-date">
                                    <label for="">{{
                                        employeeDetail.IDENTITY_DATE
                                    }}</label>
                                    <input
                                        type="date"
                                        class="m-input required"
                                        v-model="employee.IdentityDate"
                                        @blur="validateDate(2)"
                                        tabindex="10"
                                    />
                                    <label for="" class="error_text">{{
                                        errors.IdentityDate
                                    }}</label>
                                </div>
                            </div>
                            <div class="form-popup">
                                <div class="iti-adress">
                                    <form-control
                                        :labelForm="
                                            employeeDetail.IDENTITY_PLACE
                                        "
                                        @dataInput="dataForm"
                                        :validateForm="validate.IdentityPlace"
                                        :errorText="errors.IdentityPlace"
                                        :formControlName="
                                            formName.IDENTITY_PLACE
                                        "
                                        :valueInput="employee.IdentityPlace"
                                        :tabindex="11"
                                    ></form-control>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-employee__contact">
                        <div class="form-popup">
                            <div class="address">
                                <form-control
                                    :labelForm="employeeDetail.ADRESS"
                                    @dataInput="dataForm"
                                    :formControlName="formName.ADRESS"
                                    :validateForm="validate.Adress"
                                    :errorText="errors.Adress"
                                    :valueInput="employee.Adress"
                                    :tabindex="12"
                                ></form-control>
                            </div>
                        </div>
                        <div class="form-popup">
                            <div class="telephone-number">
                                <form-control
                                    :labelForm="employeeDetail.PHONE_NUMBER"
                                    :titleLable="
                                        employeeDetail.PHONE_NUMBER_TITLE
                                    "
                                    @dataInput="dataForm"
                                    :validateForm="validate.PhoneNumber"
                                    :errorText="errors.PhoneNumber"
                                    :formControlName="formName.PHONE_NUMBER"
                                    :valueInput="employee.PhoneNumber"
                                    @blur="validateNumber(2)"
                                    :tabindex="13"
                                ></form-control>
                            </div>
                            <div class="telephone-number">
                                <form-control
                                    :labelForm="employeeDetail.TELEPHONE_NUMBER"
                                    :titleLable="
                                        employeeDetail.TELEPHONE_NUMBER_TITLE
                                    "
                                    @dataInput="dataForm"
                                    :validateForm="validate.TelephoneNumber"
                                    :errorText="errors.TelephoneNumber"
                                    :formControlName="formName.TELEPHONE_NUMBER"
                                    :valueInput="employee.TelephoneNumber"
                                    @blur="validateNumber(3)"
                                    :tabindex="14"
                                ></form-control>
                            </div>
                            <div class="telephone-number">
                                <form-control
                                    :labelForm="employeeDetail.EMAIL"
                                    @dataInput="dataForm"
                                    :validateForm="validate.Email"
                                    :errorText="errors.Email"
                                    :formControlName="formName.EMAIL"
                                    :valueInput="employee.Email"
                                    @blur="ValidateEmail()"
                                    :tabindex="15"
                                ></form-control>
                            </div>
                        </div>
                        <div class="form-popup">
                            <div class="telephone-number">
                                <form-control
                                    :labelForm="employeeDetail.BANK_NUMBER"
                                    @dataInput="dataForm"
                                    :validateForm="validate.BankNumber"
                                    :errorText="errors.BankNumber"
                                    :formControlName="formName.BANK_NUMBER"
                                    :valueInput="employee.BankNumber"
                                    @blur="validateNumber(4)"
                                    :tabindex="16"
                                ></form-control>
                            </div>
                            <div class="form-group telephone-number">
                                <form-control
                                    :labelForm="employeeDetail.BANK_NAME"
                                    @dataInput="dataForm"
                                    :validateForm="validate.BankName"
                                    :errorText="errors.BankName"
                                    :formControlName="formName.BANK_NAME"
                                    :valueInput="employee.BankName"
                                    :tabindex="17"
                                ></form-control>
                            </div>
                            <div class="form-group telephone-number">
                                <form-control
                                    :labelForm="employeeDetail.BANK_BRANCH"
                                    @dataInput="dataForm"
                                    :validateForm="validate.BankBranch"
                                    :errorText="errors.BankBranch"
                                    :formControlName="formName.BANK_BRANCH"
                                    :valueInput="employee.BankBranch"
                                    :tabindex="18"
                                ></form-control>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-popup__footer">
                    <ms-button
                        :btnText="buttonSrc.CANCEL"
                        btnExtra
                        @click="closePopup(1)"
                        :tabindex="21"
                    ></ms-button>
                    <div class="m-popup__footer-left">
                        <ms-button
                            :btnText="buttonSrc.SAVE"
                            :btnExtra="!edit"
                            @click="addEmployee()"
                            :tabindex="20"
                        ></ms-button>
                        <ms-button
                            class="ml-8"
                            v-if="!edit"
                            :btnText="buttonSrc.SAVE_AND_ADD"
                            @click="addEmployee(saveSrc.SAVE_AND_ADD)"
                            :tabindex="19"
                        ></ms-button>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="addEmployeePopup"
            class="overlay"
            @click="closePopup()"
        ></div>
        <div v-if="putEmployee" class="overlay" @click="employeeEdit()"></div>
        <dialog-warning
            v-if="isWarning"
            @isWarningDialog="isWarningDialog"
            :employeeCode="this.employee.EmployeeCode"
            :warning="isWarningStatus"
            :errorCode="errorCode"
            :warningCode="dataDialog.show"
            :errorText="errorText"
        ></dialog-warning>
        <dialog-update
            v-if="dialogEdit"
            :edit="edit"
            @isAdd="addEmployee(0)"
            @close-popup-edit="closePopup"
            @isUpdate="isEditEmployee"
            @coDialogUpdate="coDialogUpdate"
        ></dialog-update>
    </div>
</template>
<script>
import MsButton from "../../base/button/MsButton.vue";
import MsDropdown from "../../base/dropdown/MsDropdown.vue";
import FormControl from "../../base/form-control/FormControl.vue";
import axios from "axios";
import DialogWarning from "../../base/dialog/DialogWarning.vue";
import DialogUpdate from "../../base/dialog/DialogUpdate";
import MsToast from "../../base/toast/MsToast.vue";
import { BASE_URL, DEPARTMENT_URL } from "../../../constans/constans";
import { ERRORS, EMPLOYEE } from "../../../constans/resource";
import { EMPLOYEE_DETAIL, TOOLTIP, MS_BUTTON } from "@/constans/layoutResource";
import { SAVE } from "@/constans/enums";

export default {
    components: {
        FormControl,
        MsDropdown,
        MsButton,
        DialogWarning,
        DialogUpdate,
        MsToast,
    },
    data() {
        return {
            // Thông tin nhân viên
            employee: {},
            // Trạng thái validate nhân viên
            validate: {},
            // Text cảnh báo nhân viên
            errors: {},
            // Danh sách đơn vị
            listDepartment: [],
            // Lấy id của đơn vị truyền xuống dropdown
            dpName: "",
            // ẩn hiện dialog warning?
            isWarning: false,
            // Có phải cảnh báo trùng mã hay không?
            isWarningStatus: false,
            // mã nhân viên có đúng định dạng hay không?
            errorCode: false,
            // bật đóng dialog update
            dialogEdit: false,
            // có update employee hay không
            isEditEmployeeStatus: false,
            // Trạng thái dialog cảnh báo
            dataDialog: {
                show: false,
                message: "",
            },

            // Tabfocus
            tabForcus: false,
            //error text
            errorText: "",
            employeeDetail: EMPLOYEE_DETAIL,
            tooltipResource: TOOLTIP,
            formName: EMPLOYEE,
            buttonSrc: MS_BUTTON,
            saveSrc: SAVE,
        };
    },
    props: [
        "titlePopup",
        "closeOpenPopup",
        "employeeEditItem",
        "reloadList",
        "addEmployeePopup",
        "putEmployee",
        "employeeEdit",
        "edit",
    ],
    created() {
        this.getDepartmentList();

        // gán giá trị cho employee khi có item sửa
        if (this.employeeEditItem) {
            this.employee = { ...this.employeeEditItem };
        }

        // Lẫy mã mới
        if (!this.edit) {
            this.getNewEmployeeCode();
        }

        // tạo sự kiện phím tắt
        window.addEventListener("keyup", this.listenerKeyup);
    },

    beforeUnmount() {
        // Hủy sự kiện phím tắt
        window.removeEventListener("keyup", this.listenerKeyup);
    },

    methods: {
        /**
         * Thêm sự kiện phím tắt
         */
        listenerKeyup(e) {
            try {
                try {
                    // ESC
                    if (e.keyCode == 27) {
                        this.closePopup(1);
                    } else if (e.ctrlKey) {
                        if (!this.edit) {
                            // F8
                            if (e.keyCode == 119) {
                                this.addEmployee(1);
                            }
                        }
                        // F9
                        if (e.key == 120) {
                            this.addEmployee(0);
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Bật tắt Dialog update và gửi trạng thái
         * author: NHAnh (31/10/2022)
         */
        coDialogUpdate() {
            try {
                this.dialogEdit = !this.dialogEdit;
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Lấy giá trị ô input gán vào employee
         * author: NHAnh (29/10/2022)
         */
        dataForm(data) {
            try {
                switch (data.target) {
                    case EMPLOYEE.EMPLOYEE_CODE:
                        this.employee.EmployeeCode = data.value;
                        break;
                    case EMPLOYEE.EMPLOYEE_NAME:
                        this.employee.EmployeeName = data.value;
                        break;
                    case EMPLOYEE.JOB_POSITION_NAME:
                        this.employee.JobPositionName = data.value;
                        break;
                    case EMPLOYEE.IDENTITY_NUMBER:
                        this.employee.IdentityNumber = data.value;
                        break;
                    case EMPLOYEE.IDENTITY_PLACE:
                        this.employee.IdentityPlace = data.value;
                        break;
                    case EMPLOYEE.ADRESS:
                        this.employee.Adress = data.value;
                        break;
                    case EMPLOYEE.PHONE_NUMBER:
                        this.employee.PhoneNumber = data.value;
                        break;
                    case EMPLOYEE.TELEPHONE_NUMBER:
                        this.employee.TelephoneNumber = data.value;
                        break;
                    case EMPLOYEE.EMAIL:
                        this.employee.Email = data.value;
                        break;
                    case EMPLOYEE.BANK_NUMBER:
                        this.employee.BankNumber = data.value;
                        break;
                    case EMPLOYEE.BANK_NAME:
                        this.employee.BankName = data.value;
                        break;
                    case EMPLOYEE.BANK_BRANCH:
                        this.employee.BankBranch = data.value;
                        break;
                    default:
                    // code block
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Validate Form
         * author: NHAnh (30/10/2022)
         */
        validateForm() {
            try {
                let isValidate = true;
                this.validate = {};
                this.errors = {};
                if (!this.employee.EmployeeCode) {
                    this.validate.code = true;
                    this.errors.code = ERRORS.EMPLOYEECODE;
                    isValidate = false;
                }
                if (!this.employee.EmployeeName) {
                    this.validate.name = true;
                    this.errors.name = ERRORS.EMPLOYEENAME;
                    isValidate = false;
                }
                if (!this.employee.DepartmentID) {
                    this.validate.DepartmentId = true;
                    this.errors.DepartmentId = ERRORS.DEPARTMENTID;
                    isValidate = false;
                }
                if (this.validateTime(this.employee.DateofBirth)) {
                    this.validate.DateOfBirth = true;
                    this.errors.DateOfBirth = ERRORS.DATEOFBIRTH;
                    isValidate = false;
                }

                if (this.employee.IdentityNumber) {
                    if (!this.isNumber(this.employee.IdentityNumber)) {
                        this.validate.IdentityNumber = true;
                        this.errors.IdentityNumber = ERRORS.IDENTITYNUMBER;
                        isValidate = false;
                    }
                }
                if (this.employee.IdentityDate) {
                    if (this.validateTime(this.employee.IdentityDate)) {
                        this.validate.IdentityDate = true;
                        this.errors.IdentityDate = ERRORS.INDENTITYDATE;
                        isValidate = false;
                    }
                }

                if (this.employee.PhoneNumber) {
                    if (!this.isNumber(this.employee.PhoneNumber)) {
                        this.validate.PhoneNumber = true;
                        this.errors.PhoneNumber = ERRORS.PHONENUMBER;
                        isValidate = false;
                    }
                }

                if (this.employee.TelephoneNumber) {
                    if (!this.isNumber(this.employee.TelephoneNumber)) {
                        this.validate.TelephoneNumber = true;
                        this.errors.TelephoneNumber = ERRORS.TELEPHONENUMBER;
                        isValidate = false;
                    }
                }
                if (this.employee.Email) {
                    if (!this.isEmail(this.employee.Email)) {
                        this.validate.Email = true;
                        this.errors.Email = ERRORS.EMAIL;
                        isValidate = false;
                    }
                }
                if (this.employee.BankNumber) {
                    if (!this.isNumber(this.employee.BankNumber)) {
                        this.validate.BankNumber = true;
                        this.errors.BankNumber = ERRORS.BANKNUMBER;
                        isValidate = false;
                    }
                }
                if (isValidate == false) {
                    this.tabForcus = true;
                    return false;
                } else {
                    return true;
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Validate Đơn vị
         * Author: NHAnh(06/11/2022)
         */
        validateDP() {
            try {
                this.validate.DepartmentId = false;
                this.errors.DepartmentId = "";
                if (!this.employee.DepartmentID) {
                    this.validate.DepartmentId = true;
                    this.errors.DepartmentId = ERRORS.DEPARTMENTID;
                } else {
                    this.validate.DepartmentID = false;
                    this.errors.DepartmentID = "";
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Validate Email
         * Author: NHAnh(06/11/2022)
         */
        ValidateEmail() {
            try {
                this.validate.Email = false;
                this.errors.Email = "";
                if (this.employee.Email) {
                    if (!this.isEmail(this.employee.Email)) {
                        this.validate.Email = true;
                        this.errors.Email = ERRORS.EMAIL;
                    } else {
                        this.validate.Email = false;
                        this.errors.Email = "";
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Validate số ( 1: Số CMND, 2: Đt di động, 3: ĐT cố định, 4: tài khoản ngân hàng)
         * author: NHAnh(06/11/2022)
         */
        validateNumber(value) {
            try {
                if (value == 1) {
                    this.validate.IdentityNumber = false;
                    this.errors.IdentityNumber = "";
                    if (this.employee.IdentityNumber) {
                        if (!this.isNumber(this.employee.IdentityNumber)) {
                            this.validate.IdentityNumber = true;
                            this.errors.IdentityNumber = ERRORS.IDENTITYNUMBER;
                        }
                    } else {
                        this.validate.IdentityNumber = false;
                        this.errors.IdentityNumber = "";
                    }
                } else if (value == 2) {
                    this.validate.PhoneNumber = false;
                    this.errors.PhoneNumber = "";
                    if (this.employee.PhoneNumber) {
                        if (!this.isNumber(this.employee.PhoneNumber)) {
                            this.validate.PhoneNumber = true;
                            this.errors.PhoneNumber = ERRORS.PHONENUMBER;
                        }
                    } else {
                        this.validate.PhoneNumber = false;
                        this.errors.PhoneNumber = "";
                    }
                } else if (value == 3) {
                    this.validate.TelephoneNumber = false;
                    this.errors.TelephoneNumber = "";
                    if (this.employee.TelephoneNumber) {
                        if (!this.isNumber(this.employee.TelephoneNumber)) {
                            this.validate.TelephoneNumber = true;
                            this.errors.TelephoneNumber =
                                ERRORS.TELEPHONENUMBER;
                        }
                    } else {
                        this.validate.TelephoneNumber = false;
                        this.errors.TelephoneNumber = "";
                    }
                } else if (value == 4) {
                    this.validate.BankNumber = false;
                    this.errors.BankNumber = "";
                    if (this.employee.BankNumber) {
                        if (!this.isNumber(this.employee.BankNumber)) {
                            this.validate.BankNumber = true;
                            this.errors.BankNumber = ERRORS.BANKNUMBER;
                        }
                    } else {
                        this.validate.BankNumber = false;
                        this.errors.BankNumber = "";
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Valudate các ô ngày (1: Ngày sinh, 2: Ngày cấp)
         * author: NHAnh(06/11/2022)
         */
        validateDate(value) {
            try {
                if (value == 1) {
                    this.validate.DateOfBirth = false;
                    this.errors.DateOfBirth = "";
                    if (this.validateTime(this.employee.DateofBirth)) {
                        this.validate.DateOfBirth = true;
                        this.errors.DateOfBirth = ERRORS.DATEOFBIRTH;
                    } else {
                        this.validate.DateOfBirth = false;
                        this.errors.DateOfBirth = "";
                    }
                } else if (value == 2) {
                    this.validate.IdentityDate = false;
                    this.errors.IdentityDate = "";
                    if (this.employee.IdentityDate) {
                        if (this.validateTime(this.employee.IdentityDate)) {
                            this.validate.IdentityDate = true;
                            this.errors.IdentityDate = ERRORS.INDENTITYDATE;
                        } else {
                            this.validate.IdentityDate = false;
                            this.errors.IdentityDate = "";
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * validate ô Mã
         * author: NHAnh(06/11/2022)
         */
        validateFormCode() {
            try {
                this.tabForcus = false;
                this.validate.code = false;
                this.errors.code = "";
                if (!this.employee.EmployeeCode) {
                    this.validate.code = true;
                    this.errors.code = ERRORS.EMPLOYEECODE;
                    return false;
                } else {
                    this.validate.code = false;
                    this.errors.code = "";
                    return true;
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * validate ô tên
         * author: NHAnh(06/11/2022)
         */
        validateFormName() {
            try {
                this.validate.name = false;
                this.errors.name = "";
                if (!this.employee.EmployeeName) {
                    this.validate.name = true;
                    this.errors.name = ERRORS.EMPLOYEENAME;
                    return false;
                } else {
                    this.validate.name = false;
                    this.errors.name = "";
                    return true;
                }
            } catch (err) {
                console.log(err);
            }
        },
        /**
         * Validate số,
         * author: NHAnh (30/10/2022)
         */
        isNumber(value) {
            try {
                return /^-?\d+$/.test(value);
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Validate emmail
         * author: NHAnh (30/10/2022)
         */
        isEmail(email) {
            try {
                let regex =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regex.test(email);
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Validate date
         * author: NHAnh (30/10/2022)
         */
        validateTime(dateTime) {
            try {
                let today = new Date();
                let dataInputDate = new Date(dateTime);
                if (dataInputDate > today) {
                    return true;
                }
                return false;
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Get List Department
         * author: NHAnh (29/10/2022)
         */
        async getDepartmentList() {
            try {
                await axios
                    .get(`${DEPARTMENT_URL}`)
                    .then(res => (this.listDepartment = res.data))
                    .catch(error => {
                        console.log(error);
                    });
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Nhận ID đơn vị từ dropdown trong popup
         * Author: NHAnh(06/11/2022)
         */
        dpId(data) {
            try {
                this.employee.DepartmentID = data.id;
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Thêm mới nhân viên, sửa nhân viên (0: Cât, 1: Cất và thêm)
         * author: NHAnh (31/10.2022)
         */
        async addEmployee(value) {
            try {
                this.validateForm();
                if (this.validateForm()) {
                    if (this.edit) {
                        try {
                            this.coDialogUpdate();
                        } catch (error) {
                            console.log(error);
                        }
                    } else {
                        const res = await axios
                            .post(`${BASE_URL}`, this.employee)
                            .then(res => {
                                this.employee = {};
                                if (value == SAVE.SAVE_AND_ADD) {
                                    this.getNewEmployeeCode();
                                } else {
                                    this.$emit("onClose");
                                }
                                this.reloadList();

                                this.$emit("openToastAdd", true);
                            })
                            .catch(error => {
                                console.log(error.response);
                                this.errorText = error.response.data.UserMsg;
                                this.isWarningStatus = true;
                                this.errorCode = false;
                                this.isWarningDialog();
                            });
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Sửa nhân viên
         * author: NHAnh(05/11/2022)
         */
        isEditEmployee() {
            try {
                var me = this;
                axios
                    .put(
                        `${BASE_URL}/${this.employee.EmployeeId}`,
                        this.employee
                    )
                    .then(res => {
                        me.$emit("onClose");
                        me.$emit("openToastEdit", true);
                        me.$emit("reloadData");
                    })
                    .catch(e => {
                        this.errorText = e.response.data.UserMsg;
                        me.isWarningDialog();
                    });
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Lấy mã nhân viên mới
         * author: NHAnh(05/11/2022)
         */
        getNewEmployeeCode() {
            try {
                axios
                    .get(`${BASE_URL}/newEmployeeCode`)
                    .then(res => (this.employee.EmployeeCode = res.data))
                    .catch(e => console.log(e));
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Hiện dialog warning
         * author: NHAnh (31/10/2022)
         */
        isWarningDialog() {
            try {
                this.isWarning = !this.isWarning;
                this.tabForcus = true;
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Đóng Popup. Nếu value = 1 tiền hành mở dialog edit, còn lại là đóng popup
         * author: NHAnh (31/10/2022)
         */
        closePopup(value) {
            try {
                if (value == 1) {
                    this.dialogEdit = !this.dialogEdit;
                } else {
                    this.$emit("onClose");
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Tabindex ô input cuối về ô input mã
         * Author: NHANH(31/10/2022)
         */
        tabOrder() {
            try {
                this.tabForcus = true;
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>
<style>
.m-popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
}
.m-popup__content {
    /* min-width: 900px; */
    width: 900px;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    z-index: 1;
}
/* Header */
.m-popup__header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
}
.m-popup__title {
    width: 100%;
    padding: 20px 32px;
    padding-right: 12px;
    position: relative;
    overflow: hidden;
    border-radius: 5px 5px 0 0;
}
.m-popup__title-header {
    display: flex;
}
.m-popup__title-header label {
    display: flex;
    align-items: center;
    justify-content: start;
    padding: 0 1rem;
}
.m-popup__title-header label span {
    padding-left: 10px;
}
.m-popup__title-text {
    font-size: 24px;
    color: #111;
    font-weight: 700;
}
.popup-checkbox {
    width: 18px;
    height: 18px;
    justify-content: start;
    cursor: pointer;
}
.m-popup__close {
    display: flex;
    padding: 12px;
}
/* End Header */

/* Popup content */
.m-popup__content-main {
    overflow: auto;
    padding: 0 32px 12px;
}
.m-popup__content-main label {
    font-size: 13px !important;
    line-height: normal !important;
}
.content__employee-form {
    display: flex;
}
.employee-form__left {
    padding-right: 26px;
    width: calc(50% - 26px);
}
.employee-form__right {
    width: 50%;
}
.color-red {
    color: red;
}
.form-popup {
    display: flex;
    padding-bottom: 24px;
}
.form-group {
    display: flex;
    flex-direction: column;
    position: relative;
}
.form-group label {
    padding-bottom: 8px;
    font-weight: 600;
}
.form-group .error_text {
    position: absolute;
    top: calc(100% + 6px);
    color: red;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
}
.ma-nhan-vien,
.date-of-birth {
    width: 40%;
    padding-right: 10px;
}
.date-of-birth {
    padding-right: 12px;
}
.employee-name,
.gender {
    width: 60%;
}
.department,
.job-position,
.iti-adress,
.address {
    width: 100%;
}
.department .combobox input {
    border-width: 1px;
    border-radius: 4px;
    border-color: #e6e6e6;
    border-style: solid;
}
.department .combobox .combobox__data {
    bottom: unset;
    top: calc(100% + 1px);
    z-index: 1;
}
.input-gender {
    padding-right: 16px;
    width: 20px;
    height: 20px;
    accent-color: #50b83c;
}
.lable-gender {
    padding-right: 16px;
    padding-left: 8px;
    font-weight: 400 !important;
}
.identity-number {
    width: 60%;
    padding-right: 10px;
}
.identity-date {
    width: 40%;
}
.content-employee__contact {
    width: 100%;
    border-bottom: 1px solid #e6e6e6;
}
.telephone-number {
    width: calc(25% - 10px);
    padding-right: 10px;
}
/* End content */

/* Footer container */
.m-popup__footer {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
}
.m-popup__footer-left {
    display: flex;
}
/* End Footer */

/* overlay */
.overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    cursor: auto;
}
</style>

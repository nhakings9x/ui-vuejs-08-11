<template>
    <div class="form-group">
        <label for=""
            >{{ labelForm }}
            <span class="color-red" v-if="required">*</span></label
        >
        <ms-input
            inputInfo
            :inputError="validateForm || isValidate"
            @dataInput="inputValue"
            :name="formControlName"
            :valueInput="valueInput"
            @blur="blur"
            :autofocus="autofocus"
            :tabindex="tabindex"
        ></ms-input>

        <label for="" class="error_text" v-if="validateForm || isValidate">{{
            errorText || errorMsg
        }}</label>
    </div>
</template>
<script>
import MsInput from "../input/MsInput.vue";
export default {
    components: { MsInput },
    data() {
        return {
            isValidate: false,
            errorMsg: "",
        };
    },
    props: {
        // Lable của form
        labelForm: {
            type: String,
            default: "Lable",
        },
        // Có bắt buộc hay không
        required: {
            type: Boolean,
            default: false,
        },
        // Có validate không
        validateForm: {
            type: Boolean,
        },
        // Hiển thị text lỗi
        errorText: {
            type: String,
            default: "Ô này không được để trống",
        },
        // Tên form control
        formControlName: {
            type: String,
        },
        // Giá trị ô input
        valueInput: {
            type: String,
        },
        // Focus ô đầu tiên
        autofocus: {
            type: Boolean,
            default: false,
        },
        // Tabindex
        tabindex: {
            type: Number,
        },
    },
    watch: {
        valueInput: {
            deep: true,
            handler(newVal, oldVal) {},
        },
    },

    methods: {
        /**
         * Tắt error khi validate
         * @param {*} data
         * author : NHAnh (06/11/2022)
         */

        inputValue(data) {
            if (data) {
                this.isValidate = false;
                this.errorMsg = ``;
            }
            this.$emit("dataInput", data);
        },
        /**
         * Validate 2 form bắt buộc nhập là Mã và Tên NV
         * @param {*} data
         * author: NHAnh (06/11/2022)
         */
        blur(data) {
            this.$emit("blur");
        },
        /**
         * Kiểm tra có phải là số không
         * Author: NHAnh(02/11/2022)
         */
        isNumber(value) {
            return /^-?\d+$/.test(value);
        },
    },
};
</script>
<style>
.form-group {
    display: flex;
    flex-direction: column;
    position: relative;
}
.form-group label {
    padding-bottom: 8px;
    font-weight: 700;
}
.form-group .error_text {
    position: absolute;
    top: calc(100% + 4px) !important;
    color: red;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 400;
}
</style>

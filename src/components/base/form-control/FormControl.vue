<template>
    <div class="form-group">
        <label for="" :title="titleLable"
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
            :tabForcus="tabForcus"
        ></ms-input>

        <label
            for=""
            class="error_text"
            v-if="validateForm || isValidate"
            :title="errorText || errorMsg"
            >{{ errorText || errorMsg }}</label
        >
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
        // title của lable
        titleLable: {
            type: String,
        },
        tabForcus: {
            type: Boolean,
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
            try {
                if (data) {
                    this.isValidate = false;
                    this.errorMsg = ``;
                }
                this.$emit("dataInput", data);
            } catch (err) {
                console.log(err);
            }
        },
        /**
         * Validate 2 form bắt buộc nhập là Mã và Tên NV
         * @param {*} data
         * author: NHAnh (06/11/2022)
         */
        blur(data) {
            try {
                this.$emit("blur");
            } catch (err) {
                console.log(err);
            }
        },
        /**
         * Kiểm tra có phải là số không
         * Author: NHAnh(02/11/2022)
         */
        isNumber(value) {
            try {
                return /^-?\d+$/.test(value);
            } catch (err) {
                console.log(err);
            }
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
    font-weight: 600;
}
.form-group .error_text {
    font-size: 12px;
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

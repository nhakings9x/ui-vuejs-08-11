<template>
    <input
        ref="input"
        type="text"
        :class="[
            'm-input',
            inputError ? 'm-input__error' : '',
            inputInfo ? 'm-error-info' : '',
        ]"
        :placeholder="placeholder"
        @change="returnValueInput"
        name="name"
        :value="valueInput || ''"
        @blur="onBlur"
        :autofocus="autofocus"
    />
</template>
<script>
export default {
    props: {
        // có phải input bị sai không
        inputError: {
            type: Boolean,
            default: false,
        },
        // Placeholder
        placeholder: {
            type: String,
            default: "",
        },
        name: {
            type: String,
        },
        // có phải input info trong form comtrol không
        inputInfo: {
            type: Boolean,
            default: false,
        },
        // Giá trị ô input
        valueInput: {
            type: String,
            default: "",
        },
        // Focus ô đầu tiên
        autofocus: {
            type: Boolean,
            default: false,
        },
        //focus ô input
        tabForcus: {
            type: Boolean,
        },
    },

    watch: {
        // focus ô input
        tabForcus(value) {
            if (value == true) {
                this.$refs.input.focus();
            }
        },
    },

    mounted() {
        // forcus ô input đầu tiên có autofocus
        if (this.autofocus) {
            this.$refs.input.focus();
        }
    },
    methods: {
        // Truyền dữ liệu lên cpn cha
        // NHAnh(06/11/2022)
        returnValueInput(e) {
            try {
                this.$emit("dataInput", {
                    value: e.target.value,
                    target: this.name,
                });
            } catch (err) {
                console.log(err);
            }
        },
        /**
         * Sự kiện onblur ô input để validate
         * @param {} e
         */
        onBlur(e) {
            try {
                this.$emit("blur", this.valueInput);
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>
<style>
.m-label {
    display: flex;
    flex-direction: column;
    margin: 24px;
    font-weight: 500;
    font-size: 14px;
}

.m-input {
    width: 100%;
    height: 36px;
    color: #000;
    border-width: 1px;
    border-radius: 4px;
    border-color: #e6e6e6;
    border-style: solid;
    outline: unset;
    padding: 0 16px;
    box-sizing: border-box;
    position: relative;
}

.m-input::placeholder {
    color: #999999;
    font-size: 14px;
}

.m-input:hover {
    cursor: pointer;
    background-color: #e6e6e6;
}

.m-input:focus {
    border: 1px solid #50b83c;
    outline: none;
}

.m-input-icon {
    background-repeat: no-repeat;
    background-position: right 6px center;
    padding-right: 32px;
    padding-left: 16px;
}
.m-input__error {
    border: 1px solid red;
}
.m-input__error:focus {
    border: 1px solid red;
}
.m-input__error:hover {
    border: 1px solid red;
}

.m-error-info {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0 16px;
    box-sizing: border-box;
    align-items: center;
}

.m-error-info .m-error-text {
    position: relative;
    border-radius: 4px;
    text-align: center;
    background-color: #ff4747;
    padding: 8px;
    color: #fff;
    box-sizing: border-box;
}

.m-error-info .m-error-arrow {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 100%;
    left: 50%;
    border-right: 6px solid transparent;
    border-top: 6px solid #ff4747;
    border-left: 6px solid transparent;
    width: 0;
    height: 0;
    transform: translate(-50%, 0);
    /* background-color: black; */
}
</style>

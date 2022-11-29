<template>
    <div
        id="dropdown__don-vi"
        class="dropdown"
        @click="dataShow = !dataShow"
        v-click-away="onClickAway"
    >
        <input
            ref="dropdown"
            type="text"
            :class="[
                'm-input dropdown__input',
                validate ? 'm-input__error' : '',
            ]"
            readonly
            :value="inputValue || defaultValue"
            @input="changeInput"
            @blur="blur"
            :tabindex="tabindex"
            @keydown="onKeyDown"
        />
        <div
            :class="[
                'dropdown__btn icon-down-dd',
                dataShow ? 'trasform-icon' : '',
            ]"
        ></div>
        <div
            :class="['dropdown__data', downData ? 'down-data' : '']"
            v-show="dataShow"
        >
            <ul class="z-index-5">
                <li
                    v-for="dropdownItem in listDropdownItem"
                    :key="dropdownItem.title"
                    :class="[
                        'data-item',
                        inputValue == dropdownItem.title ||
                        inputValue == dropdownItem.DepartmentName
                            ? 'item-active'
                            : '',
                    ]"
                    :data-idDpm="dropdownItem.DepartmentID"
                    @click="
                        handleClickDD(
                            $event,
                            dropdownItem.title || dropdownItem.DepartmentName
                        )
                    "
                    @keydown="onKeyDown"
                >
                    {{ dropdownItem.title || dropdownItem.DepartmentName }}
                </li>
            </ul>
        </div>
        <br />
    </div>
</template>
<script>
export default {
    data() {
        return {
            inputValue: 20,
            dropdownId: "",
            modelInput: "",
            dataShow: false,
            isActive: false,
            deparId: {
                id: "",
                inputValue: "",
            },
        };
    },
    props: {
        // Lấy list dropdown từ cpn cha để hiện ra danh sách
        listDropdownItem: {
            default: [],
        },
        downData: {
            type: Boolean,
            default: false,
        },
        // Giá trị mặc định của ô input
        defaultValue: {
            type: [Number, String],
        },
        // Lấy Tên của ô đơn vị từ ID
        dpName: {
            type: String,
        },
        // Có phải là dropdown trong Popup edit không?
        edit: {
            type: Boolean,
        },
        // Có đang ở trạng thái validate không
        validate: {
            type: Boolean,
        },
        // Tabindex ô input
        tabindex: {
            type: Number,
        },
        value: {},
    },
    created() {
        // tạo sự kiện phím tắt;
        window.addEventListener("keydown", this.listenerKeydown);
    },
    beforeUnmount() {
        // Hủy sự kiện phím tắt
        window.removeEventListener("keyup", this.listenerKeyup);
    },
    watch: {
        /**
         * Gán giá trị khi khởi tạo dropdown
         * author: NHAnh (06/11/2022)
         */
        dpName() {
            try {
                if (!this.dpName) {
                    this.inputValue = this.defaultValue;
                }
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * gán giá trị dropdown khi khởi tạo
         * author: NHAnh (06/11/2022)
         */
        listDropdownItem(value) {
            try {
                if (value) {
                    if (this.dpName) {
                        var depar = this.listDropdownItem.find(
                            dp => dp.DepartmentID == this.dpName
                        ).DepartmentName;
                        this.inputValue = depar;
                    } else if (!this.edit) {
                        this.inputValue = this.defaultValue;
                    } else {
                        this.inputValue = 20;
                    }
                }
            } catch (err) {
                console.log(err);
            }
        },
    },
    methods: {
        /**
         * Kiểm tra có focus không
         * author: NHAnh(23/11/2022)
         */
        onKeyDown(e) {
            if (e.key == "Enter") {
                if (this.$refs.dropdown) {
                    this.$refs.dropdown.focus();
                }
                this.dataShow = !this.dataShow;
            }
        },

        /**
         * Bắt sự kiện khi key down
         * author: NHAnh(23/11/2022)
         */
        listenerKeydown(e) {
            if (this.dataShow) {
                if (this.$refs.dropdown) {
                    this.$refs.dropdown.focus();
                }
                var indexItemSelected = this.listDropdownItem.findIndex(
                    x => x.DepartmentID == this.deparId.id
                );
                if (e.key == "ArrowDown") {
                    indexItemSelected++;
                    indexItemSelected =
                        indexItemSelected < this.listDropdownItem.length
                            ? indexItemSelected
                            : 0;
                    this.inputValue =
                        this.listDropdownItem[indexItemSelected].DepartmentName;
                    this.deparId.id =
                        this.listDropdownItem[indexItemSelected].DepartmentID;
                    this.$emit("dropdown-value", this.deparId);
                } else if (e.key == "ArrowUp") {
                    indexItemSelected--;
                    indexItemSelected =
                        indexItemSelected >= 0
                            ? indexItemSelected
                            : this.listDropdownItem.length - 1;
                    this.inputValue =
                        this.listDropdownItem[indexItemSelected].DepartmentName;
                    this.deparId.id =
                        this.listDropdownItem[indexItemSelected].DepartmentID;
                    this.$emit("dropdown-value", this.deparId);
                }
            }
        },

        /**
         * click lấy giá trị item gán vào ô input
         * author: NHAnh(06/11/2022)
         */
        handleClickDD(event, value) {
            try {
                this.inputValue = value;
                console.log(event);
                this.deparId.id = event.target.dataset.iddpm;
                this.deparId.inputValue = this.inputValue;
                this.$emit("dropdown-value", this.deparId);
                this.$emit("pagging_value", this.inputValue);
                this.$emit("validateDD");
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * click ra ngoài đóng dropdown
         * author: NHAnh (02/11/2022)
         */
        onClickAway(event) {
            try {
                this.dataShow = false;
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Sự kiện blur dropdown
         */
        blur(event) {
            try {
                this.$emit("blur");
                this.$emit("validateDD");
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>
<style>
.dropdown {
    height: 36px;
    border-radius: 4px;
    outline: none;
    display: flex;
    position: relative;
    align-items: center;
}
.dropdown__input {
    flex: 1;
    height: 36px;
    border: unset;
    width: 72px;
}
.dropdown__input::placeholder {
    color: black;
}
.dropdown__input:focus {
    border: 1px solid #50b83c;
}
ul {
    padding-left: 0;
}

.dropdown__btn {
    width: 36px;
    height: 36px;
    font-size: 20px;
    border-radius: 4px;
    outline: unset;
    border: none;
    position: absolute;
    right: 16px;
    background-color: unset;
    cursor: pointer;
    background-image: url(../../../assets/img/Sprites.64af8f61.svg);
    background-position: -1129px -365px;
    width: 14px;
    height: 8px;
}

.dropdown__data {
    position: absolute;
    background-color: #fff;
    bottom: calc(100% + 1px);
    border-radius: 4px;
    max-height: 200px;
    padding: 8px;
    width: 100%;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.data-item {
    height: 36px;
    display: flex;
    align-items: center;
    border-radius: 4px;
    padding: 0 12px;
}
.data-item:hover {
    background-color: rgb(185, 226, 177);
    cursor: pointer;
}
.item-active {
    background-color: rgb(185, 226, 177);
}
.trasform-icon {
    transform: rotate(180deg);
}
.border {
    border: #50b83c 1px solid !important;
    border-radius: 4px !important;
}
.down-data {
    max-height: 160px;
    overflow: auto;
    bottom: unset;
    top: calc(100% + 1px);
    z-index: 10;
}
</style>

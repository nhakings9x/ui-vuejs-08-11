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
        // L???y list dropdown t??? cpn cha ????? hi???n ra danh s??ch
        listDropdownItem: {
            default: [],
        },
        downData: {
            type: Boolean,
            default: false,
        },
        // Gi?? tr??? m???c ?????nh c???a ?? input
        defaultValue: {
            type: [Number, String],
        },
        // L???y T??n c???a ?? ????n v??? t??? ID
        dpName: {
            type: String,
        },
        // C?? ph???i l?? dropdown trong Popup edit kh??ng?
        edit: {
            type: Boolean,
        },
        // C?? ??ang ??? tr???ng th??i validate kh??ng
        validate: {
            type: Boolean,
        },
        // Tabindex ?? input
        tabindex: {
            type: Number,
        },
        value: {},
        tabForcus: {
            type: Boolean,
        },
    },
    created() {
        // t???o s??? ki???n ph??m t???t;
        window.addEventListener("keydown", this.listenerKeydown);
    },
    beforeUnmount() {
        // H???y s??? ki???n ph??m t???t
        window.removeEventListener("keyup", this.listenerKeyup);
    },
    watch: {
        /**
         * G??n gi?? tr??? khi kh???i t???o dropdown
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
         * g??n gi?? tr??? dropdown khi kh???i t???o
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

        // focus ?? input
        tabForcus(value) {
            if (value == true) {
                this.$refs.dropdown.focus();
            }
        },
    },
    methods: {
        /**
         * Ki???m tra c?? focus kh??ng
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
         * B???t s??? ki???n khi key down
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
         * click l???y gi?? tr??? item g??n v??o ?? input
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
         * click ra ngo??i ????ng dropdown
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
         * S??? ki???n blur dropdown
         * author: NHAnh (02/11/2022)
         */
        blur(event) {
            try {
                this.$emit("blur");
                this.$emit("validateDD");
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * focus ?? dropdown
         * author: NHAnh 14/12/2022
         */
        focusInput() {
            this.$refs.dropdown.focus();
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

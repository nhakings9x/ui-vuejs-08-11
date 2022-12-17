<template>
    <div class="m-main__pagging">
        <label for="" class="m-pagging__left"
            >{{ employeeRouter.PAGGING.TOTAL_RECORDS }}:
            <b>{{ totalRecord }}</b></label
        >

        <div class="m-pagging__right">
            <label class="mr-8" for="">{{
                employeeRouter.PAGGING.PAGE_NUMBER_DATA
            }}</label>
            <div id="combobox__pagging" class="combobox mr-16">
                <div class="pagging-list">
                    <ms-dropdown
                        :listDropdownItem="listPagging"
                        :defaultValue="20"
                        @pagging_value="paggingNumber"
                    ></ms-dropdown>
                </div>
            </div>

            <label for="" class="pagging__label mr-16"
                ><b> {{ updatePage }}</b>
                {{ employeeRouter.PAGGING.TOTAL_PAGE }}</label
            >

            <button class="icon-left mr-16" @click="downPage()"></button>
            <button class="icon-right" @click="nextPage()"></button>
        </div>
    </div>
</template>
<script>
import MsDropdown from "../../../base/dropdown/MsDropdown.vue";
import { LIST_PAGGING } from "../../../../constans/resource";
import { EMPLOYEE_ROUTER } from "../../../../constans/layoutResource";

export default {
    components: { MsDropdown },
    props: {
        // Tổng bản ghi
        totalRecord: {
            type: Number,
        },
        // Tổng số trang
        totalPage: {
            type: Number,
        },
        // trang hiện tại
        pageNumberData: {
            type: Number,
        },
    },

    data() {
        return {
            listPagging: LIST_PAGGING,
            pageNumber: 1,
            numberItem: 20,
            fisrtData: 0,
            lastData: 0,
            employeeRouter: EMPLOYEE_ROUTER,
        };
    },
    computed: {
        /**
         * Hiện bản ghi số bắt đầu đến số kết thúc
         * Author: NHAnh(06/11/2022)
         */
        updatePage() {
            return `${this.numberItem * (this.pageNumberData - 1) + 1} - ${
                this.numberItem * this.pageNumberData > this.totalRecord
                    ? this.totalRecord
                    : this.numberItem * this.pageNumberData
            }`;
        },
    },
    emits: ["pageNumber:pageNumber", "numberItem:numberItem"],
    methods: {
        /**
         * Tiến 1 trang
         * author: NHAnh (26/10/2022)
         */
        nextPage() {
            try {
                this.pageNumber = this.pageNumberData;
                if (this.pageNumber < this.totalPage) {
                    this.pageNumber++;
                }
                this.$emit("nextPage", this.pageNumber);
            } catch (err) {
                console.log(err);
            }
        },
        /**
         * lùi 1 trang
         * author: NHAnh (26/10/2022)
         */
        downPage() {
            try {
                this.pageNumber = this.pageNumberData;

                if (this.pageNumber > 1) {
                    this.pageNumber--;
                }
                this.$emit("downPage", this.pageNumber);
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * lấy dữ liệu dropdown
         * author: NHA (29/10/2022)
         */
        paggingNumber(data) {
            try {
                this.numberItem = data;
                this.$emit("number-item", this.numberItem);
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>
<style>
.m-main__pagging {
    position: absolute;
    height: 48px;
    width: calc(100% - 32px);
    bottom: 0;
    margin-left: 16px;
    margin-right: 16px;
    border-top: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.m-pagging__left {
    padding-left: 16px;
}

.m-pagging__right {
    display: flex;
    align-items: center;
    padding-right: 16px;
}
.pagging-number {
    display: flex;
    align-items: center;
}
.number-page-none {
    border: none;
    background-color: #fff;
    min-width: 24px;

    cursor: pointer;
}

.pagging__label {
    width: auto;
}
.pagging-list {
    width: 80px;
}
</style>

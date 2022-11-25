<template>
    <div class="m-main">
        <header-content
            :reloadList="getListPageOne"
            @openToastAdd="openToastAdd"
        ></header-content>
        <main-content
            :listEmployee="listEmployee"
            :reloadList="getListPageOne"
            :hadData="hadData"
            :errorTextApi="errorTextApi"
            @searchValue="searchValue"
            @reloadData="getListPageOne"
            @openToastAdd="closeOpenToast"
        ></main-content>
        <pagging-content
            :totalRecord="totalRecord"
            :totalPage="totalPage"
            :pageNumberData="pageNumberData"
            @number-item="funNumberItem"
            @nextPage="funNextPage"
            @downPage="funDownPage"
        ></pagging-content>
        <ms-loading v-if="isLoading"></ms-loading>
        <ms-toast
            v-if="toastStatus"
            toastAct="thêm mới"
            @closeOpenToast="closeOpenToast"
        ></ms-toast>
    </div>
</template>
<script>
import axios from "axios";
import HeaderContent from "../contents/HeaderContent.vue";
import MainContent from "../contents/MainContent.vue";
import PaggingContent from "../contents/PaggingContent.vue";
import { BASE_URL } from "../../constans/constans";
import MsLoading from "../base/loading/MsLoading.vue";
import MsToast from "../base/toast/MsToast.vue";

export default {
    components: {
        HeaderContent,
        PaggingContent,
        MainContent,
        MsLoading,
        MsToast,
    },
    data() {
        return {
            listEmployee: [],
            totalRecord: 0,
            totalPage: 0,
            isLoading: false,
            pageNumberData: 1,
            numberItemData: 10,
            search: "",
            toastStatus: false,
            hadData: false,
            errorTextApi: "",
        };
    },
    watch: {
        /**
         * Lấy lại danh sách khi thay đổi trang
         * Author: NHAnh(06/11/2022)
         */
        pageNumberData() {
            this.getList();
        },

        /**
         * Lấy lại danh sách khi thay số bản ghi trên trang
         * Author: NHAnh(06/11/2022)
         */
        numberItemData() {
            this.getListPageOne();
        },

        /**
         * Lấy lại danh sách khi thay giá trị search
         * Author: NHAnh(06/11/2022)
         */
        search() {
            this.getListPageOne();
        },
    },
    updated() {},
    created() {
        // Thực hiện lấy dữ liệu bắt đầu trang
        this.getList();

        // this.eventBus.emit("getList", this.getList());
    },
    methods: {
        /**
         * Lấy list data
         * author: NHAnh(26/10/2022)
         */
        async getList() {
            debugger;
            // Bật loading
            this.isLoading = true;
            this.hadData = false;
            this.errorTextApi = "";
            try {
                const res = await axios.get(
                    `${BASE_URL}/filter?${this.search}&limit=${this.numberItemData}&offset=${this.pageNumberData}`
                );
                if (res) {
                    // Lấy số bản ghi
                    this.totalRecord = res.data.TotalCount;

                    if (this.totalRecord == 0) {
                        this.hadData = true;
                        this.errorTextApi = "Không có dữ liệu !!!";
                    }
                    console.log(res.data.Data);
                    // Gán dữ liệu vào list
                    this.listEmployee = res.data.Data;
                    // Thêm trường checked cho từng ô dữ liệu

                    this.listEmployee.map(e => (e.isChecked = false));
                    // Thêm giá trị đóng mở thanh chức năng

                    this.listEmployee.map(e => (e.closeOpenDelete = false));

                    // Lấy số trang
                    this.totalPage = res.data.TotalPage;
                    // Tắt Loading

                    this.isLoading = false;
                } else {
                    setTimeout(() => {
                        // Tắt Loading
                        this.isLoading = false;
                    }, 2000);
                }
            } catch (error) {
                this.isLoading = false;
                console.log(error);
                this.hadData = true;
                this.errorTextApi = "Không tìm thấy dữ liệu !!!";
            }
        },

        /**
         * lấy listdata trang đầu tiên
         * author: NHAnh (31/10/2022)
         */
        getListPageOne() {
            try {
                this.pageNumberData = 1;
                this.getList();
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Lấy số trang và số dữ liệu trên 1 trang từ cpn Pagging
         * author: NHAnh(26/10/2022)
         */
        funNumberItem(data) {
            try {
                this.pageNumberData = 1;
                this.numberItemData = data;
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * search value
         * author: NHAnh(30/10/2022)
         */
        searchValue(data) {
            try {
                if (data) {
                    this.search = `&keyword=${data}`;
                } else {
                    this.search = "";
                }
            } catch (err) {
                console.log(err);
            }
        },
        /**
         * Tiến lùi số trang
         * author: NHAnh(26/10/2022)
         */
        funNextPage(data) {
            try {
                this.pageNumberData = data;
            } catch (err) {
                console.log(err);
            }
        },
        funDownPage(data) {
            try {
                this.pageNumberData = data;
            } catch (err) {
                console.log(err);
            }
        },

        /**
         * Mở toast thêm
         * author: NHAnh(26/10/2022)
         */
        openToastAdd(data) {
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
         * Đóng toast thêm
         * author: NHAnh(26/10/2022)
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
.m-main {
    width: calc(100% - var(--width-sidebar) - 36px);
    height: calc(100vh - 56px - 36px);
    background-color: #fff;
    float: left;
    overflow: hidden;
    margin: 24px 12px 12px 24px;
    position: relative;
}

.tooltip-relative {
    position: relative;
}
.tooltip-relative:hover .tooltip {
    display: block;
}
.m-main__header label {
    font-size: 24px;
    font-weight: 700;
    line-height: 36px;
}
.m-main__table {
    width: calc(100% -32px);
    height: calc(100% - 105px);
    background-color: #fff;
    padding-left: 16px;
    padding-right: 16px;
}
.m-input-icon {
    background-repeat: no-repeat;
    background-position: right 6px center;
    padding-right: 32px;
    padding-left: 16px;
}
.m-main__table-header {
    width: 100%;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: -16px;
}
.m-main__table-header input {
    margin-right: 16px;
}
.m-main__table-body {
    /* padding-right: 8px; */
    max-height: calc(100% - 60px);
    overflow: auto;
}
.m-main__table-body::-webkit-scrollbar {
    width: 10px;
    background: #000;
    height: 10px;
}
.m-main__table-body::-webkit-scrollbar {
    width: 10px;
    border-radius: 4px;
}

/* Track */
.m-main__table-body::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
}

/* Handle */
.m-main__table-body::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
}

/* Handle on hover */
.m-main__table-body::-webkit-scrollbar-thumb:hover {
    background: #555;
    border-radius: 4px;
}

/* End update table */

/* End Main */
</style>

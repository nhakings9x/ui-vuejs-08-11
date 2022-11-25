<template>
    <div class="m-notification">
        <div class="m-noti-box">
            <div class="box-content">
                <div class="content">
                    <div class="title-noti">
                        Xóa{{ isDeleteBatch ? ` ${listClicked.length}` : "" }}
                        người dùng
                    </div>
                    <div class="icon-close" @click="oClDialogDelete"></div>
                </div>
                <div class="message-content">
                    Bạn có chắc muốn xóa người dùng đã chọn không?
                </div>
                <div class="content-footer">
                    <div class="mr-8">
                        <ms-button
                            btnText="Không"
                            btnExtra
                            @click="oClDialogDelete"
                        ></ms-button>
                    </div>
                    <div class="content-footer-left">
                        <ms-button
                            class="btnToastDelete"
                            btnText="Có, xóa người dùng"
                            @click="handleDelete(employeeID)"
                        ></ms-button>
                    </div>
                </div>
            </div>
        </div>
        <ms-loading v-show="isLoading"></ms-loading>
        <div class="overlay" @click="oClDialogDelete"></div>
    </div>
</template>
<script>
import axios from "axios";
import MsButton from "../button/MsButton.vue";
import { BASE_URL } from "../../../constans/constans";

export default {
    components: { MsButton },
    data() {
        return {
            isLoading: false,
        };
    },
    props: [
        "oClDialogDelete",
        "employeeID",
        "employeeName",
        "reloadList",
        "listClicked",
        "isDeleteBatch",
    ],
    methods: {
        /**
         * Thực hiện xóa nhân viên theo ID
         * Author: NHAnh (06/11/2022)
         */
        async handleDelete(employee) {
            try {
                this.isLoading = true;
                if (this.listClicked.length > 0) {
                    axios
                        .post(`${BASE_URL}/deleteBatch`, {
                            EmployeeIDs: this.listClicked,
                        })
                        .then(res => {
                            this.isLoading = false;
                            this.reloadList();
                            this.oClDialogDelete();
                            this.$emit("openToast", true);
                        })
                        .catch(e => {
                            console.log(e);
                        });
                } else {
                    const res = await axios.delete(`${BASE_URL}/${employee}`);
                    if (res) {
                        this.isLoading = false;
                        this.reloadList();
                        this.oClDialogDelete();
                        this.$emit("openToast", true);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Dừng loading
         * Author: NHAnh (06/11/2022)
         */
        stopLoading(e) {
            try {
                this.isLoading = !this.isLoading;
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>
<style scoped>
.m-notification {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}
.m-noti-box {
    width: 400px;
    min-width: 400px;
    background-color: #fff;
    border-radius: 4px;
    z-index: 1;
}
.box-content {
    padding: 24px;
    height: 100%;
    box-sizing: border-box;
}
.content {
    display: flex;
    justify-content: space-between;
}

.title-noti {
    font-weight: 700;
    font-size: 20px;
}
.content-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
}
.content-footer-left {
    display: flex;
}
.message-content {
    overflow: auto;
    margin-top: 24px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
}
.btnToastDelete {
    background-color: #e81e1e;
}
.btnToastDelete:hover {
    background-color: #eb3333;
}
.btnToastDelete:focus {
    background-color: #b80000;
}
</style>

<template>
    <div class="m-header">
        <div class="m-header__left">
            <div
                id="thu-gon-sidebar"
                class="icon-sidebar sidebar-hiden"
                @click="closeSidebar()"
                v-show="!colHeader"
            >
                <div class="tooltip tooltip__sidebar">
                    <label for=""
                        >{{ tooltipSrc.COLLECT_SIDEBAR }}
                        <div></div
                    ></label>
                </div>
            </div>
            <b class="header-text">{{ resourceHeader.TITLE }}</b>
            <div class="icon-down"></div>
        </div>
        <div class="m-header__right">
            <div class="icon-bell">
                <div class="tooltip tooltip__bell">
                    <label for=""
                        >{{ tooltipSrc.NOTIFICATION }}
                        <div></div
                    ></label>
                </div>
            </div>
            <div class="icon-user mr-8"></div>
            <b class="user-name">Nguyễn Văn Mạnh</b>
            <div class="icon-down-small"></div>
        </div>
    </div>
</template>
<script>
import { HEADER, TOOLTIP } from "@/constans/layoutResource";

export default {
    data() {
        return {
            // Trạng thái icon 3 gạch
            colHeader: false,
            resourceHeader: HEADER,
            tooltipSrc: TOOLTIP,
        };
    },
    props: ["openCloseSidebar"],
    created() {
        /**
         * Thực hiện lấy giá trị khi đóng mở sidebar trên biến cục bộ
         * Author: NHAnh(06/11/2022)
         */
        this.eventBus.on("openSidebar", e => (this.colHeader = e));
    },
    methods: {
        /**
         * Ẩn icon 3 chấm trên header khi thu gọn sidebar
         * Author: NHAnh(06/11/2022)
         */
        closeSidebar() {
            try {
                this.colHeader = !this.colHeader;
                this.eventBus.emit("closeSidebar", this.colHeader);
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>
<style>
.m-header {
    width: calc(100% - 200px);
    height: 56px;
    background-color: #fff;
    float: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.m-header__left {
    display: flex;
    align-items: center;
    padding-left: 16px;
}
.header-text {
    padding-right: 8px;
}
.m-header__right {
    display: flex;
    align-items: center;
    padding-right: 16px;
}
.user-name {
    padding-left: 4px;
    padding-right: 8px;
}
</style>

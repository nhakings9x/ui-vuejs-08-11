<template>
    <div :class="['m-sidebar', updateSidebar ? 'sidebar-toggle' : '']">
        <div class="m-sidebar__header">
            <div class="icon-sidebar-header sidebar-hiden"></div>
            <div class="m-sidebar__logo sidebar-hiden"></div>
            <b class="sidebar-hiden">{{ listNameRouter.HEADER }}</b>
            <div class="icon-sidebar-white" @click="openSidebar()">
                <div
                    class="tooltip tooltip__sidebar-white"
                    style="background: #626570"
                >
                    <label for="">{{ tooltipSrc.EXPAND_SIDEBAR }}</label>
                </div>
            </div>
        </div>
        <div class="m-sidebar__main">
            <div class="m-sidebar__menu">
                <a class="m-sidebar__menu-item item-1">
                    <div class="item-icon icon-overview"></div>
                    <div class="item-text sidebar-hiden">
                        {{ listNameRouter.OVERVIEW }}
                    </div>
                </a>
                <router-link to="/" class="m-sidebar__menu-item item-2">
                    <div class="item-icon icon-money"></div>
                    <div class="item-text sidebar-hiden">
                        {{ listNameRouter.CASH }}
                    </div>
                </router-link>
                <router-link to="/deposits" class="m-sidebar__menu-item item-3">
                    <div class="item-icon icon-contract"></div>
                    <div class="item-text sidebar-hiden">
                        {{ listNameRouter.DEPOSITS }}
                    </div>
                </router-link>
                <a class="m-sidebar__menu-item item-4">
                    <div class="item-icon icon-purchase"></div>
                    <div class="item-text sidebar-hiden">
                        {{ listNameRouter.PURCHASE }}
                    </div>
                </a>
                <a class="m-sidebar__menu-item item-5">
                    <div class="item-icon icon-sell"></div>
                    <div class="item-text sidebar-hiden">
                        {{ listNameRouter.SELL }}
                    </div>
                </a>
                <a class="m-sidebar__menu-item item-6">
                    <div class="item-icon icon-invoice"></div>
                    <div class="item-text sidebar-hiden">
                        {{ listNameRouter.INVOICE_MANAGEMENT }}
                    </div>
                </a>
                <a class="m-sidebar__menu-item item-7">
                    <div class="item-icon icon-warehouse"></div>
                    <div class="item-text sidebar-hiden">
                        {{ listNameRouter.WAREHOUSE }}
                    </div>
                </a>
                <a class="m-sidebar__menu-item item-8">
                    <div class="item-icon icon-tools"></div>
                    <div class="item-text sidebar-hiden">
                        {{ listNameRouter.TOOLS }}
                    </div>
                </a>
                <a class="m-sidebar__menu-item item-9">
                    <div class="item-icon icon-tax"></div>
                    <div class="item-text sidebar-hiden">
                        {{ listNameRouter.TAX }}
                    </div>
                </a>
                <a class="m-sidebar__menu-item item-10">
                    <div class="item-icon icon-price"></div>
                    <div class="item-text sidebar-hiden">
                        {{ listNameRouter.PRICE }}
                    </div>
                </a>
                <a class="m-sidebar__menu-item item-11">
                    <div class="item-icon icon-synthetic"></div>
                    <div class="item-text sidebar-hiden">
                        {{ listNameRouter.SYNTHETIC }}
                    </div>
                </a>
                <a class="m-sidebar__menu-item item-12">
                    <div class="item-icon icon-budget"></div>
                    <div class="item-text sidebar-hiden">
                        {{ listNameRouter.BUDGET }}
                    </div>
                </a>
                <a class="m-sidebar__menu-item item-13">
                    <div class="item-icon icon-report"></div>
                    <div class="item-text sidebar-hiden">
                        {{ listNameRouter.REPORT }}
                    </div>
                </a>
                <a class="m-sidebar__menu-item item-14">
                    <div class="item-icon icon-financial-analysis"></div>
                    <div class="item-text sidebar-hiden">
                        {{ listNameRouter.FINANCIAL_ANALYSIS }}
                    </div>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
import { SIDEBAR, TOOLTIP } from "@/constans/layoutResource";

export default {
    data() {
        return {
            updateSidebar: null,
            listNameRouter: SIDEBAR,
            tooltipSrc: TOOLTIP,
        };
    },
    props: {},
    created() {
        /**
         * Lấy giá trị khi mở và thu gọn sidebar
         * Author: NHAnh(06/11/2022)
         */
        this.eventBus.on("closeSidebar", e => (this.updateSidebar = e));
    },
    methods: {
        /**
         * Thực hiện đóng mở sidebar và đẩy biến updateSidebar lên cục bộ
         * Author: NHAnh(06/11/2022)
         */
        openSidebar() {
            try {
                this.updateSidebar = !this.updateSidebar;
                this.eventBus.emit("openSidebar", this.updateSidebar);
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>
<style>
.m-sidebar {
    width: var(--width-sidebar);
    height: 100vh;
    background-color: #38393d;
    float: left;
    color: #fff;
    overflow: auto;
}

.m-sidebar__header {
    height: 56px;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 24px;
    box-sizing: border-box;
}
.m-sidebar__header b {
    padding-left: 8px;
    cursor: pointer;
}

.m-sidebar__logo {
    background-image: url("../../assets/favicon.ico");
    width: 36px;
    height: 36px;
    background-size: cover;
    cursor: pointer;
}

.m-sidebar__main {
    height: calc(100vh - 100px);
    width: 100%;
}
.m-sidebar__menu {
    padding: 20px 12px;
    height: calc(100% - 84px);
}
.m-sidebar__menu-item {
    display: flex;
    cursor: pointer !important;
    text-decoration: none;

    /* width: 100%; */
    align-items: center;
    height: 24px;
    margin-bottom: 4px;
    padding: 10px 12px;
    position: relative;
}

.router-link-active {
    background-color: #777983;
    opacity: 1;
    border-radius: 4px;
}
.router-link-active .item-text {
    color: #fff;
}
.router-link-active .item-icon {
    opacity: 1;
}

.item-icon {
    padding-right: 12px;
}
.item-text {
    color: #a8a8a8;
}
.m-sidebar__menu-item:hover {
    background-color: #777983;
    border-radius: 4px;
    cursor: pointer;
}
.m-sidebar__menu-item:hover .item-text {
    color: #fff;
}
.m-sidebar__menu-item:hover .item-icon {
    opacity: 1;
}

.m-sidebar-bottom {
    height: 44px;
    width: 100%;
    bottom: 0;
}

/* CSS thu Gọn (25/10/2022) */
.sidebar-toggle {
    --width-sidebar: 73px !important;
    width: var(--width-sidebar);
    height: 100vh;
    overflow: unset;
}
.sidebar-toggle + div {
    width: calc(100% - 73px);
}
.sidebar-toggle + div + div {
    width: calc(100% - 73px - 36px);
}
.sidebar-toggle .m-sidebar__header .sidebar-hiden {
    display: none;
}
.sidebar-toggle .m-sidebar__header .icon-sidebar-white {
    display: block;
}
.sidebar-toggle
    .m-sidebar__main
    .m-sidebar__menu
    .m-sidebar__menu-item
    .item-text {
    position: absolute;
    display: none;
    align-items: center;
    white-space: nowrap;
    padding: 0 16px;
    left: 150%;
    height: 40px;
    border-radius: 4px;
    background-color: #38393d;
    z-index: 10;
}

.sidebar-toggle .m-sidebar__main .m-sidebar__menu .m-sidebar__menu-item div {
    margin-left: 3px;
}

.sidebar-toggle
    .m-sidebar__main
    .m-sidebar__menu
    .m-sidebar__menu-item
    .item-text::before {
    content: "";
    position: absolute;
    left: -20px;
    top: 10px;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid #38393d;
}
.sidebar-toggle .m-sidebar__main .m-sidebar__menu .item-1:hover .item-text,
.sidebar-toggle .m-sidebar__main .m-sidebar__menu .item-2:hover .item-text,
.sidebar-toggle .m-sidebar__main .m-sidebar__menu .item-3:hover .item-text,
.sidebar-toggle .m-sidebar__main .m-sidebar__menu .item-4:hover .item-text,
.sidebar-toggle .m-sidebar__main .m-sidebar__menu .item-5:hover .item-text,
.sidebar-toggle .m-sidebar__main .m-sidebar__menu .item-6:hover .item-text,
.sidebar-toggle .m-sidebar__main .m-sidebar__menu .item-7:hover .item-text,
.sidebar-toggle .m-sidebar__main .m-sidebar__menu .item-8:hover .item-text,
.sidebar-toggle .m-sidebar__main .m-sidebar__menu .item-9:hover .item-text,
.sidebar-toggle .m-sidebar__main .m-sidebar__menu .item-10:hover .item-text,
.sidebar-toggle .m-sidebar__main .m-sidebar__menu .item-11:hover .item-text,
.sidebar-toggle .m-sidebar__main .m-sidebar__menu .item-12:hover .item-text,
.sidebar-toggle .m-sidebar__main .m-sidebar__menu .item-13:hover .item-text,
.sidebar-toggle .m-sidebar__main .m-sidebar__menu .item-14:hover .item-text {
    display: flex;
}
</style>

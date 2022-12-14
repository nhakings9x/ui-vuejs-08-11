// Text trong sidebar
export const SIDEBAR = {
    HEADER: "KẾ TOÁN",
    OVERVIEW: "Tổng quan",
    CASH: "Nhân viên",
    DEPOSITS: "Tiền gửi",
    PURCHASE: "Mua hàng",
    SELL: "Bán hàng",
    INVOICE_MANAGEMENT: "Quản lý hóa đơn",
    WAREHOUSE: "Kho",
    TOOLS: "Công cụ dụng cụ",
    TAX: "Thuế",
    PRICE: "Giá thành",
    SYNTHETIC: "Tổng hợp",
    BUDGET: "Ngân sách",
    REPORT: "Báo cáo",
    FINANCIAL_ANALYSIS: "Phân tích tài chính",
};

// Text trong Header
export const HEADER = {
    TITLE: "CÔNG TY TNHH SẢN XUẤT - THƯƠNG MẠI - DỊCH VỤ QUI PHÚC",
};

// text trong trang Employees
export const EMPLOYEE_ROUTER = {
    TITLE: "Nhân viên",
    PLACEHOLDER_SEARCH: "Tìm kiếm theo mã, tên nhân viên",
    SELECTED: "Đã chọn",
    UNCHECKED: "Bỏ chọn",
    TABLE: {
        EMPLOYEE_CODE: "MÃ NHÂN VIÊN",
        EMPLOYEE_NAME: "TÊN NHÂN VIÊN",
        GENDER: "GIỚI TÍNH",
        DATE_OF_BIRTH: "NGÀY SINH",
        IDENTITYNUMBER: "SỐ CMND",
        IDENTITYNUMBER_TITLE: "Số chứng minh nhân dân",
        JOB_POSITION_NAME: "CHỨC DANH",
        DEPARTMENT_NAME: "TÊN ĐƠN VỊ",
        BANK_NUMBER: "SỐ TÀI KHOẢN",
        BANK_NAME: "TÊN NGÂN HÀNG",
        BANK_BRANCH: "CHI NHÁNH TK NGÂN HÀNG",
        BANK_BRANCH_TITLE: "Chi nhánh tài khoản ngân hàng",
        FUNCTION: "CHỨC NĂNG",
        EDIT: "Sửa",
        DELETE: "Xóa",
        REPLICATION: "Nhân bản",
    },
    PAGGING: {
        TOTAL_RECORDS: "Tổng",
        PAGE_NUMBER_DATA: "Số bản ghi/trang :",
        TOTAL_PAGE: "bản ghi",
    },
};

export const EMPLOYEE_DETAIL = {
    IS_CLIENT: "Là khách hàng",
    IS_SUPPLIER: "Là nhà cung cấp",
    EMPLOYEE_ID: "Mã",
    EMPLOYEE_NAME: "Tên",
    DEPARTMENT_NAME: "Đơn vị",
    CHOOSE_UNIT: "Chọn đơn vị",
    JOB_POSITION_NAME: "Chức danh",
    DATE_OF_BIRTH: "Ngày sinh",
    GENDER: "Giới tính",
    MALE: "Nam",
    FEMALE: "Nữ",
    OTHER: "Khác",
    IDENTITY_NUMBER: "SỐ CMND",
    IDENTITY_NUMBER_TITLE: "Số chứng minh nhân dân",
    IDENTITY_DATE: "Ngày cấp",
    IDENTITY_PLACE: "Nơi cấp",
    ADRESS: "Địa chỉ",
    PHONE_NUMBER: "ĐT di động",
    PHONE_NUMBER_TITLE: "Điện thoại di động",
    PHONE_NUMBER_PH: "VD: 0912345678",
    TELEPHONE_NUMBER: "ĐT cố định",

    TELEPHONE_NUMBER_TITLE: "Điện thoại cố định",
    EMAIL: "Email",
    EMAIL_PH: "VD: abc@gmail.com",
    BANK_NUMBER: "Tài khoản ngân hàng",
    BANK_NAME: "Tên ngân hàng",
    BANK_BRANCH: "Chi nhánh",
};

export const TOOLTIP = {
    COLLECT_SIDEBAR: "Thu gọn sidebar",
    EXPAND_SIDEBAR: "Mở rộng sidebar",
    NOTIFICATION: "Thông báo",
    DATA_BACK: "Lấy lại dữ liệu",
    EXPORT: "Xuất khẩu Excel",
    HELP: "Trợ giúp (F1)",
    CLOSE: "Đóng (ESC)",
};

export const MS_BUTTON = {
    ADD: "Thêm mới nhân viên",
    CANCEL: "Hủy",
    CANCEL_TITLE: "Hủy (ESC)",
    SAVE: "Cất",
    SAVE_TITLE: "Cất (Ctrl + F9)",
    SAVE_AND_ADD: "Cất và thêm",
    SAVE_AND_ADD_TITLE: "Cất và thêm (Ctrl + F8)",
    YES: "Đồng ý",
    NO: "Không",
    DELETE: "Có, xóa nhân viên",
    IS_DELETE: "Xóa",
    CLOSE: "Đóng",
    DONT_SAVE: "Không lưu",
    SAVE_DIALOG: "Lưu",
    ADD_NEW_EMPLOYEE: "Thêm mới nhân viên",
    ADD_NEW_EMPLOYEE_TITLE: "Thêm mới nhân viên (Insert)",
};

export const DIALOG_TEXT = {
    IS_UPDATE: "Dữ liệu đã bị thay đổi. Bạn có muốn cất không?",
    IS_DELETE: "Bạn có chắc muốn xóa nhân viên đã chọn không?",
    TITLE_UPDATE: "Dữ liệu đã thay đổi",
    TITLE_DELETE: value => {
        return `Xóa${value} nhân viên?`;
    },
};

export const TOAST = {
    TITLE: "Thành công!",
    CONTENT: value => {
        return `Bạn đã ${value} thành công nhân viên!`;
    },
};

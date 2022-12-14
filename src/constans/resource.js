// Lỗi validate
export const ERRORS = {
    EMPLOYEECODE: "Mã không được để trống",
    EMPLOYEENAME: "Tên không được để trống",
    DEPARTMENTID: "Đơn vị không được để trống",
    DATEOFBIRTH: "Ngày sinh không hợp lệ",
    IDENTITYNUMBER: "Số CMND phải là số",
    INDENTITYDATE: "Ngày cấp không hợp lệ",
    PHONENUMBER: "ĐT di động phải là số",
    TELEPHONENUMBER: "ĐT cố định phải là số",
    EMAIL: "Email không đúng định dạng",
    BANKNUMBER: "Tài khoản ngân hàng phải là số",
};

// Lỗi api khi gọi dữ liệu
export const ERRORS_API = {
    NOTFOUND404: "Không có dữ liệu !!!",
    ERROR500: "Không tìm thấy dữ liệu !!!",
};

// Title POPUP
export const TITLE_POPUP = {
    INSERT: "Thêm mới nhân viên",
    EDIT: "Sửa nhân viên",
};

// Tên formcontrol POPUP
export const EMPLOYEE = {
    EMPLOYEE_CODE: "EmployeeCode",
    EMPLOYEE_NAME: "EmployeeName",
    JOB_POSITION_NAME: "JobPositionName",
    IDENTITY_NUMBER: "IdentityNumber",
    IDENTITY_PLACE: "IdentityPlace",
    ADRESS: "Adress",
    PHONE_NUMBER: "PhoneNumber",
    TELEPHONE_NUMBER: "TelephoneNumber",
    EMAIL: "Email",
    BANK_NUMBER: "BankNumber",
    BANK_NAME: "BankName",
    BANK_BRANCH: "BankBranch",
};

// List pagging
export const LIST_PAGGING = [
    {
        title: 10,
    },
    {
        title: 20,
    },
    {
        title: 50,
    },
    {
        title: 100,
    },
];

// Độ dài tối đa của các ô input
export const MAXLENGHT_INPUT = {
    CODE: 20,
    NAME: 100,
    ID_NUMBER: 25,
    ID_PLACE: 255,
    JOB_NAME: 255,
    ADDRESS: 255,
    PHONE: 50,
    EMAIL: 100,
    BANK_NUMBER: 25,
    BANK_BRANCH: 255,
    BANK_NAME: 255,
    SEARCH: 100,
};

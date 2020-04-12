export default {
    userInfo: {// 用户基本信息
        id: '',//用户id
        account: '',//账号
        name: '',
        mobile: '',
        isRealName: 0,//个人认证
        isBindEtp: 0,//企业认证
    },
    appUserAddress: {//个人地址信息
        id: '',
        userId: '',
        status: '',
        createTime: '',
        updateTime: '',
        province: '',
        city: '',
        area: '',
        address: '',
    },
    appUserIdentity: {//用户认证信息
        id: '',
        userId: '',
        status: '',
        createTime: '',
        updateTime: '',
        name: '',//姓名：
        gender: 0,//性别：
        national: '',//
        birthday: '',//出生日期：
        address: '',//住址：
        validDate: '',//身份证有效期限
        issuingAgency: '',//身份证签发机关：
        idCard: '',//身份证号：
        idFrontSideUrl: '',//身份证正面照
        idBackSideUrl: '',//身份证反面照
    },
    appUserEtp: {//用户企业信息
        id: '',
        userId: '',
        status: '',
        createTime: '',
        updateTime: '',
        businessLicenseUrl: '',
        etpName: '',//企业名称：
        legalPerson: '',//法人代表：
        creditCode: '',//社会统一信用代码：
        etpAddress: '',//
    },
    hyperlink: {//超链接
        INST_URL:''
    },
    modalInfo: {//弹窗对象
        has: true,
        show: false,
        title: '',
        url: '',
        jumpType: 0,
        updateDate: '',
        mediaUrl: '',
        detail: '',
        showType: 0
    },
}
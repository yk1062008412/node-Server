function successParams(data, code = 0, des = '成功', extParam = {}) {
    const resParam = {
        bstatus: { code: code, des: des },
        data: data
    }
    Object.assign(resParam, extParam);
    return resParam;
}

function errorParams(des, code = -1) {
    const resParam = {
        bstatus: { code: code, des: des },
    }
    return resParam
}

module.exports = {
    successParams,
    errorParams
}
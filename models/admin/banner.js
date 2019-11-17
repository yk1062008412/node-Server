/*
 * @Author: yk1062008412
 * @Date: 2019-11-17 20:41:29
 * @LastEditors: yk1062008412
 * @LastEditTime: 2019-11-17 21:16:07
 * @Description: banner轮播图
 */
const my_connection = require('../../config/dbmysql2');

// 获取商品类目列表
const getBannerList = (req, res) => {
    my_connection.query('SELECT * FROM banner_info WHERE del_flag = 0', [], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, data: rows})
    })
}

// 新增banner图
const bannerAdd = (req, res) => {
    const { bannerImgUrl, imgUrlId, bannerIndex, bannerStatus,
        bannerLink, comments, bannerTitle, bannerTheme } = req.body;
    const addSql = `INSERT INTO banner_info (banner_img_url, img_url_id, banner_index, banner_status,
        banner_link, comments, banner_title, banner_theme) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    my_connection.query(addSql, [bannerImgUrl, imgUrlId, bannerIndex, bannerStatus,
        bannerLink, comments, bannerTitle, bannerTheme], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '新增成功' })
    })
}

// 更新banner图
const bannerUpdate = (req, res) => {
    const { bannerImgUrl, imgUrlId, bannerIndex, bannerStatus, bannerLink,
        comments, bannerTitle, bannerTheme, bannerId } = req.body;
    const updateSql = `UPDATE banner_info SET banner_img_url=?, img_url_id=?, banner_index=?, banner_status=?, banner_link=?,
        comments=?, banner_title=?, banner_theme=? WHERE banner_id=?`;
    my_connection.query(updateSql, [bannerImgUrl, imgUrlId, bannerIndex, bannerStatus, bannerLink,
        comments, bannerTitle, bannerTheme, bannerId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '更新成功' })
    })
}

// banner排序
const bannerSortUpdate = (req, res) => {
    const { bannerIndex, bannerId } = req.body;
    my_connection.query('UPDATE banner_info SET banner_index=? WHERE banner_id=?', [bannerIndex, bannerId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '排序修改成功' })
    })
}

// banner上下架
const bannerPopUp = (req, res) => {
    const { bannerStatus, bannerId } = req.body;
    my_connection.query('UPDATE banner_info SET banner_status=? WHERE banner_id=?', [bannerStatus, bannerId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: bannerStatus === 1 ? '上架成功' : '下架成功' })
    })
}

// 删除banner
const bannerDelete = (req, res) => {
    const { bannerId } = req.body;
    my_connection.query('UPDATE banner_info SET del_flag=1 WHERE banner_id=?', [bannerId], (err, rows) => {
        if(err){
            throw err;
        }
        return res.status(200).json({ code: 0, des: '删除成功' })
    })
}

module.exports = {
    getBannerList,
    bannerAdd,
    bannerUpdate,
    bannerSortUpdate,
    bannerPopUp,
    bannerDelete
}

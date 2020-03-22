DROP DATABASE IF EXISTS my_store;

CREATE DATABASE IF NOT EXISTS my_store DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

USE my_store;
-- 系统账号
CREATE TABLE IF NOT EXISTS `admin_account`(
    `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
    `adm_account` varchar(30) NOT NULL DEFAULT '' COMMENT '管理员账号',
    `adm_name` varchar(30) NOT NULL DEFAULT '' COMMENT '管理员姓名',
    `adm_phone` varchar(30) DEFAULT '' COMMENT '管理员手机号',
    `adm_passwd` varchar(33) NOT NULL DEFAULT '' COMMENT '密码',
    `adm_comments` varchar(50) DEFAULT '' COMMENT '备注信息',
    `del_flag` tinyint(2) NOT NULL DEFAULT 0 COMMENT '账号状态 0.可用;1.不可用(已删除)',
    `super_adm` tinyint(2) NOT NULL DEFAULT 0 COMMENT '超级管理员 0.否;1.是',
    `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
    `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `last_operate_account` varchar(30) COMMENT '最后操作人账号',
    PRIMARY KEY(`id`),
    UNIQUE (`adm_account`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统账号';

-- 添加管理员账号
INSERT INTO admin_account (adm_account, adm_name, adm_passwd, super_adm, last_operate_account) VALUES ('admin', '超级管理员', MD5('123456'), 1, 'admin' );

-- 用户信息
CREATE TABLE IF NOT EXISTS `user_info`(
    `user_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    `openid` varchar(50) NOT NULL DEFAULT '' COMMENT '用户openid',
    `nickname` varchar(100) NOT NULL DEFAULT '' COMMENT '用户昵称',
    `sex` tinyint(3) DEFAULT 0 COMMENT '用户性别0.未知1.男2.女',
    `user_phone` varchar(20) DEFAULT '' COMMENT '用户手机号',
    `language` varchar(50) DEFAULT '' COMMENT '语言',
    `city` varchar(50) DEFAULT '' COMMENT '城市',
    `province` varchar(50) DEFAULT '' COMMENT '省',
    `country` varchar(50) DEFAULT '' COMMENT '国家',
    `head_img_url` varchar(255) DEFAULT '' COMMENT '头像',
    `img_url_id` int(11) COMMENT '头像文件ID',
    `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
    `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `last_login_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最近一次登录时间',
    `del_flag` tinyint(2) NOT NULL DEFAULT 0 COMMENT '状态 0.正常;1.已删除',
    PRIMARY KEY(`user_id`),
    UNIQUE (`openid`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息';
-- 商品信息
CREATE TABLE IF NOT EXISTS `goods_info`(
    `goods_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品ID',
    `category_id` int(11) COMMENT '分类ID',
    `goods_name` varchar(50) NOT NULL DEFAULT '' COMMENT '商品名称',
    `stock_price` DECIMAL(11, 2) DEFAULT '' COMMENT '商品进价',
    `cost_price` DECIMAL(11, 2) DEFAULT '' COMMENT '商品原价',
    `off_price` DECIMAL(11, 2) DEFAULT '' COMMENT '商品折扣价',
    `goods_desc` varchar(100) DEFAULT '' COMMENT '商品描述',
    `stock` int(11) DEFAULT 0 COMMENT '库存',
    `goods_img_url` varchar(255) DEFAULT '' COMMENT '图片URL',
    `img_url_id` int(11) COMMENT '图片文件ID',
    `goods_index` int(11) DEFAULT 0 COMMENT '商品排序序号',
    `goods_status` tinyint(2) NOT NULL DEFAULT 0 COMMENT '商品状态 0.下架;1.上架',
    `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
    `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `del_flag` tinyint(2) NOT NULL DEFAULT 0 COMMENT '状态 0.正常;1.已删除',
    `comments` TEXT COMMENT '商品备注',
    PRIMARY KEY(`goods_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品信息';
-- 商品分类
CREATE TABLE IF NOT EXISTS `goods_category`(
    `category_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品分类ID',
    `category_name` varchar(50) NOT NULL DEFAULT '' COMMENT '分类名称',
    `comments` varchar(255) DEFAULT '' COMMENT '分类备注',
    `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加分类时间',
    `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最近更新时间',
    `category_index` int(11) DEFAULT 0 COMMENT '分类排序',
    `category_status` tinyint(2) NOT NULL DEFAULT 0 COMMENT '状态 0.下架;1.上架',
    `del_flag` tinyint(2) NOT NULL DEFAULT 0 COMMENT '状态 0.正常;1.已删除',
    PRIMARY KEY(`category_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品分类';
-- 购物车明细
CREATE TABLE IF NOT EXISTS `shopping_cart`(
    `shopping_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '购物车id',
    `goods_id` int(11) NOT NULL COMMENT '商品ID',
    `goods_num` int(11) NOT NULL DEFAULT 0 COMMENT '商品数量',
    `user_id` int(11) NOT NULL COMMENT '用户ID',
    `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '商品添加时间',
    `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '商品更新时间',
    `del_flag` tinyint(2) NOT NULL DEFAULT 0 COMMENT '状态 0.正常;1.已删除',
    PRIMARY KEY(`shopping_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='购物车明细';
-- 地址信息
CREATE TABLE IF NOT EXISTS `user_address`(
    `address_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '地址ID',
    `user_id` int(11) NOT NULL COMMENT '用户ID',
    `receive_user_name` varchar(50) NOT NULL DEFAULT '' COMMENT '收货人姓名',
    `province` varchar(50) NOT NULL DEFAULT '' COMMENT '省',
    `city` varchar(50) NOT NULL DEFAULT '' COMMENT '市',
    `district` varchar(50) NOT NULL DEFAULT '' COMMENT '区',
    `detail_add` varchar(150) DEFAULT '' COMMENT '具体地址',
    `tel_phone` varchar(20) NOT NULL DEFAULT '' COMMENT '联系电话',
    `add_time`timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
    `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '地址更新时间',
    `is_default_address` tinyint(2) DEFAULT 0 COMMENT '是否默认地址0.不是1.是',
    `del_flag`tinyint(2) NOT NULL DEFAULT 0 COMMENT '状态 0.正常;1.已删除',
    PRIMARY KEY(`address_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='地址信息';

-- 用户默认地址
-- CREATE TABLE IF NOT EXISTS ``(
--     `add_default_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '默认地址ID',
--     `address_id` int(11) NOT NULL DEFAULT '' COMMENT '地址ID',
--     `user_id` int(11) NOT NULL DEFAULT '' COMMENT '用户ID',
--     `add_time`timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '地址添加时间',
--     `update_time` timestamp DEFAULT '1980-01-01 00:00:00' COMMENT '默认地址更新时间',
--     PRIMARY KEY(`add_default_id`),
-- )ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户默认地址';

-- 订单信息
CREATE TABLE IF NOT EXISTS `user_order`(
    `order_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '订单ID',
    `order_number` varchar(50) NOT NULL DEFAULT '' COMMENT '订单号',
    `user_id` int(11) COMMENT '用户id',
    `openid` varchar(50) DEFAULT '' COMMENT '用户openID',
    `nickname` varchar(100) DEFAULT '' COMMENT '用户昵称',
    `address_id` int(11) COMMENT '地址ID',
    `address_info` varchar(150) DEFAULT '' COMMENT '地址详情信息',
    `book_time` varchar(50) DEFAULT '' COMMENT '预约收货时间',
    `order_status` tinyint(10) NOT NULL DEFAULT 1 COMMENT '订单状态(1待付款2待发货3已发货4已完成5已回退)',
    `leave_message` varchar(255) DEFAULT '' COMMENT '订单留言',
    `pay_mode` tinyint(10) DEFAULT 0 COMMENT '0.默认1.微信2.支付宝3.现金4.其他',
    `goods_amount` DECIMAL(11, 2) NOT NULL DEFAULT '0.00' COMMENT '商品总金额',
    `order_amount` DECIMAL(11, 2) NOT NULL DEFAULT '0.00' COMMENT '订单付款总金额',
    `order_add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '订单生成时间',
    `order_pay_time` datetime COMMENT '付款时间',
    `order_send_time` datetime COMMENT '发货时间',
    `order_complete_time` datetime COMMENT '订单完成时间',
    `order_exit_time` datetime COMMENT '订单回退时间',
    `del_flag` tinyint(2) NOT NULL DEFAULT 0 COMMENT '删除标记0.未删除1.已删除',
    `last_edit_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后操作时间',
    `last_operate_account` varchar(30) COMMENT '最后操作人账号',
    `comments` varchar(255) DEFAULT '' COMMENT '备注',
    PRIMARY KEY(`order_id`),
    UNIQUE (`order_number`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单信息';
-- 订单详情(订单明细)
CREATE TABLE IF NOT EXISTS `order_info`(
    `order_info_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '订单明细ID',
    `order_id` int(11) NOT NULL COMMENT '订单ID',
    `order_number` varchar(50) NOT NULL DEFAULT '' COMMENT '订单号',
    `goods_id` int(11) NOT NULL COMMENT '商品ID',
    `goods_name` varchar(50) NOT NULL DEFAULT '' COMMENT '商品名称',
    `goods_img_url` varchar(255) DEFAULT '' COMMENT '图片URL',
    `img_url_id` int(11) COMMENT '图片ID',
    `cost_price` DECIMAL(11, 2) DEFAULT '0.00' COMMENT '商品原价',
    `off_price` DECIMAL(11, 2) DEFAULT '0.00' COMMENT '最终成交价',
    `goods_num` int(11) NOT NULL DEFAULT 0 COMMENT '商品数量',
    PRIMARY KEY(`order_info_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单详情明细';
-- 文件存储
CREATE TABLE IF NOT EXISTS `file_info`(
    `img_url_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '文件ID',
    `file_number` varchar(255) DEFAULT '未命名' COMMENT '文件名称(管理员修改)',
    `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
    `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
    `file_size` varchar(255) DEFAULT '' COMMENT '文件大小',
    `file_type` varchar(20) DEFAULT '' COMMENT '文件类型',
    `file_url` varchar(255) DEFAULT '' COMMENT '文件在服务器中的地址',
    `file_comment` varchar(255) DEFAULT '' COMMENT '文件备注信息',
    `add_adm_account` varchar(30) DEFAULT '' COMMENT '添加图片的管理员账号',
    `filed_name` varchar(255) DEFAULT '' COMMENT 'Field name 由表单指定',
    `origin_name` varchar(255) DEFAULT '' COMMENT '用户计算机上的文件的名称',
    `encoding` varchar(50) DEFAULT '' COMMENT '文件编码',
    `mime_type` varchar(100) DEFAULT '' COMMENT '文件的 MIME 类型',
    `destination` varchar(100) DEFAULT '' COMMENT '服务器上的路径',
    `filename` varchar(100) DEFAULT '' COMMENT '服务器上的文件名',
    `del_flag` tinyint(2) NOT NULL DEFAULT 0 COMMENT '删除标记0.未删除1.已删除',
    PRIMARY KEY(`img_url_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='文件存储信息';
-- banner轮播图
CREATE TABLE IF NOT EXISTS `banner_info`(
    `banner_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'banner图ID',
    `banner_img_url` varchar(255) DEFAULT '' COMMENT '轮播图URL',
    `img_url_id` int(11) COMMENT '轮播图文件ID',
    `banner_index` int(11) DEFAULT 0 COMMENT 'banner图排序',
    `banner_status` tinyint(2) NOT NULL DEFAULT 0 COMMENT '图片状态0.下线;1.上线(默认0)',
    `banner_link` varchar(50) DEFAULT '' COMMENT '轮播图对应的链接',
    `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
    `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
    `del_flag` tinyint(2) NOT NULL DEFAULT 0 COMMENT '删除标记0.未删除1.已删除',
    `comments` varchar(255) DEFAULT '' COMMENT '备注信息',
    `banner_title` varchar(100) DEFAULT '' COMMENT 'banner标题',
    `banner_theme` varchar(50) DEFAULT '' COMMENT 'banner主题',
    PRIMARY KEY(`banner_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='banner轮播图';
-- banner对应的商品
CREATE TABLE IF NOT EXISTS `banner_goods`(
    `banner_goods_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '对应关系ID',
    `banner_id` int(11) NOT NULL COMMENT 'banner图ID',
    `goods_id` int(11) NOT NULL COMMENT '商品ID',
    `banner_goods_index` int(11) DEFAULT 0 COMMENT 'banner商品排序',
    `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
    `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
    `del_flag` tinyint(2) NOT NULL DEFAULT 0 COMMENT '删除标记0.未删除1.已删除',
    PRIMARY KEY(`banner_goods_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='banner图和商品的对应关系';
-- 每日特价商品信息
CREATE TABLE IF NOT EXISTS `special_goods`(
    `special_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '特价ID',
    `add_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
    `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后更新时间',
    `attend_time` datetime NOT NULL COMMENT '参加特价活动日期',
    `banner_id` int(11) NOT NULL COMMENT 'banner图ID',
    `goods_id` int(11) NOT NULL COMMENT '商品ID',
    `goods_name` varchar(50) NOT NULL DEFAULT '' COMMENT '商品名称',
    `stock_price` DECIMAL(11, 2) DEFAULT '0.00' COMMENT '商品进价',
    `cost_price` DECIMAL(11, 2) DEFAULT '0.00' COMMENT '商品原价',
    `off_price` DECIMAL(11, 2) DEFAULT '0.00' COMMENT '商品折扣价',
    `goods_desc` varchar(100) DEFAULT '' COMMENT '商品描述',
    `stock` int(11) DEFAULT 0 COMMENT '特价库存',
    `goods_img_url` varchar(255) DEFAULT '' COMMENT '图片URL',
    `img_url_id` int(11) COMMENT '图片文件ID',
    `special_index` int(11) DEFAULT 0 COMMENT '特价商品排序序号',
    PRIMARY KEY(`special_id`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='每日特价商品';
-- 支付信息
-- CREATE TABLE IF NOT EXISTS `pay_info`(
    
-- )ENGINE=InnoDB DEFAULT CHARSET=utf8;

# 查询所有已上架的标签
SELECT * FROM goods_category WHERE del_flag = 0 AND category_status = 1
# 查询标签对应的所有以上家的商品
SELECT * FROM goods_info WHERE del_flag = 0 AND goods_status = 1 AND category_id = 1
# 查询banner图列表
SELECT * FROM banner_info WHERE del_flag = 0 AND banner_status = 1
# 查询用户信息
SELECT * FROM user_info WHERE del_flag = 0
# 查询订单列表
SELECT * FROM user_order WHERE user_id = 1001 AND order_status = 1
# 查询订单详情
SELECT * FROM order_info WHERE order_id = 1001
# 查询用户地址列表
SELECT * FROM user_address WHERE user_id = 1001 AND del_flag = 0
# 查询用户默认地址
SELECT * FROM user_address WHERE user_id = 1001 AND del_flag = 0 AND is_default_address = 1
# 新增用户地址
INSERT INTO user_address (user_id, receive_user_name, province, city, district, street, detail_add, postal_code, tel_phone, is_default_address) VALUES ('1001', '孙悟空', '北京市', '北京市', '海淀区', '苏州街', '维亚大厦100号', '10000', '23456789012', 0)
# 修改默认地址前先重置默认地址
UPDATE user_address SET is_default_address=1 WHERE user_id=1001
# 修改用户地址信息
UPDATE user_address SET receive_user_name='孙悟空', province='北京市', city='北京市', district='海淀区', street='苏州街', detail_add='维亚大厦100号', postal_code='10000', tel_phone='23456789012', is_default_address=0 WHERE address_id = 2
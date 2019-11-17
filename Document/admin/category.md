# category

商品类目

## 获取商品类目列表

```
/category/getCategoryList
```

- request

|参数|类型|备注|
|:--|:--|:--|
||||

- response

```
{
    code: 0,
    data: [{
        category_id: '',        //商品分类ID
        category_name: '',      //分类名称
        comments: '',           //分类备注
        add_time: '',           //添加分类时间
        update_time: '',        //最近更新时间
        category_index: '',     //分类排序
        category_status: '',    //状态 0.下架;1.上架,
        del_flag: '',           //状态 0.正常;1.已删除
    }],
}
```
# Login

登录页面

## 登录接口

```
/login/loginSystem
```

- request

|参数|类型|备注|
|:--|:--|:--|
|userName|string|用户名|
|passWord|string|密码|

- response

```
{
    code: 0,
    des: 'login success',
    token: ''// 生成的token
}
```
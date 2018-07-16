### 正式环境nginx 配置
> 由于node 的模版指定到了静态资源打包后的html文件下。 

```
  ├── config
  ├── docs
  │   └── index
  ├── src
  │   ├── css
  │   ├── html
  │   ├── public
  │   ├── scripts
  │   │   ├── common
  │   │   │   └── fonts
  │   │   ├── components
  │   │   │   └── u
  │   │   ├── demo
  │   │   ├── entry
  │   │   ├── helpers
  │   │   ├── home
  │   │   ├── index
  │   │   ├── lib
  │   │   │   └── min
  │   │   ├── order
  │   │   └── util
  │   └── static-res
  │       ├── css
  │       └── img
  ├── static
  │   ├── css
  │   ├── fonts
  │   ├── img
  │   ├── lib
  │   ├── public
  │   ├── scripts
  │   ├── static-css
  │   └── static-img
  └── test
```

#### 不同环境打包
  > config目录下有目前有6中打包方式 
  - app app内嵌html方式

    ```
    npm run app
    ```
    主要是解决静态资源下载网络问题。

  - default 默认本地开发调试方式

    所有端口是本地localhost:3333

    ```
    npm run serve
    ```
  - pre prod test test 02  预生产、生产、测试1、测试2 打包方式

    主要页面引用静态资源地址及api地址差别

    本地模拟打包命令参见 package.json下scripts命令

### YCCMTMWAP

  商户维保管理端-WAP
  > 项目技术栈： zepto(v1.2.0) + react(v16.2.0) + handlebars|ejs 。
--- 

#### 开发调试
  - 安装依赖
  
    npm
    ```
    npm install
    ```
    yarn
    ```
    yarn install
    ```

  - 开发调试

    ```
    npm run start
    ```
    启动本地 http://localhost:3333/ 开发调试，自动打开浏览器

---

### 编译运行

  - 编译打包
    
    ```
      npm run build
    ```

    项目下生成static 目录放编译后文件

  - 启动服务防伪static 编译后文件

    ```
    npm run serve
    ```
    启动本地 http://localhost:3333/ 浏览器需要手动输入serve 地址

### 项目相关说明

[项目相关说明](docs/index/index.md)

[正式环境nginx配置](docs/nginx/index.md)

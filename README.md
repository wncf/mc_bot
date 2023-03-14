基于[Miraj-js](https://github.com/Drincann/Mirai-js)的 mc 机器人

#### 能做些什么:

- 配置服务器基础信息(ip,port)后，即可通过 q 群命令查询服务器实时信息(包括服务器图标，版本号，在线人数等)
- 通过 q 群执行 ping ip 命令去查询任意一个服务器的状态信息
- 更进一步，配置服务器 rcon 密码与端口后，即可通过 q 群查看具体在线人数，或者执行管理命令(暂未实现)

#### 环境要求：

[nodejs >14](http://nodejs.cn/)

开启了[mirai-console](https://github.com/mamoe/mirai)并且安装了[mirai-api-http](https://github.com/project-mirai/mirai-api-http/)  
并且在`config/MiraiApiHttp/setting.yml`中已经按照 mirail-js 的要求配置了 ws 等  
参考[mirai-js 的准备工作](https://drincann.github.io/Mirai-js/#/v2.x/Preparation?id=%e4%b8%8d%e4%bc%9a%e5%bc%80%e5%90%af%ef%bc%9f),如何安装 mirai-console 与 mrai-api-http 也能在此找到

#### 安装步骤:

1. 克隆本仓库

   ```shell
   git clone https://gitee.com/wncf/mirai-js-getmc.git
   ```

2. 安装依赖
   ```shell
   npm install
   ```
3. 将.env.example 改为`.env`并配置以下信息  
   baseUrl 与`config/MiraiApiHttp/setting.yml`下的`adapterSettings.http.host`port 保持一致  
   VERIFYKEY //与`config/MiraiApiHttp/setting.yml`的`verifyKey`保持一致  
   QQ // 要绑定的 qq，须确保该用户已在 mirai-console 登录
4. 配置 MC 服务器信息，在根目录`mc_config.json`下
   你可以配置多个服务器，并使用#mc 配置的 name 字段名 去获取信息  
   默认`name`为`default `为默认服务器，即使用#mc 时获取的信息

注：少量服务器可能无法被 ping 查询到，可能 mc 版本过低(小于 1.6)， 或者服务器禁用了此项功能，详情参见 [wiki](https://wiki.vg/Server_List_Ping#Status_Request)

基于[Miraj-js](https://github.com/Drincann/Mirai-js)的 mc 机器人

#### 能做些什么:

- 配置服务器基础信息(ip,port)后，即可通过 q 群命令查询服务器实时信息(包括服务器图标，版本号，在线人数等)
- 通过 q 群执行 ping ip 命令去查询任意一个服务器的状态信息
- 管理员在群聊发送指令可远程管理配置文件
- 更进一步，配置服务器 rcon 密码与端口后，即可通过 q 群查看具体在线人数，或者执行管理命令(暂未实现)

#### 环境要求：

[nodejs >14](http://nodejs.cn/)

开启了[mirai-console](https://github.com/mamoe/mirai)并且安装了[mirai-api-http](https://github.com/project-mirai/mirai-api-http/)  
并且在`config/MiraiApiHttp/setting.yml`中已经按照 mirail-js 的要求配置了 ws 等  
参考[mirai-js 的准备工作](https://drincann.github.io/Mirai-js/#/v2.x/Preparation?id=%e4%b8%8d%e4%bc%9a%e5%bc%80%e5%90%af%ef%bc%9f),如何安装 mirai-console 与 mrai-api-http 也能在此找到

#### 安装步骤:

1. 克隆本仓库

   ```shell
   git clone https://github.com/wncf/mc_bot.git
   ```

2. 安装依赖
   ```shell
   yarn install
   ```
3. 将.env.example 改为`.env`并配置以下信息  
   baseUrl 与`config/MiraiApiHttp/setting.yml`下的`adapterSettings.http.host`port 保持一致  
   VERIFYKEY //与`config/MiraiApiHttp/setting.yml`的`verifyKey`保持一致  
   QQ // 要绑定的 qq，须确保该用户已在 mirai-console 登录
4. 配置 MC 服务器信息，在根目录`mc_config.json`下你可以配置多个服务器，并使用#mc 配置的 name 字段名 去获取信息  
   默认`name`为`default `为默认服务器，即使用#mc 时获取的信息

注：少量服务器可能无法被 ping 查询到，可能 mc 版本过低(小于 1.6)， 或者服务器禁用了此项功能，详情参见 [wiki](https://wiki.vg/Server_List_Ping#Status_Request)

#### 指令帮助:

默认指令触发前缀为#,可在`mc_config.json`下修改 prefix

- #mc 请求并返回`servers.当前群号.name=default`的结果信息
- #mc e2e 请求并返回`servers.当前群号.name=e2e`的结果信息
- #ping 127.0.0.1:25565 请求该服务器的信息并返回结果(默认端口 25565 可不写,其他端口则必须填写) 上述返回结果如下

```
图片(如果有则返回，否则返回/public/mc_server_ison.png)
2023(config下的alias字段 )
描述:
当前版本:  1.19.2
在线人员:  1/100
[mcwncf],
现在是开服的1天(当前时间减去config下的startTime字段的天数)
```

#### 管理命令，只有是 env.MASTER_QQ 的人才能触发该指令:

#config 获取当前群聊的 config 信息,大概是这样的

```
[{"name":"default","alias":"2023","address":"127.0.0.1:25565","protocol":340,"startTime":"2023-03-13"}]
```
修改当前群聊下name=e2e的address为127.0.0.1:25565  
#set -update e2e address=127.0.0.1:25565  

在当前群聊下新增e2es配置,其中name,alias,address是必须填写的  
#set -add name=e2es alias=e2e address=127.0.0.1:25565  

删除当前群聊的一条配置
#set -remove e2es

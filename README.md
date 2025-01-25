# ET.NOD.LBX
[![Version](https://img.shields.io/npm/v/et.nod.lbx)](https://www.npmjs.com/package/et.nod.lbx)
[![Downloads](https://img.shields.io/npm/dm/et.nod.lbx)](https://www.npmjs.com/package/et.nod.lbx)  
Tool NOD.LBX simplifies the installation and usage of [Luban](https://github.com/focus-creative-games/luban).  
NOD.LBX 工具简化了 [Luban](https://github.com/focus-creative-games/luban) 的安装和使用。

## Features | 功能特性
- Installs Luban toolchains easily. 快捷安装 Luban 工具链。
- Simplify access restrictions for China region mirrors. 优化中国区镜像访问限制。
- Multi platform supports. 多平台支持。
  | Windows/WSL | Linux | OSX |
  | :-: | :-: | :-: |
  | ✅ | ✅ | ✅ |

## Manual | 使用手册
- Install/安装: npm install et.nod.lbx
  - Prerequisites/前置条件:
    - [.NET SDK 8.0+](https://dotnet.microsoft.com/zh-cn/download/dotnet/8.0)
    - [WinRAR](https://www.win-rar.com/start.html?L=0) / [7-Zip](https://www.7-zip.org/)
- Command/命令: lubanx [options]
  * --help: reveal manual. 查看文档。
  * --version: print version. 显示版本。
  * --install=${version}: install Luban toolchains, default: 3.11.0. 安装工具链, 默认: 3.11.0。
  * * --gitproxy=${url}: git proxy url, default: https://ghproxy.cn/. git代理地址, 默认: https://ghproxy.cn/。

## FAQ | 常见问题
- npm脚本执行lubanx --version/help时报错？
  - 问题原因：Luban/Programs.cs->CommandOptions中未定义--version/help，导致ParseArgs返回了NotParsed，调用了Environment.Exit(1)，[议题](https://github.com/focus-creative-games/luban/issues/190)。

## Changelog | 版本记录
### 0.0.1 - 
- [0.0.1] Initial commit. 首次提交。

## Developer | 开发者
### Developing | 开发流程
- 运行测试: Test Current/All
- 本地安装: npm run release && npm link

### Publishing | 发布流程
- Trigger [workflow](https://github.com/eframework-org/ET.NOD.LBX/actions/workflows/publish.yml) to publish.
- 触发 [工作流](https://github.com/eframework-org/ET.NOD.LBX/actions/workflows/publish.yml) 以发布。

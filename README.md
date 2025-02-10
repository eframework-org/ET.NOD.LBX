# ET.NOD.LBX

[![Version](https://img.shields.io/npm/v/et.nod.lbx)](https://www.npmjs.com/package/et.nod.lbx)
[![Downloads](https://img.shields.io/npm/dm/et.nod.lbx)](https://www.npmjs.com/package/et.nod.lbx)  

NOD.LBX 工具简化了 [Luban](https://github.com/focus-creative-games/luban) 的安装和使用。

## 功能特性

- 🚀 快捷安装 Luban 工具链
- 🌐 优化中国区镜像访问限制

## 操作手册

### 1. 前置条件
- [.NET SDK 8.0+](https://dotnet.microsoft.com/zh-cn/download/dotnet/8.0)
- [WinRAR](https://www.win-rar.com/start.html?L=0) / [7-Zip](https://www.7-zip.org/)

### 2. 安装工具
```bash
npm install et.nod.lbx
```

### 3. 命令选项
```bash
lubanx [options]

选项：
  --help              查看文档
  --version           显示版本
  --install=<ver>     安装工具链，默认：3.12.0
  --gitproxy=<url>    git 代理地址，默认：https://ghproxy.cn/
```

## 常见问题

如有问题，请提交 [问题反馈](CONTRIBUTING.md#问题反馈)。

### 1. npm 脚本执行 lubanx --version/help 时报错？
问题原因：Luban/Programs.cs->CommandOptions 中未定义 --version/help，导致 ParseArgs 返回了 NotParsed，调用了 Environment.Exit(1)，[议题](https://github.com/focus-creative-games/luban/issues/190)。

## 项目信息

- [更新记录](CHANGELOG.md)
- [贡献指南](CONTRIBUTING.md)
- [许可证](LICENSE)

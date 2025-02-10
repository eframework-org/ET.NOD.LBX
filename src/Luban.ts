// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XEnv, XFile, XLog } from "ep.uni.util"
import { Install } from "./Install"
import { spawnSync } from "child_process"

(async () => {
    let args = process.argv.slice(2)
    args = await Install.Process(args)
    XLog.Debug("Luban with arguments: {0}", args.join(" "))

    if (args.length == 0 || args.indexOf("--help") >= 0) {
        try {
            const mfile = XFile.PathJoin(XEnv.DataPath, "..", "README.md")
            if (XFile.HasFile(mfile)) {
                const lines = XFile.OpenText(mfile).split("\n")
                const nlines = new Array<string>()
                let manual = false
                for (let i = 0; i < lines.length; i++) {
                    const line = lines[i]
                    if (!manual && line.indexOf("## Manual") >= 0) manual = true
                    else if (manual && line.startsWith("##")) manual = false   // End of manual section
                    if (manual) nlines.push(line)
                }
                if (nlines.length == 0) console.info(XFile.OpenText(mfile))
                else console.info(nlines.join("\n"))
            }
        } catch (err) { console.error("Readout README.md failed: ", err) }
    } else if (args.indexOf("--version") >= 0) {
        console.info(`LubanX ${XEnv.Version}`)
    }

    const verret = spawnSync("dotnet", ["--version"], { encoding: "utf-8" })
    if (verret.error) {
        XLog.Error("Failed to get .NET SDK version: {0}, please install it and retry: {1}", verret.error.message, "https://dotnet.microsoft.com/zh-cn/download/dotnet/8.0")
        process.exit(1)
    }

    // Luban 内部会进行检测
    // const netver = verret.stdout.trim()
    // const inetver = XString.ToVersion(netver)
    // if (inetver < XString.ToVersion("8.0.0")) {
    //     XLog.Error("Luban needs .NET SDK 8.0+ to run, got {0}, please install it and retry: {1}", netver, "https://dotnet.microsoft.com/zh-cn/download/dotnet/8.0")
    //     process.exit(1)
    // }

    const bin = XFile.PathJoin(XEnv.DataPath, "Luban", "Luban.dll")
    args.unshift(bin)
    const child = spawnSync("dotnet", args, {
        stdio: [process.stdin, process.stdout, process.stderr],
        shell: false,
        env: process.env
    })

    if (child.error) throw child.error
    process.exit(child.status)
})()
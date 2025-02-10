// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XEnv, XFile, XLog, XString } from "ep.uni.util"
import * as fs from "fs"
import { https } from "follow-redirects"

export namespace Install {
    export async function Process(args: string[]): Promise<string[]> {
        return new Promise(async (resolve, reject) => {
            let version = null
            let gitproxy = null

            const nargs = []
            for (let i = 0; i < args.length; i++) {
                const arg = args[i]
                if (arg.startsWith("--")) {
                    const strs = arg.split("=")
                    const key = strs[0].replace("--", "").trim()
                    const value = strs.length > 1 ? strs[1].trim() : null
                    if (key == "install") {
                        version = value
                        continue
                    } else if (key == "gitproxy") {
                        gitproxy = value
                        continue
                    }
                }
                nargs.push(arg)
            }

            const local = XFile.PathJoin(XEnv.DataPath, "Luban.ver")
            if (XFile.HasFile(local) && XString.IsNullOrEmpty(version)) {
                XLog.Debug(`Luban: @${XFile.OpenText(local)}`)
            } else {
                if (XString.IsNullOrEmpty(version)) version = "3.12.0"
                try {
                    let url = `https://github.com/focus-creative-games/luban/releases/download/v${version}/Luban.7z`

                    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone.toLocaleLowerCase()
                    if (XString.Contains(tz, "shanghai") || !XString.IsNullOrEmpty(gitproxy) || process.env.GITHUB_ACTIONS != null) {
                        if (XString.IsNullOrEmpty(gitproxy)) gitproxy = "https://ghproxy.cn/"
                        url = `${gitproxy.endsWith("/") ? gitproxy : gitproxy + "/"}${url}`
                        XLog.Debug(`Install.Process: using git proxy of ${gitproxy}.`)
                    }
                    XLog.Debug(`Install.Process: fetch from ${url}.`)

                    const zip = XFile.PathJoin(XEnv.DataPath, XFile.FileName(url))
                    const ws = fs.createWriteStream(zip)

                    await new Promise((resolve, reject) => {
                        https.get(url, (response) => {
                            response.pipe(ws)
                            ws.on("finish", () => {
                                ws.close(() => {
                                    XLog.Debug(`Install.Process: fetch into ${zip}.`)
                                    XFile.Unzip(zip, XEnv.DataPath, resolve)
                                })
                            })
                        }).on("error", reject)
                    })

                    XFile.DeleteFile(zip)

                    const dllFile = XFile.PathJoin(XEnv.DataPath, "Luban", "Luban.dll")
                    if (XFile.HasFile(dllFile)) {
                        fs.chmodSync(dllFile, 0o755)
                        XLog.Debug(`Install.Process: chmod Luban.dll to 0o755.`)
                    }

                    const execFile = XFile.PathJoin(XEnv.DataPath, "Luban", "Luban.exe")
                    if (XFile.HasFile(execFile)) {
                        fs.chmodSync(execFile, 0o755)
                        XLog.Debug(`Install.Process: chmod Luban.exe to 0o755.`)
                    }

                    XLog.Debug(`Install.Process: @${version} has been installed.`)
                    XFile.SaveText(local, version)
                } catch (err) {
                    XLog.Error(`Install.Process: @${version} install failed: ${err}`)
                    reject(err)
                }
            }
            resolve(nargs)
        })
    }
}
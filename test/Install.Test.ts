// Copyright (c) 2025 EFramework Organization. All rights reserved.
// Use of this source code is governed by a MIT-style
// license that can be found in the LICENSE file.

import { XEnv, XFile, XTest } from "ep.uni.util"
import { Install } from "../src/Install"

XTest.Test("Install Toolchains", async () => {
    XFile.DeleteDirectory(XEnv.DataPath)
    XFile.CreateDirectory(XEnv.DataPath)
    await Install.Process(["--install=3.10.0", "--gitproxy=https://ghproxy.cn/"]) // Install specified version.
})
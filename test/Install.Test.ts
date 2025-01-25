//-------------------------------------------------//
//                    MIT License                  //
//    Copyright (c) 2025 EFramework Organization   //
//          SEE LICENSE.md FOR MORE DETAILS        //
//-------------------------------------------------//

import { XEnv, XFile, XTest } from "ep.uni.util"
import { Install } from "../src/Install"

XTest.Test("Install Toolchains", async () => {
    XFile.DeleteDirectory(XEnv.DataPath)
    XFile.CreateDirectory(XEnv.DataPath)
    await Install.Process(["--install=3.10.0", "--gitproxy=https://ghproxy.cn/"]) // Install specified version.
})
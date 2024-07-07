import fs from "node:fs";
import path from "node:path"
import packageJson from "../package.json"

void (async () => {
    const files = fs.readdirSync(path.join(__dirname));

    files.map((file) => {
        if (file.endsWith(".js")) {
            fs.readFile(path.join(__dirname, `/${file}`), { encoding: "utf-8" }, (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }

                // Search for the require statements and replace @ or @t with the correct path which is specified in the package.json file
                const result = data.replace(/require\(['"]@['"]\)/g, `require('${packageJson._moduleAliases["@t"]}')`)
                fs.writeFile(path.join(__dirname, `/${file}`), result, (error) => {
                    if (error) {
                        console.error(error)
                    }
                })
            })
        }
    })
})().catch((e) => console.error(e))
import LocalKey from "./UpdateKey-Local.js"
import {getPluginsName} from "../index.js"

let CdnKey
let eConsole = "%c RyaksT "
let eCss = "color: #ffffff; background-color: #f77fbe"

console.log(eConsole+`%c Checking theme version...`, eCss,"color: #e4c2b3")

if (DataStore.get("Dev-mode")) {
    try {
        const res = await fetch(`https://unpkg.com/ryakstheme/data/configs/UpdateKey-CDN.js`);

        if (res.status === 200) {
            CdnKey = (await import(`https://unpkg.com/ryakstheme/data/configs/UpdateKey-CDN.js`)).default;
        } else {
            console.warn(eConsole + `%c File doesn't exist`, eCss, "");
        }
    } catch (error) {
        console.error("Error fetching or importing UpdateKey-CDN.js:", error);
    }
}

else {
    try {
        const res = await fetch("https://unpkg.com/ryakstheme@latest/data/configs/UpdateKey-CDN.js");

        if (res.status === 200) {
            CdnKey = (await import("https://unpkg.com/ryakstheme@latest/data/configs/UpdateKey-CDN.js")).default;
        } else {
            console.warn(eConsole + `%c File doesn't exist`, eCss, "");
        }
    } catch (error) {
        console.error("Error fetching or importing UpdateKey-CDN.js:", error);
    }
}

if (!DataStore.get("prevent-manual-update")) {
	if (LocalKey == CdnKey) {DataStore.set(`Force-Update`, false)}
	else {DataStore.set(`Force-Update`, true)}

	let checkVersion = new Promise((resolve, reject) => {
		setTimeout(() => {
			if (LocalKey == CdnKey) {
				resolve()
				console.log(eConsole+`%c Ultima Versão`, eCss,"color: #e4c2b3")
			}
			else {
				reject()
				console.log(eConsole+`%c Sera que tem?`, eCss,"color: #e4c2b3")
			}
		},2000)
	})
	
	Toast.promise(checkVersion, {
		loading: 'Checking theme version...',
		success: 'Latest release now',
		error: 'New theme manual update available'
	})
}
else {console.log(eConsole+`%c Manual update disabled`, eCss,"color: #e4c2b3")}
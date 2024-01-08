/**
 * @name ryaksth
 * @author Ryaks
 * @description ryaks tema
 * @link https://github.com/ryaks001
 */

let initLink
let eConsole = "%c RyaksT "
let eCss = "color: #ffffff; background-color: #f77fbe"

import "./data/Theme.js"

async function loadData(cdn) {
	let res = await fetch(cdn)
	if (res.status == 200) (await (() => import(cdn))()).default
	else {
		console.warn(eConsole+`%c Failed to load RyaksT data`,eCss,"")
		Toast.error("Failed to load RyaksT data")
	}
	console.log(eConsole+'%c By %cRyaks',eCss,"", "color: #e4c2b3")
}

if (DataStore.get("Dev-mode")) {
    initLink = `https://unpkg.com/ryakstheme/cdninit.js`;
    loadData(`https://unpkg.com/ryakstheme/index.js`);
}
else {
	if (true/*!DataStore.has("Ryaks tema")*/) {
		initLink = `https://unpkg.com/ryakstheme@5.0.0/cdninit.js`
		loadData("https://unpkg.com/ryakstheme@5.0.0/cdninit.js")
		DataStore.set("Ryaks Tema", true)
	}
	else {
		initLink = `https://unpkg.com/ryakstheme@${DataStore.get("Theme-version")}/cdninit.js`;
		loadData(`https://unpkg.com/ryakstheme@${DataStore.get("Theme-version")}/index.js`);
	}	
}

let {Cdninit} = await import (initLink)
import { setHomePage, transparentLobby, themeList } from "./data/Theme.js"
import "./data/Manual-Update.js"
import "./data/built-in_plugins/Custom-Status"
import "./data/configs/Custom-Status.txt?raw"

export function getPluginsName() {
	let scriptPath = getScriptPath()
	let regex = /\/([^/]+)\/index\.js$/
	let match = scriptPath.match(regex)
	let pluginsname = match ? match[1]:null
	return pluginsname
}
export function init(context) {
	setHomePage(context)
	transparentLobby(context)
	Cdninit(context)
	themeList(context)
}
window.setInterval(async ()=> {
	let renewList = (target, list) => {
		if (!DataStore.has(target) || DataStore.get(target).length != list.length) 
			DataStore.set(target, list)
	}
	let originLists = await Promise.all([
		PluginFS.ls("./data/assets/Backgrounds/Wallpapers"),
		PluginFS.ls("./data/assets/Backgrounds/Audio"),
		PluginFS.ls("./data/assets/Fonts/Custom"),
		PluginFS.ls("./data/assets/Icon/Regalia-Banners"),
	]);
	let [originWallpaperList, originAudioList, originFontList, originBannerList] = originLists;

	let regex = {
		Wallpaper: /\.(mp4|webm|mkv|mov|avi|wmv)$/,
		Audio: /\.(mp3|flac|ogg|wav|aac)$/,
		Font: /\.(ttf|otf)$/,
		Banner: /\.(png|jpg|jpeg|gif)$/,
	};

	let Lists = {
		Wallpaper: originWallpaperList.filter(file => regex.Wallpaper.test(file)),
		Audio: originAudioList.filter(file => regex.Audio.test(file)),
		Font: originFontList.filter(file => regex.Font.test(file)),
		Banner: originBannerList.filter(file => regex.Banner.test(file))
	};

	renewList("Wallpaper-list", Lists.Wallpaper)
	renewList("Audio-list", Lists.Audio)
	renewList("Font-list", Lists.Font)
	renewList("Banner-list", Lists.Banner)
},1000)
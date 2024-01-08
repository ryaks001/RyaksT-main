import * as observer from "./_observer.js"
import utils from './_utils.js'
import filters from './configs/Filters.js'
import icdata from './configs/Icons.js'
import { getPluginsName } from "../index.js"
import LocalKey from "./UpdateKey-Local.js"

DataStore.set("Plugin-folder-name",getPluginsName())

export function setHomePage(context) { //man i dunnu how to do it
	// context.rcp.postInit("rcp-fe-lol-navigation", async (api) => {
	// 	const navigationManager = api._apiHome.navigationManager
	// 	api._apiHome.navigationManager = new Proxy(navigationManager, {
	// 		set(target, property, value) {
	// 			target[property] = (property === "firstNavItemId") ? "overview": value
	// 			return true
	// 		}
	// 	})
	// })
}
export function transparentLobby(context) {
	context.socket.observe('/lol-gameflow/v1/gameflow-phase',async (data) => {
		if(data["data"]=="Matchmaking") {
			let a = document.getElementsByClassName("placeholder-invited-container")
			for (let i =0; i< a.length; i++) {
				let div = document.createElement("div")
				div.classList.add("placeholder-invited-image")
				a[i].querySelector(".placeholder-invited-video").remove()
				a[i].append(div)
			}
		}
	})
}
export function themeList(context) { //for next pengu version only
	// window.setInterval(async ()=> {
	// 	let originLists = await Promise.all([
	// 		context.fs.ls("./data/assets/Backgrounds/Wallpapers"),
	// 		context.fs.ls("./data/assets/Backgrounds/Audio"),
	// 		context.fs.ls("./data/assets/Fonts/Custom"),
	// 		context.fs.ls("./data/assets/Icon/Regalia-Banners"),
	// 	]);
	// 	const [originWallpaperList, originAudioList, originFontList, originBannerList] = originLists;
	
	// 	const regex = {
	// 		Wallpaper: /\.(mp4|webm|mkv|mov|avi|wmv)$/,
	// 		Audio: /\.(mp3|flac|ogg|wav|aac)$/,
	// 		Font: /\.(ttf|otf)$/,
	// 		Banner: /\.(png|jpg|jpeg|gif)$/,
	// 	};
	
	// 	const Lists = {
	// 		Wallpaper: originWallpaperList.filter(file => regex.Wallpaper.test(file)),
	// 		Audio: originAudioList.filter(file => regex.Audio.test(file)),
	// 		Font: originFontList.filter(file => regex.Font.test(file)),
	// 		Banner: originBannerList.filter(file => regex.Banner.test(file))
	// 	};
	
	// 	renewList("Wallpaper-list", Lists.Wallpaper)
	// 	renewList("Audio-list", Lists.Audio)
	// 	renewList("Font-list", Lists.Font)
	// 	renewList("Banner-list", Lists.Banner)
	// },1000)
}
let songIndex  	= 0
let datapath 	= new URL(".", import.meta.url).href
let path 		= new URL("..", import.meta.url).href
let iconFolder  = `${datapath}assets/Icon/`
let bgFolder    = `${datapath}assets/Backgrounds/`
let eConsole 	= "%c RyaksT "
let eCss 		= "color: #ffffff; background-color: #f77fbe"
let lang,loopwallCss,muteCss,pausewall,pauseau,thisVersion,CdnKey

if (DataStore.get("mute-audio")) {muteCss = "color: #00ff44"} else {muteCss = "color: red"}
if (DataStore.get("audio-loop")) {loopwallCss = "color: #00ff44"} else {loopwallCss = "color: red"}
if (DataStore.get('pause-wallpaper')%2==0) {pausewall = "color: #00ff44"} else {pausewall = "color: red"}
if (DataStore.get('pause-audio')%2==0) {pauseau = "color: #00ff44"} else {pauseau = "color: red"}
if (DataStore.get("Dev-mode")) {
    try {
        checkKey(`https://unpkg.com/ryakstheme/data/configs/UpdateKey-CDN.js`);
        getLang(`https://unpkg.com/ryakstheme/data/configs/Language.js`);
        console.log(eConsole + "%c Running %cRyaks theme - %cDev %cversion", eCss, "", "color: #e4c2b3", "color: red", "");
    } catch (error) {
        console.error("Error loading Dev mode resources:", error);
    }
}

else {
    try {
        checkKey("https://unpkg.com/ryakstheme@latest/data/configs/UpdateKey-CDN.js");
        getLang("https://unpkg.com/ryakstheme@latest/data/configs/Language.js");
        console.log(eConsole + "%c Running %cRyaks theme - %cStable %cversion", eCss, "", "color: #e4c2b3", "color: #00ff44", "");
    } catch (error) {
        console.error("Error loading stable resources:", error);
    }
}

if (CdnKey == LocalKey) {
    checkVersion("https://unpkg.com/ryakstheme@latest/data/configs/Version.js");
}

window.setTimeout(async()=> {
	DataStore.set("Summoner-ID", await utils.getSummonerID())
	console.log(eConsole+"%c Current summonerID: "+`%c${DataStore.get("Summoner-ID")}`,eCss,"color: #e4c2b3","color: #0070ff")
},7000)

setDefaultIndex('audio-index',"Audio-list",0)
setDefaultIndex('wallpaper-index',"Wallpaper-list",0)
setDefaultData({
	"Elaina-Plugins"				: true,
	"Wallpaper-list"				: ["Elaina1.webm","Elaina2.webm"],
	"Audio-list"					: ["少女レイ-FUMIKIRI ver.flac","If there was an Endpoint.mp3"],
  	"old-prev/next-button"			: false,
  	'pause-audio'					: 1,
  	'pause-wallpaper'				: 1,
	'mute-audio'					: false,
	"NextBg_Count"					: 0,
  	"wallpaper-volume"				: 0.0,
  	"audio-volume"					: 0.3,
  	"audio-loop"					: false,
  	"Receive-Update"				: true,
  	"Continues_Audio"				: true,
  	"Sidebar-Transparent"			: false,
  	"Hide-Champions-Splash-Art"		: false,
  	"Custom-Font"					: true,
  	"Custom_RP"						: false,
  	"RP-data"						: "-69",
  	"Custom_BE"						: false,
  	"BE"							: "-69",
  	"Custom-Rank-Name"				: true,
  	"Rank-line1"					: "Nome",
  	"Rank-line2"					: "Aqui",
  	"Animate-Loading"				: false,
  	"Custom-Avatar"					: true,
  	"Custom-Icon"					: true,
  	"Custom-Cursor"					: false,
  	"settings-dialogs-transparent"	: false,
  	"Hide-linking-settings"			: true,
  	"Hide-verify-acc"				: true,
  	"new-gamesearch-queue"			: true,
  	"hide-vertical-lines"			: true,
  	"auto_accept"					: false,
  	"aram-only"						: false,
  	"Old-League-Loader-Settings"	: true,
  	"Auto-Find-Queue"				: false,
  	"Create-Delay"					: 10000,
  	"Find-Delay"					: 3000,
  	"Gamemode"						: 450,
  	"Ranked Queue ID"				: 2,
  	"Ranked Tier ID"				: 9,
  	"Ranked Division ID"			: 0,
  	"Custom-Status"					: true,
  	"status-delay"					: 5000,
  	"Merry-Christmas"				: true,
  	"April fool` joke"				: false,
  	"loot-helper"					: true,
  	"ChampsPrice"					: 450,
  	"buy-all-champs"				: true,
  	"Name-Spoofer"					: false,
  	"Spoof-name"					: "Ryaks",
  	"Dev-mode"						: false,
  	"Custom-rank"					: true,
  	"Runes-BG"						: true,
  	"hide-overview"					: true,
  	"hide-merch"					: true,
  	"hide-patch-note"				: true,
  	"hide-esport"					: true,
  	"Custom-Border"					: true,
  	"Custom-RP-Icon"				: true,
  	"Custom-BE-Icon"				: true,
  	"Custom-Rank-Icon"				: true,
  	"Custom-Emblem"					: true,
  	"Custom-Clash-banner"			: true,
  	"Custom-Ticker"					: true,
  	"Custom-Trophy"					: true,
  	"Custom-Regalia-Banner"			: true,
  	"Custom-Hover-card-backdrop"	: true,
	"Custom-Gamemode-Icon"			: true,
  	"Debug-mode"					: false,
  	"Custom-profile-hover"			: false,
  	"Custom-mastery-score"			: true,
  	"Custom-challenge-crystal"		: true,
  	"Mastery-Score"					: 6969,
  	"Challenge-Points"				: 6969,
  	"challengeCrystalLevel"			: 9,
  	"Active-dev-button"				: 0,
  	"hide-theme-usage-time"			: false,
  	"auto_accept_button"			: true,
  	"Force-Update"					: false,
  	"CurrentFont"					: "Elaina-Herculanum_Roman.ttf",
  	"prevent-manual-update"			: false,
  	"NSFW-Content"					: false,
  	"Enable-Invite-Fr"				: true,
  	"Auto-Honor"					: true,
});

async function getLang(cdn) {
	let res = await fetch(cdn)
	if (res.status == 200) {
		lang = (await (() => import(cdn))()).default
	}
	else {console.warn(eConsole+`%c File doesn't exist`,eCss,"")}
}

function setDefaultIndex(data1,data2,value) {
	if(!DataStore.has(data1)){
		DataStore.set(data1,value)
	}
	else if(DataStore.get(data1)+1>DataStore.get(data2).length){
		DataStore.set(data1,value)
	}
}

function setDefaultData(defaults) {
	Object.entries(defaults).forEach(([key, value]) => {
	  	if (!DataStore.has(key)) {
			DataStore.set(key, value);
			console.log(`${key} data restored`)
	  	}
	});
}

async function checkKey(cdn) {
	let res = await fetch(cdn)
	if (res.status == 200) {
		CdnKey = (await (() => import(cdn))()).default
	}
	else {console.warn(eConsole+`%c File doesn't exist`,eCss,"")}
}

async function checkVersion(cdn) {
	let res = await fetch(cdn)
	if (res.status == 200) {
		thisVersion = (await (() => import(cdn))()).default
		DataStore.set("Theme-version", thisVersion)
	}
	else {console.warn(eConsole+`%c Failed to get version number`,eCss,"")}
}

function openConfigs() {window.openPluginsFolder(`${getPluginsName()}/data/configs`)}
function openAssets() {window.openPluginsFolder(`${getPluginsName()}/data/assets`)}

function renewList(target, list) {
	if (DataStore.get(target).length != list.length) 
		DataStore.set(target, list)
}

function DisplayNone(element) {
	element.style.display = 'none'
}
function removeNode(obj) {
	try {document.querySelector(obj).remove()}catch{}
}

function freezeProperties(object, properties) {
	for (const type in object) {
		if ((properties && properties.length && properties.includes(type)) || (!properties || !properties.length)) {
			let value = object[type]
			try {
				Object.defineProperty(object, type, {
					configurable: false,
					get: () => value,
					set: (v) => v,
				})
			}catch {}
		}
	}
}

function hideTab(data,obj,name) {
	if (data) {
		try {
			document.querySelector(obj).style.display = "none"
			console.warn(eConsole+`%c ${name} tab deleted`,eCss,"")
		}
		catch {console.warn(eConsole+`%c This client don't have ${name} tab`,eCss,"")}
	}
}

function create_element(tagName, className, content) {
	const el = document.createElement(tagName);
	el.className = className;
	if (content) {el.innerHTML = content;}
	return el;
}

function go_to_default_home_page() {
	let intervalId = window.setInterval(() => {
		let home = document.querySelector(`lol-uikit-navigation-item[item-id='ryaks-home']`);
		home.click();
		if (home.getAttribute("active") == "true") {
			window.setTimeout(() => {
				window.clearInterval(intervalId);
			}, 1000);
		}
	}, 100);
}

function add_ryaks_home_page() {
	let lol_home = document.querySelector(".rcp-fe-lol-home > lol-uikit-section-controller");

	if (lol_home) {
		if (!lol_home.querySelector("[section-id='ryaks-home']")) {
			let ryaks_home = create_element("lol-uikit-section", "");
			let div = create_element("div", "wrapper");

			div.id = "ryaks-home";
			ryaks_home.setAttribute("section-id", "ryaks-home");
			ryaks_home.append(div);
			lol_home.prepend(ryaks_home);
		}
	}
}

function add_ryaks_home_navbar() {
	let navbar = document.querySelector(".rcp-fe-lol-home > lol-uikit-navigation-bar");

	if (navbar) {
		if (!navbar.querySelector("[item-id='ryaks-home']")) {
			let ryaks_home_navbar_item = create_element("lol-uikit-navigation-item", "");
			let langCode = document.querySelector("html").lang;
			let langMap = lang.langlist;

			ryaks_home_navbar_item.setAttribute("item-id", "ryaks-home");
			ryaks_home_navbar_item.setAttribute("priority", 1);
			ryaks_home_navbar_item.textContent = lang[langMap[langCode] || "EN"]["home"];

			navbar.prepend(ryaks_home_navbar_item);
		}
	}
}

function ryaks_play_pause() {
	let ryaks_bg_elem = document.getElementById("ryaks-bg");
	if (DataStore.get('pause-wallpaper') % 2 == 0) {ryaks_bg_elem.pause();}
	else {ryaks_bg_elem.play();}
}

function play_pause_set_icon(elem) {
	let pause_bg_icon = elem || document.querySelector(".pause-bg-icon");

	if (!pause_bg_icon) {
		return;
	}
	if (DataStore.get('pause-wallpaper') % 2 == 0) {
		pause_bg_icon.setAttribute("src", `${iconFolder}Plugins-icons/play_button.png`);
	}
	else {
		pause_bg_icon.setAttribute("src", `${iconFolder}Plugins-icons/pause_button.png`);
	}
}

function audio_play_pause() {
	let audio = document.getElementById("bg-audio");

	if (DataStore.get('pause-audio') % 2 == 0) {audio.pause();}
	else {audio.play();}
}

function play_pause_set_icon_audio(elem) {
	let pause_audio_icon = elem || document.querySelector(".pause-audio-icon")

	if (!pause_audio_icon) {return}
	if (DataStore.get('pause-audio')%2==0) {
		pause_audio_icon.setAttribute("src", `${iconFolder}Plugins-icons/play_button.png`)
	}
	else {
		pause_audio_icon.setAttribute("src", `${iconFolder}Plugins-icons/pause_button.png`)
	}

}

function audio_mute() {
	let audio          = document.getElementById("bg-audio")
	let wallpaperaudio = document.getElementById("ryaks-bg")

	if (DataStore.get("mute-audio")) {
		wallpaperaudio.muted = true
		audio.muted          = true
		console.log(eConsole+`%c audio and wallpaper mute: %c${DataStore.get("mute-audio")}`,eCss,"","color: #00ff44")
	}
	else {
		wallpaperaudio.muted = false
		audio.muted          = false
		console.log(eConsole+`%c audio and wallpaper mute: %c${DataStore.get("mute-audio")}`,eCss,"","color: red")
	}
}

function mute_set_icon_audio(elem) {
	let mute_audio_icon = elem || document.querySelector(".mute-audio-icon")

	if (!mute_audio_icon) {return}
	if (DataStore.get("mute-audio")) {
		mute_audio_icon.setAttribute("src", `${iconFolder}Plugins-icons/mute.png`)
	}
	else {
		mute_audio_icon.setAttribute("src", `${iconFolder}Plugins-icons/audio.png`)
	}

}

function audio_loop() {
	let audio = document.getElementById("bg-audio")

	if (DataStore.get('audio-loop')) {
		audio.loop = true
		audio.removeEventListener("ended", nextSong)
		console.log(eConsole+`%c Audio loop: %c${DataStore.get('audio-loop')}`,eCss,"","color: #00ff44")
	}
	else {
		audio.loop = false
		audio.addEventListener("ended", nextSong)
		console.log(eConsole+`%c Audio loop: %c${DataStore.get('audio-loop')}`,eCss,"","color: red")
	}
}

function audio_loop_icon(elem) {
	let audio_loop_icon = elem || document.querySelector(".audio-loop-icon")

	if (!audio_loop_icon) {return}
	if (DataStore.get("audio-loop")) {
		audio_loop_icon.setAttribute("src", `${iconFolder}Plugins-icons/rotating-arrow.png`)
	}
	else {
		audio_loop_icon.setAttribute("src", `${iconFolder}Plugins-icons/Unrotating-arrow.png`)
	}
}

function loadBG(BG) {
	let ryaksBg = document.getElementById("ryaks-bg");
	ryaksBg.src = `${bgFolder}Wallpapers/${BG}`;
}

function loadSong(song) {
	let audio = document.getElementById("bg-audio");
	audio.src = `${bgFolder}Audio/${song}`;
}

function next_wallpaper() {
	let ryaksBg = document.getElementById("ryaks-bg");
	ryaksBg.classList.add("webm-hidden");

	DataStore.set('wallpaper-index', DataStore.get('wallpaper-index') + 1);
	if (DataStore.get('wallpaper-index') > DataStore.get("Wallpaper-list").length - 1) {
		DataStore.set('wallpaper-index', 0);
	}
	console.log(eConsole + `%c Now playing %c${DataStore.get("Wallpaper-list")[DataStore.get('wallpaper-index')]}`, eCss, "", "color: #0070ff");

	setTimeout(function () {
		loadBG(DataStore.get("Wallpaper-list")[DataStore.get('wallpaper-index')]);
		ryaks_play_pause();
		ryaksBg.classList.remove("webm-hidden");
	}, 500);
}

function prev_wallpaper() {
	let ryaksBg = document.getElementById("ryaks-bg");
	ryaksBg.classList.add("webm-hidden");

	DataStore.set('wallpaper-index', DataStore.get('wallpaper-index') - 1);
	if (DataStore.get('wallpaper-index') < 0) {
		DataStore.set('wallpaper-index', DataStore.get("Wallpaper-list").length - 1);
	}
	console.log(eConsole + `%c Now playing %c${DataStore.get("Wallpaper-list")[DataStore.get('wallpaper-index')]}`, eCss, "", "color: #0070ff");

	setTimeout(function () {
		loadBG(DataStore.get("Wallpaper-list")[DataStore.get('wallpaper-index')]);
		ryaks_play_pause();
		ryaksBg.classList.remove("webm-hidden");
	}, 500);
}

function nextSong() {
	if (DataStore.get("Continues_Audio")) {
		DataStore.set('audio-index', DataStore.get('audio-index') + 1);

		if (DataStore.get('audio-index') > DataStore.get("Audio-list").length - 1) {
			DataStore.set('audio-index', 0);
		}
		loadSong(DataStore.get("Audio-list")[DataStore.get('audio-index')]);
		audio_play_pause();
		console.log(eConsole + `%c Now playing %c${DataStore.get("Audio-list")[DataStore.get('audio-index')]}`, eCss, "", "color: #0070ff");
	} else {
		songIndex++;

		if (songIndex > DataStore.get("Audio-list").length - 1) {
			songIndex = 0;
		}
		loadSong(DataStore.get("Audio-list")[songIndex]);
		audio_play_pause();
		console.log(eConsole + `%c Now playing %c${DataStore.get("Audio-list")[songIndex]}`, eCss, "", "color: #0070ff");
	}
}

function prevSong() {
	if  (DataStore.get("Continues_Audio")) {
    	DataStore.set('audio-index', DataStore.get('audio-index')-1)

		if (DataStore.get('audio-index') < 0) {
			DataStore.set('audio-index', DataStore.get("Audio-list").length-1)
		}
		loadSong(DataStore.get("Audio-list")[DataStore.get('audio-index')])
		audio_play_pause()
		console.log(eConsole+`%c Now playing %c${DataStore.get("Audio-list")[DataStore.get('audio-index')]}`,eCss,"", "color: #0070ff")
	}
	else {
		songIndex--

		if (songIndex < 0) {
			songIndex = DataStore.get("Audio-list").length-1
		}
		loadSong(DataStore.get("Audio-list")[songIndex])
		audio_play_pause()
		console.log(eConsole+`%c Now playing %c${DataStore.get("Audio-list")[songIndex]}`,eCss,"", "color: #0070ff")
	}
}

function create_webm_buttons() {
	const container      = document.createElement("div")
	const container2     = document.createElement("div")
	const newbgchange    = document.createElement("div")
	const pauseBg        = document.createElement("div")
	const nextBg         = document.createElement("div")
	const prevBg         = document.createElement("div")
	const pauseAudio     = document.createElement("div")
	const nextAudio      = document.createElement("div")
	const prevAudio      = document.createElement("div")
	const muteAudio      = document.createElement("div")
	const audioLoop      = document.createElement("div")
	const pauseBgIcon    = document.createElement("img")
	const nextBgIcon     = document.createElement("img")
	const prevBgIcon     = document.createElement("img")	
	const pauseAudioIcon = document.createElement("img")
	const nextAudioIcon  = document.createElement("img")
	const prevAudioIcon  = document.createElement("img")
	const muteaudioIcon  = document.createElement("img")
	const audioLoopIcon  = document.createElement("img")
	const bgdropdown     = document.createElement("lol-uikit-framed-dropdown")
	
	container.classList.add("webm-bottom-buttons-container")
	container2.classList.add("newbgchange-container")
	
	pauseBg.id    = "pause-bg"
	nextBg.id     = "next-bg"
	prevBg.id     = "prev-bg"

	pauseAudio.id = "pause-audio"
	nextAudio.id  = "next-audio"
	prevAudio.id  = "prev-audio"

	muteAudio.id  = "mute-audio"
	audioLoop.id  = "audio-loop"

	newbgchange.id= "newbgchange"
	bgdropdown.id = "bgdropdown"

	pauseBgIcon.classList.add("pause-bg-icon")
	nextBgIcon.classList.add("next-bg-icon")
	prevBgIcon.classList.add("prev-bg-icon")

	pauseAudioIcon.classList.add("pause-audio-icon")
	nextAudioIcon.classList.add("next-audio-icon")
	prevAudioIcon.classList.add("prev-audio-icon")

	muteaudioIcon.classList.add("mute-audio-icon")
	audioLoopIcon.classList.add("audio-loop-icon")
	
	play_pause_set_icon_audio(pauseAudioIcon)
	play_pause_set_icon(pauseBgIcon)
	mute_set_icon_audio(muteaudioIcon)
	audio_loop_icon(audioLoopIcon)

	pauseAudio.addEventListener("click", () => {
		DataStore.set('pause-audio', DataStore.get('pause-audio') + 1)
		audio_play_pause()
		play_pause_set_icon_audio()
	})	
	pauseBg.addEventListener("click", () => {
		DataStore.set('pause-wallpaper', DataStore.get('pause-wallpaper') + 1)
		elaina_play_pause()
		play_pause_set_icon()
	})
	muteAudio.addEventListener("click", () => {
		DataStore.set("mute-audio", !DataStore.get("mute-audio"))
		audio_mute()
		mute_set_icon_audio()
	})
	audioLoop.addEventListener("click", () => {
		DataStore.set("audio-loop", !DataStore.get("audio-loop"))
		audio_loop()
		audio_loop_icon()
	})
	nextBg.addEventListener("click", () => {
		DataStore.set("NextBg_Count", DataStore.get("NextBg_Count") + 1)
		next_wallpaper()
		if (DataStore.get("NextBg_Count") >= 69 && DataStore.get("NSFW-Content")) {
			window.open("https://media.discordapp.net/attachments/1191706654224420935/1193468543614861362/image.png?ex=65acd332&is=659a5e32&hm=175a3e3a4e6083d5c1c2f126cad4185e651c03686fe58b50302b47839a426400&=&format=webp&quality=lossless", "_blank")
			DataStore.set("NextBg_Count",0)
		}
	})
	prevBg.addEventListener("click", () => {
		prev_wallpaper()
	})
	nextAudio.addEventListener("click", () => {
		nextSong()
	})
	prevAudio.addEventListener("click", () => {
		prevSong()
	})

	nextBgIcon.setAttribute("src", `${iconFolder}Plugins-icons/next_button.png`)
	prevBgIcon.setAttribute("src", `${iconFolder}Plugins-icons/prev_button.png`)
	nextAudioIcon.setAttribute("src", `${iconFolder}Plugins-icons/next-audio.png`)
	prevAudioIcon.setAttribute("src", `${iconFolder}Plugins-icons/prev-audio.png`)
		
	let showcontainer = document.getElementsByClassName("rcp-fe-lol-home")[0]
	    showcontainer.appendChild(container)
		showcontainer.appendChild(container2)
	
	container.append(muteAudio, prevAudio, pauseAudio, nextAudio, audioLoop)

	muteAudio.append(muteaudioIcon)
	pauseAudio.append(pauseAudioIcon)
	prevAudio.append(prevAudioIcon)
	nextAudio.append(nextAudioIcon)
	pauseBg.append(pauseBgIcon)
	audioLoop.append(audioLoopIcon)
	
	if (DataStore.get("old-prev/next-button")) {
		container2.append(pauseBg)
		container.append(prevBg, nextBg)
		nextBg.append(nextBgIcon)
		prevBg.append(prevBgIcon)
	}
	else {
		container2.append(newbgchange, pauseBg)
		newbgchange.append(bgdropdown)

		for (let i = 0 ;i < DataStore.get("Wallpaper-list").length ;i++) {
			const opt = DataStore.get("Wallpaper-list")[i]
			const el = document.createElement("lol-uikit-dropdown-option")
			const id = i
			el.setAttribute("slot", "lol-uikit-dropdown-option")
			el.innerText = opt
			el.onclick = () => {
				let ryaksBg = document.getElementById("ryaks-bg")
				ryaksBg.classList.add("webm-hidden")
				DataStore.set('wallpaper-index', id)
				console.log(eConsole+`%c Now playing %c${DataStore.get("Wallpaper-list")[DataStore.get('wallpaper-index')]}`,eCss,"","color: #0070ff")

				setTimeout(function () {
					loadBG(DataStore.get("Wallpaper-list")[DataStore.get('wallpaper-index')])
					ryaks_play_pause()
					ryaksBg.classList.remove("webm-hidden")
				}, 500)
			}
			if (DataStore.get('wallpaper-index') == id) {
				el.setAttribute("selected", "true")
			}
			bgdropdown.appendChild(el)
		}
	}
}

function Delbuttons() {
	document.getElementsByClassName("webm-bottom-buttons-container")[0].remove()
	document.getElementsByClassName("newbgchange-container")[0].remove()
}

async function createLoaderMenu(root) {
	const { Component, jsx, render } = await import('//esm.run/nano-jsx')
	const langCode = document.querySelector("html").lang;
	const langMap = lang.langlist
	const version = DataStore.get("Theme-version")
	const _t = lang[langMap[langCode] || "EN"];
	
	class LoaderMenu extends Component {
		visible = false; frame = null; opener = null
		didMount() {
			this.opener = document.querySelector('div[action=settings]')
			this.opener.addEventListener('click', e => {
				if (!this.visible) {
					e.stopImmediatePropagation()
					this.show(true)
				}
			})
		}
		show(on) {
			this.visible = on
			this.update()
			if (this.visible) {
				this.frame.shadowRoot.querySelector('lol-uikit-close-button')
					?.addEventListener('click', () => this.show(false))
			}
		}
		showDefaultSettings() {
			this.opener.click()
			this.show(false)
		}
		render() {
			return jsx/*html*/`
				<div style="position: absolute; inset: 0px; z-index: 8500" hidden=${!this.visible || undefined}>
					<lol-uikit-full-page-backdrop style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px; background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8) 93%);" />
					<div class="dialog-confirm" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px">
						<lol-uikit-dialog-frame ref=${el => (this.frame = el)} class="dialog-frame" orientation="bottom" close-button="false">
							<div class="dialog-content">
								<lol-uikit-content-block class="app-controls-exit-dialog" type="dialog-medium" style="position: relative; overflow: hidden">
									<div style="position: absolute; top: 60px">
										<img src="${datapath}assets/Icon/Plugins-icons/${icdata["LL_Settings"]}" style="object-fit: cover; width: 290px; transform: scale(2.5); margin-left: 100px; filter: brightness(0.7)">
									</div>
									</div>
									<div style="position: relative">
										<div style="margin-bottom: 24px"> 
											<h4 style="padding: 6px 0">ryaks-V3</h4>
											<p>v${version}</p>
										</div>
										<hr class="heading-spacer" />
										<div style="display: flex; flex-direction: column; align-items: center; gap: 12px">
											<lol-uikit-flat-button-secondary style="display:inline-block; width: 250px" onClick=${() => window.restartClient()}>
												${_t['l.reload_client']} (Ctrl-Shift-R)
											</lol-uikit-flat-button-secondary>
											<lol-uikit-flat-button-secondary style="display:inline-block; width: 250px" onClick=${() => openAssets()}>
												${_t['l.open_assets']}
											</lol-uikit-flat-button-secondary>
											<lol-uikit-flat-button-secondary style="display:inline-block; width: 250px" onClick=${() => openConfigs()}>
												${_t['l.open_configs']}
											</lol-uikit-flat-button-secondary>
										</div>
										<hr class="heading-spacer" />
										<p style="padding: 20px 0" class="lol-settings-code-of-conduct-link lol-settings-window-size-text">
											<a href="https://github.com/Elaina69/Elaina-V3/releases" target="_blank">${_t['l.theme_releases']}</a>
										</p>
									</div>
								</lol-uikit-content-block>
							</div>
							<lol-uikit-flat-button-group type="dialog-frame">
								<lol-uikit-flat-button tabindex="1" class="button-accept" onClick=${() => this.showDefaultSettings()}>${_t['l.open_settings']}</lol-uikit-flat-button>
							</lol-uikit-flat-button-group>
						</lol-uikit-dialog-frame>
					</div>
				</div>
			`
		}
	}
	render(jsx`<${LoaderMenu} />`, root)
}

let nodeRemovedEvent = function (event) {
	if (event.target.classList && event.target.classList.contains("lol-loading-screen-container")) {
		let ryaksBg     = document.getElementById("ryaks-bg")
		let viewportRoot = document.getElementById("rcp-fe-viewport-root")

		if (!ryaksBg || !viewportRoot) {return}
		viewportRoot.style.filter = "none"
		ryaksBg.style.filter     = filters["Homepage"]
		document.removeEventListener("DOMNodeRemoved", nodeRemovedEvent)
	}
}

let addHomepage = async (node) => {
    let pagename, previous_page
    let patcher_go_to_default_home_page = true
	let ryaks_bg_elem = document.getElementById("ryaks-bg")
	let brightness_modifiers = [
		"rcp-fe-lol-yourshop",
		"rcp-fe-lol-home-main",
		"rcp-fe-lol-champ-select",
		"rcp-fe-lol-store", 
		"rcp-fe-lol-collections", 
		"rcp-fe-lol-profiles-main",
		"rcp-fe-lol-parties", 
		"rcp-fe-lol-loot", 
		"rcp-fe-lol-clash-full",
		"rcp-fe-lol-postgame",
		"rcp-fe-lol-event-shop",
		"rcp-fe-lol-tft"
	]
    pagename = node.getAttribute("data-screen-name")
	console.log(eConsole+"%c "+pagename,eCss,"color: #e4c2b3")

    if (pagename == "rcp-fe-lol-home-main") {
		ryaks_bg_elem.style.filter = filters["Homepage"]

		if (!document.getElementsByClassName("webm-bottom-buttons-container").length) {
			create_webm_buttons()
			add_ryaks_home_page()
			add_ryaks_home_navbar()
			go_to_default_home_page()
		}
		let delnavtab = window.setInterval(()=> {
			if (document.querySelector('lol-uikit-navigation-item[item-id="overview"]')) {
				window.clearInterval(delnavtab)
				hideTab(DataStore.get("hide-overview"),'lol-uikit-navigation-item[item-id="overview"]',"Overview")
				hideTab(DataStore.get("hide-merch"),'lol-uikit-navigation-item[item-id="merch"]',"Merch")
				hideTab(DataStore.get("hide-patch-note"),'lol-uikit-navigation-item[item-id="latest_patch_notes"]',"Patch note")
				hideTab(DataStore.get("hide-esport"),'lol-uikit-navigation-item[item-id="news"]',"Esport")
			}
		},1000)
	}
	else if (pagename != "rcp-fe-lol-navigation-screen" && pagename != "window-controls" && pagename != "rcp-fe-lol-home" && pagename != "social" && document.getElementsByClassName("webm-bottom-buttons-container").length) {
		Delbuttons()
	}
	if (pagename == "rcp-fe-lol-uikit-full-page-modal-controller") {
		return
	}
	if (pagename == "social") {
		if (patcher_go_to_default_home_page) {
			go_to_default_home_page();
			patcher_go_to_default_home_page = false;
		}
	}
	if (pagename == "rcp-fe-lol-yourshop") {
		ryaks_bg_elem.style.filter = filters["Yourshop"];
	} else if (previous_page == "rcp-fe-lol-yourshop" && brightness_modifiers.indexOf(pagename) == -1) {
		ryaks_bg_elem.style.filter = filters["Homepage"];
	}
	if (pagename == "rcp-fe-lol-champ-select") {
		ryaks_bg_elem.style.filter = filters["Champ-select"];
	} else if (previous_page == "rcp-fe-lol-champ-select" && brightness_modifiers.indexOf(pagename) == -1) {
		ryaks_bg_elem.style.filter = filters["Homepage"];
	}
	if (pagename == "rcp-fe-lol-clash-full") {
		ryaks_bg_elem.style.filter = filters["Clash"];
	} else if (previous_page == "rcp-fe-lol-clash-full" && brightness_modifiers.indexOf(pagename) == -1) {
		ryaks_bg_elem.style.filter = filters["Homepage"];
	}
	if (pagename == "rcp-fe-lol-loot") {
		ryaks_bg_elem.style.filter = filters["Loot"];
	} else if (previous_page == "rcp-fe-lol-loot" && brightness_modifiers.indexOf(pagename) == -1) {
		ryaks_bg_elem.style.filter = filters["Homepage"];
	}
	if (pagename == "rcp-fe-lol-store") {
		ryaks_bg_elem.style.filter = filters["Store"];
	
		let runtime = 0;
		let purchaseHistory = window.setInterval(() => {
			try {
				runtime += 1;
				let storeIframe = document.querySelector('#rcp-fe-lol-store-iframe > iframe[referrerpolicy = "no-referrer-when-downgrade"]').contentWindow.document.querySelector("div.item-page-items-container-wrapper.purchase-history-page-content-wrapper");
				storeIframe.style.background = "transparent";
				let th = storeIframe.querySelectorAll("div > div > table > thead > tr > th");
				for (let i = 0; i < th.length; i++) {
					th[i].style.background = "transparent";
				}
				if (storeIframe.style.background == "transparent") {
					window.clearInterval(purchaseHistory);
					console.log(eConsole + "%c Cleared Background (" + `%c${runtime / 10}%c)`, eCss, "color: #e4c2b3", "color: #0070ff", "color: #e4c2b3");
				}
			} catch {}
		}, 100);
	}	
	else if (previous_page == "rcp-fe-lol-store" && brightness_modifiers.indexOf(pagename) == -1) {
		ryaks_bg_elem.style.filter = filters["Homepage"];
	}
	if (pagename == "rcp-fe-lol-collections") {
		ryaks_bg_elem.style.filter = filters["Collections"];
	} else if (previous_page == "rcp-fe-lol-collections" && brightness_modifiers.indexOf(pagename) == -1) {
		ryaks_bg_elem.style.filter = filters["Homepage"];
	}
	if (pagename == "rcp-fe-lol-postgame") {
		ryaks_bg_elem.style.filter = filters["Postgame"];
	} else if (previous_page == "rcp-fe-lol-postgame" && brightness_modifiers.indexOf(pagename) == -1) {
		ryaks_bg_elem.style.filter = filters["Homepage"];
	}
	if (pagename == "rcp-fe-lol-profiles-main") {
		ryaks_bg_elem.style.filter = filters["Profiles"];
	} else if (previous_page == "rcp-fe-lol-profiles-main" && brightness_modifiers.indexOf(pagename) == -1) {
		ryaks_bg_elem.style.filter = filters["Homepage"];
	}
	if (pagename == "rcp-fe-lol-parties") {
		ryaks_bg_elem.style.filter = filters["Parties"];
	} else if (previous_page == "rcp-fe-lol-parties" && brightness_modifiers.indexOf(pagename) == -1) {
		ryaks_bg_elem.style.filter = filters["Homepage"];
	}
	if (pagename == "rcp-fe-lol-tft") {
		ryaks_bg_elem.style.filter = filters["TFT"];
	} else if (previous_page == "rcp-fe-lol-tft" && brightness_modifiers.indexOf(pagename) == -1) {
		ryaks_bg_elem.style.filter = filters["Homepage"];
	}
	if (previous_page != pagename) {
		previous_page = pagename;
	}	

if (DataStore.get("Continues_Audio")) {
	console.log(eConsole+`%c Now playing %c${DataStore.get("Wallpaper-list")[DataStore.get('wallpaper-index')]} %cand %c${DataStore.get("Audio-list")[DataStore.get('audio-index')]}`,eCss,"","color: #0070ff","","color: #0070ff")
	console.log(eConsole+`%c current wallpaper status: pause: %c${DataStore.get('pause-wallpaper')%2==0}%c, play/pause-time: %c${DataStore.get('pause-wallpaper')}%c, mute: %c${DataStore.get("mute-audio")}%c, loop: %ctrue%c, volume: %c${DataStore.get("wallpaper-volume")*100}%`,eCss,"",pausewall,"","color: #0070ff","",muteCss,"","color: #00ff44","","color: #0070ff")
	console.log(eConsole+`%c current audio status: pause: %c${DataStore.get('pause-audio')%2==0}%c, play/pause-time: %c${DataStore.get('pause-audio')}%c, mute: %c${DataStore.get("mute-audio")}%c, loop: %c${DataStore.get("audio-loop")}%c, volume: %c${DataStore.get("audio-volume")*100}%`,eCss,"",pauseau,"","color: #0070ff","",muteCss,"",loopwallCss,"","color: #0070ff")
}

window.setInterval(()=> {
	try {
		if(document.querySelector("#bgdropdown").getElementsByClassName("framed-dropdown-type").length != DataStore.get("Wallpaper-list").length) {
			Delbuttons()
			create_webm_buttons()
		}
	}catch{}
},1000)

observer.subscribeToElementCreation(".summoner-xp-radial", (element)=> {element.remove()})

observer.subscribeToElementCreation("lol-uikit-parallax-background",(element)=> {
	element.shadowRoot.querySelector(".parallax-layer-container").style.backgroundImage = ''
})	

if (DataStore.get("aram-only")) {
	let interval
	observer.subscribeToElementCreation(".parties-game-type-select-wrapper",(element)=>{
		element.querySelector('div[data-game-mode=ARAM] div[class=parties-game-type-upper-half]').click()
			
		removeNode("div[data-game-mode='CLASSIC']")
		removeNode("div[data-game-mode='TFT']")
		removeNode("lol-uikit-navigation-item[data-category='VersusAi']")
		removeNode("lol-uikit-navigation-item[data-category='Training']")
		removeNode("div[data-game-mode='CHERRY']")
	})
	observer.subscribeToElementCreation(".parties-custom-game-subcategory-select",(element)=>{
		removeNode('div[data-map-id="11"]')
		element.querySelector('div[data-map-id="12"] > div').click()
	})
	observer.subscribeToElementCreation(".custom-game-list-body",(element)=>{
		interval = window.setInterval(()=> {
			let list = element.querySelectorAll("lol-uikit-scrollable > tbody > tr")
			for (let i=0;i< list.length;i++) {
				if (list[i].querySelector("td.custom-game-list-table-body-map").innerText == "Summoner's Rift") {
					list[i].remove()
				}
			}
		},100)
	})
	observer.subscribeToElementDeletion(".custom-game-list-body",(element)=>{
		window.clearInterval(interval)
	})
}

if (DataStore.get("Custom-Rank-Name")) {
	observer.subscribeToElementCreation(".style-profile-emblems-container", (element)=>{
		element.querySelector(".style-profile-ranked-component.ember-view .style-profile-emblem-header-title").innerHTML = DataStore.get("Rank-line1")
		element.querySelector(".style-profile-emblem-subheader-ranked > div").innerHTML = DataStore.get("Rank-line2")
	})
}

if (DataStore.get("Runes-BG")) {
	let style = (element) => {element.remove()}
	observer.subscribeToElementCreation('.aux', style)
	observer.subscribeToElementCreation('#splash', style)
	observer.subscribeToElementCreation('#construct', style)
	observer.subscribeToElementCreation('#keystone', style)
	observer.subscribeToElementCreation('.perks-construct-minspec', (element) => {
		window.setInterval(()=>{
			element.style.cssText = `
				top: 0px; 
				left: 0px; 
				filter: ${filters["Runes"]}; 
				background-image: var(--pri${element.getAttribute('primary')})
			`
		},100)
	})
}

if (DataStore.get("new-gamesearch-queue")) {
	observer.subscribeToElementCreation('lol-parties-game-search', (element) => {
		element.shadowRoot.querySelector("div").style.cssText = `
			border: 1px solid #8c8263; 
			border-radius: 10px; 
			margin-top: 9px
		`
	})
	observer.subscribeToElementCreation('.parties-status-card-body', (element) => {
		element.style.cssText = `
			margin-top: -23px; 
			padding: 10px 5px 10px 10px; 
			border: 1px solid #8c8263; 
			border-radius: 10px
		`
	})
	observer.subscribeToElementCreation('.parties-status-card-header', (element) => {
		element.style.cssText = `
			visibility: hidden;
			height: 14px;
		`
	})
	observer.subscribeToElementCreation('.parties-status-card-map', (element) => {
		element.style.margin = '-3px 10px 0 0'
	})
	observer.subscribeToElementCreation('.parties-status-card', (element) => {
		element.style.background = 'transparent'
	})
	observer.subscribeToElementCreation('.parties-game-invite-heading-text', (element) => {
		element.hidden = true
	})
	observer.subscribeToElementCreation('.parties-game-search-divider', DisplayNone)
	observer.subscribeToElementCreation('.parties-game-info-panel-bg-container', DisplayNone)
	observer.subscribeToElementCreation('.parties-status-card-bg-container', DisplayNone)
}

if (DataStore.get("settings-dialogs-transparent")) {
	let style = "var(--Settings-and-Dialog-frame-color)"
	observer.subscribeToElementCreation("lol-uikit-full-page-backdrop",(element)=>{
		try{
			let a = element.querySelector("lol-uikit-dialog-frame").shadowRoot.querySelector("div")
			a.style.background = style
			freezeProperties(a.style,["background"])
		}catch{}
		try{
			let b = element.querySelector("lol-uikit-dialog-frame > div")
			b.style.background = style
			freezeProperties(b.style,["background"])
		}catch{}
		try{
			let c = element.querySelector("lol-regalia-identity-customizer-element").shadowRoot.querySelector("lol-regalia-banner-v2-element")
			c.remove()
		}catch{}
		try{
			let obj = document.querySelector('.lol-settings-container')
			let a = obj.shadowRoot.querySelector("div")
			obj.style.background = style
			a.style.background = style
			freezeProperties(obj.style,["background"])
			freezeProperties(a.style,["background"])
		}catch{}
		try{
			let a = document.getElementsByClassName("dialog-frame")
			for(let i = 0; i< a.length; i++) {
				let b = a[i].shadowRoot.querySelector("div")
				b.style.background = style
			}
		}catch{}
	})
}

if (DataStore.get("Custom-Icon")) {
	observer.subscribeToElementCreation("lol-uikit-flyout-frame",(element)=>{
		function tickerCss(defaults) {
			Object.entries(defaults).forEach(([key, value]) => {
				element.shadowRoot.querySelector(key).style.cssText = value
			});
		}
		tickerCss(
			{
				".border": "display: none;",
				".sub-border": "display: none;",
				".caret": "display: none;",
				".lol-uikit-flyout-frame": "background-color: black; border-radius: 10px;"
			}
		)
	})
	if (DataStore.get("Custom-Avatar")) {
		observer.subscribeToElementCreation(".hover-card-info-container",(element)=>{
			element.style.background = "#1a1c21"
		})
		observer.subscribeToElementCreation("#lol-uikit-tooltip-root",(element)=>{
			try{
				let a = element.querySelector(`lol-regalia-hovercard-v2-element[summoner-id="${DataStore.get("Summoner-ID")}"]`).shadowRoot.querySelector("lol-regalia-crest-v2-element").shadowRoot.querySelector(".lol-regalia-summoner-icon")
				a.style.backgroundImage = "var(--Avatar)"
				freezeProperties(a.style, ['backgroundImage'])
			}catch{}
		})
		observer.subscribeToElementCreation("lol-regalia-identity-customizer-element",(element)=>{
			let a = element.shadowRoot.querySelector("lol-regalia-crest-v2-element").shadowRoot.querySelector(".lol-regalia-summoner-icon")
			a.style.backgroundImage = "var(--Avatar)"
			freezeProperties(a.style, ['backgroundImage'])
		})
		observer.subscribeToElementCreation("lol-regalia-parties-v2-element",(element)=>{
			if (element.getAttribute("summoner-id") == DataStore.get("Summoner-ID")) {
				let a = element.shadowRoot.querySelector("lol-regalia-crest-v2-element").shadowRoot.querySelector(".lol-regalia-summoner-icon")
				a.style.backgroundImage = "var(--Avatar)"
				freezeProperties(a.style, ['backgroundImage'])
			}
		})
		observer.subscribeToElementCreation('lol-regalia-profile-v2-element', (element) => {
			let a = element.shadowRoot.querySelector("lol-regalia-crest-v2-element").shadowRoot.querySelector(".lol-regalia-summoner-icon")
			a.style.backgroundImage = 'var(--Avatar)'
			freezeProperties(a.style, ['backgroundImage'])
		})
	}
	if (DataStore.get("Custom-Border")) {
		observer.subscribeToElementCreation("#lol-uikit-tooltip-root",(element)=>{
			try{
				let a = element.querySelector(`lol-regalia-hovercard-v2-element[summoner-id="${DataStore.get("Summoner-ID")}"]`).shadowRoot.querySelector("lol-regalia-crest-v2-element").shadowRoot.querySelector("lol-uikit-themed-level-ring-v2").shadowRoot.
				querySelector("div")
				a.style.backgroundImage = 'var(--Border)'
				freezeProperties(a.style, ['backgroundImage'])
			}catch{}
		})
		observer.subscribeToElementCreation("lol-regalia-identity-customizer-element",(element)=>{
			let a = element.shadowRoot.querySelector("lol-regalia-crest-v2-element").shadowRoot.querySelector("lol-uikit-themed-level-ring-v2").shadowRoot.querySelector("div")
			a.style.backgroundImage = 'var(--Border)'
			freezeProperties(a.style, ['backgroundImage'])
		})
		observer.subscribeToElementCreation("lol-regalia-parties-v2-element",(element)=>{
			if (element.getAttribute("summoner-id") == DataStore.get("Summoner-ID")) {
				let a = element.shadowRoot.querySelector("lol-regalia-crest-v2-element").shadowRoot.querySelector("lol-uikit-themed-level-ring-v2").shadowRoot.querySelector("div")
				a.style.backgroundImage = 'var(--Border)'
				freezeProperties(a.style, ['backgroundImage'])
			}
		})
		observer.subscribeToElementCreation('lol-regalia-profile-v2-element', (element) => {
			let a = element.shadowRoot.querySelector("lol-regalia-crest-v2-element").shadowRoot.querySelector("lol-uikit-themed-level-ring-v2").shadowRoot.querySelector("div")
			a.style.backgroundImage = 'var(--Border)'
			freezeProperties(a.style, ['backgroundImage'])
		})
	}
	if (DataStore.get("Custom-Regalia-Banner")) {
		let banner = `${iconFolder}Regalia-Banners/`
		let bannerInterval
		observer.subscribeToElementCreation("lol-regalia-parties-v2-element",(element)=>{
			let a = document.querySelector(".lobby-banner.local > lol-regalia-parties-v2-element").shadowRoot.querySelector("lol-regalia-banner-v2-element").shadowRoot.querySelector("uikit-state-machine > div:nth-child(2) > img")
			bannerInterval = window.setInterval(()=>{
				if (a.src != banner+DataStore.get("CurrentBanner")){
					a.src = banner+DataStore.get("CurrentBanner")
				}
			},1000)
		})
		observer.subscribeToElementDeletion("lol-regalia-parties-v2-element",(element)=>{
			window.clearInterval(bannerInterval)
		})
		observer.subscribeToElementCreation("lol-regalia-identity-customizer-element",(element)=>{
			let a = element.shadowRoot.querySelector("lol-regalia-banner-v2-element").shadowRoot.querySelector("uikit-state-machine > div:nth-child(2) > img")
			a.src = banner+DataStore.get("CurrentBanner")
			freezeProperties(a,["src"])
		})
		observer.subscribeToElementCreation("lol-regalia-profile-v2-element",(element)=>{
			let a = element.shadowRoot.querySelector("lol-regalia-banner-v2-element").shadowRoot.querySelector("uikit-state-machine > div:nth-child(2) > img")
			bannerInterval = window.setInterval(()=>{
				if (a.src != banner+DataStore.get("CurrentBanner")){
					a.src = banner+DataStore.get("CurrentBanner")
				}
			},1000)
		})
		observer.subscribeToElementDeletion("lol-regalia-profile-v2-element",(element)=>{
			window.clearInterval(bannerInterval)
		})
	}
	if (DataStore.get("Custom-Hover-card-backdrop")) {
		observer.subscribeToElementCreation("#lol-uikit-tooltip-root",(element)=>{
			try {
				if (element.querySelector("lol-regalia-hovercard-v2-element").getAttribute("summoner-id") == DataStore.get("Summoner-ID")) {
					document.querySelector("#hover-card-backdrop").style.backgroundImage = "var(--Hover-card-backdrop)"
				}
			}catch{}
		})
	}
	if (DataStore.get('Custom-Gamemode-Icon')) {
		observer.subscribeToElementCreation("lol-uikit-video-group",(element)=>{
			function gameModeIcon_active(obj, name) {
				try {
					let a = document.querySelector(`${obj} lol-uikit-video-state[state='active'] lol-uikit-video`)
					a.setAttribute("src", `${iconFolder}Gamemodes/${name}`)
					a.querySelector("video").setAttribute("src", `${iconFolder}Gamemodes/${name}`)
				}catch{}
			}
			gameModeIcon_active("div[data-game-mode='CLASSIC']",icdata["classic_video"])
			gameModeIcon_active("div[data-game-mode='TFT']", icdata["tft_video"])
			gameModeIcon_active("div[data-game-mode='ARAM']", icdata["aram_video"])
			gameModeIcon_active("div[data-game-mode='CHERRY']",icdata["cherry_video"])
			gameModeIcon_active('div[data-map-id="11"]',icdata["classic_video"])
			gameModeIcon_active('div[data-map-id="12"]',icdata["aram_video"])
		})
	}
}

//observer.subscribeToElementCreation("",(element)=>{})

window.addEventListener("load",async ()=> {
	let addonCssList = {
		a: { key: "hide-vertical-lines", css: "Hide-vertical-lines.css", altCss: "fake.css" },
		b: { key: "aram-only", css: "Aram-only.css", altCss: "fake.css" },
		c: { key: "Hide-Champions-Splash-Art", css: "Hide-Champs-Splash-Art.css", altCss: "fake.css" },
		d: { key: "Sidebar-Transparent", css: "Sidebar-Transparent.css", altCss: "Sidebar-Color.css" },
		e: { key: "Animate-Loading", css: "Animate-Loading-Screen.css", altCss: "Static-Loading-Screen.css" }
	}
	for (let prop in addonCssList) {
		let { key, css, altCss } = addonCssList[prop]
		let cssPath = DataStore.get(key) ? css : altCss
		let link
		if (cssPath) {
		  	link = `@import url("${datapath}assets/Css/Addon-Css/${cssPath}");`
		}
		addonCssList[prop] = link
	}
	let {a,b,c,d,e} = addonCssList
	utils.addStyle(a+b+c+d+e)
	utils.addStyle(/*css*/`
		@import url("${datapath}assets/Css/RyaksT.css");
		@font-face {font-family: 'Elaina'; src: url('${datapath}assets/Fonts/BeaufortforLOL-Bold.ttf')}
		:root {
			--classic_def: url("${iconFolder}Gamemodes/${icdata["classic_def"]}");
			--classic_act: url("${iconFolder}Gamemodes/${icdata["classic_act"]}");
			--aram_def: url("${iconFolder}Gamemodes/${icdata["aram_def"]}");
			--aram_act: url("${iconFolder}Gamemodes/${icdata["aram_act"]}");
			--tft_def: url("${iconFolder}Gamemodes/${icdata["tft_def"]}");
			--tft_act: url("${iconFolder}Gamemodes/${icdata["tft_act"]}");
			--cherry_def: url("${iconFolder}Gamemodes/${icdata["cherry_def"]}");
			--cherry_act: url("${iconFolder}Gamemodes/${icdata["cherry_act"]}");
			--pri8000: url("${bgFolder}Runes/${icdata['Precision']}");
			--pri8100: url("${bgFolder}Runes/${icdata['Domination']}");
			--pri8200: url("${bgFolder}Runes/${icdata['Sorcery']}");
			--pri8300: url("${bgFolder}Runes/${icdata['Inspiration']}");
			--pri8400: url("${bgFolder}Runes/${icdata['Resolve']}");
			--Avatar: url("${iconFolder}${icdata["Avatar"]}");
			--RP-Icon: url("${iconFolder}${icdata["RP-icon"]}");
			--BE-Icon: url("${iconFolder}${icdata["BE-icon"]}");
			--Rank-Icon: url("${iconFolder}${icdata["Rank-icon"]}");
			--Emblem: url("${iconFolder}${icdata["Honor"]}");
			--Clash-banner: url("${iconFolder}${icdata["Class-banner"]}");
			--Ticker: url("${iconFolder}${icdata["Ticker"]}");
			--Trophy: url("${iconFolder}${icdata["Trophy"]}");
			--Border: url("${iconFolder}${icdata["Border"]}");
			--ElainaFly: url("${iconFolder}${icdata["Animation-logo"]}");
			--ElainaStatic: url("${iconFolder}${icdata["Static-logo"]}");
			--Hover-card-backdrop: url("${iconFolder}${icdata['Hover-card']}");
		}
	`)
	if (DataStore.get("Custom-Icon")) {
		let cssList = {
			'Custom-Avatar': 'Avatar.css',
			'Custom-RP-Icon': 'RiotPoint.css',
			'Custom-BE-Icon': 'BlueEssence.css',
			'Custom-Rank-Icon': 'Rank.css',
			'Custom-Emblem': 'Emblem.css',
			'Custom-Clash-banner': 'ClashBanner.css',
			'Custom-Ticker': 'Ticker.css',
			'Custom-Trophy': 'Trophy.css',
			'Custom-Gamemode-Icon': "Gamemodes.css"
		}
		let [a, b, c, d, e, f, g, h, i] = Object.entries(cssList).map(([key, value]) => {
			if (DataStore.get(key)) {
			  	return `@import url("${datapath}assets/Css/Addon-Css/Icon/${value}");`
			}
			return ''
		})
		utils.addStyle(a+b+c+d+e+f+g+h+i)
	}
	if (DataStore.get("Custom-Font")) {
		utils.addFont(`${datapath}assets/Fonts/Custom/${DataStore.get("CurrentFont")}`,"Custom-font","Custom")
		DataStore.set("Font-folder", `${datapath}assets/Fonts/Custom/`)
	}
	if (DataStore.get("Custom-Cursor")) {
		utils.CustomCursor(`url("${iconFolder}${icdata["Mouse-cursor"]}")`,`@import url("${datapath}assets/Css/Addon-Css/Cursor.css")`)
	}

    const video = document.createElement('video')
const audio = document.createElement("audio")
video.id = 'ryaks-bg'
video.autoplay = true
video.loop = true
video.src = `${bgFolder}Wallpapers/${DataStore.get("Wallpaper-list")[DataStore.get('wallpaper-index')]}`
video.volume = DataStore.get("wallpaper-volume")
video.muted = DataStore.get("mute-audio")

audio.id = 'bg-audio'
audio.autoplay = true
audio.loop = DataStore.get("audio-loop")
audio.volume = DataStore.get("audio-volume")
audio.muted = DataStore.get("mute-audio")
if (DataStore.get("Continues_Audio")) {audio.src = `${bgFolder}Audio/${DataStore.get("Audio-list")[DataStore.get('audio-index')]}`}
else {audio.src = `${bgFolder}Audio/${DataStore.get("Audio-list")[songIndex]}`}

if (!DataStore.get("audio-loop")) {audio.addEventListener("ended", nextSong)}
document.querySelector("body").prepend(video)
document.querySelector("body").prepend(audio)
ryaks_play_pause()

utils.mutationObserverAddCallback(addHomepage, ["screen-root"])
utils.subscribe_endpoint('/lol-gameflow/v1/gameflow-phase', (message) => {
    let phase = JSON.parse(message["data"])[2]["data"]
    if (phase == "GameStart" || phase == "InProgress") {
        document.getElementById("ryaks-bg").pause()
        document.getElementById("bg-audio").pause()
        document.getElementById("ryaks-bg").style.filter = filters["Gamestart"]
    }
    else {
        ryaks_play_pause()
        audio_play_pause()
    }
})

const manager = () => document.getElementById('lol-uikit-layer-manager-wrapper')
const root = document.createElement('div')
if (DataStore.get("Old-League-Loader-Settings")) {
    while (!manager()) await new Promise(r => setTimeout(r, 300))
    await createLoaderMenu(root)
    manager().prepend(root)}
})
};
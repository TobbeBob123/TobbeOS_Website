import { createRoot } from 'react-dom/client'
import $ from "jquery"
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import './App.css'

window.onload = function() {
	if (!sessionStorage.getItem("reloaded")) {
		 sessionStorage.setItem("reloaded", "true");
		 location.reload();
	}
};

let slideData= [
	'../News_Screenshots/TobbeOS_Screenshot.png',
	'../News_Screenshots/Alacritty.png',
        '../logo/Dracula_TobbeOS.png',
]
	
function TobbeOS_screenshot() {
	const overviewInFunc = document.querySelectorAll<HTMLImageElement>(".slide");
	const overlay = document.getElementById("Image_overlay");
	const closeOverlay = document.getElementById("close_overlay");
	let overlayImage: HTMLImageElement | null = null;
	if (overlay) {
		overlayImage = overlay.querySelector("img");
	}

	overviewInFunc.forEach(img => {
		img.addEventListener("click", () => {
			if (!overlayImage || !overlay) return;
			overlayImage.src = img.src;
			overlay.classList.remove("hidden");
		});
	});

	if (!overlay || !closeOverlay) return;
	closeOverlay.addEventListener("click", () => {
		overlay.classList.add("hidden");
	});
}


function showFilenameTooltip(filename: string,  x: number, y: number) {
    const tooltip = document.createElement('div');
    tooltip.textContent = filename;
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${x + 10}px`;
    tooltip.style.top = `${y + 10}px`;
    tooltip.style.background = '#333';
    tooltip.style.color = '#fff';
    tooltip.style.padding = '6px 10px';
    tooltip.style.borderRadius = '6px';
    tooltip.style.fontSize = '14px';
    tooltip.style.zIndex = '1000';
    tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    document.body.appendChild(tooltip);

    setTimeout(() => {
	tooltip.remove();
    }, 1000);
}

let latestFile = '';
let downloadUrl = '';
async function downloadfromS() {
     const url: string = 'https://tobbeos.lysakermoen.com/iso/';
     $.get(url)
	    .done(function (html) {
	    const regex = /TobbeOS-(\d{4}\.\d{2}\.\d{2})-x86_64\.iso/g;
	    const matches: string[] = [...html.matchAll(regex)].map(match => match[0]);

	    if (matches.length === 0) {
		alert("No ISO files found.");
		console.log(matches);
		return;
	    }

	    matches.sort((a: string, b: string) => {
		const dateA = a.match(/\d{4}\.\d{2}\.\d{2}/);
		const dateB = b.match(/\d{4}\.\d{2}\.\d{2}/);
		return new Date(dateB![0]).getTime() - new Date(dateA![0]).getTime()
	    });

	    latestFile = matches[0];
	    downloadUrl = `https://tobbeos.lysakermoen.com/iso/${latestFile}`;
	})
	.fail(function(textStatus, error) {
		console.log('Request failed: ', textStatus, error); 
	});
}
async function downloadHandle() {
	await downloadfromS()
	window.location.href = downloadUrl;
}
async function tooltipHandle(event: any) {
	await downloadfromS();
	if (latestFile) {
		showFilenameTooltip(latestFile, event.clientX, event.clientY);
	}
}

function TobbeOS_index() {
	  let [currentSlide, setCurrentSlide] = useState(0);
	  const changeSlide = (step: number) => {
		setCurrentSlide(prev => (prev + step + slideData.length) % slideData.length);
	  };
	  useEffect(() => {
		  const interval = setInterval(() => {
			  changeSlide(1);
		  }, 10000);
		  return () => clearInterval(interval);
	}, []);
	return (
		<>
		<main>
			<h1 className='Overskrift'>TobbeOS Linux</h1>
			<h2 style={{textAlign: "center", paddingTop: 0 }}>A Arch-based distribution for both new users and enthusiasts.</h2>
			<input type='button' className='DownloadBTN' id='DownloadBTN' value='Download Latest' onMouseOver={tooltipHandle} onClick={downloadHandle}/>
			<section className='why-tobbeos'>
				<div className='container'>
					<h2>Why TobbeOS?</h2>
					<div className='why-tobbeos-grid'>
						<div className='why-tobbeos-card'>
							<kbd>Easy to use</kbd>
							<p>TobbeOS comes with a Keyboard Shortcut Overview and with normal app launcher for easy use</p>
						</div>
						<div className='why-tobbeos-card'>
							<kbd>Learning tool</kbd>
							<p>Its configurable for both new users to linux and enthusiasts</p>
						</div>
						<div className='why-tobbeos-card'>
							<kbd>Easy to install</kbd>
							<p>Easy script to install and great to learn linux and learn terminal</p>
						</div>
					</div>
				</div>
			</section>
				<div className='slideshow-container'>
					<h2>TobbeOS Overview</h2>
					<div id='Overview_TobbeOS' onClick={TobbeOS_screenshot}> {slideData.map((src, index) => (
						<img 
						key={index} 
						src={src}
						style={{display: index === currentSlide ? 'block' : 'none', width: '100%'}} 
						className='slide' 
						>
						</img>))}
					</div>
				</div>
				<div id='Image_overlay' className='hidden'>
					<span id='close_overlay' className='close_overlay'>&times;</span>
					<img src='News_Screenshots/TobbeOS_Screenshot.png' />
				</div>
				<div id='Image_overlay' className='hidden'>
					<span id='close_overlay' className='close_overlay'>&times;</span>
					<img src='News_Screenshots/Alacritty.png' />
				</div>	
				<div id='Image_overlay' className='hidden'>
					<span id='close_overlay' className='close_overlay'>&times;</span>
					<img src='logo/Dracula_TobbeOS.png' />
				</div>
				<section className='shortcuts'>
					<div className='container'>
						<h2>Keyboard Shortcuts</h2>
						<div className='shortcuts-grid'>
							<div className='shortcuts-card'>
								<kbd>Mod</kbd>
								<p>Windows key</p>
							</div>
							<div className='shortcuts-card'>
								<kbd>Mod + E</kbd>
								<p>Open Emacs</p>
							</div>
							<div className='shortcuts-card'>
								<kbd>Mod + Return</kbd>
								<p>Open Terminal (Kitty)</p>
							</div>
							<div className='shortcuts-card'>
								<kbd>Mod + s</kbd>
								<p>Show hotkeys</p>
							</div>
							<div className='shortcuts-card'>
								<kbd>Mod + left Shift + s</kbd>
								<p>Show alias for fish shell</p>
							</div>
							<div className='shortcuts-card'>
								<kbd>Mod + left Shift + Tab</kbd>
								<p>Open web browser</p>
							</div>
							<div className='shortcuts-card'>
								<kbd>Mod + left Shift + q</kbd>
								<p>kill window</p>
							</div>
							<div className='shortcuts-card'>
								<kbd>Mod + d</kbd>
								<p>Launch Program Launcher</p>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
		)
}

function TobbeOS_news() {
	return (
	<>
	<main>
		<h1 className='Overskrift' style={{position: 'fixed', top: '20px', left: '40%', right: '40%', paddingTop: '10px'}}>News</h1>
		<h2 style={{paddingTop: 0, position: 'fixed', top: '70px', right: '65%', width: '40%'}}>TobbeOS release 12.11.2025 is here!!!</h2>
		<section className='News_info'>
			<h3>Feature and fixes</h3>
			<div className='container'>
				<div className='News_info-grid'>
					<div className='News_info-card'>
						<p>Themes and GTK installing with chaotic-aur due to the death of GTK.</p>
					</div>
				</div>
			</div>
		</section>
		<div className='slideshow-container'>
			<div>
				<img src='logo/Neofetch_TobbeOS.png' className='slide' id='Overview_News' onClick={TobbeOS_screenshot}/>
			</div>
		</div>
		<div id='Image_overlay' className='hidden'>
			<span id='close_overlay' className='close_overlay'>&times;</span>
			<img src='logo/Neofetch_TobbeOS.png' />
		</div>
		<input type='button' className='DownloadBTN_new' id='DownloadBTN' value='Download now!' onMouseOver={tooltipHandle} onClick={downloadHandle}/>
	</main>
	</>
	)
}

function TobbeOS_about() {
	return (
		<>
		<main>
			<h1 className='Overskrift'>About us</h1>
			<br/>
			<div className='about_us'>
				<p>TobbeOS is made by one person, my name is Tobias and I do a bit coding 
				and scripting for hobby and TobbeOS is a result of that. 
				All support will happend over on gitlab: https://gitlab.com/TobbeBob123 or 
			<a href='https://gitlab.com/TobbeBob123' style={{fontWeight: "bold"}}> open here</a>.</p> 
			</div>
			<br/>
			<h2>Why the name TobbeOS?</h2>
			<div className='about_us'>
				<p>Well my nickname is Tobbe and Operative system so I think it would fun to combine it and then its become TobbeOS.</p>
				<p>Thats the reason of the name.</p>
			</div>
			<br/>
			<h2>What is TobbeOS</h2>
			<div className='about_us'>
				<p>TobbeOS is a full Qtile desktop with fish shell and wezterm as terminal etc with X11.</p> 
			</div>
		</main>
		</>
	)
}

function TobbeOS_important() {
	return (
	<>
	<main>
		<h1 className='Overskrift'>Important info and bug fixes</h1>
		<section className='Important-info'>
			<div className='container'>
				<div className='Important-info-grid'>
					<div className='Important-info-card'>
						<kbd>To fix this bug where the top bar dont load.</kbd>
						<p>Remove all the Qtile-extras from the qtile config file and delete Qtile-extras-git with yf qtile-extras-git</p>
					</div>
					<div className='Important-info-card'>
						<kbd>Packages is broken in AUR</kbd>
						<p>Some packages is broken in AUR, so every releases (Not the latest) of TobbeOS is broken. This is due to the death of GTK2. Fix: install the latest ISO (12.11.2025)</p>
					</div>
				</div>
			</div>
		</section>
	</main>
	</>
	)
}

function TobbeOS_release() {
	return (
	<>
	<main>
		<h1 className='Overskrift'>Release notes</h1>
		<section className='release-notes'>
			<div className='container'>
				<div className='release-notes-grid'>
					<div className='release-notes-card'>
						<kbd>Release 25.04.2025</kbd>
						<p>Added support for BIOS boot option</p>
						<p>Added kernel option either common Linux kernel and Linux-lts kernel</p>
						<p>Added TobbeOS pre-grub for BIOS boot</p>
					</div>
					<div className='release-notes-card'>
						<kbd>Release 27.04.2025</kbd>
						<p>Added support to encrypt disk</p>
						<p>Added default shell to Fish shell</p>
					</div>
					<div className='release-notes-card'>
						<kbd>Release 30.04.2025</kbd>
						<p>Fixed the output when choosen not to install TobbeOS emacs</p>
						<p>Fixed bug (The bug was that the Fish shell didn't set when installing TobbeOS emacs)</p>
					</div>
					<div className='release-notes-card'>
						<kbd>Release 01.05.2025</kbd>
						<p>Added TobbeOS neofetch</p>
						<p>Added TobbeOS as a proper OS (OS rename)</p>
					</div>
					<div className='release-notes-card'>
						<kbd>Release 02.05.2025</kbd>
						<p>Added option for filesystem, either BTRFS or EXT4</p>
					</div>
					<div className='release-notes-card'>
						<kbd>Release 17.05.2025</kbd>
						<p>Installing xcopy for nvim to copy to system clipboard</p>
						<p>Added Alacritty as terminal (replaces Kitty)</p>
						<p>Changed power meny to accept case-sensitive</p>
						<p>Better screenshot, now with option of custom filename</p>
						<p>Changed Nvim config to Lua</p>
						<p>Nvim with LSP. (Python, HTML, CSS, Javascript, LUA)</p>
						<p>Nvim plugin for orgmode</p>
					</div>
					<div className='release-notes-card'>
						<kbd>Release 04.06.2025</kbd>
						<p>Remove bloat due to NVIM install lang servers with the mason plugin.</p>
						<p>Fixing error when running fish shell</p>
					</div>
					<div className='release-notes-card'>
						<kbd>Release 06.07.2025</kbd>
						<p>added support for golang and c++.</p>
						<p>added support for golang and c++ in neovim</p>
					</div>
					<div className='release-notes-card'>
						<kbd>Release 20.07.2025</kbd>
						<p>Removed Qtile-extras because of a bug. See the "Important info" page at my website.</p>
						<p>Switch to Wezterm instead of Alacritty as terminal</p>
					</div>
					<div className='release-notes-card'>
						<kbd>Release 03.08.2025</kbd>
						<p>Added custom Bitwarden fuzzy finder written i GOlang.</p>
					</div>
					<div className='release-notes-card'>
						<kbd>Release 07.09.2025</kbd>
						<p>Changed gitlab path to bitwarden fuzzy finder (Not offical Bitwarden CLI)</p>
					</div>
					<div className='release-notes-card'>
						<kbd>Release 04.10.2025</kbd>
						<p>TobbeOS Fuzzy finder (Uses bitwarden CLI): Support copy username, password or MFA.</p>
						<p>Option to not show password for the output in TobbeOS Fuzzy finder (Uses bitwarden CLI).</p>
						<p>Added alias to run TobbeOS fuzzy finder (Bitwarden CLI No offical).</p>
					</div>
					<div className='release-notes-card'>
						<kbd>Release 12.11.2025</kbd>
						<p>Themes and GTK installing with chaotic-aur due to the death of GTK2.</p>
					</div>
				</div>
			</div>
		</section>
	</main>
	</>
	)
}
function App() {
	const [aktiv, settAktiv] = useState('null')
	return (
		<BrowserRouter>
		<div className='nav'>
			<ul className='navcontent'>
				<li><p ><Link to='/' className={aktiv === 'home' ? 'clicked' : ''} onClick={() => settAktiv('home')}>Home</Link></p></li>
				<li><p ><Link to='/about' className={aktiv === 'about' ? 'clicked' : ''} onClick={() => settAktiv('about')}>About</Link></p></li>
				<li><p ><Link to='/release' className={aktiv === 'release' ? 'clicked' : ''} onClick={() => settAktiv('release')}>Release Notes</Link></p></li>
				<li><p ><Link to='/news' className={aktiv === 'news' ? 'clicked' : ''} onClick={() => settAktiv('news')}>News!!!</Link></p></li>
				<li><p ><Link to='/important' className={aktiv === 'important' ? 'clicked' : ''} onClick={() => settAktiv('important')}>Important info</Link></p></li>
				<li><input value='Mirror page' type="button" id='mirrorNav' onClick={() => {window.location.href = 'https://tobbeos.lysakermoen.com/iso/';}}/></li>
			</ul>
			<img src='logo/TobbeOS_logo.png' alt='TobbeOS Logo' className='Logo'/>
		</div>

		<Routes>
		<Route path='/' element={<TobbeOS_index />} />
		<Route path='/about' element={<TobbeOS_about />} />
		<Route path='/release' element={<TobbeOS_release />} />
		<Route path='/news' element={<TobbeOS_news />} />
		<Route path='/important' element={<TobbeOS_important />} />
		</Routes>
		</BrowserRouter>
	)
}
createRoot(document.getElementById('root')!).render(
		<App />	
)


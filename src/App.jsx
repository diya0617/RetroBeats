
import {useRef,useState,useEffect} from 'react'
import lag from './assets/songs/lag.mp3'
import pyar from './assets/songs/pyar.mp3'
import tere from './assets/songs/tere.mp3'
import roop from './assets/songs/roop.mp3'
import pal from './assets/songs/pal.mp3'
import ajnabee from './assets/songs/ajnabee.mp3'
import baharo from './assets/songs/baharo.mp3'
import wada from './assets/songs/wada.mp3'
import tum from './assets/songs/tum.mp3'

const fallback='https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=700&auto=format&fit=crop'

const artists=[
{name:'Lata Mangeshkar',vibe:'Queen of Melody',image:'https://images.bhaskarassets.com/webp/thumb/512x0/web2images/1884/2025/02/06/lata_1738815917.jpg',songs:[
{title:'Lag Ja Gale',movie:'Woh Kaun Thi?',audio:lag},
{title:'Pyar Hua Ikrar Hua',movie:'Shree 420',audio:pyar},
{title:'Tere Bina Zindagi Se Koi',movie:'Aandhi',audio:tere}
]},
{name:'Kishore Kumar',vibe:'Retro Rockstar',image:'https://preview.redd.it/to-me-kishore-kumar-was-a-legend-whats-your-favorite-v0-si1fc4pyi6hf1.jpg?width=720&format=pjpg&auto=webp&s=34a91764889ebaf3556974386a46b798a2bc916d',songs:[
{title:'Roop Tera Mastana',movie:'Aradhana',audio:roop},
{title:'Pal Bhar Ke Liye',movie:'Johny Mera Naam',audio:pal},
{title:'Ek Ajnabee Haseena Se',movie:'Ajnabee',audio:ajnabee}
]},
{name:'Mohammed Rafi',vibe:'Golden Voice',image:'https://i.pinimg.com/736x/7d/47/35/7d4735fa17899ac5e54e72e7de6aa9a2.jpg',songs:[
{title:'Baharon Phool Barsao',movie:'Suraj',audio:baharo},
{title:'Kya Hua Tera Wada',movie:'Hum Kisise Kum Naheen',audio:wada},
{title:'Tum Jo Mil Gaye Ho',movie:'Hanste Zakhm',audio:tum}
]}
]

export default function App(){
const audioRef=useRef(null)
const [selected,setSelected]=useState(null)
const [playing,setPlaying]=useState(false)
const [dark,setDark]=useState(true)
const [progress,setProgress]=useState(0)
const [current,setCurrent]=useState({...artists[0].songs[0],artist:artists[0].name,image:artists[0].image})

const all=artists.flatMap(a=>a.songs.map(s=>({...s,artist:a.name,image:a.image})))

useEffect(()=>{
 if(!audioRef.current)return
 audioRef.current.load()
 if(playing){audioRef.current.play().catch(()=>setPlaying(false))}
},[current])

function imgErr(e){e.currentTarget.src=fallback}
function home(){setSelected(null);window.scrollTo({top:0,behavior:'smooth'})}
function open(a){setSelected(a);window.scrollTo({top:0,behavior:'smooth'})}
function playSong(s,a){setCurrent({...s,artist:a.name,image:a.image});setPlaying(true)}
function toggle(){
 const audio=audioRef.current
 if(!audio)return
 if(playing){audio.pause();setPlaying(false)}
 else{audio.play();setPlaying(true)}
}
function next(){
 const i=all.findIndex(s=>s.title===current.title&&s.artist===current.artist)
 setCurrent(all[(i+1)%all.length]);setPlaying(true)
}
function prev(){
 const i=all.findIndex(s=>s.title===current.title&&s.artist===current.artist)
 setCurrent(all[(i-1+all.length)%all.length]);setPlaying(true)
}
function timeUpdate(){
 const a=audioRef.current
 if(a&&a.duration)setProgress((a.currentTime/a.duration)*100)
}
function seek(e){
 const a=audioRef.current
 if(a&&a.duration){a.currentTime=(e.target.value/100)*a.duration;setProgress(e.target.value)}
}

return <div className={dark?'app dark':'app light'}>
<div className='blob b1'></div><div className='blob b2'></div>
<nav className='glass'>
<h1 onClick={home}>RetroBeats ✨</h1>
<div>{selected&&<button onClick={home}>← Home</button>}<button onClick={()=>setDark(!dark)}>{dark?'☀ Light':'🌙 Dark'}</button></div>
</nav>

{!selected?<>
<section className='hero'>
<div className='heroText glass'>
<p className='tag'>GOLDEN ERA • VINYL • GEN-Z</p>
<h2>Classic voices, premium retro vibes.</h2>
<p>Open any artist, choose a song, and enjoy exact uploaded MP3 playback with vinyl animation.</p>
<div className='btns'><button onClick={toggle}>{playing?'⏸ Pause':'▶ Start Listening'}</button><button onClick={()=>open(artists[0])}>Explore</button></div>
<div className='stats'><span>03 Artists</span><span>09 Songs</span><span>Golden UI</span></div>
</div>
<div className={playing?'vinyl spin':'vinyl'}><img src={current.image} onError={imgErr}/></div>
</section>

<section className='now glass'>
<div><p className='tag'>NOW PLAYING</p><h2>{current.title}</h2><p>{current.artist} • {current.movie}</p></div>
<button onClick={toggle}>{playing?'⏸ Pause':'▶ Play'}</button>
</section>

<h2 className='heading'>Golden Era Artists</h2>
<section className='grid'>
{artists.map(a=><div className='card glass' onClick={()=>open(a)} key={a.name}>
<img src={a.image} onError={imgErr}/><h2>{a.name}</h2><p>{a.vibe}</p><button>Open Artist →</button>
</div>)}
</section>
</>:<section className='artistPage'>
<div className='banner glass'>
<img src={selected.image} onError={imgErr}/>
<div><p className='tag'>ARTIST PAGE</p><h1>{selected.name}</h1><p>{selected.vibe}</p><button onClick={home}>← Back to Home</button></div>
</div>
<div className='songs glass'>
<h2>Popular Songs</h2>
{selected.songs.map((s,i)=><div className='song' onClick={()=>playSong(s,selected)} key={s.title}>
<span>{String(i+1).padStart(2,'0')}</span><div><h3>{s.title}</h3><p>{s.movie}</p></div><button>▶ Play</button>
</div>)}
</div>
</section>}

<footer className='player glass'>
<div className='left'><img src={current.image} onError={imgErr}/><div><h3>{current.title}</h3><p>{current.artist}</p></div></div>
<div className='controls'><div><button onClick={prev}>⏮</button><button className='main' onClick={toggle}>{playing?'⏸':'▶'}</button><button onClick={next}>⏭</button></div><input type='range' min='0' max='100' value={progress} onChange={seek}/></div>
<audio ref={audioRef} src={current.audio} onTimeUpdate={timeUpdate} onEnded={next}/>
</footer>
</div>
}

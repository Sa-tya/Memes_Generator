import { useState, useEffect } from "react";
import './memeG.css';

function Meme(props) {
    const { meme, setMeme } = props;
    const [form, setForm] = useState({
        template_id: meme.id,
        username: "teasty",
        password: "PPS$Asr52ttCfaF",
        boxes: [],
    })

    function generate() {
        let url = `https://api.imgflip.com/caption_image?template_id=${form.template_id}&username=${form.username}&password=${form.password}`;
        form.boxes.map((el, i) => 
            url += (`&boxes[${i}][text]=${el.text}`)
        );
        fetch(url).then(res => (res.json())).then(data => setMeme({ ...meme, url: data.data.url }))
    }
    return <div key="meme" className="cover1">
        <img src={meme.url} className="meme" alt={meme.name}></img>
        {[...Array(meme.box_count)].map((e, i) => <input key={i} placeholder={`Meme caption ${i + 1} `}
            onChange={e => {
                const newbox = form.boxes;
                newbox[i] = { text: e.target.value }
                setForm({ ...form, boxes: newbox });
            }}></input>)}
        <div>
            <button onClick={generate}>Create Meme</button>
            <button onClick={() => setMeme(null)}>Show Meme Templates</button>
        </div>
    </div>
}

function Template(props) {
    const { templ, setMeme } = props;
    return (templ.map(t => <div key={t.id} className="cover" >
        <img key={t.id} src={t.url} alt={t.name} onClick={() => { setMeme(t) }}>
        </img> </div>));
}

function Memegenerator() {
    const [templ, setTempl] = useState([])
    const [meme, setMeme] = useState(null)

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then((res) => res.json())
            .then((data) => {
                setTempl(data.data.memes)
            })
    }, [])
    return (<div key="parent" className="container">
        <h1 key="h1"> Meme Generator </h1>
        {meme ? <Meme meme={meme} setMeme={setMeme} /> : <Template templ={templ} setMeme={setMeme} />}
    </div>);
}
export default Memegenerator;
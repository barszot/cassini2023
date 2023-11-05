import mapa1 from "./mapa1.png"
import mapa2 from "./mapa2.png"
import mapa3 from "./mapa3.png"

function ImageButton(props){
    let {imgNum} = props;
    const {setImgNum} = props;
    const obsluzKlikniecie = () => {
        if(imgNum!==3){
        setImgNum(imgNum+1);
    }}
    let src = mapa1;
    if(imgNum === 2){
        src = mapa2;
    }
    if(imgNum === 3){
        src = mapa3;
    }
    return <img src={src} onClick={obsluzKlikniecie}>
    </img>
}

export default ImageButton;
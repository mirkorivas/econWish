import './index.css'
import stampEagle from './img/stampEagle.svg'
import stampEagle2 from './img/stampEagle2.svg'
import stampEagle2White from './img/stampEagle2White.svg'
import stampEagle2Grey  from './img/stampEagle2Grey.svg'


export default function Seal({imgSrc, sealStyle}) {
    //random number between 1 and 5 //NOW NUMBER DEFINED IN CARDMIRKO index.jsx
    //const randomNumber = Math.floor(Math.random() * 3) + 1;
    //5 different styles for the seal
    /*let style = {}; 
    switch(sealStyle){
        case 1:
            style = {left: '160px', bottom: '-30px', transform: 'rotate(-5deg)'};
            break;
        case 2:
            style = {left: '165px', bottom: '-35px', transform: 'rotate(-5deg)'};
            break;
        case 3:
            style = {left: '175px', bottom: '-40px', transform: 'rotate(-5deg)'};
            break;
    }*/
  return (
    <div className="seal" style={sealStyle}>
        <div className="seal-icon"><img src={imgSrc}/></div>
    </div>
  )
}
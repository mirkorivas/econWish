import Image from "mui-image"
import "./index.css"
import Seal from "../seal"
import SealEagle2Red from '../seal/img/stampEagle2Red.svg'

export default function Stamp({ imgSrc, sealStyle }) {
  return (
    <div className="stamp">
      <Image
        duration={0}
        src={imgSrc}
      />
      <Seal imgSrc={SealEagle2Red} sealStyle={{sealStyle}}/>
    </div>

  )
}
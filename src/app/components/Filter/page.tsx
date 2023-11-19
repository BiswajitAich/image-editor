import React,{ useState } from "react"
import RangeSlider from "../RangeSlider/page"


const Filter: React.FC=({filterData}) =>{
const [contrastValue, setContrastValue] = useState<number>(0)
const [brightnessValue, setBrightnessValue] = useState<number>(50)

  
const contrastData=(data: number)=>{
  setContrastValue(parseInt(data, 10));
  
}
const brightnessData=(data: number)=>{
    setBrightnessValue(parseInt(data, 10));
  
}


  
  return (
    <div>
      <div>
    <h4>contrast</h4>
        <RangeSlider sendData={contrastData} min={0} max={100} val={contrastValue}/>
    </div>


      <div>
    <h4>brightness</h4>
        <RangeSlider sendData={brightnessData} min={0} max={100} val={brightnessValue}/>
    </div>


      
      <div>{contrastValue}</div>
      <div>{brightnessValue}</div>
    </div>
  )
}
export default Filter
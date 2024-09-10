import { useNavigate } from "react-router-dom"
import mainlogo from '../../../src/assets/medbazzar-logo.png'
import list from '../../../src/assets/list.png'

export default function TitleComponent({title,logo,listicon,page}){
    var navigate=useNavigate()

return(<div style={{display:'flex',justifyContent:'space-between'}}>
        <div style={{display:'flex', flexDirection:'column'}}>
        <img src={mainlogo} style={{width:150 , height:40,}}/>
        <div style={{margin:7, fontSize:17}}>{title}</div>
        </div>

        <div  >
            <img src={list} style={{width:40,height:40 ,cursor:'pointer'}}  onClick={()=>navigate(page)} />
        </div>
       
       
</div>


)
}

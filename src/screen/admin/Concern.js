import { useState } from "react";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import { useStyles } from "./ConcernCss";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import TitleComponent from "../../component/admin/TitleComponent";
export default function Concern(props){
    var classes=useStyles()

    const [concern,setConcern]=useState('')
    const [icon,setIcon]=useState({file:'icon.jpg',bytes:''})
    const [error,setError]=useState({})

    const handleIcon=(event)=>{
        setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handleSubmit=async()=>{
        var submit=true
        if(concern.length==0){
            handleError('concern','please input Concern Type...')
            submit=false
        }
        if(icon.bytes.length==0){
            handleError('icon','please choose icon...')
            submit=false
        }
        if(submit){
            var formData= new FormData()
            formData.append('concernname',concern)
            formData.append('icon',icon.bytes)
            var result=await postData('concern/submit_concern',formData)
            if(result.status){
                Swal.fire({
                    icon: "Success",
                    title: result.message,
                    timer: 1500
                });
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: result.message,
                    timer: 1500
                });
            }
        }
    }

    const handleReset=()=>{
        setConcern('')
        setIcon({file:'icon.jpg',bytes:''})
    }

    return(<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent title="Add Concern" logo="logo.png" listicon="list.png" />
                </Grid>

                <Grid item xs={12}>
                    <TextField value={concern} onChange={(event)=>setConcern(event.target.value)} label="Concern" fullWidth
                     onFocus={()=>handleError('concern',null)} error={error.concern}
                     helperText={<span style={{fontFamily:'Kanit', color:'#d32f2f', fontSize:13}}>{error.concern}</span>} />
                </Grid>

                <Grid item xs={6}>
                    <Button variant="contained" component="label" fullWidth > Upload
                        <input type="file" hidden accept="images/*" multiple onChange={handleIcon} onClick={()=>handleError('icon',null)}></input> 
                    </Button>
                    {error.icon?<span style={{marginLeft:'4%',color:'#d32f2f',fontSize:13}}>{error.icon}</span>:<></>}
                </Grid>

                <Grid item xs={6} style={{display:'flex', justifyContent:'center'}}>
                    <Avatar alt="Icon" src={icon.file} variant="rounded" />
                </Grid>

                <Grid item xs={6}>
                    <Button variant="contained" fullWidth onClick={handleSubmit}> Submit </Button>
                </Grid>

                <Grid item xs={6}>
                    <Button variant="contained" fullWidth onClick={handleReset}> Reset</Button>
                </Grid>

            </Grid>
        </div>
    </div>)
}
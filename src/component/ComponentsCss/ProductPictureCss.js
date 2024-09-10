import { makeStyles } from "@mui/styles";


export const useStyles= makeStyles({


    imgdiv:{
        display:"flex", 
        height:"100%", 
        width:"100%", 
        justifyContent:"center", 
        alignItems:"center"

    },

    img:{
        width:"100%",
        height:'10vh',
        borderRadius: 10,
        aspectRatio:5/8
    },

    div1:{
        display:"flex", 
        justifyContent:'center',
        alignItems:"center", 
        width:"100%",
        height:'100vh',
        background:'black'
    },

    div2:{
        justifyContent:'center',
        width:"50%",
        height:"50%",
        alignItems:'center'
    },

    // ArrowUp:{
    //     zIndex:2,
    //     top:'23%', 
    //     right:"94.3%",
    //     position:'absolute',
    //     display:'flex',alignItems:'center',justifyContent:'center',
    //     width:40,height:40,
    //     borderRadius:20,
    //     background:'#fff',
    //     opacity:0.6
    // },

    // ArrowDown:{
    //     zIndex:2,
    //     bottom:"3%", 
    //     right:'94.3%',
    //     position:'absolute',
    //     display:'flex',alignItems:'center',justifyContent:'center',
    //     width:40,height:40,
    //     borderRadius:20,
    //     background:'#fff',
    //     opacity:0.6
    // },

    imgdiv2:{
        display:'flex',
        justifyContent:'center',alignItems:'center',
        width:'100%',
        height:'100vh',
        background:'#fff'
    }


})
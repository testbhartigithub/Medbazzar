import { makeStyles } from "@mui/styles"


export const useStyles=makeStyles({

    imgdiv :{
        display:'flex',
        marginLeft:12,
        marginRight:12,
        boxShadow:'1px 1px 10px 0px #00000010'
    },

    mainimages:{
            width: "80%",
            padding:3,  
            borderRadius: 10,
            height: 'auto',
            aspectRatio:3/3,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
    },
    maindiv:{
        width:'100%',
        position:'relative' 
    },
    
    title:{
        margin:'10px 0px 15px 15px',
         fontWeight:'bolder',
         fontSize:16
    },
    backArrow:{
        zIndex:2,
        top:'50%', 
        position:'absolute',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:28,height:30,
        borderRadius:10,
        background:'#95a5a6',
        opacity:0.5
    },

    ForwardArrow:{
        zIndex:2,
        top:'50%',
        right:'0.09%', 
        position:'absolute',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        width:28,height:30,
        borderRadius:10,
        background:'#95a5a6',
        opacity:0.6
    },

})
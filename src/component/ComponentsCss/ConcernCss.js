import { makeStyles } from "@mui/styles"


export const useStyles= makeStyles({


    image:{

        width: "80%",
        borderRadius: 10,
        height: 'auto',
        aspectRatio:2/2,
        marginLeft:10
    },

    maindiv:{
        fontWeight:'bolder',
        width:'98%',
         position:'relative',
    },

    title:{
        margin:'10px 0px 15px 15px', 
        fontWeight:'bolder',
        fontSize:16
    },

    ArrowBack:{
        display:'flex', 
        width:35, height:35, 
        borderRadius:19, 
        background:'#bdc3c7', 
        alignItems:'center', 
        justifyContent:'center', 
        opacity:0.6,
        position:'absolute', 
        zIndex:2,
        top:'50%', 
        left:'0.09%'
    },

    ArrowForward:{
        display:'flex', 
        width:35, height:35, 
        borderRadius:19, 
        background:'#bdc3c7', 
        alignItems:'center', 
        justifyContent:'center',
        cursor:'pointer',
        opacity:0.6,
        position:'absolute', 
        zIndex:2, 
        top:"50%", 
        right:'0.09%', 
        cursor:'pointer'
    }
})
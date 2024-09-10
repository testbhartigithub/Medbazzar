import { makeStyles } from "@mui/styles"


export const useStyles= makeStyles({

    imgdiv:{
        display: 'flex', 
        justifyContent: 'center',
        margin:10,
        boxShadow:'1px 1px 10px 0px #00010'
    },

    image:{
        width: "40%", 
        borderRadius: 0, 
        height: 'auto',
        aspectRatio:3/3 
    },

    BookMark:{
        display:'flex',
        marginLeft:'60%',
        fontSize:30,
    },

    maindiv:{
        fontWeight:'bolder',
        width:'100%',
         position:'relative',
         marginLeft:10
         },

    title:{
        fontSize:17,
        margin:'5px 0px 15px 15px' 
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
        top:'45%', 
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
        top:"45%", 
        right:'1%', 
        cursor:'pointer'
    }

})

import { makeStyles } from "@mui/styles"

export const useStyles = makeStyles({

    imgdiv:{
        marginLeft:3,
        marginRight:3,
        width:"90%",
        display:'block',
        borderRadius:10
    },

    mainimage:{
        width: "40%",
        borderRadius: 10,
        height: 'auto',
        aspectRatio:3/3,
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
    },

    categoryName:{
        marginLeft:3,
        marginRight:3,
        width:"90%",
        textAlign:'center',
        fontWeight:'bold'
    },

    maindiv:{
        width:'100%',
        position:'relative'
    },

    title:{
        margin:'10px 0px 15px 15px', 
        fontWeight:'bold',
        fontSize:16
    },

    ArrowBack:{
        zIndex:2,
        top:'50%', 
        position:'absolute',
        display:'flex',
        alignItems:'center',justifyContent:'center',
        width:28,height:30,
        borderRadius:10,
        background:'#95a5a6',
        opacity:0.5
    },

    
    ArrowForward:{
        zIndex:2,
        top:'50%',
        right:'0%', 
        position:'absolute',
        display:'flex',
        alignItems:'center',justifyContent:'center',
        width:28,height:30,
        borderRadius:10,
        background:'#95a5a6',
        opacity:0.5
    }




})



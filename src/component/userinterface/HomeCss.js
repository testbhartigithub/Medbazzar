import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({

    root :{
        display:'flex',
        width:'auto',
        height:'100vh',
        justifyContent:'center',
        alignItems:'center',
        background:'#dfe4ea'
    },

    box :{
        
        width:'60%',
        height:'auto',
        borderRadius:10,
        background:'#fff',
        padding:15,
        boxShadow:"0 0 15px #222"
    },

    center :{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
       
    },


    leftBarStyle: {
      display: 'flex',
      padding:5,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center',
      margin:10  
    },

    nameStyle:{
        fontFamily:'Kanit',
        fontSize:'20px',
        fontWeight:'bold'
    },

    emailStyle:{
        fontFamily:'Kanit',
        fontSize:'13px',
        fontWeight:'bold',
        color:'#3498db'
    },

    phoneStyle:{
        fontFamily:'Kanit',
        fontSize:'13px',
        fontWeight:'bold',
        color:'#3498db'

    },

    
    menuStyle:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        background:'#fff'
    },

    menuItemStyle :{
        fontFamily:'Kanit',
        fontSize:'20px',
        fontWeight:'bold',
        color:'grey'

    }
})
import { Paper,Grid, Divider, ListItem,List, ListItemText, ListItemIcon,TextField } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


export default function SideBar(props){
    var category=[{categoryid:[1, 2, 3, 4, 5],categoryname:"Home Care,Elderly Care ,Mom and Baby,Personal Care,Food and Beverage,Pet Supplies",picture:'19.webp'}]
    var brand=[{brandid:1, brandname:"Cadbury,Novology,Sunfeast,Zandu", picture:"1.webp"}]

    const categoryName=(item)=>{
      const name=item.categoryname.split(",");
      return name.map((name,index)=>(
        <div>
          {name}
        </div>
                 
    ));
    }

    const brandName=(item)=>{
      const name=item.brandname.split(",");
      return name.map((name,index)=>(
        <div>
          {name}
        </div>
                 
    ));
    }

    const searchBarComponent=()=>{
        return (
          <Paper
            component="form"
            sx={{ p: '2px 4px',margin:1, display: 'flex', alignItems: 'center', width:'80%' }}
          >
           
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search google maps' }}
            />
             <IconButton type="button" sx={{ p: '8px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            
          </Paper>
        );
    }
    const categoryNameDetail=()=>{
    return category.map((item,index)=>{return (
      <div>
        <Paper style={{display:'flex',width:'15%',height:'auto',background:'#f7f1e3'}}>
          <Grid item xs={6}>
            <div style={{fontSize:20,fontWeight:'bold',display:'flex',margin:15}}>Filter By</div>
            <Divider style={{borderWidth:1.8,marginTop:15, display:'flex',width:'auto'}}></Divider>
            <div style={{fontSize:18,color:'#006266',fontWeight:'bold',display:'flex',margin:10}}>Categories</div>
            <div>{searchBarComponent()}</div>
            
            <div style={{color:'#000',margin:10}}>{categoryName(item)}</div>
          </Grid>
        </Paper>
        
      </div>
      
    )})}

    const brandNameDetail=()=>{
      return brand.map((item,index)=>{return (
        <div>
          <Paper style={{display:'flex',width:'15%',height:'auto',background:'#f7f1e3'}}>
            <Grid item xs={6}>
              
              <Divider style={{borderWidth:1.8, display:'flex',width:'auto'}}></Divider>
              <div style={{fontSize:18,color:'#006266',fontWeight:'bold',display:'flex',margin:10}}>Brands</div>
              <div>{searchBarComponent()}</div>
              
              <div style={{color:'#000',margin:10}}>{brandName(item)}</div>
            </Grid>
          </Paper>
          
        </div>
        
      )})}

    return(<div>
      <div>{categoryNameDetail()}</div>
      <div>{brandNameDetail()}</div>
    </div>)
}
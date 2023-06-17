import './index.css'
import Image from 'mui-image'
import Seal from './seal'
import Stamp from './stamp'
import stampEagle2Black from './seal/img/stampEagle2Black.svg'
import EagleBrown from './seal/img/EagleBrown.svg'
import EagleLightBlue from './seal/img/EagleLightBlue.svg'
import EagleLightViolet from './seal/img/EagleLightViolet.svg'

import Share from './share'

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Container, Stack, TableContainer } from '@mui/material'
import { BorderAll, BorderBottom, BorderClear } from '@mui/icons-material'

import bg1 from './img/bg1.svg'
import bg2 from './img/bg2.svg'
import bg3 from './img/bg3.svg'


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

//Dictionnary to store id/sealstyle pairs and id/background pairs
const sealStyleDict = {}
const bgDict = {}

//Chosen seal
const chosenSeal=EagleLightViolet

export default function Card2({ user }) {
    //const { studentName, department, imgSrc, message, date, sender } = user;
    const { name, grade, imgSrc, wish, id } = user 
    const date = '06/2023'
    const sender = 'Mirko Rivas'
    
    const [imageFull, setImageFull] = React.useState(false);
    const handleImageFullClick = () => {
      setImageFull(!imageFull);
    };

    let sealStyle = {};
    //The app keeps loading the data so the seal kept moving, I had to store the style so it could remain the same for the same id
    //Check if the seal style is already in the dictionnary
    if (id in sealStyleDict){
        sealStyle = sealStyleDict[id]
    } else {
      //Randomize left and bottom position and make 3 possible choices
      const randomNumber = Math.floor(Math.random() * 3) + 1;
      switch(randomNumber){
          case 1:  sealStyle={left: '200px', bottom: '-50px', transform: 'rotate(-7deg)'}; break;
          case 2:  sealStyle={left: '150px', bottom: '-35x', transform: 'rotate(-18deg)'}; break;
          case 3:  sealStyle={left: '180px', bottom: '-20px', transform: 'rotate(30deg)'}; break;
      }   
      //Store the seal style in the dictionnary
      sealStyleDict[id] = sealStyle
    }

    //Same process for background
    let bgImg = ''
    if (id in bgDict){
        bgImg = bgDict[id]
    } else {
      //Randomize the background image
      const bgNumber = Math.floor(Math.random() * 3) + 1;
      switch(bgNumber){
          case 1:  bgImg=bg1; break;
          case 2:  bgImg=bg2; break;
          case 3:  bgImg=bg3; break;
      }
      bgDict[id] = bgImg
    }
  
    var cardContent = imageFull ? 
    <CardImgFull imgSrc={imgSrc} onClick={handleImageFullClick}/> :
    //Here Math.floor(Math.random() * 3) + 1 could be used to have a random seal style, but it changes everytime the data is loaded, can't fix it
    <CardNormal id={id} imgSrc={imgSrc} name={name} grade={grade} wish={wish} date={date} sender={sender} sealStyle={sealStyle} onClick={handleImageFullClick}/>
    

    if (!Object.values(user).includes(null) && !Object.values(user).includes(undefined) && !Object.values(user).includes('') && !Object.values(user).includes(' ')) {
      return (
        <Card className="card" mx={{ minWidth: 400, height: 500, maxWidth: 400, minHeight:500}} style={{backgroundImage:`url(${bgImg})`}}>
          <div id={`${id}`}></div>
          {cardContent}
        </Card> 
      );
    } 
  }

  function Addressee({ name, grade }) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 1}}>
        <div className="addressee">
            <div className="studentName">{name}</div>
            <div className="department">{grade}</div>
        </div>
      </Box>
    )
  }

  //Add a button to the image without changing the current layout
  function StampSeal({ imgSrc, seal, onClick, sealStyle}) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 1 }}>
        <div className="imageFrame">
            <div className="stamp">
                <Image src={imgSrc} alt="image" duration={0} onClick={onClick}/>
                <Seal imgSrc={seal} sealStyle={sealStyle}/>
            </div>
        </div>
      </Box>
    )
  }

  function WishSender({ wish, date, sender }) {
    return (
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 0 }}>
        <Typography paragraph>
            <div className="message">
                <div className="content">{wish}</div>
            </div>
        </Typography>
        </Box>
      </CardContent>
    )
  }
  //<div className="sender">{date + " - " + sender}</div> //Not needed anymore


  function CardImgFull({ imgSrc, onClick }) {  
    return (
      <CardContent>
      <div style={{ height: "483px", position: "relative" }}>
        <Image
          onClick={onClick}
          duration={0}
          src={imgSrc}
          fit="cover"
          position='center'
        />
        <IconButton
          aria-label="close"
          sx={{
            position: 'absolute',
            color: 'black',
            right: 8,
            top: 8
          }}
          onClick={onClick}
          style={{outline: 'none', visibility: 'hidden'}}
        >
          <CloseIcon />
        </IconButton>
      </div>
      </CardContent>
    )
  }

  function CardNormal({id, imgSrc, wish, date, name, grade, sender, sealStyle, onClick}) {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const [liked, setLiked] = React.useState(true);
    if(localStorage.getItem(id)=='true'){
      const [liked, setLiked] = React.useState(true);
    } else {
      const [liked, setLiked] = React.useState(false);
    }

    const handleLikeClick = () => {
      setLiked(!liked);
      if(liked){
        localStorage.setItem(id, 'true');
      } else {  
        localStorage.setItem(id, 'false');
      }
    };
    
    return (
      <div>
        <Addressee name={name} grade={grade}/>
        <StampSeal imgSrc={imgSrc} seal={chosenSeal} sealStyle={sealStyle} onClick={onClick}/>
        <CardActions disableSpacing>
        <IconButton 
          onClick={handleLikeClick}
          style={{ color: localStorage.getItem(id)=='true' ? 'red' : 'black', outline: 'none'}}>
          {localStorage.getItem(id)=='true'? 
            <FavoriteIcon fontSize='large'/> : 
            <FavoriteBorderIcon fontSize='large'/>}
        </IconButton>
        <Share />
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          style={{outline:"none"}}
          aria-expanded={expanded}
          aria-label="show more"
        >
        <ExpandMoreIcon />
        </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <WishSender wish={wish} date={date} sender={sender}/>
          </CardContent>
        </Collapse>
      </div>
    )
  }




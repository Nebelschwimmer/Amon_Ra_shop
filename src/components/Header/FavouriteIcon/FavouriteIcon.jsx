import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import IconButton from '@mui/material/IconButton';
import { UserContext } from '../../context/user_context';
import { CardContext } from '../../context/card_context';
import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import { Link } from 'react-router-dom';

export  function FavouriteIcon() {  
    const { parentCounter } =
    useContext(UserContext);
    const { favourites } = useSelector(s => s.products)
    const [counter, setCounter] = useState(parentCounter);
    useEffect(() => {
      setCounter((st) => st + 1);
  
      return () => setCounter(parentCounter);
    }, [parentCounter]);

    
    
    return ( 
    <div title="Избранное">
      
        <Link className="header__bubble_link"  to={"/favourites"}>
        <IconButton>
          <FavoriteBorderIcon sx={{ stroke: "#ffc74d", strokeWidth: 0.5, color:"#383838", opacity:"0.7" }}  fontSize='large' />
          {favourites.length !== 0 && <span className="header_like_bubble">{favourites.length}</span>}
          </IconButton>
        </Link>
      
    </div>
  );
  }

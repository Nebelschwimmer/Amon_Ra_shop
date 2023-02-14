import { Card } from '../Card/Card';
import './index.css';
import data from '../../data/data.json';
import { useEffect, useState } from 'react';

export const CardList = ({ items }) => {
  
  return (
    <div className='cards'>
      {items.map((element) => {
        console.log({ element });
        return <Card {...element} key={element.name}  />;
      })}
    </div>
  );
};
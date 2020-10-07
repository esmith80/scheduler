import React from "react";
import 'components/DayListItem.scss';
const classNames = require('classnames');


const formatSpots = (spots) => {
  if (!spots) {
    return "no spots remaining";
  } else if (spots > 1) {
    return `${spots} spots remaining`;
  } else {
    return '1 spot remaining'
  }
};

export default function DayListItem(props) {
  const dayListItemClass = classNames("day-list__item",
    { 
      "day-list__item--selected": props.selected,
      "day-list__item--full":     !props.spots  
    }
  );

  return (
    <li data-testid="day" className={dayListItemClass} onClick={() => props.setDay(props.name)}>
      <h2 >{props.name}</h2> 
      <h3 >{formatSpots(props.spots)}</h3>
    </li>
  );
}
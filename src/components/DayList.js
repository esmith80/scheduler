import React from "react";
import DayListItem from "./DayListItem";

export default function DayList (props) {
   
      const days = props.days.map((day) => {
        return (
          <DayListItem 
            key={day.id} 
            name={day.name} 
            selected={props.day === day.name}
            spots={day.spots}
            setDay={props.setDay}
          />);
      });

      return (<ul>{days}</ul>)
    
}
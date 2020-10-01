import React, { useState, useEffect } from "react";

import DayList from "./DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
import getAppointmentsForDay from "../helpers/selectors";
const axios = require('axios').default;

// appointment data
/*
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Jimmy Smith",
      interviewer: { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Susan Reynolds",
      interviewer: { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" }
    }
  },
  {
    id: 5,
    time: "7pm",
    interview: {
      student: "Ida Finkleman",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];
*/

export default function Application() {

  const setDay = day => setState({ ...state, day });

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {},
    interviewers: []
  });

  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  useEffect(() => {
    
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`api/interviewers`)
    ]).then((all) => {
      console.log(all[0].data); // days
      console.log(all[1].data); // appointments
      console.log(all[2].data); // interviewers
      
      const [days, appointments, interviewers] = all;  
      console.log(days, appointments, interviewers);
      
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });    
  
}, []);

  return (
    <main className="layout">
      <section className="sidebar">
         <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
            <DayList
              days={state.days}
              day={state.day}
              setState={setDay}
            />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          /> 
      </section>
      <section className="schedule">
        {dailyAppointments.map(appointment => <Appointment key={appointment.id} {...appointment} />)}
        <Appointment key="last" time="8pm" />
      </section>
    </main>
  );

}


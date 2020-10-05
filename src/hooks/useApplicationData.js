import React, { useState, useEffect } from "react";
const axios = require("axios").default;

/*
useApplicationData Hook will return an object with four keys.

The state object will maintain the same structure.
The setDay action can be used to set the current day.
The bookInterview action makes an HTTP request and updates the local state.
The cancelInterview action makes an HTTP request and updates the local state.

*/

export default function useApplicationData() {
  // ----------------- functions -----------------
  // get day index based on appointment ID
  function getDayIndex(appID) {
    return Math.ceil(appID / 5) - 1;
  }

  // INPUTS: id (a number to identify the appointment slot) and interview object
  // OUTPUTS: a promise that resolves if update to database via api was successful
  function bookInterview(id, interview, createMode) {
    // make a copy of an appointment object with the id that was passed in
    // overwrite the existing interview data with interview object that was passed in
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    // make a copy of the appointments (array/object?) but with the update
    // overwrite the appointment that was passed in with the newly created appointment
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [...state.days];
    if (createMode) {
      console.log("createMode ", createMode);
      // alter the days data to
      // using the appointment ID get the array index of the day
      const dayIndex = getDayIndex(id);
      const day = {
        ...state.days[dayIndex],
        spots: state.days[dayIndex].spots - 1,
      };

      days.splice(dayIndex, 1, day);
    }

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  function cancelInterview(id) {
    // create an appointment using appointments id to copy but set interview to null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // using the appointment ID get the array index of the day
    const dayIndex = getDayIndex(id);

    const day = {
      ...state.days[dayIndex],
      spots: state.days[dayIndex].spots + 1,
    };

    const days = [...state.days];
    days.splice(dayIndex, 1, day);

    // make request to axios and update appointment with interview = null
    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  function setDay(day) {
    console.log(day);
    setState({
      ...state,
      day,
    });
  }

  // ----------------- end of functions -----------------

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`api/interviewers`),
    ]).then((all) => {
      const [days, appointments, interviewers] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  return {
    state: state,
    setDay: setDay,
    bookInterview: bookInterview,
    cancelInterview: cancelInterview,
  };
}

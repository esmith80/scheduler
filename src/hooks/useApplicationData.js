import { useState, useEffect } from "react";
const axios = require("axios").default;

export default function useApplicationData() {

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [...state.days];

    // only run if interview is newly created (i.e. will not contain an interview)
    if (state.appointments[id].interview === null) {
      // use the appointment ID get the index in the days array
      const dayIndex = Math.ceil(id / 5) - 1;
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
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    // use the appointment ID get the index in the days array
    const dayIndex = Math.ceil(id / 5) - 1;

    const day = {
      ...state.days[dayIndex],
      spots: state.days[dayIndex].spots + 1,
    };

    const days = [...state.days];
    days.splice(dayIndex, 1, day);

    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  function setDay(day) {
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
      axios.get(`/api/interviewers`),
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

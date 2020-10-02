// selector in the context of React is a function that accepts state as a parameter

//this returns an array of appointments for that day

function getAppointmentsForDay(state, day) {
  const todaysAppointments = [];

  for (const dayInfo of state.days) {
    if (day === dayInfo.name) {
      for (const appID of dayInfo.appointments) {
        if (appID === state.appointments[appID].id) {
          todaysAppointments.push(state.appointments[appID]);
        }
      }
    }
  }
  return todaysAppointments;
}

function getInterview(state, interview) {
  // return an object that contains the interview data if it is passed an object that contains an interviewer
  // if there is no interview, return null, otherwise compose an object that has all the needed data to render
  return (interview) ? { "student": interview.student, "interviewer": state.interviewers[interview.interviewer]} : null;
}

export { getAppointmentsForDay, getInterview }


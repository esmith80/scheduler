// selector in the context of React is a function that accepts state as a parameter

//this returns an array of appointments for that day

export default function getAppointmentsForDay(state, day) {
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

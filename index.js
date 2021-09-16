// Your code here
function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employees) {
  return employees.map(createEmployeeRecord);
}

function createTimeInEvent(record, timestamp) {
  record.timeInEvents.push(createEvent(timestamp, "TimeIn"));
  return record;
}

function createTimeOutEvent(record, timestamp) {
  record.timeOutEvents.push(createEvent(timestamp, "TimeOut"));
  return record;
}

function createEvent(timestamp, eventType) {
  return {
    type: eventType,
    date: timestamp.split(" ")[0],
    hour: parseInt(timestamp.split(" ")[1]),
  };
}

function hoursWorkedOnDate(record, date) {
  const timeIn = record.timeInEvents.find((event) => event.date === date).hour;
  const timeOut = record.timeOutEvents.find(
    (event) => event.date === date
  ).hour;
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(record, date) {
  return hoursWorkedOnDate(record, date) * record.payPerHour;
}

function allWagesFor(record) {
  // get all the dates worked
  const dates = record.timeInEvents.map((entry) => entry.date);
  // get all the wages per day
  const wages = dates.map((date) => wagesEarnedOnDate(record, date));
  // add up all wages
  const totalWages = wages.reduce((memo, init) => memo + init);
  return totalWages;
}

function findEmployeeByFirstName(employeeRecords, firstName) {
  return employeeRecords.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(employees) {
  return employees.reduce((memo, employee) => memo + allWagesFor(employee), 0);
}

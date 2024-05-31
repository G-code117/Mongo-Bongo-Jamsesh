const addDataSuffix = (data) => {
  let dateStr = date.toString();

  const lastChar = dateStr.charAt(dateStr.length - 1 )
  if (lastChar === '1' && dateStr !== '11'){
    dateStr = `${dateStr}st`
  } else if(lastChar === '2' && dateStr !== '12'){
    dateStr = `${dateStr}nd`
  }else if(lastChar === '3' && dateStr !== '13'){
    dateStr = `${dateStr}rd`
  } else{
    dateStr = `${dateStr}th`
  }
  return dateStr;
}

const names = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Smith',
  'Jones',
  'Coollastname',
  'enter_name_here',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  'Xander',
  'Jared',
  'Courtney',
  'Gillian',
  'Clark',
  'Jared',
  'Grace',
  'Kelsey',
  'Tamar',
  'Alex',
  'Mark',
  'Tamar',
  'Farish',
  'Sarah',
  'Nathaniel',
  'Parker',
];

const appDescriptions = [
  'Decision Tracker',
  'Find My Phone',
  'Learn Piano',
  'Starbase Defender',
  'Tower Defense',
  'Monopoly Money Manager',
  'Movie trailers',
  'Hello world',
  'Stupid Social Media App',
  'Notes',
  'Messages',
  'Email',
  'Compass',
  'Firefox',
  'Running app',
  'Cooking app',
  'Poker',
  'Deliveries',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random assignments that we can add to student object.
const getRandomAssignments = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      assignmentName: getRandomArrItem(appDescriptions),
      score: Math.floor(Math.random() * (99 - 70 + 1) + 70),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = ( timestamp, {mongthlength = 'short', dateSuffix = true} = {}) =>{
  const month = {
    0: monthLength === 'short' ? 'Jan': 'January',
    1: monthLength === 'short' ? 'Feb': 'February',
    2: monthLength === 'short' ? 'Mar': 'March',
    3: monthLength === 'short' ? 'Apr': 'April',
    4: monthLength === 'short' ? 'May': 'May',
    5: monthLength === 'short' ? 'Jun': 'June',
    6: monthLength === 'short' ? 'Jul': 'July',
    7: monthLength === 'short' ? 'Aug': 'August',
    8: monthLength === 'short' ? 'Sep': 'September',
    9: monthLength === 'short' ? 'Oct': 'October',
    10: monthLength === 'short' ? 'Nov': 'November',
    11: monthLength === 'short' ? 'Dec': 'December',
   }
   const dateObj = new Date(timestamp);

   const formattedMonth = months[dateObj.getMonth()]

   const dayOfMonth = dateSuffix ? addDataSuffix(dateObj.getDate()): dateObj.getDate()

   const year = dateObj.getFullYear();
   let hour = dateObj.getHours() > 12 ? Math.floor(dateObj.getHours() - 12): dateObj.getHours()
   if(hour === 0){
    hour = 12
   }

   const minutes = (dateObj.getMinutes() < 10 ? '0': '') + dateObj.getMinutes()

   const periodOfDay = dateObj.getHours() >=12 ? 'pm': 'am'
   const formattedTimeStamp = `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`

   return formattedTimeStamp;
};

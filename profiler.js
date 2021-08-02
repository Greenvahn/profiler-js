
const path = require("path");
const fs = require("fs");
const readline = require("readline");
const Colour = require("Coloured"); // colouring terminal messages
Colour.extendString(); // colouring terminal messages

const pathFile = path.join(__dirname, "data/people.txt");
const peopleData = fs.readFileSync(pathFile, "utf-8");
const people = peopleData.split(",");

// Initialise readline prompt interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Profile holder
function profile (firstName, secondName, age) {
  this.firstName = firstName;
  this.lastName = secondName;
  this.age = age;
}

// Retrieve pofile values
const getProfile = (number) => {
  const [firstName, secondName, age] = people[number].split("|");
  const newProfile = new profile(firstName, secondName, age);
  return newProfile;
}

// add profile
const addProfile = (existingData, newProfile) => {
  const newData = `${existingData},${newProfile.firstName}|${newProfile.lastName}|${newProfile.age}`;
  fs.writeFileSync(pathFile, newData, { enconding: "utf-8" });
};

// remove profile
const removeProfile = (existingData, profileIndex) => {
  existingData.splice(profileIndex, 1);
  fs.writeFileSync(pathFile, `${existingData}`, { enconding: "utf-8" });
};

// Custom close message
rl.on("close", (message) => {
  message ? console.log(`\n ${message}`.yellow()) : console.log(`\n Terminating process. See you!!`.yellow());
  process.exit(0);
});


// Promtp questions
rl.question(
  "What would you like to do (read, write or remove)? ".yellow().bold(),
  (answer) => {
    answer = answer.replace(/ /g, ""); // Removes unncessary spaces
    switch (answer) {
      case 'read':
        rl.question(
          `Type a number (0-${people.length - 1}) to access a single profile OR type "all" to see the full list: `.yellow().bold(),
          (profile) => {
            profile = profile.replace(/ /g, "");
            if(!isNaN(profile)) {
              console.log(`Profile number ${profile} - details:`.green());
              console.table(getProfile(profile));

              rl.close();
            } else if ( profile ==='all') {
              console.table(people);
              rl.close();
            } else {
              rl.on("close", () => {
                console.log(
                  `\n${profile} is not valid answer.\n Terminating process - no nice, profiler is sad :(`.red()
                );
                process.exit(0);
              });
              rl.close();
            }
          }
        );
        break;
      case 'write':
        rl.question("Insert profile first name? ".yellow().bold(), (firstName) => {
          firstName = firstName.replace(/ /g, "")
          rl.question(
            "Insert profile second name? ".yellow().bold(),
            (secondName) => {
              secondName = secondName.replace(/ /g, "")
              rl.question("Insert age?".yellow().bold(), (age) => {
                age = age.replace(/ /g, "")
                const newProfile = new profile(firstName, secondName, age);
                addProfile(peopleData, newProfile);
                console.log("New profile added!!".green());
                rl.close();
              });
            }
          );
        });
        break;
      case 'remove':
        rl.question(`Insert profile number to remove (0-${people.length - 1}) `.yellow().bold(), (number) => { 
          number = number.replace(/ /g, "")
          console.log(`Accessing profile number ${number} ...`.yellow());
          console.table(getProfile(number));
          rl.question("Are you sure you want to remove this profile ( yes / no )? ".red().bold(), (answer) => {
            answer = answer.replace(/ /g, "")
            if(answer === 'yes') {
              removeProfile(people, number)
              console.log(`Profile ${number} has been removed!!`.yellow());
              rl.close();
            } else {
              console.log(`\n The Profile has NOT been removed.`.yellow());
              rl.close();
            }
          })
        });
        break;
      default:
        rl.on("close", () => {
          console.log(
            `\n${answer} is not valid answer.\n Terminating process - no nice, profiler is sad :(`.red()
          );
          process.exit(0);
        });
        rl.close();
    }
  }
);

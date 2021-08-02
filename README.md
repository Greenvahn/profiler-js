# Node js profiler
Small node js application to read, write and remove profiles from a single data file.

Run the application from your termainal an follow the steps. Each profile is contains _Name, Surname and age_ and is read from the sample **_people.txt_** file.

The data file can be easily converted into a .CSV file since is a comma separated file.

There is an initial **_people.txt_** as sample file - it can be found inside of the _data_ folder. Feel free to change the name of the data file but remember to update the _path_ instance in **profiler.js**
```
const pathFile = path.join(__dirname, "data/people.txt");
```

**Profiler.js** has been created following the [Node.js](https://nodejs.org/api/) documentation.

### Technologies
* [Node.js](https://nodejs.org/en/download/)
* [Yarn](https://classic.yarnpkg.com/en/) or [NPM](https://www.npmjs.com/)



## Project setup
Examples below made with yarn. Feel free to use npm.

```
yarn install
```

### Runs profiler in the terminal
```
yarn profiler
```
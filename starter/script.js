'use strict';

//CONSTRUCTOR FUNCTION (dose not work with arrow function)
//in opp an object created from a class is called AN INSTANCE

const person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const jonas = new person('jonas', 1996);
console.log(jonas);

// 1. New () is created
// 2. functions is called, this = ()
// 3. () linked is prototype
// 4. function automatically return ()

const matilda = new person('matilda', 2010);
const jack = new person('jack', 2009);

console.log(matilda, jack);

console.log(jonas instanceof person);

//PROTOTYPES

person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();

console.log(jonas, __proto__);
console.log(jonas, __proto__ === person.prototype);

person.prototype.species = 'Homo sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

//////////////////////////////////////////

console.log(jonas.__proto__);

console.log(jonas, __proto__, __proto__);
console.log(jonas, __proto__, __proto__, __proto__);

console.dir(person.prototype.constructor);

const arr = [3, 5, 6, 8, 6, 2, 5, 1, 5];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__, __proto__);

Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

///////////////////
//1. CHALLENGE

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};
const BMW = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);

Car.prototype.acc = function () {
  console.log(10 + this.speed);
};

BMW.acc();
Mercedes.acc();

Car.prototype.brake = function () {
  console.log(`${this.speed - 5}km/h`);
};

BMW.brake();
Mercedes.brake();
console.log('___break___');
//2. CHALLENGE
class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  brake() {
    console.log(this.speed - 5);
  }
  acc() {
    console.log((this.speed += 10));
  }
  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(curSpeed) {
    this.curSpeed = curSpeed * 1.6;
  }
}

const bmw = new CarCl('BMW', 120);
const MCD = new CarCl('Mercedies', 95);
const ford = new CarCl('ford', 120);
bmw.brake();
MCD.brake();
ford.brake();
ford.speedUS = 50;
console.log(ford);

bmw.acc();
MCD.acc();
ford.acc();

console.log(bmw.speedUS, MCD.speedUS, ford.speedUS);

////////////////////////////////////////////////
///3. CHALLENGE

// const Car1 = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };
const EV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.acc = function () {
  console.log(
    `${this.make} going at ${(this.speed += 20)}km/h with a charge of ${this
      .charge--}km/h`
  );
};

const tesla = new EV('tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.acc();
tesla.brake();
///////////////////////////////////////////
///////////////////////////////////////////
//CLASSES

class personCL {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  calcAge() {
    console.log(2037 - this.birthYear);
  }
  great() {
    console.log(`hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get firstName() {
    return this._fullName;
  }

  static hey() {
    console.log(`Hey there 👋`);
  }
}

const jessica = new personCL('jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();

console.log(jessica.__proto__ === personCL.prototype);

/*
personCL.prototype.great = function () {
    console.log(`hey ${this.firstName}`)
}*/

jessica.great();

console.log(jessica.age);

//WORKING WITH CLASSES
//1. CLASSES ARE NOT HOISTED
//2. CLASSES ARE FIRST-CLASS CITIZENS
//3. CLASSES ARE EXCUTED IN STRICT MODE

///////////////////////////////////
//GETTERS AND SETTERS
const walter = new personCL('walter white', 1990);

personCL.hey();
const account = {
  owner: 'jonas',
  movments: [200, 400, 500, 300, 100],

  get latest() {
    return this.movments.slice(-1).pop();
  },

  set latest(mov) {
    this.movments.push(mov);
  },
};

console.log(account.latest);

account.latest = 50;
console.log(account.movments);

/*
const personProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(personProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

const sarah = Object.create(personProto);
sarah.init('sarah', 1997);
sarah.calcAge();
*/
///////////////////////////////////////

const person1 = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

person1.prototype.calcAge = function () {
  console.log(2034 - this.birthYear);
};

const student = function (firstName, birthYear, Course) {
  person1.call(this, firstName, birthYear);
  this.Course = Course;
};

//linking prototype
student.prototype = Object.create(person1.prototype);

student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and i study ${this.Course}`);
};

const mike = new student('mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

//makes the prototype of student stay to student
student.prototype.constructor = student;

class studentCl extends personCL {
  constructor(fullName, birthYear, Course) {
    super(fullName, birthYear);
    this.Course = Course;
  }

  introduce() {
    console.log(`My Name is ${this.firstName} and i study ${this.Course}`);
  }

  //practicing polymophisim by overwriting the calcaga method from the parente class
  calcAge() {
    console.log(
      `i'm ${
        2037 - this.birthYear
      } years old but as a student i feel more like a ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new studentCl('martha Jonas', 2012, 'computer science');
console.log(martha);
martha.introduce();
martha.calcAge();

const personProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

//////////////////////////////////
const steven = Object.create(personProto);
console.log(steven);

const studentProto = Object.create(personProto);
studentProto.init = function (firstName, birthYear, Course) {
  personProto.init.call(this, firstName, birthYear);
  this.Course = Course;
};

studentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and i study ${this.Course}`);
};
const jay = Object.create(studentProto);
jay.init('jay', 2010, 'computer Science');
jay.introduce();
jay.calcAge();

////////////////////////////////////
//PUBLIC FIELD
//PRIVATE FIELD
//PUBLIC METHOD
//PRIVATE METHOD

class Account {
  //public field: which means there are not on the prototype,there on the instance
  local = navigator.language;
  // _movments = []

  //private fields:
  #movments = [];

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    // this._movments = [];
    // this.local = navigator.language;

    console.log(`thanks for opening an account, ${owner}`);
  }

  getMovements() {
    return this.#movments;
  }

  deposit(val) {
    this.#movments.push(val);
  }

  withdraw(val) {
    this.deposit(-val);
  }

  //this one will not be involed in the public api
  //PUBLIC METHOD
  approveLoan(val) {
    return true;
  }

  requestLoan(val) {
    if (this.approveLoan(val)) {
      this.deposit(val);

      console.log('Loan Approved');
    }
  }
}

const acc1 = new Account('jonas', 'EUR', 1111);
acc1.deposit(230);
acc1.withdraw(140);
acc1.requestLoan(1000);
acc1.approveLoan(1000);
console.log(acc1.getMovements());

console.log(acc1);

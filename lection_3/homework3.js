'use strict'

//1.
const user = {
  name: 'Bob',
  funcFunc() {
    return function () {
      console.log(this)
    }
  },
  funcArrow() {
    return () => {
      console.log(this)
    }
  },
  arrowFunc: () => {
    return function () {
      console.log(this)
    }
  },
  arrowArrow: () => {
    return () => {
      console.log(this)
    }
  },
}

user.funcFunc()() // global object или undefined (в строгом режиме)  descr: метод возвращает обычную функцию, а не как метод, следовательно и контекст будет указывать на глобальный объект или undefined
user.funcArrow()() // user object   descr: стрелка берет контекст метода в который она вложена, а метод привязан к объекту user
user.arrowFunc()() // global object   desc: сам метод является стрелкой, а значит без своего контекста. возвращаемая функция - обычная, не метод объекта, а значит this определяется котекстом вызова, следовательно -> контекст будет указывать на глобальный объект или undefined
user.arrowArrow()() // global object   descr: стрелочная функция и возвращает тоже стрелку, следовательно -> контекст будет указывать на глобальный объект или undefined

// description:
/**/

// 2
var poke1 = { name: 'Pikachu' }
var poke2 = { name: 'Chermander' }
var poke3 = { name: 'Bulbasaur' }

var sayName = function () {
  console.log(this.name)
}

sayName.bind(poke1).bind(poke2).call(poke3) // Pikachu
// description:
/*метод bind работает таким образом, что создаёт новую функцию с фиксированным значением this и этот контекст в дальнейшем нельзя изменить ни с помощью последующих вызовов bind, ни с помощью методов call или apply*/

// 3
const obj = {
  firstName: 'Bill',
  lastName: 'Ivanov',

  showFirstName: function () {
    console.log(this.firstName)
  },

  showLastName: () => {
    console.log(this.lastName)
  },
}

obj.showFirstName() // Bill  desrc: метод вызывается в контексте объекта obj
obj.showLastName() // undefined descr: у стрелочной функции нет своего контеста, она берет ее из окружения, в котором определена, в данном случае конест глобальный, а в глобальном контексте нет свойства lastName
obj.showFirstName.bind({ firstName: 'Boris' })() // Boris descr: явно задали контекст через метод bind
obj.showFirstName.bind({ firstName: 'Boris' }).bind({ firstName: 'Oleg' })() // Boris descr: повторное применение метода bind игнорируется
obj.showLastName.bind({ lastName: 'Boris' })() // undefined descr: у стрелочной функции нет своего контекста, но также его и нельзя явно задавать, следовательно ответ будет как и втором ответе

// 4
const user2 = {
  name: 'Mike',
  fn: function () {
    console.log(this.name)
  },
}

setTimeout(user2.fn.bind(user2), 1000) // первый вариант решения
setTimeout(() => user2.fn(), 1000) // второй вариант решения

// Что будет выведено в консоль после истечения таймаута и почему?
/*При передаче метода объекта в качестве колбэков для setTimeout this - теряется*/

// Сделайте так, чтоб починить и выводило "Mike"
/* Починить можно несколькими способами:
1. Явно задать контест при помощи метода bind.
2. обернуть вызов метода в функцию, что создать замыкание и следовательно привяжет контекст объекта user
*/

// 5
// Исправьте cтроку(***), чтобы всё работало (других строк изменять не надо, кроме password, чтобы проверить if else).

function askPassword(ok, fail) {
  let password = 'rockstar'
  if (password == 'rockstar') ok()
  else fail()
}

let user3 = {
  name: 'Вася',

  loginOk() {
    console.log(`${this.name} logged in`)
  },

  loginFail() {
    console.log(`${this.name} failed to log in`)
  },
}

askPassword(user3.loginOk.bind(user3), user3.loginFail.bind(user3)) // 1 вариант решения
askPassword(
  () => user3.loginOk(),
  () => user3.loginFail()
) // второй вариант решения
// description:
/*при передаче методов в функцию контекст this теряется, решения аналогичны прошлой задаче, либо явно через bind, либо обьернуть в анонимную функцию для замыкания*/

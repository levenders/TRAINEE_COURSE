// 1
const a = {
    b: 1,
  },
  c = Object.create(a)

console.log(c.b) // Ответ: 1. Наследует у прототипа
delete c.b
console.log(c.b) // Ответ: 1. Не может удалить то, чего у него нет. Наследует у прототипа
delete a.b
console.log(c.b) // Ответ: undefined. Не находит выше по цепочке
a.z = 2
console.log(c.z) // Ответ: 2. Наследует у прототипа
c.z = 3
console.log(a.z) // Ответ: 2. Свойство изменено у наследуемого, но не у прототипа

// 2.

const promise = new Promise(() => {})
console.log(promise.prototype === Promise.__proto__) // false. Должно быть наоборот

const obj = {}
console.log(obj.__proto__ === Object.prototype) // true.

console.log(new Array([]).__proto__ === Array.prototype) // true

function Fn1() {}
function Fn2() {}
console.log(Fn1.constructor === Fn2.constructor) // true. конструктор один, от Function

console.log(Fn1.prototype === Fn2.prototype) // false. Это разные прототипы

//3.
// У вас есть два конструктора, Animal и Bird.
// Каждый объект типа Bird должен наследовать метод speak от Animal.
// Однако, Bird также должен иметь свой собственный метод fly.

// Создайте функцию-конструктор Animal, который принимает параметр name и устанавливает его как свойство объекта.

function Animal(name) {
  this.name = name
}

// Добавьте метод speak в Animal, который выводит в консоль звук, издаваемый животным (например, "Some generic sound").

Animal.prototype.speak = function () {
  console.log(`Some generic sound`)
}

// Создайте конструктор Bird, который принимает параметр name и вызывает конструктор Animal с тем же именем.

function Bird(name) {
  Animal.call(this, name)
}

Bird.prototype = Object.create(Animal.prototype)
Bird.prototype.constructor = Bird // явно задаем конструктор после потери

// Добавьте метод fly в Bird, который выводит в консоль сообщение о том, что птица летит (например, "Flying high!").

Bird.prototype.fly = function () {
  console.log(`Flying high!`)
}

// Создайте объекты animal и bird с использованием соответствующих конструкторов и вызовите их методы speak и fly.
// Решите задачу, используя прототипное наследование, чтобы Bird наследовал от Animal.

const animal = new Animal('Дженни')
const bird = new Bird('Воробей')

animal.speak() // "Some generic sound"
bird.speak() // "Some generic sound"
bird.fly() // "Flying high!"

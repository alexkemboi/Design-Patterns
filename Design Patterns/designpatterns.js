// === 1. SINGLETON PATTERN ===
// Ensures only one instance of a class is created.

class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = this;
        }
        return Singleton.instance;
    }

    logMessage(message) {
        console.log(`Log: ${message}`);
    }
}

// Usage
const logger1 = new Singleton();
const logger2 = new Singleton();
logger1.logMessage("Singleton pattern in action");
console.log(logger1 === logger2); // true (Same instance)

// === 2. FACTORY PATTERN ===
// Creates objects without specifying the exact class.

class Car {
    constructor(brand) {
        this.brand = brand;
    }

    drive() {
        console.log(`Driving a ${this.brand}`);
    }
}

class CarFactory {
    static createCar(brand) {
        return new Car(brand);
    }
}

// Usage
const car = CarFactory.createCar("Tesla");
car.drive(); // Driving a Tesla

// === 3. BUILDER PATTERN ===
// Constructs complex objects step by step.

class Computer {
    constructor() {
        this.RAM = "";
        this.storage = "";
    }

    setRAM(RAM) {
        this.RAM = RAM;
        return this;
    }

    setStorage(storage) {
        this.storage = storage;
        return this;
    }

    build() {
        return this;
    }
}

// Usage
const computer = new Computer().setRAM("16GB").setStorage("1TB").build();
console.log(computer); // { RAM: '16GB', storage: '1TB' }

// === 4. ADAPTER PATTERN ===
// Converts one interface into another expected by the client.

class OldSystem {
    fetchData() {
        return "Old System Data";
    }
}

class NewSystem {
    getData() {
        return "New System Data";
    }
}

// Adapter to make NewSystem compatible with OldSystem interface
class Adapter {
    constructor(newSystem) {
        this.newSystem = newSystem;
    }

    fetchData() {
        return this.newSystem.getData();
    }
}

// Usage
const newSystem = new NewSystem();
const adapter = new Adapter(newSystem);
console.log(adapter.fetchData()); // New System Data

// === 5. DECORATOR PATTERN ===
// Dynamically adds behavior to objects.

class Coffee {
    cost() {
        return 5;
    }
}

class MilkDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }

    cost() {
        return this.coffee.cost() + 2;
    }
}

// Usage
const coffee = new Coffee();
const milkCoffee = new MilkDecorator(coffee);
console.log(milkCoffee.cost()); // 7

// === 6. PROXY PATTERN ===
// Controls access to an object, adding security or caching.

class Server {
    request(url) {
        console.log(`Fetching data from ${url}`);
    }
}

class ProxyServer {
    constructor() {
        this.cache = {};
        this.server = new Server();
    }

    request(url) {
        if (!this.cache[url]) {
            this.cache[url] = `Cached data from ${url}`;
            this.server.request(url);
        }
        return this.cache[url];
    }
}

// Usage
const proxy = new ProxyServer();
console.log(proxy.request("api/data")); // Fetching data from api/data
console.log(proxy.request("api/data")); // Cached data from api/data

// === 7. OBSERVER PATTERN ===
// Allows multiple objects to react to changes in another object.

class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(observer) {
        this.observers.push(observer);
    }

    notify(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

class Observer {
    update(data) {
        console.log(`Received data: ${data}`);
    }
}

// Usage
const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();
subject.subscribe(observer1);
subject.subscribe(observer2);
subject.notify("Observer pattern activated"); // Both observers get notified

// === 8. STRATEGY PATTERN ===
// Defines a family of algorithms and makes them interchangeable.

class PaymentStrategy {
    pay(amount) {
        throw new Error("Method must be implemented");
    }
}

class CreditCardPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Paid ${amount} using Credit Card`);
    }
}

class PayPalPayment extends PaymentStrategy {
    pay(amount) {
        console.log(`Paid ${amount} using PayPal`);
    }
}

class PaymentProcessor {
    constructor(strategy) {
        this.strategy = strategy;
    }

    processPayment(amount) {
        this.strategy.pay(amount);
    }
}

// Usage
const payment = new PaymentProcessor(new CreditCardPayment());
payment.processPayment(100); // Paid 100 using Credit Card

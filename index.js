// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0, mealId = 0, customerId = 0, deliveryId = 0;


class Neighborhood{
  constructor(name){
    this.name = name;
    this.id = ++neighborhoodId;

    store.neighborhoods.push(this);
  }

  deliveries(){
    return store.deliveries.filter(
        function(delivery) {
            return delivery.neighborhoodId === this.id;
        }.bind(this)
    );
  }

  customers(){
    return store.customers.filter(
        function(customer) {
            return customer.neighborhoodId === this.id;
        }.bind(this)
    );
  }

  meals(){
    return store.meals.filter(
        function(meal) {
            return meal.deliveries().filter(function(delivery){ return delivery.neighborhoodId === this.id; }.bind(this) );
        }.bind(this)
    );
  }
}


class Customer{
  constructor(name, neighborhoodId){
    this.name = name;
    this.neighborhoodId = neighborhoodId
    this.id = ++customerId;

    store.customers.push(this);
  }

  deliveries(){
    return store.deliveries.filter(
        function(delivery) {
            return delivery.customerId === this.id && delivery.neighborhoodId === this.neighborhoodId;
        }.bind(this)
    );
  }

  totalSpent(){
    return this.meals().reduce(
        function(total, meal) {
            return total + meal.price;
        }, 0
    );
  }

  meals(){
    return store.meals.filter(
        function(meal) {
            return meal.deliveries().filter(function(delivery){ return delivery.customerId === this.id && delivery.neighborhoodId === this.neighborhoodId; }.bind(this) );
        }.bind(this)
    );//.filter((meal, index, self) => self.indexOf(meal) === index)
  }
}


class Meal{
  constructor(title, price){
    this.title = title;
    this.price = price;
    this.id = ++mealId;

    store.meals.push(this);
  }

  deliveries(){
    return store.deliveries.filter(
        function(delivery) {
            return delivery.mealId === this.id;
        }.bind(this)
    );
  }

  byPrice(){
    return store.meals.sort(
        function(meal1, meal2) {
            return meal1.price - meal.price;
        }
    );
  }

  customers(){
    return store.customers.filter(
        function(customer) {
            return customer.mealId === this.id;
        }.bind(this)
    );
  }
}


class Delivery{
  constructor(mealId, neighborhoodId, customerId){
    this.mealId = mealId;
    this.customerId = customerId;
    this.neighborhoodId = neighborhoodId;
    this.id = ++deliveryId;

    store.deliveries.push(this);
  }

  meal(){
    return store.meals.find(
        function(meal) {
            return meal.id === this.mealId;
        }.bind(this)
    );
  }

  customer(){
    return store.customers.find(
        function(customer) {
            return customer.id === this.customerId;
        }.bind(this)
    );
  }

  neighborhood(){
    return store.neighborhoods.find(
        function(neighborhood) {
            return neighborhood.id === this.neighborhoodId;
        }.bind(this)
    );
  }
}

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
    return store.deliveries.filter((delivery) => delivery.customerId === this.id && delivery.neighborhoodId === this.neighborhoodId );
  }

  totalSpent(){
    return this.meals().reduce( (total, meal) => total + meal.price, 0 );
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
    return store.deliveries.filter((delivery) => delivery.mealId === this.id );
  }

  byPrice(){
    return store.meals.sort((meal1, meal2) => meal1.price - meal.price );
  }

  customers(){
    return store.customers.filter((customer) => customer.mealId === this.id );
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
    return store.meals.find((meal) => meal.id === this.mealId );
  }

  customer(){
    return store.customers.find((customer) => customer.id === this.customerId );
  }

  neighborhood(){
    return store.neighborhoods.find((neighborhood) => neighborhood.id === this.neighborhoodId );
  }
}

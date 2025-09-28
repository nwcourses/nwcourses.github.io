Object Oriented Design and Development
======================================

Topic 2: Encapsulation and Inheritance
======================================

Encapsulation
-------------

Object-oriented programming makes use of a technique called _encapsulation_ to control operations on the properties of a class and prevent unintended errors and data corruption occurring. Here is another version of last week's Cat class:

```javascript
class Cat(private val name: String, private var age: Int, private var weight: Int) {
    
    public fun walk() {
        weight--
    }


    public override fun toString(): String {
        return "Name: $name, age: $age, weight: $weight" 
    }
}
```

you can see the use of the keywords `private` and `public` throughout the code. What do these mean?

*   Any property or method preceded by the keyword `private` can only be used _inside the current class_.
*   Any property or method preceded by the keyword `public` can be used _both inside and outside the class_.
*   **In fact `public` is the default, so you can omit it.** It's just shown here to clearly illustrate the difference between `public` and `private`.

So you can see that in this example, _the methods can be used outside the class_ but _the properties can only be used inside it._. The `main()` - repeated below - calls the _method_ `walk()`, and all references to the _properties_ are within the methods inside the class.

```javascript
fun main () {
    val clyde = Cat ("Clyde", 2, 5)
    val binnie = Cat ("Binnie", 5, 4)
        
    println(clyde)
    println(binnie)
        
    clyde.walk()
    binnie.walk()

    println(clyde)
    println(binnie)
        
    clyde.walk()
    println(clyde)
}
```

This is common practice and is known as _encapsulation_. Encapsulation means to keep the inner workings of the class hidden from the outside world, and control access to those inner workings by means of the methods, which act as "gateways" between the outside world and the interior of the class.

@ex1

@answer(1)

It gives more flexibility to the code using the class: it allows the code using the Cat class (`main()` in this case) to choose how to display it, which may not be via `println()`. For example, a GUI application (which we are looking at later) does not use `println()` to display things.

For the flexibility reason above, **you should in general use `toString()` rather than trying to write methods which print to the console.**. It allows your code to be used in non-console environments, e.g. web or Android.

@public

#### Why perform encapsulation?

Why is encapsulation performed? Consider this new version of the Cat class:

```kotlin
class Cat(private val name: String, private var age: Int, private var weight: Int) {
    
    public fun walk() : Boolean {
        if(weight > 5) {
            weight--
            return true
        } 
        return false
    }

    public override fun toString(): String {
        return "Name: $name, age: $age, weight: $weight" 
    }
}
```

This new version includes an `if` statement inside the `walk()` method, which prevents the cat from walking if the weight is 5 or less. Thus we are _controlling how the cat's weight can be altered_ using the walk() method. We are preventing unrealistic things happening, such as changing the cat's weight to an unrealistic value - and thus improving the robustness of our code. So if we tried the following in the main():

```kotlin
fun main () {
    val sniffy = Cat ("Sniffy", 5 , 7)
        
    for(i in 1..3) {
        println(if (sniffy.walk()) "Walk successful" else "Walk failed")
    } 
}
```

The first two calls to `walk()` would succeed, as the weight would be reduced from 7 to 6 and then from 6 to 5. However the third call to `walk()` would fail, as the weight would now be 5 and cannot be reduced any further.

Note also how we place an _`if` expression_, which we saw last week, inside the `for` loop:

```kotlin
if(sniffy.walk()) "Walk successful" else "Walk failed"
```

The `walk()` method returns a boolean, so the `if` expression will evaluate to either `"Walk successful"` or `"Walk failed"` depending on whether `true` or `false` was returned. So the appropriate message will be displayed, with this output:

```
Walk successful
Walk successful
Walk failed
```

Note how we have _used encapsulation to prevent unrealistic things happening_. The following code will _not compile_ but _only because weight is private_:

```kotlin
fun main () {
    val sniffy = Cat ("Sniffy", 5 , 7)
    
    sniffy.weight = -1
}
```

If the weight was not `private`, you would legitimately be able to set it to -1 from the main() as in the above example. This illustrates the whole concept of encapsulation: _to keep the inner workings of a class private and control access from the outside world, to prevent the outside world corrupting it._

@ex2

@answer(2)

The reason that we return a `boolean` from `walk()` is essentially the same as the reason we return a `String` from `toString()` rather than just displaying an console error message if the cat cannot walk. It allows our class to be more **reusable**. We might want to use our `Cat` class in many different applications, and each application might wish to display the error differently. So a console application might display the error on the console, while a GUI application might display the error within the GUI.

### Getters and setters

It is fairly common in object-oriented programming that we wish to prevent the outside world _changing_ an property, but allow the outside world to _access_ it. How can we do this? We can make the property public (the default) and then specify that it can only be changed (_set_) inside the class using _`private set`_. Here is an example:

```kotlin
class Cat(private val name: String, private var age: Int, weightIn: Int) {

    var weight = 0
        _private set_

    init {
        weight = weightIn
    }
    
    public fun walk() : Boolean {
        if(weight > 5) {
            weight--
            return true
        } 
        return false
    }

    public override fun toString(): String {
        return "Name: $name, age: $age, weight: $weight" 
    }
}
```

Note how we _no longer make the `weightIn` parameter an property_ (because we cannot use `private set` in that case). Instead, we declare the weight as an property separately (as in the first object-oriented example from last week) and, on the following line and indented by one tab, specify that it cannot be set from outside using `private set`. Finally, we use the `init` block to set the `weight` property equal to the `weightIn` parameter (as in the first example from last week).

As a result of this approach, the `weight` property will be able to be modified from _inside the class_, but _not_ from outside. This is illustrated with the following `main()`:

```kotlin
fun main () {
    val sniffy = Cat ("Sniffy", 5 , 7)
    println(sniffy.weight) // works because we can read the property from outside
    
    sniffy.weight = -1 // does not work because setting the property is declared private
}
```

#### Custom setters

We can create a _custom setter_ for our properties. This allows you to control what happens when you set an property, for example prevent the property being set to invalid values. For example:

```kotlin
class Cat(private val name: String, private var age: Int, weightIn: Int) {

    var weight = 0
        _set(newWeight) {
            if(newWeight >= 5) {
                field = newWeight
            }
        }_

    init {
        weight = weightIn
    }
    
    public fun walk() : Boolean
    {
        if(weight > 5) {
            weight--
            return true
        } 
        return false
    }

    public override fun toString(): String
    {
        return "Name: $name, age: $age, weight: $weight" 
    }
}
```

Here the `weight` is no longer private, even for updating the value - but has a _custom setter_. A custom setter is indented one level below the property and is written like a function, with the keyword `set` followed by a code block containing the custom setter. Here, we check the new weight (`newWeight`) and only update the property's underlying value (represented by `field`) if the new weight is at least 5. Here is an example of a `main()` using the above:

```kotlin
fun main () {
    val sniffy = Cat ("Sniffy", 5 , 7)
    println(sniffy.weight)
    sniffy.weight = 6 // works, 6 is above 5
    println(sniffy.weight)
    sniffy.weight = 4 // does not work, 4 is below 5
    println(sniffy.weight) // weight will still be 6
}
```

Passing Parameters to Methods
-----------------------------

You have already seen in COM411 that you can pass parameters to methods. Here is an enhanced version of `Cat` showing how you can do this in Kotlin:

```kotlin
class Cat(private val name: String, private var age: Int, weightIn: Int) {

    var weight = 0
        _set(newWeight) {
            if(newWeight >= 5) {
                field = newWeight
            }
        }_

    init {
        weight = weightIn
    }
    
    public fun walk(distance: Int) : Boolean
    {
        if(weight - distance >= 5) {
            weight -= distance
            return true
        } 
        return false
    }

    public override fun toString(): String
    {
        return "Name: $name, age: $age, weight: $weight" 
    }
}
```

Note how the `walk()` method now takes one parameter, representing the distance walked. Note how, unlike Python, the _data type_ (`Int`) must be declared. We also reduce the weight by the distance. (Note that `weight -= distance` is a shorter way of writing `weight = weight - distance`; the `-=` operator reduces a variable by a given value. There are similar `+=`, `*=` and `/=` operators). This could be called in a `main()` as follows:

```kotlin
fun main () {
    val sniffy = Cat ("Sniffy", 10, 15)
        
    sniffy.walk (5)
    println(sniffy)
    sniffy.walk (3)
    println(sniffy)
}
```

Note how we are passing the distance to the walk method. Note the difference between _arguments_ and _parameters_. The _value passed into a method_ is called an _argument_, whereas the _parameter_ is the _variable_ in the method representing that value. So, here, 5 and 3 are the _arguments_ whereas `distance` is the _parameter_.

Inheritance
-----------

As you saw last year in COM411, _inheritance_ allows us to use an existing class as a basis for a new, related class. Imagine we wanted to write classes representing different types of vehicle, e.g. Car, Bus, Motorbike. If we were to write the three classes entirely separately, we'd be _repeating_ a good deal of code - e.g. the code for starting and stopping the engine is common to all three classes.

So what we could do in this case is create a `Vehicle` class, containing common functionality for all types of vehicle, and then _inherit_ various _subclasses_ of Vehicle (such as Car, Bus, and Motorbike) which provide additional functionality specific to that type of Vehicle. We can say that:

*   The Car _inherits_ from or is a _subclass_ of Vehicle
*   Vehicle is a _superclass_ of Car

### How is inheritance achieved in Kotlin?

In Kotlin, we show inheritance in this way, using a colon:

```kotlin
class Car : Vehicle() {
}
```

This means that the `Car` class inherits from Vehicle. All properties and methods in Vehicle will be _inherited_ by Car, so when you create a Car, all the Vehicle methods and properties will be available.

### Kotlin Inheritance Example

Below is a `Vehicle` superclass with `Bike` and `Car` subclasses.

#### Vehicle class (Vehicle.kt):

```kotlin
_// Generic Vehicle superclass_
open class Vehicle(protected val make: String, protected val topSpeed: Int, protected val nWheels:Int) {

    open fun move() {
        println("Moving along...")
    }

    override fun toString(): String {
        return "Make: $make Top Speed: $topSpeed Wheels: $nWheels"
    }
}
```

#### Car class (Car.kt):

```kotlin
class Car(make: String, topSpeed: Int, private val engineCapacity: Int) : Vehicle(make, topSpeed, 4) {
    private var engineRunning = false

    _// Overridden move() for cars_
    override fun move() {
        if (engineRunning) {
            println("Driving along...")
        } else {
            println("Can't drive the car if the engine's stopped!!!")
        }
    }

    _// Car-specific methods_
    fun start() {
        engineRunning=true;
    }

    fun stop() {
        engineRunning = false;
    }

    _// Return string representing the car. Note the use of super.toString() to_
    _// call the superclass (Vehicle) version of toString() to print the_
    _// make, top speed and number of wheels._
    override fun toString() : String {
        return super.toString() + " Engine running? $engineRunning, Engine Capacity: $engineCapacity"
    }
}
```

#### Bike class (Bike.kt):

```kotlin
class Bike(make: String, topSpeed: Int, private val isOffRoad: Boolean, private val nGears: Int) : Vehicle(make, topSpeed, 2) {

    override fun toString() : String {
       return super.toString() + " Off road? $isOffRoad, No. Gears: $nGears"
    }
}
```

How is this working?

*   First, note that in the `Vehicle` class the properties are not private, but _protected_. _protected_ means that properties are accessible from _subclasses_ (e.g. Car, Bike) whereas `private` indicates that, while the properties are still there in memory, they are hidden from the subclasses and cannot be used from them.
*   Note also how the `Vehicle` class is `open`, which indicates that it can be overridden, that is, replaced by a more specific version in a subclass.
*   Note also how the `move()` method in `Vehicle` is declared as `open`. This indicates that this specific method can be overridden in subclasses.
*   Note how the constructor for Car calls the Vehicle constructor to initialise the Vehicle aspects of the Car. This is done when the inheritance relation is setup, as follows:

```kotlin    
    class Car(make: String, topSpeed: String, private val engineCapacity: Int) : _Vehicle(make, topSpeed, 4)_
```

    This indicates that we are calling the superclass constructor and passing it the parameters it requires - the make, top speed and number of wheels. The Vehicle constructor will initialise the corresponding properties to the values passed from Car. Note that because we always pass 4 for the number of wheels, the `nWheels` property will always be initialised to 4 when the vehicle is a `Car`.
*   The engine capacity, on the other hand, is specific to `Car` so we declare it as a property of `Car` (by preceding it with `val`) and we do _not_ pass it up to `Vehicle`.
*   We adopt a similar approach in Bike, but in this case, we always pass 2 for the number of wheels.
*   Notice also how we call the superclass version of toString() in the subclass version using `super.toString()` The `super` keyword refers to the superclass.

### Overriding Methods

In the example, Vehicle and Car both have a method called `move()`. We have _overridden_ the original version in Vehicle with the version in Car - in other words, replaced the original Vehicle version of move() with a new version in Car. The `override` keyword, which you must provide, explicitly indicates that you are overriding a method. We saw this with `toString()`, above.

This will mean that:

*   If we call `move()` on a Vehicle, then the Vehicle `move()` will be called;
*   If we call `move()` on a Car, then the Car `move()` will be called;
*   If we call `move()` on a Bike, then the Vehicle `move()` will be called, because we did not override it in Bike

In the same way, `toString()` is overridden in both Car and Bike. However, unlike for `move()`, the overridden version of `toString()` calls the original, Vehicle version of `toString()` using the super keyword: `super.toString();`.

#### Example main() with the inheritance hierarchy

Here is an example `main()` using the inheritance hierarchy:

```kotlin
fun main () {
    val c = Car("Ford",120,2000);
    val b = Bike("Raleigh",30,true,27)

    println(c)
    println(b)

    c.move()
    c.start()
    c.move()
    c.stop()

    b.move()
}
```

This would produce the following output:

```
Make: Ford Top Speed: 120 Wheels: 4 Engine running? false, Engine Capacity: 2000
Make: Raleigh Top Speed: 30 Wheels: 2 Off road? true, No. Gears: 27
Can't drive the car if the engine's stopped!!!
Driving along...
Moving along...
```

Note that when we try to move the car (`c.move()`) we cannot do it without starting the car first, because the overridden `move()` method in `Car` is checking this. However, when we try to move the bike (`b.move()`) it will move straight away because `Bike` is using the `Vehicle` version of `move()`, as the method has not been overridden in `Bike`.

### Abstract classes

You also met _abstract classes_ in COM411. An abstract class is a class that will never be instantiated; it serves only to be the superclass of inherited classes, and to provide common data and methods. Abstract classes typically contain _abstract methods_, which are methods containing no code; they will be overridden in subclasses. For example we could have an `Animal` abstract class with a `makeNoise()` abstract method (as there is no default noise made by a generic Animal!):

```kotlin
_abstract_ class Animal(protected var age: Int, protected var weight: Double)  {

     _abstract_ fun makeNoise(): String
}
```

and then inherit `Cat` and `Dog` from it, overriding `makeNoise()` appropriately. `Cat` and `Dog` are _concrete_ classes: classes you can create instances of.

```kotlin
class Cat(age: Int, weight: Int) : Animal(age, weight) {
    override fun makeNoise(): String {
        return "Meow!"
    }
}

class Dog(age: Int, weight: Int) : Animal(age, weight) {
    override fun makeNoise(): String {
        return "Woof!"
    }
}
```

Exercises
---------

1.  Clone your Cat project from last week from Git Bash:
    
```
git clone -b dev https://github.com/yourusername/CatApp.git
```
    
    The `-b dev` specifies that you are cloning the `dev` branch.
2.  Update your Cat project by replacing the `walk()` method with the version from the "Passing parameters to methods" example, above. Also modify the Cat's `eat()` method so that the weight can never go above 20. Deal with errors appropriately if an attempt is made to increase the weight beyond that amount. Commit your changes using Git once done.
3.  Modify your Cat's `eat()` method further, so that it now takes a parameter of `amount`. The weight should increase by the specified amount. Again commit your changes.
4.  Push your work to GitHub once more.
5.  Return to your Student project from last week; again clone it from GitHub.
6.  Add a custom setter to your `Student` class, to set the student's mark. The method must validate the mark, and check that it is between 0 and 100. The mark should only be updated if it is valid.
7.  Add a `getGrade()` method to `Student`. This should return the student's grade as a `String` based on the mark, according to this scheme :
    *   70+ : First
    *   60-69 : 2/1
    *   50-59 : 2/2
    *   40-49 : Third
    *   0-39 : FailCommit your changes using Git.
8.  Add a `didPass()` method to `Student`. This should return a boolean, depending on whether the mark is above or below 40. Again commit your changes.
9.  Change the `Student` constructor so that the mark is no longer passed in as a parameter. Instead, add the mark as a property and initialise it to 0. The idea is that your custom setter will be used instead to set the mark later. Again commit your changes.
10.  Test out the above methods by modifying the `main()` of your existing program so that:
     *   Prompt the user for the mark and read it in from the user. **Hint:** You can use `readln()` rather than `readLine()`, this will never return null. You can also use `toDouble()` to convert a strong to a double. Set the mark using your custom setter. Print the student's status (mark, grade, and whether they passed or not) by accessing the mark property together with the `getGrade()`, and the `didPass()` methods, and printing the return value of each.Again commit your changes.
11.  Create an inheritance hierarchy to represent different types of student. The classes `Undergraduate` and `Masters` should extend from `Student`. Make `Student` an abstract class and change the `getGrade()` method of `Student` to be abstract, and provide overridden versions of `getGrade()` for `Undergraduate` and `Masters`. The undergraduate version should work exactly the same as the version above. The masters version should instead return the following grades:
     
     *   70+ : Distinction
     *   60-69 : Merit
     *   40-59 : Pass
     *   0-39 : Fail
     
     Once again commit your changes. Test it by creating a few undergraduate and masters' students in your `main()`, and printing their grades. You do not need to read them in from the keyboard; you can just hard-code them.

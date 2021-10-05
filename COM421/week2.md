# Week 2: Implementation of Basic Data Structures

## Introduction

Last week was a purely theoretical session in which we took a first look at some basic data structures, the *array*, the *linked list* and the *stack*. Today we will actually start implementing these in Python, beginning with the stack and continuing with the linked list.

## Introduction to Python classes and objects in the context of data structures

To effectively implement a data structure, such as a stack, requires the use of *classes and objects*. We are not going to cover this topic in any depth right now, as you will be introduced to it more fully in COM411. We are just going to look at as much as we need to, in order to understand how to create our own data structures.

(Note that Python comes with an extensive range of built-in data structures, for example you can treat the standard `list` type as a stack and perform `push` and `pop` operations, but we are going to build them from scratch, in order to gain a deeper understanding of how the various data structures work.)

See [the Python documentation](https://docs.python.org/3/tutorial/classes.html) for classes and objects.

### What is a class?

(**This is a simplified explanation. More depth will be provided in COM411.**)

A `class` can be thought of as a complex data type. Classes provide a way to define our own custom data structures. For example, we could create a `Cat` class to represent a cat, a `Stack` class to represent a stack, or a `LinkedList` class to represent a linked list. Classes contain two key components: 

- **Methods**. A method represents an action that you can perform with a class. For example:
    - with a `Cat` class we could have `eat`, `sleep` and `meow` methods.
    - with a stack class, we could define `push` and `pop` methods. 
    - for a linked list class, we could define an `addNode` method, to add a node onto the end of the linked list (and update the reference to the last node).

- **Attributes**. An attribute represents an item of data associated with the class. Last week, we saw that a stack uses an array to store its data. So :
    - attributes of a `Cat` class could include the name, the age and the weight of the cat.
    - an attribute of a `Stack` class could be the underlying array. 
    - Likewise, a linked list contains references to the first and last nodes in the list. So these could be attributes of the `LinkedList` class. 

### What is an object?

An object is a specific **instance** of a class, for example, a *specific* cat, stack or linked list. A class can be thought of as a blueprint, or specification, for how a particular data structure should work. However an object is a *specific example* of that data structure.

For example, each of the two cats in the photo below (Binnie and Clyde) could be represented in code with an object. One object for Binnie, and another for Clyde.

![Cats](../images/cats_small.jpg)

We could define a Cat *class* and then create many cat *objects*, reperesenting individual cats.

We could define a Stack *class*, and then create two Stack *objects*. One Stack object could be used in a web browser and contain your browsing history, whereas another could be used in a paint program and represent each drawing operation you do, allowing you to undo them.

Or, you could define a `LinkedList` class, and then have one `LinkedList` object to store students at a university, another to store courses, and yet another to store staff.

## Implementing a Cat using a class 

We will start with a simple class representing a cat. 

```python
class Cat:
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight

    def eat(self):
        self.weight += 1
```
This code does not *create any actual cats*. It just creates a *class*, or a *blueprint* or *specification*, for what cats are and what they do. Note, in particular, the following:

- We define the class with the keyword `class` followed by the name of the class (`Cat` here). Note the colon and the indentation. The colon defines what is called a *code block*  - here, the definition of the class. Note how everything within that block is indented (This can be with a tab, or a given number of spaces - typically 4). The block ends as soon as the indentation ends. You should be learning about this in COM411 this week.

- Note how we list each *method*. We use the keyword `def` to define a method. (You will do functions in COM411 next week; a method is essentially a function within a class).

- Note how each method is itself a code block, so we use a colon and indent the code within the method.

- Note how we define two methods. We have `eat()` to define one of the most fundamental actions of a cat. However we also have a second method, `__init()__`. What is this? It is a special **initialisation method**. It runs whenever an object of the class is first created, and can be used to initialise the object. Here, we are using it to initialise the three *attributes* of the cat, the `name`, the `age` and the `weight` (see below for more detail).

- Note how each method contains, as a parameter, the keyword `self`. What is this? It is a *reference to the current object that we're working with*. Remember from the discussion on objects, above, that we might have *multiple objects of a given class*, for example, multiple cats. `self` refers to *whichever object we are dealing with right now*.

- Going back to the `eat()` method, note that it contains the code:
```python
self.weight += 1
```
What does this do? Remember that `self` is the current object, in other words the current cat. The operator `+=` increases a variable by one. So `self.weight += 1` will increase the weight of the current cat by one.

To create actual cats, we need to create `Cat` *objects*, as follows:
```python
cat1 = Cat("Binnie", 4, 4)
cat2 = Cat("Clyde", 1, 2)
cat1.eat()
cat2.eat()
print(cat1.weight)
print(cat2.weight)
```
This code creates *two specific cats*, `cat1` and `cat2`. The lines:
```python
cat1 = Cat("Binnie", 4, 4)
cat2 = Cat("Clyde", 1, 2)
```
actually create the two cats. In each case, the *initialisation method* `__init__()`, which we saw above, is called, and the data about that cat is passed into the object.

Next, we actually make the cats *do* something by calling *methods*. Firstly, we call the `eat()` method on each cat:
```python
cat1.eat()
cat2.eat()
```
We then print the `weight` of each cat, to show that eating has increased the weight by one:
```python
print(cat1.weight)
print(cat2.weight)
```

### Exercise 1

1. Try out this example. Once it's working, do the following:

    - Create a `walk()` method inside the `Cat` class. This should reduce the cat's weight by one.
    - Create a third cat, "Old Tom" with age 10 and weight 6. 
    - Make Old Tom eat, and make all three cats walk after they have eaten. After walking, display all three cats' weight again, to show that walking reduces the weight by one.

2. If you have looked at `if` statements already, change the `walk()` method so that the cat cannot walk if the weight is below 1. (The intention is to avoid starving the cat). 

## Implementing a Stack using a class 

Having looked at a simple `Cat` class, we are now going to do something a bit more practical and look at how we might create a `Stack` class.
Note that it does not actually act as
a stack at the moment, but it provides the framework for how a stack operates;
notice how it contains an array and `push()` and `pop()` methods.

```python
class Stack:
    def __init__(self):
        self.internalArray = []

    def push(self, item):
        # Code to add an item to the stack will go here

    def pop(self):
        # Code to remove an item from the top of the stack will go here 

    def __str__(self):
        return self.internalArray.__str__()
```

How is this working?

- Note how we define three methods again. We have `push()` and `pop()` to define the most fundamental operations of a stack. The `__init()__` method for a stack will, like the cat equivalent, run when the stack is first created. We are using it to create the underlying array associated with the stack (see below for more detail).

- So, going back to `__init()__`, note how we are attaching an attribute `array` to the current object, with this code:
```python
self.internalArray = []
```
Note the `[]` syntax. This creates an empty array. (Well actually, it doesn't; it creates an empty Python *list*, as we saw last week, but we are treating the list as an array.).

- Note how the `push()` method contains not just `self` but also another parameter, `item`. This is the item we want to add to the internal array.

- Note the fourth method, `__str()__`. This is another special method, rather like `__init()__`. This is a method which defines *how objects of a class are printed*. We might want to print our stack with:
```python
print(stack)
```
What happens though when we try to print an object? By default we just get its memory address. Adding a `__str__()` method to a class allows us to return a string representation which can be understood. Here, we return the string representation of the internal array, so when we print the stack, we see the contents of the internal array.

### Exercise 2

1. Now create a separate program for your Stack. Write the `Stack` class as shown above, and try and complete the `push()` method of your `Stack` so that it takes the value passed to it, appends it to the internal array, and increases the `size` variable by 1.

2. Test your `Stack` as follows by adding this code *below* the Stack class:
```python
stack1 = Stack()
stack1.push(1)
stack1.push(4)
stack1.push(9)
print(stack1)
```

3. Now write a `pop()` method. This should `return the last member of the internal array` and `remove it`. How do you do this? It's easier in Python than some other languages as Python features *negative indexing* in which index -1 always represents the *last* member of an array or list (and -2 represents the second-to-last, and so on). Try adding this code to your `pop()` (remember to indent it appropriately!)
```python
del self.internalArray[-1] # try to delete the last member of the array
return self.internalArray[-1] # and return it so the outside world can access it
```
Does this work as you would expect a pop operation to? Test it by adding these lines to your test code (the code where you created the stack and pushed items
onto it), which pops the stack twice and prints the value returned from each `pop()` operation:
```python
popped1 = stack1.pop()
print(popped1)
popped2 = stack1.pop()
print(popped2)
```
You will find it
does not. Why? **Try and fix the code yourself to get it to work!**

4. Create a *second* Stack object in your test code, and this time, push these
items onto it:
```
Linux
Windows
Mac OS X
```
Again, print the stack and pop items off the stack. Does it work with strings as well as integers?

5. You need to display an error if you pop an empty stack.
Using an `if` statement (you are doing these in COM411 this week), display an error message in `pop()` if the stack is empty.

   How can you tell whether the stack is empty? You can use the `len()` function.  `len()` gives you the length of an array or list, or string. For example, if
`a` is an array or list, this `if` statement will test whether it is empty (has a length of 0).
```python
if len(a) == 0:
       print("a is empty")
```

6. Create a `peek()` method for your Stack. Remember a `peek` operation should
return the top item of the stack *without* removing it.

**Advanced optional exercise**: If you are coping with this module and COM411 well so far, and keen to do more programming, and want something to do in your own time, read about *exceptions* and handle the error instead by *raising an exception*. This would be how errors are handled in real-world implementations of stacks. Feel free to implement your stack using exceptions and send it to me for checking.


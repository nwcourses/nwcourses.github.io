# Week 2: Implementation of Basic Data Structures

## Introduction

Last week was a purely theoretical session in which we took a first look at some basic data structures, the *array*, the *linked list* and the *stack*. Today we will actually start implementing these in Python, beginning with the stack and continuing with the linked list.

## Introduction to Python classes and objects in the context of data structures

To effectively implement a data structure, such as a stack, requires the use of *classes and objects*. We are not going to cover this topic in any depth right now, as you will be introduced to it more fully in COM411. We are just going to look at as much as we need to, in order to understand how to create our own data structures.

(Note that Python comes with an extensive range of built-in data structures, for example you can treat the standard `list` type as a stack and perform `push` and `pop` operations, but we are going to build them from scratch, in order to gain a deeper understanding of how the various data structures work.)

See [the Python documentation](https://docs.python.org/3/tutorial/classes.html) for classes and objects.

### What is a class?

(**This is a simplified explanation. More depth will be provided in COM411.**)

A `class` can be thought of as a complex data type. Classes provide a way to define our own custom data structures. For example, we could create a `Stack` class to represent a stack, or a `LinkedList` class to represent a linked list. Classes contain two key components: 

- `Methods`. A method represents an action that you can perform with a class. For example, with a stack class, we could define `push` and `pop` methods. For a linked list, we could define an `addNode` method, to add a node onto the end of the linked list (and update the reference to the last node).

- `Attributes`. An attribute represents an item of data associated with the class. Last week, we saw that a stack uses an array to store its data. So an attribute of a `Stack` class could be the underlying array. Likewise, a linked list contains references to the first and last nodes in the list. So these could be attributes of the `LinkedList` class. 

### What is an object?

An object is a specific **instance** of a class, for example, a *specific* stack or linked list. A class can be thought of as a blueprint, or specification, for how a particular data structure should work. However an object is a *specific example* of that data structure.

So, for example, we could define a Stack *class*, and then create two Stack *objects*. One Stack object could be used in a web browser and contain your browsing history, whereas another could be used in a paint program and represent each drawing operation you do, allowing you to undo them.

Or, you could define a `LinkedList` class, and then have one `LinkedList` object to store students at a university, another to store courses, and yet another to store staff.

## Implementing a Stack using a class 

Here is the start of a `Stack` class. Note that it does not actually act as
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

- We define the class with the keyword `class` followed by the name of the class (`Stack` here). Note the colon and the indentation. The colon defines what is called a *code block*  - here, the definition of the class. Note how everything within that block is indented (This can be with a tab, or a given number of spaces - typically 4). The block ends as soon as the indentation ends. You have learnt about this in COM411 this week.

- Note how we list each *method*. We use the keyword `def` to define a method. (You will do functions in COM411 next week; a method is essentially a function within a class).

- Note how each method is itself a code block, so we use a colon and indent the code within the method.

- Note how we define three methods. We have `push()` and `pop()` to define the most fundamental operations of a stack. However we also have a third method, `__init()__`. What is this? It is a special **initialisation method**. It runs whenever an object of the class is first created, and can be used to initialise the object. Here, we are using it to create the underlying array associated with the stack (see below for more detail).

- Note how each method contains, as a parameter, the keyword `self`. What is this? It is a *reference to the current object that we're working with*. Remember from the discussion on objects, above, that we might have *multiple objects of a given class*, for example, multiple stacks all storing different data. `self` refers to *whichever object we are dealing with right now*.

- So, going back to `__init()__`, note how we are attaching an attribute `array` to the current object, with this code:
```python
self.internalArray = []
```
Note the `[]` syntax. This creates an empty array. (Well actually, it doesn't; it creates an empty Python *list*. We could use a NumPy array here, but some of the syntax is more complex and I want to try and keep things as simple as possible at this early stage. But what we will do is treat the list as if it was a pure array. Feel free to read more on NumPy arrays and how to work with them in your own time!)

- Note how the `push()` method contains not just `self` but also another parameter, `item`. This is the item we want to add to the internal array.

- Note the fourth method, `__str()__`. This is another special method, rather like `__init()__`. This is a method which defines *how objects of a class are printed*. We might want to print our stack with:
```python
print(stack)
```
What happens though when we try to print an object? By default we just get its memory address. Adding a `__str__()` method to a class allows us to return a string representation which can be understood. Here, we return the string representation of the internal array, so when we print the stack, we see the contents of the internal array.

### Exercise 1

1. You are going to complete the `Stack` class above and turn it into an actual stack, but first, here is a simple exercise to work with a Python list, just so you are happy with how it works.
```python
a = []
a.append(111)
a.append(222)
a.append(333)
print(a)
```
   Note how we create an empty list. A list is essentially an extensible array,
and `append()` adds new items onto the end of it. So here, we create a list, add items to it, and print it.

   Create the program above and run it.

   **Note again that the Python list is quite powerful. Here, we are just treating it as a simple extensible array for the purposes of learning how to create a stack.**

2. Now create a separate program for your Stack. Write the `Stack` class as shown above, and try and complete the `push()` method of your `Stack` so that it takes the value passed to it, appends it to the internal array, and increases the `size` variable by 1.

3. Test your `Stack` as follows by adding this code *below* the Stack class:
```python
stack1 = Stack()
stack1.push(1)
stack1.push(4)
stack1.push(9)
print(stack1)
```

4. Now write a `pop()` method. This should `return the last member of the internal array` and `remove it`. How do you do this? It's easier in Python than some other languages as Python features *negative indexing* in which index -1 always represents the *last* member of an array or list (and -2 represents the second-to-last, and so on). Try adding this code to your `pop()` (remember to indent it appropriately!)
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

5. Create a *second* Stack object in your test code, and this time, push these
items onto it:
```
Linux
Windows
Mac OS X
```
Again, print the stack and pop items off the stack. Does it work with strings as well as integers?

6. You need to display an error if you pop an empty stack.
Using an `if` statement (you did these in COM411 this week), display an error
message in `pop()` if the stack is empty.

   How can you tell whether the stack is empty? You can use the `len()` function.  `len()` gives you the length of an array or list, or string. For example, if
`a` is an array or list, this `if` statement will test whether it is empty (has a length of 0).
```python
if len(a) == 0:
       print("a is empty")
```

7. Create a `peek()` method for your Stack. Remember a `peek` operation should
return the top item of the stack *without* removing it.

**Advanced optional exercise**: If you are coping with this module and COM411 well so far, and keen to do more programming, and want something to do in your own time, read about *exceptions* and handle the error instead by *raising an exception*. This would be how errors are handled in real-world implementations of stacks. Feel free to implement your stack using exceptions and send it to me for checking.

## Implementing a linked list using classes

*I would expect you to be here at the start of the second class, 1500-1700.*

We've now implemented a simple stack. We'll now move on to implementing the
other data structure we looked at last week - the linked list - in code. As
you may remember, linked lists are a bit more complex than stacks so require
a bit more effort to implement. In particular, we will now need *two* classes,
not one:

- a `Node` class to represent an individual node. Remember that a node contains the actual data, plus links to the previous and next node.

- a `LinkedList` class to represent the linked list as a whole. Remember that
this needs to contain references to the first and last nodes in the linked 
list.


### Exercise 2: Create a Node class

1. Create a *new* Repl project. Inside a new file, create a `Node` class. It should contain an `__init()__` method which looks like this:
```python
def __init__(self, data):
       self.data = data
       self.prev = None
       self.next = None
```

   What does this do? Remember we use `__init()__` to initialise an object of the class. A node needs to contain data. So this `__init__()` method allows us to create a node, and pass the data to it. The data then gets attached to the current node we're working with, using `self.data = data`.

   Note how we initialise the `prev` and `next` attributes to `None`. These attributes represent the previous and next node. `None` is a special data type indicating that nothing exists yet; it will be appropriate here as we haven't linked this node to any others yet.

2. Add a `link()` method to your Node. This should link another node to the current node. Using the code examples you have seen so far, try to figure out how to pass the second node into the method. Then, link the second node with the current node using this code:
```python
self.next = otherNode 
otherNode.prev = self
```

3. Add a `__str()__` method to Node which returns the value associated with the node.


4. Create some test code which creates two nodes, `n1` and `n2`, for example;
```python
n1 = Node("Fred")
n2 = Node("Tom")
```
Note how we pass the data associated with each node ("Fred" and "Tom" here) when we create it. This will call our `Node` class's `__init__()` method, and set the variable `data` equal to whatever was passed in (Fred or Tom).

5. Now try printing `n1` and `n2` to prove that the nodes have been created separately.

6. Now link `n2` to `n1`. To prove that the link has worked, try printing out all of these:
```
n1.prev
n1.next
n2.prev
n2.next
```

### Exercise 3: Creating the linked list itself

We have now created our `Node` class. We are now going to use it in a complete `LinkedList` class which will allow you to add nodes to a linked list, and access the linked list's first and last members.

*You can do this exercise in the same file as Exercise 2.* 

1. Create a LinkedList class. Its `__init__()` method should initialise two attributes, `self.first` and `self.last` to `None`. (These are the references to the first and last node in the list).

2. Add an `add()` method to your linked list. This should add a `Node` to your linked list. To accomplish this, ask yourself:
    - what does the new Node need to be linked to?
    - what attribute of the LinkedList class needs to be updated?
    - do you need to do anything special if the linked list is empty when we add a `Node` to it? If so, how can we tell if the `LinkedList` is empty?

3. Add a `get()` method to your linked list. This should take an index as a parameter, i.e. write it as:
```python
def get(self, index):
```
and should search the linked list for the node at that index. Having found it, it should return it.

   If you are not sure how to do this, try and work it out with *pseudocode* first. Also you will need a *while loop* to solve this. While loops are being considered in COM411 this week. Here is a reminder of a simple while loop to count from 1 to 10:
```python
count = 1
while count <= 10:
       print(count)
       count = count + 1
```

4. Test out your linked list by creating three `Node` objects and adding them to your `LinkedList`. Once you've added them, try searching for them within the linked list using their index. 

5. Try searching for an index which does not exist in the linked list, such as index 10 for example. What happens? Change your code to handle this error.

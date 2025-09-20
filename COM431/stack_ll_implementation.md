Topic 4 - Implementing Stacks and Linked Lists
==============================================

Implementing a Stack using a class
----------------------------------

Having looked at a simple `Cat` class, we are now going to do something a bit more practical and look at how we might create a `Stack` class. Note that it does not actually act as a stack at the moment, but it provides the framework for how a stack operates; notice how it contains a list and `push()` and `pop()` methods.

    class Stack:
        def __init__(self):
            self.internalList = []
    
        def push(self, item):
            # Code to add an item to the stack will go here
    
            pass # ends the method when it's empty
    
        def pop(self):
            # Code to remove an item from the top of the stack will go here 
    
            pass # ends the method when it's empty
    
        def __str__(self):
            return self.internalList.__str__()
    

How is this working?

*   Note how we define three methods again. We have `push()` and `pop()` to define the most fundamental operations of a stack. The `__init__()` method for a stack will, like the cat equivalent, run when the stack is first created. We are using it to create the underlying list associated with the stack (see below for more detail).
    
*   So, going back to `__init__()`, note how we are attaching an attribute `internalList` to the current object, with this code:
    

    self.internalList = []
    

Note the `[]` syntax. This creates an empty list.

*   Note how the `push()` method contains not just `self` but also another parameter, `item`. This is the item we want to add to the internal list.
    
*   Note the fourth method, `__str__()`. This is another special method, rather like `__init__()`. This is a method which defines _how objects of a class are printed_. We might want to print our stack with:
    

    print(stack)
    

What happens though when we try to print an object? By default we just get its memory address. Adding a `__str__()` method to a class allows us to return a string representation which can be understood. Here, we return the string representation of the internal list, so when we print the stack, we see the contents of the internal list.

### Exercise 1

1.  In a separate module (e.g `stack.py`), write the `Stack` class as shown above, and try and complete the `push()` method of your `Stack` so that it takes the value passed to it, and appends it to the internal list. To do this you will need to use the list's `append()` method.
    
        list1 = []
        list1.append("John")
        
    
2.  Test your `Stack` as follows by adding this code in a `main.py`:
    
        stack1 = Stack()
        stack1.push(1)
        stack1.push(4)
        stack1.push(9)
        print(stack1)
        
    
3.  Write a `pop()` method. You can remove the final item from the internal list with:
    
    del self.internalList\[-1\]
    
    Note that `del` deletes an item from the list, and negative indices count from the _end_ of the list (so -1 is the final element, -2 the second from last, and so on).  
      
    Does this work as you would expect a pop operation to? Test it by adding these lines to your test code (the code where you created the stack and pushed items onto it), which pops the stack twice and prints the value returned from each `pop()` operation:
    
        popped1 = stack1.pop()
        print(popped1)
        popped2 = stack1.pop()
        print(popped2)
        
    
    You will find it does not. Why? **Try and fix the code yourself to get it to work!**
4.  Create a _second_ Stack object in your test code, and this time, push these items onto it:
    
        Linux
        Windows
        Mac OS X
        
    
    Again, print the stack and pop items off the stack. Does it work with strings as well as integers?
5.  You need to display an error if you pop an empty stack. Using an `if` statement (you are doing these in COM411), display an error message in `pop()` if the stack is empty.  
    How can you tell whether the stack is empty?
6.  Create a `peek()` method for your Stack. Remember a `peek` operation should return the top item of the stack _without_ removing it.

**Advanced optional exercise**: If you are coping with this module and COM411 well so far, and keen to do more programming, and want something to do in your own time, read about _exceptions_ and handle the error instead by _raising an exception_. This would be how errors are handled in real-world implementations of stacks. Feel free to implement your stack using exceptions and send it to me for checking.

Implementing a linked list using classes
----------------------------------------

We'll now move on to implementing the other data structure we looked at in week 1 - the linked list - in code. As you may remember, linked lists are a bit more complex than stacks so require a bit more effort to implement. In particular, we will now need _two_ classes, not one. Put each class in its own file and import them into your `main.py`.

*   a `Node` class to represent an individual node. Each item of data is contained within a _node_, along with the links to the previous and next item.
    
*   a `LinkedList` class to represent the linked list as a whole. Remember that this needs to contain references to the first and last nodes in the linked list.
    

### Exercise 2: Create a Node class

1.  Create a _new_ PyCharm project. Inside a new file, create a `Node` class. It should contain an `__init__()` method which looks like this:

    def __init__(self, data):
       self.data = data
       self.prev = None
       self.next = None
    

What does this do? Remember we use `__init__()` to initialise an object of the class. A node needs to contain data. So this `__init__()` method allows us to create a node, and pass the data to it. The data then gets attached to the current node we're working with, using `self.data = data`.

Note how we initialise the `prev` and `next` attributes to `None`. These attributes represent the previous and next node. `None` is a special data type indicating that nothing exists yet; it will be appropriate here as we haven't linked this node to any others yet.

2.  Add a `__str__()` method to Node which returns a string containing the value associated with the node.
    
3.  Create some test code in `main.py` which creates two nodes, `n1` and `n2`, for example;
    

    n1 = Node("Fred")
    n2 = Node("Tom")
    

Note how we pass the data associated with each node ("Fred" and "Tom" here) when we create it. This will call our `Node` class's `__init__()` method, and set the variable `data` equal to whatever was passed in (Fred or Tom).

4.  Now try printing `n1` and `n2` to prove that the nodes have been created separately.
    

### Exercise 3: Creating the linked list itself

We have now created our `Node` class. We are now going to use it in a complete `LinkedList` class which will allow you to add nodes to a linked list, and access the linked list's first and last members.

Create a separate file for your `LinkedList` class and import it into `main.py` again. You will need to import `Node` into `LinkedList`.

1.  Create a LinkedList class. Its `__init__()` method should initialise two attributes, `self.first` and `self.last` to `None`. (These are the references to the first and last node in the list).
    
2.  Add an `add()` method to your linked list. This should add a `Node` to the end of your linked list. Ensure this is added correctly, according to the discussion we had last week.
3.  Add a `get()` method to your linked list. This should take an index as a parameter, i.e. write it as:

    def get(self, index):
    

and should search the linked list for the node at that index. Having found it, it should return it.

4.  Test out your linked list by creating three `Node` objects and adding them to your `LinkedList`. Once you've added them, try searching for them within the linked list using their index.
    
5.  Try searching for an index which does not exist in the linked list, such as index 10 for example. Is the error handled correctly?
    
6.  **More advanced**: Add functionality to insert a new element into the middle of the linked list. The method should take two parameters: the index to insert the data, and the data to be inserted.

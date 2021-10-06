# Week 3: Implementing a Linked List

## Implementing a linked list using classes

Last time we implemented a simple stack. We'll now move on to implementing the
other data structure we looked at in the first week - the linked list - in code. As you may remember, linked lists are a bit more complex than stacks so require
a bit more effort to implement. In particular, we will now need *two* classes,
not one.

- a `Node` class to represent an individual node. Each item of data is contained within a *node*, along with the links to the previous and next item. 

- a `LinkedList` class to represent the linked list as a whole. Remember that
this needs to contain references to the first and last nodes in the linked 
list.


### Exercise 1: Create a Node class

1. Create a *new* Repl project. Inside a new file, create a `Node` class. It should contain an `__init()__` method which looks like this:
```python
def __init__(self, data):
       self.data = data
       self.prev = None
       self.next = None
```

   What does this do? Remember we use `__init()__` to initialise an object of the class. A node needs to contain data. So this `__init__()` method allows us to create a node, and pass the data to it. The data then gets attached to the current node we're working with, using `self.data = data`.

   Note how we initialise the `prev` and `next` attributes to `None`. These attributes represent the previous and next node. `None` is a special data type indicating that nothing exists yet; it will be appropriate here as we haven't linked this node to any others yet.

2. Add a `link()` method to your Node. This should link another node to the current node. Using the code examples you have seen so far, try to figure out how to pass the new node into the method. Then, link the new node with the current node using this code. Note how it sets the `next` attribute of the current node to the new node, and the `prev` attribute of the new node to the current node.
```python
self.next = newNode 
newNode.prev = self
```

3. Add a `__str()__` method to Node which returns a string containing the value associated with the node.


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

### Exercise 2: Creating the linked list itself

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

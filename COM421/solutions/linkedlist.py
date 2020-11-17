class Node:
  def __init__(self, data):
    # A Node has three ATTRIBUTES
    # data - the actual data stored in the node
    # next - the link to the NEXT node
    # prev - the link to the PREVIOUS node
    self.data = data
    self.next = None
    self.prev = None

  # Create a NEW METHOD of Node called link()
  # link() should take in ANOTHER node and
  # link THAT node to the current node
  def link (self, otherNode):
    self.next = otherNode # forward link
    otherNode.prev = self # backwards link


  # Create a __str()__ method to return the
  # data associated with the node
  def __str__(self):
    return self.data.__str__()
    # just in case data is a complex object


class LinkedList:
  def __init__(self):
    # We need a reference to the first node, 
    # initialise this to None when we create the list
    self.first = None

    # We need a reference to the last node,
    # so that we can efficiently add items to the list
    self.last = None

  # add() adds a new item to the linked list.
  def add(self, item):
    # Create a node for this item
    node = Node(item)

    if self.first is None:
      self.first = node
    else:
      self.last.link(node) # Link the new node to the current last node
      
    self.last = node # updating self.last to the new node  
    

  # get() returns the item with the given index.
  # The method will EITHER return a valid node (if the index
  # is within the linked list) OR None (if the index is beyond the
  # end of the linked list)
  def get(self, index):
    counter = 0 # represents our current position within the linked #list
    currentNode = self.first
    while currentNode is not None and counter < index:
      counter += 1 # increase counter by one
      currentNode = currentNode.next # move node on by one

    return currentNode # either a valid node or None
    
list = LinkedList()
list.add("apple")
list.add("cherry")
list.add("pomegranate")
list.add("grape")

print(list.get(0)) # should be "apple"
print(list.get(3)) # should be "grape"
print(list.get(4)) # should be None

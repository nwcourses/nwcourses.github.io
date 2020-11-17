class Queue:
  def __init__(self, capacity = 5):
    self.front = 0 # front of queue
    self.back = 0 # next available position in queue
    self.internalArray = [None] * capacity
    self.n_items = 0

  # add() - adds an item onto the back of the queue
  def add (self, item):
    if self.n_items == len(self.internalArray):
      return False # return False to indicate an error
    self.n_items += 1
    self.internalArray[self.back] = item  
    self.back += 1
    if self.back > len(self.internalArray):
      self.back = 0 # implementing the circular aspect of the queue
    return True # indicate success

  # remove() - removes an item from the front of the queue and returns it
  def remove (self):
    if self.n_items == 0:
      return None # return None to indicate that the item could not be removed - empty queue
    self.n_items -= 1
    curFrontItem = self.internalArray[self.front]
    self.front += 1 # now the front of the queue is the next item back
    if self.front > len(self.internalArray):
      self.front = 0 # implementing circular aspect of the queue
    return curFrontItem # return front item
    


### Main program - outside the class

q = Queue(6)
q.add("cat")
q.add("dog")
q.add("rat")
print(q.remove())
print(q.remove())
print(q.remove())
if q.remove() is None:
  print("Cannot remove from queue as it's empty")


  



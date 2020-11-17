## GitHub
## https://github.com/nwcourses


class Stack:
  def __init__(self):
    self.internalArray = []
  
  def push(self, item):
    self.internalArray.append(item)
    #pass # 'ignore this and carry on'

  def pop(self):

    # Add an 'if' statement here, to stop the item being removed
    # if the stack is empty.
    if len(self.internalArray) == 0:
      print("Stack is empty - cannot pop")
    else:
      # Store the current top of the stack in a variable
      a = self.internalArray[-1]

      # THEN, we remove the top item
      # This is now a safe operation because we've 
      # stored the top item in a variable so we don't
      # lose it!
      del self.internalArray[-1]

      # THEN, we return the variable which holds the
      # previous top item
      return a

# 'Main program'
# Outside the class (because these statements are not indented)
stack1 = Stack()
stack1.push(1)
stack1.push(4)
stack1.push(9)

a = stack1.pop()
print(a)
b = stack1.pop()
print(b)
c = stack1.pop()
print(c)

d = stack1.pop()
if not d is None:
  print(d)


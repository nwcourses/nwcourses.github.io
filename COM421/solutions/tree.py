
class TreeNode:
  def __init__(self, value):
    self.left = None
    self.value = value
    self.right = None


  # insert() method of TreeNode
  def insert(self, new_value):

    if new_value < self.value:
     
      if self.left is None:
        self.left = TreeNode(new_value)
      else: # not None

        self.left.insert(new_value)
    elif new_value > self.value:
      if self.right is None:
        self.right = TreeNode(new_value)
      else: # not None
        self.right.insert(new_value)


class BinaryTree:
  def __init__(self):
    self.root = None

  
  # inserts a new node into the Tree
  def insert(self, value):
    if self.root is None:
      self.root = TreeNode(value)
    else:
      # calling the insert() method of TreeNode
      self.root.insert(value)

  # initially, starting_node will be the root node.
  def print_tree(self, starting_node):
    if starting_node.left is not None:
      self.print_tree(starting_node.left)
    print(starting_node.value)
    if starting_node.right is not None:
      self.print_tree(starting_node.right)

  # Week 8 exercises: implement breadth-first and depth-first 
  # searches on the tree. For depth-first, you can assume the tree is 
  # sorted.

# Main program
tree = BinaryTree()
tree.insert(444)
tree.insert(222)
tree.insert(666)
tree.insert(111)
tree.insert(333)
tree.insert(777)
tree.insert(555)
tree.print_tree(tree.root)

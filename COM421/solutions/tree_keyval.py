# This tree has been adapted to store TUPLES of key/value pairs.

import collections

class TreeNode:
	def __init__(self, k, v):
		self.left = None
		self.keyval = (k, v) # the node's value is now a tuple containing the key/value pair
		self.right = None


	# insert() method of TreeNode
	def insert(self, new_keyval):

		if new_keyval[0] < self.keyval[0]: # compare keys - tree will be sorted by key
		 
			if self.left is None:
				self.left = TreeNode(new_keyval[0], new_keyval[1])
			else: # not None
				self.left.insert(new_keyval)
		elif new_keyval[0] > self.keyval[0]:
			if self.right is None:
				self.right = TreeNode(new_keyval[0], new_keyval[1])
			else: # not None
				self.right.insert(new_keyval)


class BinaryTree:
	def __init__(self):
		self.root = None

	# inserts a new node into the Tree
	def insert(self, key, val):
		if self.root is None:
			self.root = TreeNode(key, val)
		else:
			# calling the insert() method of TreeNode
			self.root.insert((key, val))

	# initially, starting_node will be the root node.
	def print_tree(self, starting_node):
		if starting_node.left is not None:
			self.print_tree(starting_node.left)
		print(starting_node.keyval)
		if starting_node.right is not None:
			self.print_tree(starting_node.right)

	# Week 8 exercises: implement breadth-first and depth-first 
	# searches on the tree. For depth-first, you can assume the tree is 
	# sorted.

	# Return EITHER the search term you're looking for OR None if it cannot be found.
	# If you get it working with simple VALUES then adapt the tree to hold TUPLES instead and make
	# the functions return the value corresponding to a given key, where each tuple consists of a key
	# and a value.
	def depth_first_search(self, searchTerm):
		pass

	def breadth_first_search(self, searchTerm): # search term is now a key

		# What other thing should be tested for before we initialise the queue?
		# test that the tree contains at least one node
		if self.root is None: # tree is empty
			return None

		
		queue = collections.deque([self.root]) # What do we initialise the queue with?

		while len(queue) > 0: # keep looping while there are still items in the queue
			cur_node = queue.popleft() # get the front node in the queue
			if cur_node.keyval[0] == searchTerm: # if the node's KEY matches the search term
				return cur_node.keyval[1] # return the node's VALUE
			# Add the child nodes to the queue, as long as they are not None
			if cur_node.left is not None:
				queue.append(cur_node.left)
			if cur_node.right is not None:
				queue.append(cur_node.right)

		# If the queue is empty and we haven't found our search term yet, then return None
		return None
		

# Main program
tree = BinaryTree()
tree.insert("cat", "animal which goes meow")
tree.insert("dog", "animal which goes woof")
tree.print_tree(tree.root)

print(tree.breadth_first_search("cat"))
print(tree.breadth_first_search("dog"))
print(tree.breadth_first_search("rat"))

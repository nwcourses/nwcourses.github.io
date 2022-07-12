# Basic version of tree containing breadth-first and depth-first searches
# Tree contains values only

import collections
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

	def __str__(self):
		return str(self.value)
	def __repr__(self):
		return str(self.value)

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

	def breadth_first_search(self, qry):

		# Ensure the tree isn't empty
		if self.root is None:
			return None

		# Create a queue contaning only the root
		q = collections.deque([self.root])

		# Keep looping while there are still nodes in the queue
		while len(q) > 0:
			# Retrieve the first member of the queue
			cur_node = q.popleft()

			# If the node's value matches the search term, return the value
			if cur_node.value == qry:
				return qry
			# Add the left node to the queue if it exists
			if cur_node.left is not None:
				q.append(cur_node.left)
			# Add the right node to the queue if it exists
			if cur_node.right is not None:
				q.append(cur_node.right)

		# If we have considered all nodes and not found what we're looking
		# for, return None to indicate this
		return None

	# Depth first search
	# Start the depth first search using the root node
	def depth_first_search(self, qry):
		return self.dfs_recursive(self.root, qry)


	# Perform the depth first search in a recursive manner
	def dfs_recursive(self, current_node, qry):
		if current_node.value == qry: # our search is complete!
			return current_node.value # success
		elif current_node.left is not None and qry < current_node.value:
			# We need to descend to left node
			return self.dfs_recursive(current_node.left, qry)
		elif current_node.right is not None and qry > current_node.value:
			# We need to descend to the right node
			return self.dfs_recursive(current_node.right, qry)
		else: # we have reached the bottom of the tree 
			return None # we cannot find the value
			

		

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
print("Finding 333 using BFS")
print(tree.breadth_first_search(333))
print("Finding 333 using DFS")
print(tree.depth_first_search(333))
print("Finding 123 using BFS")
print(tree.breadth_first_search(123))
print("Finding 123 using DFS")
print(tree.depth_first_search(123))

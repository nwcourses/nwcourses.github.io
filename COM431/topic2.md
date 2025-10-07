The linked list
---------------

Before moving onto the main topic for this week, object-oriented programming, we will start with a look at a further data structure, _linked lists_. Linked lists, which are _different to the plain **list**s we discussed above_, are unlike arrays in that they are _not_ stored continuously in memory. Instead, data is stored as a series of linked _nodes_. Each node contains one item of data, and links to the memory locations of the previous and the next item of data in the linked list.

![Linked list diagram](/static/linkedlist.png)

Each node has a link to the previous and the following node. When we add a new item of data, we make the previous node link to the new node, and we link the new node back to the previous node to form a two-way link.

The first node in the list links to nothing in the reverse direction (indicated in Python by the special value `None`) and similarly, the final node in the list links to nothing in the forward direction.

In addition, a linked list contains _two variables pointing to the first node and the last node_. This means that we can always access the start of the linked list and the end of the linked list very quickly and efficiently.

@ex1

@answer(1)

*   Remember how we could use simple arithmetic, using the array index, to calculate the location in memory of a given element in an array. Can we do this here? **We cannot. This is because, in a linked list, items are not stored continuously in memory. Instead, each node contains references to the memory locations of the previous and the following node.** The diagram below shows how we have to search through the linked list by following the forward links until we find the index we need:
    
    ![Indexing a linked list](/static/linked_list_index.png)
*   On the other hand, **as long as we have a reference to both the start and the end of the linked list, it's efficient to add a new member to the end of the linked list**. We can just create a new node and link it, both ways, to the end node. Contrast this to arrays, in which we had to create a new array with additional space and copy the elements over. We will explore this in more detail in the exercises this week.
    
    You can see this below with a linked list containing operating systems:
    
    ![Appending to a linked list](/static/linked_list_append.png)
*   Insertion into the _middle_ of the list (not asked as a question in the exercise) has mixed efficiency. On the one hand we have to find the index we want to insert the element at (which as we saw above is inefficient), on the other hand the actual insertion process is easier as we can just break the existing links between the node BEFORE the element we want to insert and the node AFTER this element, and then link in the new element.
    
    The diagram below shows the process of adding a new element by inserting it after another element. The operation would typically take, as parameters, the index we want to insert at (2 here, i.e. element CC) and the new data (DD here) to insert.
    
    ![Inserting into the middle of a linked list](/static/linked_list_insertion.png)

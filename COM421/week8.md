# Week 8: Efficient searching algorithms

## Introduction

This week we will continue with our look at algorithms by looking at how we can perform efficient *searches* with the binary search. We will also examine approaches for searching *trees* (which we did in Topic 5), considering breadth-first search and depth-first-search. This topic will prepare us for looking at graphs in two weeks' time.

## Efficient searching - avoiding brute-force algorithms

As we saw last week, searching through a list is an `O(n)` operation, as the worst-case scenario performance will be linearly proportional to the length of the list. We have to loop through each member of the list until we find the item that we are looking for, which, if near the end of the list, may take some time. 

This approach is known as *brute-force*. Brute-force algorithms attempt to find an answer through testing every possibility (here, every item in the list) and do not try to use any optimisations or more efficient techniques. Another example of a brute-force algorithm would be trying to find the factors of a number (factors of a number are every integer that the number can be divided by to give a further integer, for example the factors of 24 are 2, 3, 4, 6, 8 and 12). What we could do in a brute-force algorithm is to divide the number by every integer from 2 to the number to see if we get an integer as a result. This works, but is not efficient (`O(n)` with respect to the number). 

Another perhaps notorious brute-force technique is one which, sadly, has been proven successful despite the time taken, and that is brute-force password attacks. In this, every possible password of a certain length is tested on a login system. The result will be that the password will eventually discovered. Brute-force password attacks are now feasible due to increased computing power, notably brute-force dictionary attacks (in which known words are tested) which is the reason why longer and more obscure passwords - with special characters, lower- and upper-case letters, and numbers -  are now recommended compared to say 20 years ago.

### Binary search

Binary search is a significantly more efficient approach to searching than ordinary brute-force search (called *linear search*). It has `O(log n)` complexity, which as we saw last week, will mean it performs much better with large sets of data than an `O(n)` algorithm.

How does binary search work? It works by repeatedly "guessing" a position to index in a list to find a particular item of data. This is described in more detail below, but one point that needs to be made clear is that the data should be *sorted* - using a sorting algorithm - first. You might be asking yourself, wouldn't that make binary search not particularly efficient compared to linear search, as we have to sort first? The answer is - not necessarily. In many use-cases, such as, for example, searching for a record in a large list of people in some sort of records system (such as a student records system) it's likely that *searching* will have to be done many, many times. By contrast, the data would only have to be *sorted* once - i.e. when the data is first created - or at worst, when a new record is added to the data, which is likely to be infrequent.

Binary search is known as a *divide and conquer* algorithm because the data we are searching is repeatedly divided in order to efficiently find what we are looking for. This is how you would play a "guess the number" game. Someone would try to repeatedly guess a number, and the other person would say "lower" or "higher". The person guessing would then use the other person's response to narrow down the range of numbers they select from.

Here is an example of binary search. We have an array with 100 members containing names sorted in alphabetical order, and we are searching for "Smith, Tim".

- First we select the *midpoint* of the list. This could be the member with index 49 or 50 (doesn't matter which) for an 100-member list. If we use, in Python:
```
math.floor((start + end) / 2) # need to import math
```
where `start` is the start of the portion of the list we are searching (0 - as
we are searching the whole list) and `end` is the end of the portion of the list
(99 here, assuming a list of 100)
then it will always give a suitable midpoint to index. Note that `math.floor` takes a floating-point number and rounds it down. If the length is an even number (e.g. 100) it will give us the index of the item immediately before the midpoint (49) while if it is an odd number (e.g. 101) it will give us the exact midpoint (because indices start from 0 and `math.floor(101/2)` is `math.floor(50.5)` which is 50, in other words, exactly halfway between 0 and 100.

- You then see what value is at the midpoint. If it's *after* the search term, you know that you need to look at the portion of the list before the midpoint (i.e. 0-48) while if it is *before* the midpoint, you know that you need to look at the portion after the midpoint (i.e. 50-99). If the midpoint contains the value you're looking for, of course, you stop as the search has completed.

So, say we find "Jones, Jane" at position 49 in our example. We know we need to look within the range 50-99 because "Smith, Tim" is after "Jones, Jane" in the alphabet.

So we repeat the divide-and-conquer operation. We find the midpoint of 50 and 99 (74) and look at the value there. It's "Nodd, Nigel".

We repeat the process. "Smith, Tim" is after "Nodd, Nigel" in the alphabet so we know we have to search the portion of the list *after* 74. So we find the midpoint of 75 and 99, which is 87. We might get "Trott, Tina" at this position, so now we need to look at the portion *before* 87 (as "Smith, Tim" is before "Trott, Tina" in the alphabet). So we have to search within the portion75-86. We choose the midpoint, 80, and now found "Raven, Roger".

Our area of search is cut down now to 81-86. We pick 83 and find "Smith, Alice", i.e just before "Smith, Tim" alphabetically. We then only have three list positions to search - 84 to 86. So we pick the midpoint 85. We find "Smith, Simon". We now only have one possibility - 86 - and looking at item 86 we finally find what we want, "Smith, Tim".

The diagram below shows the process. Our search term (Smith, Tim) is shown using a red circle.

![Binary search](images/binary_search.png)

So how many searches did we need until we found Smith, Tim?

1. The first search, picking index 49 in the whole list gave "Jones, Jane"
2. The second search, picking index 74, gave us "Nodd, Nigel"
3. The third search, picking index 87, gave us "Trott, Tina".
4. The fourth search, picking index 80, gave us "Raven, Roger"
5. The fifth search, picking index 83, gave us "Smith, Alice"
6. The sixth search, picking index 85, gave us "Smith, Simon"
7. ... and in the seventh search, we eliminated the possibilites down to one index - 86 - and found what we were looking for, "Smith, Tim".

Clearly 7 checked items (and this was a worst case scenario here, as we only found what we were looking for after narrowing down the possibilities to one) is a good deal more efficient than the 87 we would have to check with a brute-force linear search!

### Why is the complexity of binary search `O(log n)`?

The complexity of binary search is `O(log n)`, with `n` the number of items in the list. In our example `n` was 100. What is `log(2) 100`? The exact value does not matter, but we know it will be between 6 and 7, as `log(2) 64` is 6 and `log(2) 128` is 7. So you can see that `O(log n)` fairly represents the complexity, as, in this worst-case scenario, we had 7 iterations.

How can we prove this? Think of a list with an exact power of 2 length, such
as 64, and imagine it's a worst-case scenario, where we have to narrow down to one possibility before we find what we are looking for.

- In the first iteration, we take the midpoint of 64 items and split the list into two portions of length 31 and 32 (rejecting the midpoint as it doesn't contain our search item)
- In the second iteration, we assume we search the longer portion of length 32, and split it into two portions of length 15 and 16 (again rejecting the midpoint)
- In the third iteration, we assume we search the portion of length 16, splitting it into portions of length 7 and 8;
- In the fourth iteration, we assume we search the portion of length 8, splitting it into portions of length 3 and 4;
- In the fifth iteration, we assume we search the portion of length 4, splitting it into portions of length 1 and 2,
- In the sixth iteration, we have two values. We assume we pick the "wrong" one.
- So in the seventh iteration, we only have one possibility left and we finally find what we are looking for, or conclude that it is not in the list.

So the length of the portion under search decreases from 64-32-16-8-4-2-1 in each iteration of the list. In other words, assuming the list length is an exact power of two, the number of iterations will be `log n + 1` (+1 because we also check a list of length 1 as well as the various powers of two; the lengths in each subsequent iteration are 2^6, 2^5, 2^4, 2^3, 2^2, 2^1 and 2^0 - i.e. 1). But as we saw last week, we only need to take the most significant term of the complexity and can discard the `+1` (as we are interested in the general behaviour of algorithms at large `n`, not the *exact* complexity) - giving us `O(log n)`.

Likewise, for a value `n` between `2^p` and `2^(p+1)`, the number of iterations will be `p-1`, or `log(floor(n))-1` - but again we can simplify to `O(log n)`. (For example, try repeating the above on a list of length 63, a value between 32 and 64, and you find that only six iterations are needed, as the length of the portion being searched will decrease 63-31-15-7-3-1).

### Exercise 1

Implement binary search to find if a number is a *square number* of any number from 1 to 100. You can initialise a list containing all these square numbers using a *list comprehension* as follows.
```
numbers = [i*i for i in range(1,101)]
```
This code means "fill the list with each value `i*i` for every value of `i` in the range 1 to 100" - in other words, the square of every number from 1 to 100, i.e. 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, ... etc ..., up to 10000 (100^2).

The user should input a number to search for. The binary search should search the list using binary search to find out if the number is within the list, and should also print its position within the list.

## Tree searching

We can efficiently search a *tree* by virtue of its structure. There are two 
general techniques for searching a tree:

- *Depth-first search*. This uses the recursive tree traversal technique we have examined already in [Week 5](week5.html), starting at the root node and then
recursively descending into the child nodes. When the search term is found, we will return it. If the tree is not sorted, we need to keep track of which nodes have been visited and which have not, so we can explore the whole tree. 

- *Breadth-first search*. Rather than recursively descending the tree, we
instead we consider each *level* one at a time. So if we have a tree 
organised as below:

![Example tree for breadth-first search](images/bfs_tree.png)

we would first consider node A (the first level), then nodes B and C (the second level), then nodes D, E, F and G (the third level).

Breadth-first search has various applications in route-finding, so by covering it now, we will prepare ourselves for the graphs and route-finding topic in Week 10. 

### Breadth-first search

We will now look at breadth-first search in some detail. It is of note that breadth-first search does *not require recursion*.

Note the order again in which we consider our nodes: A (the root node) first, followed by B and C (the root's child nodes), followed by D, E, F, and G (the child nodes of B and C).

Our aim is to try and search for a value in the tree. How might we do this?
We check A first, adding it to a collection of nodes to be considered.
```
[A]
```
If A doesn't match, we move on to its child nodes - B and C - and remove A from the collection of nodes to be considered. So, once we've considered and rejected A, the collection will contain B and C.
```
[B C]
```
If B doesn't match, then we know we might need to consider *its* child nodes (D and E) so we add them to the collection of nodes. Because we are doing a *breadth first* search, though, and considering the tree "level by level", D and E must be added to the collection of nodes to be searched *after* C - because when we consider B, we will not have considered C yet, and C is on the same level as B. So after considering B, we remove it fron the collection of nodes to be considered - so we are left with:
```
[C D E]
```

Next we consider C. If C doesn't match, then we know we might need to consider *its* child nodes (F and G) so we add them to the collection of nodes to be considered. Because we consider each level left-to-right, these should again be added to the collection *after* D and E. If C doesn't match, again we remove it, so at this stage, the collection of nodes to be considered will be:
```
[ D E F G ]
```

Hopefully you can see that it has linear `O(n)` complexity, dependent on the number of nodes, and thus is not especially efficient when it comes to simple trees. The use of breadth-first search becomes more apparent when we look at graphs; I am introducing the algorithm here so that you understand it when we begin the graphs topic.

#### Question

Can you see what data structure can be used to represent the collection of nodes to be considered? Why? **We will consider this in class and I will add the answer here after the class. I will also show you how you can use the Python standard library to create an instance of this data structure.**


### Using trees to store key/value pairs

I have said several times that we test whether each node 'matches'. What exactly do we mean by this? We'd typically use a tree to store and efficiently search for data as an alternative to hash tables. In other words, each node would contain a key/value pair, such as "1smitj01"/"John Smith" for the key and value respectively in a student records system. In Python, this would probably be stored as a tuple (if we didn't want to change the values) or two-member list (if we did). So we could search the tree for a given key (index), and test each node we find in breadth-first (or depth-first) search to see if its key is the key we are searching for. If it is, then we return the value.

### Binary search tree (depth-first)

This uses the technique we have seen already to search a tree for a given key (index), namely recursion. We recursively search each successive child node, starting at the root node, until we find the key we are looking for. 

For the search to be efficient, we need the tree to be *sorted*. We have seen already in ![Topic 5](week5.html) how to add items to a tree in sorted order. The search technique can be considered a specific case of depth-first search in which the tree is sorted and thus we know whether to select the left or right child node, and can ignore the other. For general depth-first search, we cannot guarantee this, and we will need to "backtrack" along branches of the tree to ensure all nodes are visited. In fact depth-first search is a general technique that works on graphs - to be covered in week 10 - as well as trees. As we will see, graphs are usually not sorted in any way.

To search a sorted binary tree we need to:

- Start at the root node and test that first. Return the value if the key matches.
- If the root node key is less than the key we are searching for, descend to the right node, otherwise descend to the left node.
- Repeat the process recursively until the key matches; when that happens, return the value.

Hopefully you can see that the complexity is of `O(log n)` form  (though requires slightly more than `log n` iterations). Nonetheless it scales well to large values of `n`, the number of items stored in the tree.

- If the tree has one level (a root only), we search one node.
- If the tree has two levels (three members), we search two nodes.
- If the tree has three levels (six members), we search three nodes.
- If the tree has four levels (ten members), we search four nodes.

The table below shows the relation between the number of nodes in a sorted and balanced binary tree, and the number of searches. (A *balanced* tree is one in which the data is evenly added to the left and right sides of the tree. There are techniques for ensuring this, but we will not have time to cover these in this module; I will leave this up to you to research).

| Number of nodes | Number of searches |
| --------------- | ------------------ |
| 1               | 1                  |
| 3               | 2                  |
| 6               | 3                  |
| 10              | 4                  |
| 15              | 5                  |
| 21              | 6                  |
| 28              | 7                  |
| 36              | 8                  |
| 45              | 9                  |
| 55              | 10                 |

### Exercise 2

Start with either your own tree from week 5 (if you have completed the week 5 exercise) or the pre-written tree solution at [GitHub](https://raw.githubusercontent.com/nwcourses/nwcourses.github.io/master/COM421/solutions/tree.py)

1. Implement breadth-first search using the tree.
2. If you finish question 1, implement a depth-first binary search using the tree.

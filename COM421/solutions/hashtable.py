class Hashtable:
  def __init__(self, capacity=127):
    self.nbuckets = capacity 
    #len(self.buckets) gives the capacity
    self.buckets = [None] * self.nbuckets

  # add a key,value to the hashtable
  def put (self, key, value):
    hash_code = self.getHashCode(key)

    # calculate the modulo-127 of the hash code     
    # place the key and value as a tuple within the correct bucket 
    # Note that each bucket needs to contain a list of tuples representing
    # each key-value pair that is added to this bucket.

    bucket_index = hash_code % 127

    if self.buckets[bucket_index] is None:
      self.buckets[bucket_index] = [] # empty list

    # why not this? - because more than one item might have same bucket index
    #self.buckets[bucket_index] = (key, value)

    self.buckets[bucket_index].append(( key , value ))
    

  # lookup a value in the hashtable using its key
  def get (self, key):
    hash_code = self.getHashCode(key)
    bucket_index = hash_code % 127
    if self.buckets[bucket_index] is not None: # if this bucket contains something
      for keyval in self.buckets[bucket_index]: # loop through the list in this bucket 
        if keyval[0] == key: # keyval is tuple containing key and value 
          return keyval[1] 

    return None # nothing was found with this key


  # Hash function = sum of ASCII codes
  def getHashCode (self, key):
    hash_code = 0

    for character in key: # loops through each character in the key
      # sum togther the ascii codes of each character
      hash_code += ord(character)
    # return hash code (sum of the ASCII codes)
    return hash_code

table = Hashtable()
table.put("cat", "A furry animal which goes meow")
table.put("dog", "A furry animal which goes woof")
table.put("act", "To do something")
print(table.get("cat"))
print(table.get("dog"))
print(table.get("act"))
print(table.get("rat"))

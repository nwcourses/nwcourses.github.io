import traceback

def recursive_print(num, limit):
	print(f"recursive_print(): parameters: num {num} limit {limit}")
	traceback.print_stack()

	if num <= limit:
		print(f"num does not exceed {limit}, so calling recursive_print again with argument of {num+1}")
		print(num)
		recursive_print(num+1, limit)

	print(f"Returning from recursive_print call with a parameter of {num}")

recursive_print(1, 10)

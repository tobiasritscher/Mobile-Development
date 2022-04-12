let message = "setec astronomy "
let permutation = [9, 10, 0, 13, 11, 3, 5, 15, 14, 12, 1, 6, 2, 4, 7, 8];
var result = Array(repeating: "ABC", count: message.count);
var count = 0;
for c in message {
    result[permutation[count]] = String(c);
count += 1 }
for c in result {
    print(c)
    
    

# Similar to Array#inject but also previous element in a block
#
# Usage:
#
# final_memo_value = inject_with_previous_element(array, initial_memo_value) { |memo, current_element, previous_element) }

def inject_with_previous_element(array, init, &block)
  acc = init
  array.each_with_index{ |element, index| acc = yield(acc, element, array[index - 1])}
  acc
end

input_depths = File.read('a_input.txt').lines.map{ |line| line.strip.to_i }
puts "Input: #{input_depths}"


result = inject_with_previous_element(input_depths, 0) { |acc, current, previous| ( previous && (current > previous)) ? acc + 1 : acc }
puts "Result: #{result}"

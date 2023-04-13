let vowels = 'AEIOUaeiou'

for (let i = 0; i < sentence.length; i ++) {
    let char = sentence[i]
    if (char.includes(vowels)) {
        char.replace("a")
    }
}
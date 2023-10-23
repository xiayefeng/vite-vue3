var bool = '21' > '200'
console.log(bool)

function compose (...funcs) {
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

function add1 (str) {
  return str + 1
}

function add2 (str) {
  return str + 2
}

function add3 (str) {
  return str + 3
}
function add4 (str) {
  return str + 4
}

function add5 (str) {
  return str + 5
}

let newaddfun = compose(add5, add4, add3, add2, add1);
console.log(newaddfun.toString())
console.log(newaddfun("abc")) // abc12345
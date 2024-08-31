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

const arr = [1, 2, 3, 4, 5];

async function asyncFunction (num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(num * 2);
      } catch (err) {
        reject(err)
      }

    }, 1000);
  });
}

const promises = arr.map(async (num, idx) => {
  const result = await asyncFunction(num);
  console.log(idx)
  return result;
});

Promise.all(promises).then((results) => {
  console.log(results); // [2, 4, 6, 8, 10]
});

function getImgSize(url) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve({
      width: img.width,
      height: img.height
    })
    img.onerror = () => resolve({
      width: 0,
      height: 0
    })
    img.src = url
  })
}

const {width} = await getImgSize('https://via.placeholder.com/200')
console.log(width)
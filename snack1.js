// Ottieni il titolo di un post con una Promise.
// Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise
// che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}

function getPostTitle(id) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      fetch(`https://dummyjson.com/posts/${id}`)
        .then((response) => response.json())
        .then((obj) => resolve(obj.title))
        .catch(reject);
    }, 2000);
  });
}

getPostTitle(1)
  .then((title) => console.log(`il titolo del post è:`, title)) // corretto title con response
  .catch((error) => console.error(error));

// 🎯 Bonus: Ottieni l'intero post con l'autore
// Crea una funzione getPost(id) che recupera l'intero post.
// Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.

// function getPost(id) {
//   return new Promise((resolve, reject) => {
//     setTimeout(function () {
//       fetch(`https://dummyjson.com/posts/${id}`)
//         .then((response) => response.json())
//         .then(function (obj) {
//           resolve(obj.userId);
//           obj = {
//             user: fetch(`https://dummyjson.com/users/${post.userId}`)
//               .then((response) => response.json())
//               .then((obj) => resolve(obj.user))
//               .catch(reject),
//           };
//         })
//         .catch(reject);
//     }, 2000);
//   });
// }

// SOLUZIONE CORRETTA

function getPost(id) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      fetch(`https://dummyjson.com/posts/${id}`)
        .then((response) => response.json())
        .then((post) => {
          fetch(`https://dummyjson.com/users/${post.userId}`)
            .then((response) => response.json())
            .then((user) => {
              const result = {
                ...post,
                user,
              };
              resolve(result).catch(reject);
            });
        })
        .catch(reject);
    }, 2000);
  });
}

getPost(1)
  .then((post) => console.log(`Il post completo è:`, post))
  .catch((error) => console.error(error));

// 🏆 Snack 2
// Crea la funzione lanciaDado() che restituisce una Promise che, dopo 3 secondi, genera un numero casuale tra 1 e 6.
// Tuttavia, nel 20% dei casi, il dado si "incastra" e la Promise va in reject.

// Ho avuto difficoltà sulla seconda parte, ho dovuto vedere il video della correzione

function lanciaDado() {
  return new Promise((resolve, reject) => {
    console.log("sto lanciando il dado...");
    setTimeout(() => {
      const incastrato = Math.random < 0.2;
      if (incastrato) {
        reject(` il dado si è incastrato! Riprova`);
      } else {
        const result = Math.floor(Math.random() * 6) + 1;
        resolve(result);
      }
    }, 3000);
  });
}

lanciaDado()
  .then((result) => console.log(`Il risultato è: `, result))
  .catch((error) => console.error(error));

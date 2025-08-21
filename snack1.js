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
              resolve(result);
            })
            .catch(reject);
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
  .then((result) => console.log(`Il risultato di lanciaDado è: `, result))
  .catch((error) => console.error(error));

//🎯 Bonus: HOF con closure per memorizzare l'ultimo lancio
// Modifica la funzione in creaLanciaDado(), che restituisce una closure che memorizza l'ultimo risultato.
//  Se il numero esce due volte di fila, stampa "Incredibile!".
// Correzioni eseguite: cambiato nome, assegnato  null alla variabile lancioIniziale, ho messo la function anonima dopo il return,
// riasssegnato null a lancioIniziale quando il dado si incastra, tolto dall'else lancio iniziale = result e messo in resolve(result)(avevo messo lancioInziiale)
// assegnato ad una variabile creaLanciaDado(), inseirto il secondo richiamo all'interno del .then(9 dopo il console.log())

function creaLanciaDado() {
  let lancioIniziale = null;

  return function () {
    new Promise((resolve, reject) => {
      console.log("Sto lanciando il dado...");

      const incastrato = Math.random() < 0.2;
      if (incastrato) {
        lancioIniziale = null;
        reject(` il dado si è incastrato! Riprova`);
      } else {
        const result = Math.floor(Math.random() * 6) + 1;
        if (result === lancioIniziale) {
          console.log(`Incredibile! Ti è uscito 2 volte:`, result);
        }
        lancioIniziale = result;
        resolve(result);
      }
    });
  };
}

const lanciaDadoConMemoria = creaLanciaDado();

lanciaDadoConMemoria()
  .then((result) => {
    console.log(`Il risultato di creaLanciaDado  è: `, result);
    lanciaDadoConMemoria()
      .then((result) =>
        console.log(`Il risultato di creaLanciaDado  è: `, result)
      )
      .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));

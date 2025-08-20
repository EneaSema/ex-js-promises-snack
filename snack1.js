// Ottieni il titolo di un post con una Promise.
// Crea una funzione getPostTitle(id) che accetta un id e restituisce una Promise
// che recupera il titolo di un post dal link https://dummyjson.com/posts/{id}

function getPostTitle(id) {
  return new Promise((resolve, reject) => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((response) => response.json())
      .then((obj) => resolve(obj.title))
      .catch(reject);
  });
}

getPostTitle(5)
  .then((response) => console.log(response))
  .catch((error) => console.error(error));

// 🎯 Bonus: Ottieni l'intero post con l'autore
// Crea una funzione getPost(id) che recupera l'intero post.
// Concatena una seconda chiamata che aggiunge una proprietà user che contiene i dati dell'autore, recuperati dalla chiamata https://dummyjson.com/users/{post.userId}.

// function getpost(id) {
//   return new Promise((resolve, reject) => {
//     fetch(`https://dummyjson.com/posts/${id}`)
//       .then((response) => console.log(response.json()))
//       .then((data) => console.log(resolve(data.title)))
//       .catch(reject);
//   });
// }

// {
//         fetch(`https://dummyjson.com/users/${post.userId}`)
//         .then((response) => console.log(response.json))
//         .then((data)=> console.log(resolve(data)))
//         .catch((reject))
//       }

// getPostTitle(1)
//   .then((response) => console.log(response))
//   .catch((error) => console.error(error));

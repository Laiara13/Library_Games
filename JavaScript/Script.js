{/* <header class="header">

<img id=logo src="./imagem/Logo.jpg" alt="">

<h2 id="titulo">Games Galery</h2>

</header> */}





// Configuração das informações de autenticação e cabeçalhos da API
let key = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '7a9f276c83msh3ec3bc3303ae41ep106a2cjsn8f9adc729f67',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};

// Seleciona o elemento com o ID "recebe" no documento HTML
let recebeElement = document.querySelector('#recebe');

// Seleciona o elemento com a classe "conteudos" no documento HTML
let conteudos = document.querySelector(".conteudos");

// Seleciona o elemento de input do tipo "search" no documento HTML
let inputSearch = document.querySelector("input[type='search']");

// Função assíncrona para buscar todos os jogos
async function getallgames() {
  try {
    // Realiza uma requisição assíncrona para a API e aguarda a resposta
    let response = await fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', key);

    // Converte a resposta em formato JSON
    let data = await response.json();

    // Mapeia os dados da resposta para um novo formato de objeto
    let items = data.map((item) => {
      return {
        title: item.title,
        thumbnail: item.thumbnail,
        short_description: item.short_description,
        publisher: item.publisher,
        platform: item.platform,
        genre: item.genre,
        game_url: item.game_url,
        developer: item.developer,
        release_date: item.release_date
      };
    });

    // Define um evento para quando o valor do campo de busca é alterado
    inputSearch.oninput = () => {
      // Limpa o conteúdo do elemento com a classe "conteudos"
      conteudos.innerHTML = "";

      // Filtra os itens com base no título inserido no campo de busca
      items
        .filter((item) =>
          item.title.toLowerCase().includes(inputSearch.value.toLowerCase())
        )
        // Para cada item filtrado, chama a função "addHTML"
        .forEach((item) => addHTML(item));
    };

    // Função para adicionar elementos HTML com base nos itens
    function addHTML(item) {
      let div = document.createElement("div");
      let title = document.createElement("h1");
      let thumbnail = document.createElement("img");
      let short_description = document.createElement("h2");
      let publisher = document.createElement("p");
      let platform = document.createElement("p");
      let genre = document.createElement("p");
      let game_url = document.createElement("p");
      let developer = document.createElement("p");
      let release_date = document.createElement("p");

      // Define o conteúdo dos elementos com base nos dados do item
      title.innerHTML = item.title;
      thumbnail.src = item.thumbnail;
      short_description.innerHTML = item.short_description;
      publisher.innerHTML = item.publisher;
      platform.innerHTML = item.platform;
      genre.innerHTML = item.genre;
      game_url.innerHTML = item.game_url;
      developer.innerHTML = item.developer;
      release_date.innerHTML = item.release_date;

      // Anexa os elementos criados ao elemento pai "div"
      div.appendChild(title);
      div.appendChild(thumbnail);
      div.appendChild(short_description);
      div.appendChild(publisher);
      div.appendChild(genre);
      div.appendChild(platform);
      div.appendChild(game_url);
      div.appendChild(developer);
      div.appendChild(release_date);

      // Adiciona a "div" ao elemento com a classe "conteudos"
      conteudos.append(div);
    }

    // Para cada item, chama a função "addHTML" para criar os elementos HTML
    items.forEach((item) => {
      addHTML(item);
    });
  } catch (error) {
    // Em caso de erro, exibe o erro no console
    console.error(error);
  }
}

// Chama a função "getallgames" para iniciar o processo de busca de jogos
getallgames();
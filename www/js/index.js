var app = {
    pizzariaId: "Pizzaria_do_Tonhao",
    listaPizzasCadastradas: [],
    pizzaAtualId: null,
    elements: {},
    
    init: function() {
      this.elements.applista = document.getElementById('applista');
      this.elements.appcadastro = document.getElementById('appcadastro');
      this.elements.listaPizzas = document.getElementById('listaPizzas');
      this.elements.btnNovo = document.getElementById('btnNovo');
      this.elements.btnFoto = document.getElementById('btnFoto');
      this.elements.btnSalvar = document.getElementById('btnSalvar');
      this.elements.btnExcluir = document.getElementById('btnExcluir');
      this.elements.btnCancelar = document.getElementById('btnCancelar');
      this.elements.pizzaInput = document.getElementById('pizza');
      this.elements.precoInput = document.getElementById('preco');
      this.elements.imagem = document.getElementById('imagem');
      
      cordova.plugin.http.setDataSerializer('json');
      
      this.bindEvents();
      this.toggleScreen("lista");
      this.carregarPizzas();
      console.log("Aplicativo iniciado com sucesso!");
    },
    
    bindEvents: function() {
      var self = this;
      this.elements.btnNovo.addEventListener('click', function() {
        self.clearCadastro();
        self.toggleScreen("cadastro");
      });
      this.elements.btnCancelar.addEventListener('click', function() {
        self.toggleScreen("lista");
      });
      this.elements.btnFoto.addEventListener('click', function() {
        self.onFoto();
      });
      this.elements.btnSalvar.addEventListener('click', function() {
        self.onSalvar();
      });
      this.elements.btnExcluir.addEventListener('click', function() {
        self.onExcluir();
      });
    },
    
    toggleScreen: function(screen) {
      if (screen === "lista") {
        this.elements.applista.style.display = 'flex';
        this.elements.appcadastro.style.display = 'none';
      } else if (screen === "cadastro") {
        this.elements.applista.style.display = 'none';
        this.elements.appcadastro.style.display = 'flex';
      }
    },
    
    clearCadastro: function() {
      this.pizzaAtualId = null;
      this.elements.pizzaInput.value = "";
      this.elements.precoInput.value = "";
      this.elements.imagem.style.backgroundImage = "";
    },
    
    carregarPizzas: function() {
      var self = this;
      self.elements.listaPizzas.innerHTML = "";
      var url = 'https://pedidos-pizzaria.glitch.me/admin/pizzas/' + self.pizzariaId;
      cordova.plugin.http.sendRequest(url, { method: 'GET' },
        function(response) {
          try {
            self.listaPizzasCadastradas = (response.data && response.data !== "") ? JSON.parse(response.data) : [];
          } catch(e) {
            console.error("Erro ao interpretar a resposta:", e);
            self.listaPizzasCadastradas = [];
          }
          self.renderLista();
        },
        function(error) {
          console.error("Erro ao carregar pizzas:", error);
          alert("Erro ao carregar as pizzas.");
        }
      );
    },
    
    renderLista: function() {
      var self = this;
      this.elements.listaPizzas.innerHTML = "";
      this.listaPizzasCadastradas.forEach(function(item, idx) {
        var divLinha = document.createElement('div');
        divLinha.className = 'linha';
        divLinha.innerText = item.pizza;
        divLinha.id = idx;
        divLinha.addEventListener('click', function() {
          self.carregarDadosPizza(idx);
        });
        self.elements.listaPizzas.appendChild(divLinha);
      });
    },
    
    carregarDadosPizza: function(idx) {
      var item = this.listaPizzasCadastradas[idx];
      if (item) {
        this.pizzaAtualId = item._id;
        this.elements.pizzaInput.value = item.pizza;
        this.elements.precoInput.value = item.preco;
        this.elements.imagem.style.backgroundImage = item.imagem;
        this.toggleScreen("cadastro");
      } else {
        alert("Pizza não encontrada.");
      }
    },
    
    onFoto: function() {
      var self = this;
      navigator.camera.getPicture(
        function(imageData) {
          self.elements.imagem.style.backgroundImage = "url(data:image/jpeg;base64," + imageData + ")";
        },
        function(error) {
          console.error("Erro ao capturar foto:", error);
          alert("Erro na captura da foto.");
        },
        { quality: 50, destinationType: Camera.DestinationType.DATA_URL }
      );
    },
    
    onSalvar: function() {
      var self = this;
      var data = {
        pizzaria: self.pizzariaId,
        pizza: self.elements.pizzaInput.value,
        preco: self.elements.precoInput.value,
        imagem: self.elements.imagem.style.backgroundImage
      };
      var method = (self.pizzaAtualId) ? 'PUT' : 'POST';
      if (self.pizzaAtualId) {
        data.pizzaid = self.pizzaAtualId;
      }
      cordova.plugin.http.sendRequest('https://pedidos-pizzaria.glitch.me/admin/pizza/', { method: method, data: data },
        function(response) {
          console.log("Resposta do salvar:", response);
          alert(self.pizzaAtualId ? "Pizza atualizada com sucesso!" : "Pizza cadastrada com sucesso!");
          self.carregarPizzas();
          self.toggleScreen("lista");
        },
        function(error) {
          console.error("Erro ao salvar pizza:", error);
          alert("Erro ao salvar a pizza.");
        }
      );
    },
    
    onExcluir: function() {
      var self = this;
      if (!self.pizzaAtualId) {
        alert("Selecione uma pizza para excluir.");
        return;
      }
      var url = 'https://pedidos-pizzaria.glitch.me/admin/pizza/' + self.pizzariaId + '/' + self.elements.pizzaInput.value;
      cordova.plugin.http.sendRequest(url, { method: 'DELETE' },
        function(response) {
          console.log("Resposta do excluir:", response);
          alert("Pizza excluída com sucesso!");
          self.carregarPizzas();
          self.toggleScreen("lista");
        },
        function(error) {
          console.error("Erro ao excluir pizza:", error);
          alert("Erro ao excluir a pizza.");
        }
      );
    }
  };
  
  document.addEventListener('deviceready', function() {
    app.init();
  }, false);
  
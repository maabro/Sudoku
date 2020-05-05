class Jugador {
  constructor(dificultad, acierto, error, tiempo) {
    this.dificultad = dificultad;
    this.acierto = acierto;
    this.error = error;
    this.tiempo = tiempo;
  }

  guardarPuntuacion() {
    var puntuacion = { dificultad: this.dificultad, aciertos: this.acierto, errores: this.error, tiempo: this.tiempo };
    localStorage.setItem("p" + localStorage.length, JSON.stringify(puntuacion));
  }

}
const indexedDB = window.indexedDB;

class Partida {
  constructor(sudoku) {
    this.sudoku = sudoku;
    this.sudo2=null;
  }

  guardarSudoku() {
    var request = indexedDB.open("sudoku", 1);
    var dif;
    var sud = this.sudoku;
    request.onerror = function (event) {
      console.log("Error: ", event.target.errorCode);
    }
    request.onupgradeneeded = function () {
      db = request.result;
      
      const objectStore = db.createObjectStore(['sudoku'], { keyPath: 'tipo', autoIncrement: true });
      objectStore.createIndex('nums', 'nums.num', { unique: false, multiEntry: true });
      objectStore.transaction.oncomplete = function () {
        var transaction = db.transaction(['sudoku'], 'readwrite').objectStore(['sudoku']);
        transaction.add(sud[0]);
        transaction.add(sud[1]);
        transaction.add(sud[2]);
      }
      //db.close();
    };
    request.onsuccess = function (event) {
      db = request.result;
      
      //db.close();
      //mostrarSudoku(dif);
    }
    
  }

  mostrarSudoku(dif) {
    var request = indexedDB.open("sudoku", 1);
    var dd = [];

    /*request.onsuccess = function(event) {
      
    }*/

    //db = request.result;
    console.log(db);
    const obj = db.objectStore('sudoku').get(dif);
    obj.transaction.oncomplete = function (event) {
      return event.target.result.nums;
    }
    /*db.transaction(['sudoku'], 'readonly').objectStore('sudoku').get(dif).oncomplete = function(event){
      //dd.push(event.target.result.nums);
      
    } ;*/
                       
    console.log(dd);
    //db.close();
    //return dd;
  
  }

   
}
var db;
const DEFAULT_TRANSITION = 'fade';
var json = [
  {
    tipo: "suFacil",
    nums: [
      [{ num: 8 }, { num: 1 }, { num: 7 }, { num: 5 }, { num: 9 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 6 }],
      [{ num: 2 }, { num: 3 }, { num: 6 }, { num: 8 }, { num: 4 }, { num: 7 }, { num: 1 }, { num: 9 }, { num: 5 }],
      [{ num: 9 }, { num: 4 }, { num: 5 }, { num: 6 }, { num: 3 }, { num: 1 }, { num: 8 }, { num: 7 }, { num: 2 }],
      [{ num: 7 }, { num: 9 }, { num: 4 }, { num: 2 }, { num: 6 }, { num: 8 }, { num: 5 }, { num: 1 }, { num: 3 }],
      [{ num: 3 }, { num: 2 }, { num: 1 }, { num: 4 }, { num: 7 }, { num: 5 }, { num: 6 }, { num: 8 }, { num: 9 }],
      [{ num: 6 }, { num: 5 }, { num: 8 }, { num: 3 }, { num: 1 }, { num: 9 }, { num: 7 }, { num: 2 }, { num: 4 }],
      [{ num: 1 }, { num: 6 }, { num: 3 }, { num: 9 }, { num: 8 }, { num: 4 }, { num: 2 }, { num: 5 }, { num: 7 }],
      [{ num: 5 }, { num: 8 }, { num: 9 }, { num: 7 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 6 }, { num: 1 }],
      [{ num: 4 }, { num: 7 }, { num: 2 }, { num: 1 }, { num: 5 }, { num: 6 }, { num: 9 }, { num: 3 }, { num: 8 }]
    ]
  },
  {
    tipo: "suNormal",
    nums: [
      [{ num: 8 }, { num: 1 }, { num: 6 }, { num: 7 }, { num: 9 }, { num: 5 }, { num: 3 }, { num: 2 }, { num: 4 }],
      [{ num: 7 }, { num: 9 }, { num: 3 }, { num: 2 }, { num: 4 }, { num: 1 }, { num: 5 }, { num: 6 }, { num: 8 }],
      [{ num: 4 }, { num: 5 }, { num: 2 }, { num: 8 }, { num: 3 }, { num: 6 }, { num: 1 }, { num: 7 }, { num: 9 }],
      [{ num: 3 }, { num: 7 }, { num: 9 }, { num: 1 }, { num: 6 }, { num: 4 }, { num: 2 }, { num: 8 }, { num: 5 }],
      [{ num: 5 }, { num: 4 }, { num: 1 }, { num: 3 }, { num: 2 }, { num: 8 }, { num: 7 }, { num: 9 }, { num: 6 }],
      [{ num: 6 }, { num: 2 }, { num: 8 }, { num: 5 }, { num: 7 }, { num: 9 }, { num: 4 }, { num: 1 }, { num: 3 }],
      [{ num: 9 }, { num: 6 }, { num: 7 }, { num: 4 }, { num: 5 }, { num: 2 }, { num: 8 }, { num: 3 }, { num: 1 }],
      [{ num: 2 }, { num: 8 }, { num: 5 }, { num: 9 }, { num: 1 }, { num: 3 }, { num: 6 }, { num: 4 }, { num: 7 }],
      [{ num: 1 }, { num: 3 }, { num: 4 }, { num: 6 }, { num: 8 }, { num: 7 }, { num: 9 }, { num: 5 }, { num: 2 }]
    ]
  },
  {
    tipo: "suDificil",
    nums: [
      [{ num: 6 }, { num: 7 }, { num: 5 }, { num: 4 }, { num: 1 }, { num: 9 }, { num: 2 }, { num: 8 }, { num: 3 }],
      [{ num: 9 }, { num: 4 }, { num: 3 }, { num: 6 }, { num: 8 }, { num: 2 }, { num: 7 }, { num: 1 }, { num: 5 }],
      [{ num: 1 }, { num: 8 }, { num: 2 }, { num: 5 }, { num: 3 }, { num: 7 }, { num: 6 }, { num: 4 }, { num: 9 }],
      [{ num: 7 }, { num: 9 }, { num: 8 }, { num: 3 }, { num: 6 }, { num: 5 }, { num: 1 }, { num: 2 }, { num: 4 }],
      [{ num: 3 }, { num: 1 }, { num: 6 }, { num: 2 }, { num: 7 }, { num: 4 }, { num: 5 }, { num: 9 }, { num: 8 }],
      [{ num: 5 }, { num: 2 }, { num: 4 }, { num: 8 }, { num: 9 }, { num: 1 }, { num: 3 }, { num: 7 }, { num: 6 }],
      [{ num: 2 }, { num: 3 }, { num: 7 }, { num: 9 }, { num: 4 }, { num: 6 }, { num: 8 }, { num: 5 }, { num: 1 }],
      [{ num: 8 }, { num: 5 }, { num: 9 }, { num: 1 }, { num: 2 }, { num: 3 }, { num: 4 }, { num: 6 }, { num: 7 }],
      [{ num: 4 }, { num: 6 }, { num: 1 }, { num: 7 }, { num: 5 }, { num: 8 }, { num: 9 }, { num: 3 }, { num: 2 }]
    ]
  },
];

var suJson = new Partida(json);
suJson.guardarSudoku();

Vue.component('home', {
  data: function () {
    return {
      puntuaciones: []
    };
  },
  created: function () {
    if (this.puntuaciones.length != localStorage.length) {
      for (var m = 0; m < localStorage.length; m++) {
        let key = "p" + m;
        let datosDB = JSON.parse(localStorage.getItem(key));
        this.puntuaciones.push(datosDB);
      }
    }
  },
  template: `
  <div>
  <div class="home-container">
    <h2>Puntuaciones</h2>
    <table class="table table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Dificultad</th>
          <th scope="col">Aciertos</th>
          <th scope="col">Errores</th>
          <th scope="col">Tiempo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{dificultad, aciertos, errores, tiempo} in puntuaciones">
          <th scope="row">{{dificultad}}</th>
          <td>{{aciertos}}</td>
          <td>{{errores}}</td>
          <td>{{tiempo}}</td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
  `
});

Vue.component('pie-pagina', {
  template: `
  <footer>
    <div class="inner">
      <p>&copy Sudoku! M06UF3 DAW2.</p>
      <p>Creado por Victor Lucas y Marcos Abaurrea</p>
    </div>
  </footer>  
  `
});


var mixinComprobar = {
  methods: {
    evaluarJuego(dif) {
      var json2 = JSON.parse(JSON.stringify(json));
      var suOriginal = json2[dif].nums;
      var errores = 0;
      var aciertos = 0;
      for (var i = 0; i < 9; ++i) {
        for (var k = 0; k < 9; ++k) {
          if (suOriginal[i][k].num == this.matriz[i][k].num) {
            aciertos++;
          }
          else {
            errores++;
          }
        }
      }
      var difi;
      if (dif == 0) difi = "Fácil";
      else if (dif == 1) difi = "Normal";
      else difi = "Difícil";
      var tiempo = this.minutos + "min " + this.segundos + "s";
      var jug = new Jugador(difi,aciertos,errores,tiempo);
      jug.guardarPuntuacion();
      if(errores > 0) {
        this.respTexto = "Has perdido! :(";
        this.mostrarRespuesta = true;
        this.empJuego = false;
        this.bad = true;
        setTimeout(() => {
          this.mostrarRespuesta = false;
          this.empJuego = true;
        }, 2000);
      }else{
        this.respTexto = "Has ganado! :)";
        this.mostrarRespuesta = true;
        this.empJuego = false;
        this.good = true;
        setTimeout(() => {
          this.mostrarRespuesta = false;
          this.empJuego = true;
        }, 2000);      
      }
      clearInterval(this.interval);
    }
  }
}

Vue.component('su-facil', {
  data: function () {
    return {
      prevHeight: 0,
      matriz: [],
      initJuegoTexto: "Empezar",
      evalJuegoTexto: "Verificar",
      respTexto: "",
      empJuego: false,
      mostrarRespuesta: false,
      transitionName: DEFAULT_TRANSITION,
      tiempo: 0,
      segundos: 0,
      minutos: 0,
      interval: null,
      suFacil: [],
      good: false,
      bad: false,
    };
  },
  mixins: [mixinComprobar],
  methods: {
    iniciarJuego() {
      var json2 = JSON.parse(JSON.stringify(json));
      this.suFacil = json2[0].nums;
      //this.suFacil = suJson.mostrarSudoku("suFacil");
      for (var i = 0; i < 9; ++i) {
        for (var k = 0; k < 3; ++k) {
          var numAleatorio = Math.floor(Math.random() * this.suFacil.length);
          this.suFacil[i][numAleatorio].num = "";
        }
      }
      this.matriz = this.suFacil;
      this.initJuegoTexto = "Reiniciar";
      this.empJuego = true;
      this.tiempo = 0;
      this.segundos = 0;
      this.minutos = 0;
      this.interval = setInterval(this.temporizador, 1000);    
    },
    temporizador() {
      this.tiempo = this.tiempo + 1000;
      this.segundos = Math.floor((this.tiempo % (1000 * 60)) / 1000);
      this.minutos = Math.floor((this.tiempo % (1000 * 60 * 60)) / (1000 * 60));
    }
  },
  template: `<div>
  <div class="sudoku">

    <div class="buttons-container">
        <button class="button  btn btn-dark" v-on:click="iniciarJuego()"><span>{{ initJuegoTexto }}</span></button>

        <transition :name="transitionName">
            <button class="button  btn btn-dark" v-on:click="evaluarJuego(0)" v-if="empJuego"><span>{{ evalJuegoTexto }}</span></button>
        </transition>
    </div>

    <div v-if="empJuego"><p>Tiempo {{minutos}}min {{segundos}}s</p></div>

    <transition :name="transitionName">
        <div class="grid-sudoku" v-if="empJuego && !mostrarRespuesta">

            <div v-for="row in matriz" class="grid-row">
                <div v-for="cell in row" class="grid-cell">
                    <transition-group tag="div" name="list-animation">
                        <input type="text" v-bind:key="cell.num" v-model="cell.num" class="grid-cell-editor" />
                    </transition-group>
                </div>
            </div>

        </div>
    </transition>

    <transition :name="transitionName">
        <div v-if="mostrarRespuesta" class="answer" v-bind:class="{ 'bg-success': good, 'bg-danger': bad }">
            <span class="text-light">{{respTexto}}</span>
        </div>
    </transition>

  </div>
  </div>`
});

Vue.component('su-normal', {
  data: function () {
    return {
      prevHeight: 0,
      matriz: [],
      initJuegoTexto: "Empezar",
      evalJuegoTexto: "Verificar",
      respTexto: "",
      empJuego: false,
      mostrarRespuesta: false,
      transitionName: DEFAULT_TRANSITION,
      tiempo: 0,
      segundos: 0,
      minutos: 0,
      interval: null,
      good: false,
      bad: false,
    };
  },
  mixins: [mixinComprobar],
  methods: {
    iniciarJuego() {
      var json2 = JSON.parse(JSON.stringify(json));
      var suNormal = json2[1].nums;
      for (var i = 0; i < 9; ++i) {
        for (var k = 0; k < 4; ++k) {
          var numAleatorio = Math.floor(Math.random() * suNormal.length);
          suNormal[i][numAleatorio].num = "";
        }
      }
      this.matriz = suNormal;
      this.initJuegoTexto = "Reiniciar";
      this.empJuego = true;
      this.tiempo = 0;
      this.segundos = 0;
      this.minutos = 0;
      this.interval = setInterval(this.temporizador, 1000);
    },
    temporizador() {
      this.tiempo = this.tiempo + 1000;
      this.segundos = Math.floor((this.tiempo % (1000 * 60)) / 1000);
      this.minutos = Math.floor((this.tiempo % (1000 * 60 * 60)) / (1000 * 60));
    }
  },
  template: `<div>
  <div class="sudoku">

    <div class="buttons-container">
        <button class="button  btn btn-dark" v-on:click="iniciarJuego()"><span>{{ initJuegoTexto }}</span></button>

        <transition :name="transitionName">
            <button class="button  btn btn-dark" v-on:click="evaluarJuego(1)" v-if="empJuego"><span>{{ evalJuegoTexto }}</span></button>
        </transition>
    </div>

    <div v-if="empJuego"><p>Tiempo {{minutos}}min {{segundos}}s</p></div>

    <transition :name="transitionName">
        <div class="grid-sudoku" v-if="empJuego && !mostrarRespuesta">

            <div v-for="row in matriz" class="grid-row">
                <div v-for="cell in row" class="grid-cell">
                    <transition-group tag="div" name="list-animation">
                        <input type="text" v-bind:key="cell.num" v-model="cell.num" class="grid-cell-editor" />
                    </transition-group>
                </div>
            </div>

        </div>
    </transition>

    <transition :name="transitionName">
        <div v-if="mostrarRespuesta" class="answer" v-bind:class="{ 'bg-success': good, 'bg-danger': bad }">
            <span class="text-light">{{respTexto}}</span>
        </div>
    </transition>

  </div>
  </div>`
});

Vue.component('su-dificil', {
  data: function () {
    return {
      prevHeight: 0,
      matriz: [],
      initJuegoTexto: "Empezar",
      evalJuegoTexto: "Verificar",
      respTexto: "",
      empJuego: false,
      mostrarRespuesta: false,
      transitionName: DEFAULT_TRANSITION,
      tiempo: 0,
      segundos: 0,
      minutos: 0,
      interval: null,
      good: false,
      bad: false,
    };
  },
  mixins: [mixinComprobar],
  methods: {
    iniciarJuego() {
      var json2 = JSON.parse(JSON.stringify(json));
      var suDificil = json2[2].nums;
      for (var i = 0; i < 9; ++i) {
        for (var k = 0; k < 5; ++k) {
          var numAleatorio = Math.floor(Math.random() * suDificil.length);
          suDificil[i][numAleatorio].num = "";
        }
      }
      this.matriz = suDificil;
      this.initJuegoTexto = "Reiniciar";
      this.empJuego = true;
      this.tiempo = 0;
      this.segundos = 0;
      this.minutos = 0;
      this.interval = setInterval(this.temporizador, 1000);
    },
    temporizador() {
      this.tiempo = this.tiempo + 1000;
      this.segundos = Math.floor((this.tiempo % (1000 * 60)) / 1000);
      this.minutos = Math.floor((this.tiempo % (1000 * 60 * 60)) / (1000 * 60));
    }
  },
  template: `<div>
  <div class="sudoku">

  <div class="buttons-container">
      <button class="button btn btn-dark" v-on:click="iniciarJuego()"><span>{{ initJuegoTexto }}</span></button>

      <transition :name="transitionName">
          <button class="button btn btn-dark" v-on:click="evaluarJuego(2)" v-if="empJuego"><span>{{ evalJuegoTexto }}</span></button>
      </transition>
  </div>

  <div v-if="empJuego"><p>Tiempo {{minutos}}min {{segundos}}s</p></div>

  <transition :name="transitionName">
      <div class="grid-sudoku" v-if="empJuego && !mostrarRespuesta">

          <div v-for="row in matriz" class="grid-row">
              <div v-for="cell in row" class="grid-cell">
                  <transition-group tag="div" name="list-animation">
                      <input type="text" v-bind:key="cell.num" v-model="cell.num" class="grid-cell-editor" />
                  </transition-group>
              </div>
          </div>

      </div>
  </transition>

  <transition :name="transitionName">
    <div v-if="mostrarRespuesta" class="answer" v-bind:class="{ 'bg-success': good, 'bg-danger': bad }">
        <span class="text-light">{{respTexto}}</span>
    </div>
  </transition>

  </div>
  </div>`
});

const error = {
  data: function () {
    return {
      url: window.location.hash
    };
  },
  template: `
  <div>
    <p>URL no encaminada : {{url}} </p>
  </div>
  `
};
const home = {
  template: '<home></home>'
};
const facil = {
  template: '<su-facil></su-facil>'
};
const normal = {
  template: '<su-normal></su-normal>'
};
const dificil = {
  template: '<su-dificil></su-dificil>'
};

const rutes = {
  '#/': home,
  '#/sudoku/facil': facil,
  '#/sudoku/normal': normal,
  '#/sudoku/dificil': dificil
};

var app = new Vue({
  el: '#app',
  data: function () {
    return {
      rutaActual: window.location.hash,
      rutes: rutes,
      prevHeight: 0,
      transitionName: DEFAULT_TRANSITION,
    };
  },
  methods: {
    navegar: function ($event) {
      this.rutaActual = $event.target.hash;
    },
    beforeLeave(element) {
      this.prevHeight = getComputedStyle(element).height;
    },
    enter(element) {
      const { height } = getComputedStyle(element);

      element.style.height = this.prevHeight;

      setTimeout(() => {
        element.style.height = height;
      });
    },
    afterEnter(element) {
      element.style.height = 'auto';
    },
  },
  computed: {
    vistaActual: function () {
      return this.rutes[this.rutaActual] || error;
    }
  },
  template: `
    <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <h2 class="text-light h2-nav">Sudoku!</h2>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="nav-link" href="#/" v-on:click="navegar">Home</a></li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sudokus
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item"  href="#/sudoku/facil" v-on:click="navegar">Fácil</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item"  href="#/sudoku/normal" v-on:click="navegar">Normal</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item"  href="#/sudoku/dificil" v-on:click="navegar">Difícil</a>
              </div>
            </li>
          </ul>
         </div>
      </nav>
      <transition :name="transitionName" mode="out-in" @beforeLeave="beforeLeave" @enter="enter" @afterEnter="afterEnter">
        <div v-bind:is="vistaActual"></div>
      </transition>
      <pie-pagina></pie-pagina>
    </div>
    `
});
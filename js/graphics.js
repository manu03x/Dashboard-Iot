
let seriesForUv = [];
let seriesForSonico = [];
let lastDate = new Date().getTime();

const movimientoGraphic = document.getElementById('movimiento-graph');
const sensorMode = document.querySelector('#sensor-mode');
const sensorToggles = document.querySelectorAll('input[type="checkbox"]');



//HOVER FX
// Esta función alterna la clase 'effect' en el elemento con el id 'circle'
setInterval(function() {
  var elements = document.querySelectorAll('.circle');
  elements.forEach( element => {
    element.classList.toggle('effect');
  })

}, 1000);

// Esta función genera una serie de tiempo diaria con valores predefinidos
function lineDataManagement(array, sensorName) { // Obtiene la fecha y hora actual en milisegundos
  let value = sensorData.getData(sensorName) || 0; // Se reciben los datos de la clase
  array.push([lastDate, value]); // Agrega el tiempo en formato "MM:SS" y el valor a la serie
  lastDate = new Date().getTime();

  if(array.length > 10) {
    array.shift();
  }
  }

// Configuración del gráfico radial para temperatura
const optionsTemperatura = {
    chart: {
      id: "temperatura",
      height: 280,
      type: "radialBar",
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
    },
    },
    series: [0],
    colors: ['#00E396', '#0090FF'],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          background: '#1B213B',
          startAngle: -135,
          endAngle: 135,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#0090FF',
            opacity: 1,
            blur: 2
          }
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            color: "#FFF",
            fontSize: "30px",
            show: true,
            formatter: function (val) {
              return val + '°'
            }
          },
          
        }
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        gradientToColors: ['#0090FF'],
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: "butt"
    },
    labels: ["Progress"],

  };
// Configuración del gráfico radial para sonico
const optionsSonico = {
  series: [{
  data: seriesForSonico.slice()
}],
  chart: {
  id: 'realtime',
  height: 350,
  type: 'line',
  animations: {
    enabled: true,
    easing: 'linear',
    dynamicAnimation: {
      enabled: true,
      delay: 1000
    }
  },
  toolbar: {
    show: false
  },
  zoom: {
    enabled: false
  }
},
dataLabels: {
  enabled: true
},
stroke: {
  curve: 'smooth'
},
foreColor: '#FFFFFF',
markers: {
  size: 0
},
xaxis: {
  type: 'datetime'
},
yaxis: {
  min: 0,
  max: 400,
  labels: {
    show:true,
    style: {
      fontSize: '13px',
      colors: '#FFFFFF'
    }
  },
},
legend: {
  show: false
},
};

const optionsUv = {
  series: [{
  data: seriesForUv.slice()
}],
  chart: {
  id: 'realtime',
  height: 350,
  type: 'line',
  animations: {
    enabled: true,
    easing: 'linear',
    dynamicAnimation: {
      enabled: true,
      delay: 1000
    }
  },
  toolbar: {
    show: false
  },
  zoom: {
    enabled: false
  }
},
dataLabels: {
  enabled: true
},
stroke: {
  curve: 'smooth'
},
foreColor: '#FFFFFF',
markers: {
  size: 0
},
xaxis: {
  type: 'datetime',
},
yaxis: {
  min: 0,
  max: 11,
  labels: {
    show:true,
    style: {
      fontSize: '13px',
      colors: '#FFFFFF'
    }
  },
},
legend: {
  show: false
},
};


// Creación de instancias de gráficos ApexCharts con las opciones correspondientes
const temperatura = new ApexCharts(document.querySelector("#temperatura"), optionsTemperatura);
const uv = new ApexCharts(document.querySelector("#uv"), optionsUv);
const sonico = new ApexCharts(document.querySelector("#sonico"), optionsSonico);
// const prueba = new ApexCharts(document.querySelector("#sonico"), optionsPrueba);


// Renderizado de los gráficos en los elementos HTML correspondientes
temperatura.render();
uv.render();
sonico.render();
// prueba.render();

  // setInterval(manageSensorDataForGraphics, 1000)



// Función que genera valores aleatorios y actualiza las series de los gráficos

function manageSensorDataForGraphics() {
let temperaturaData = sensorData.getData('temperatura')
let movimientoData = sensorData.getBulbStates()
let sonicoData = sensorData.getData('sonico')


temperatura.updateSeries([temperaturaData]);
sonico.updateSeries([sonicoData]);
console
if(movimientoData.movimiento == 0) {
  movimientoGraphic.classList.add('active')
} else {
  movimientoGraphic.classList.remove('active')
}

lineDataManagement(seriesForUv, 'uv')
lineDataManagement(seriesForSonico, 'sonico')

uv.updateOptions({
  series: [{
    data: seriesForUv.slice()
  }],
  xaxis: {
    labels: {
      show:true,
      style: {
        fontSize: '13px',
        colors: '#FFFFFF'
      }
    },

    min: lastDate-(1*10000), // Where the 6 is the number of days
    max: lastDate - 1000, // Today
  }
})

sonico.updateOptions({
  series: [{
    data: seriesForSonico.slice()
  }],
  xaxis: {
    labels: {
      show:true,
      style: {
        fontSize: '13px',
        colors: '#FFFFFF'
      }
    },
    min: lastDate-(1*10000), // Where the 6 is the number of days
    max: lastDate - 1000, // Today
  }

})



}
window.addEventListener('DOMContentLoaded', () => {
  handleCheckboxChange(sensorMode)
})

sensorMode.addEventListener('change', (e) => {
  handleCheckboxChange(e.target)
})

sensorToggles.forEach(toggle => {
  toggle.addEventListener('change' , e => {
    if(e.target.id != "sensor-mode") {
      socket.send(JSON.stringify({target: 'clientBroker', sensor: e.target.id, bulbo: !e.target.checked }))
    }
  })
})

function handleCheckboxChange(checkbox) {
  if (checkbox.checked) {
    // Desactivar otros checkboxes
    manageCheckboxes(checkbox.id, "disable");
    socket.send(JSON.stringify({target: 'clientBroker', mode: 1}))
  } else {  
    manageCheckboxes(checkbox.id, "enable");
    socket.send(JSON.stringify({target: 'clientBroker', mode: 0}))
    manualMode = 1
  }
}

function manageCheckboxes(checkboxId, action) {
  sensorToggles.forEach(function(checkbox) {
    if (checkbox.id !== checkboxId && action == 'disable') {
      checkbox.disabled = true;
      checkbox.checked = false;
    } else {
      checkbox.disabled = false;
    }
  });
}


function manageBulbs() {
  const data = sensorData.getBulbStates();

  const bulbs = {
    'temperatura': document.getElementById('temperatura-bulb'),
    'sonico': document.getElementById('sonico-bulb'),
    'uv': document.getElementById('uv-bulb'),
    'movimiento': document.getElementById('movimiento-bulb')
  };

  for (const key in bulbs) {
    const bulb = bulbs[key];
    if (data[key]) {
      bulb.classList.remove('active-bulb');
    } else {
      bulb.classList.add('active-bulb');
    }
  }


}


function realTimeToggleSensors(data) {
  const toggle = document.getElementById(data.sensor)
  toggle.checked = !data.bulbo
}

function realTimeToggleMode(data) {
  sensorMode.checked = data.mode
  if(data.mode) {
    sensorToggles.forEach( toggle =>  {
      if(toggle != sensorMode) {
        toggle.checked = false
        toggle.disabled = true
      }
    });
  } else if (data.mode == 0) {
    sensorToggles.forEach( toggle =>  {
      if(toggle != sensorMode) {
        toggle.disabled = false
      }
    });
  }
}



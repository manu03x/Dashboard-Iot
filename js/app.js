

let sensorData;

class SensorData {
    constructor(payload) {
        this.temperatura = payload.temperatura;
        this.sonico = payload.sonico;
        this.uv = payload.uv;
        this.movimiento = payload.movimiento;
    }

    getData(sensor) {
        const data = {
            temperatura: this.temperatura.data,
            sonico: this.sonico.data,
            uv: this.uv.data,
            movimiento: this.movimiento.data
        };

        return data[sensor] || null;
    }

    getBulbStates() {
        const data = {
            temperatura: this.temperatura.bulb,
            sonico: this.sonico.bulb,
            uv: this.uv.bulb,
            movimiento: this.movimiento.bulb
        };

        return data || null;
    }


}

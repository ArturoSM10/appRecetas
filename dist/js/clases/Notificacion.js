export class Notificacion {
    constructor(elemento, elementoContenido) {
        this.temporizador = null;
        this.elemento = elemento;
        this.elementoContenido = elementoContenido;
    }

    mostrarNotificacion(texto) {
        this.cerrarNotificacion();
        // clearTimeout(this.temporizador);
        this.temporizador = setTimeout(() => {
            requestAnimationFrame(()=>{
                this.elemento.classList.add(`mostrar`);
                this.elementoContenido.textContent = texto;
    
            });
            this.temporizador = setTimeout(() => {
                if (this.elemento.style.visibility === `hidden`) return;
                this.cerrarNotificacion();
            }, 4000);
        }, 50);
        
    }

    cerrarNotificacion () {
        clearTimeout(this.temporizador);
        this.temporizador = null;
        this.elemento.classList.add(`ocultar`);
            requestAnimationFrame(()=>{
                this.elemento.classList.remove(`mostrar`);
                this.elemento.classList.remove(`ocultar`);
        });
    }

    pausarNotificacion() {
        clearTimeout(this.temporizador);
    }

    reanudarNotificacion() {
        this.temporizador = setTimeout(() => {
                if (this.elemento.style.visibility === `hidden`) return;
                    this.cerrarNotificacion();
            }, 5000);
    }
}
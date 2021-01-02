var inpP01 = document.querySelector('#inpPantalla')
class Operacion {
    constructor(numero) {
        this.node = numero
        this.rightS = null
        this.leftA = null
    }
}
class Calculadora {
    constructor() {
        this.raiz = null
        this.exp = null
        this.op = 0
        this.punto = 0
    }
    agregar(x) {
        if (x >= 0 && x < 10) {
            if (this.exp == null) {
                this.exp = String(x)
            }
            else {
                this.exp += String(x)
            }
            this.op = 0
            return this.mostrar()
        } else if (x == '.') {
            if (this.punto == 0) {
                if (this.exp == null) this.exp = String(x)
                this.exp += String(x)
                this.op = 0
                this.punto = 1
                return this.mostrar()
            }
        } else {
            if (this.op == 0) {
                this.exp += String(x)
                this.op = 1
                this.punto = 0
                return this.mostrar()
            }
        }
    }
    gBinatyTree() {
        if (this.exp != null) {
            for (let i = 0; i <= this.exp.length; i++) {
                let ope = new Operacion((this.exp.charAt(i)))
                if (this.raiz === null) {
                    this.raiz = ope
                }
                else {
                    let aux = this.raiz
                    while (aux.rightS != null) {
                        aux = aux.rightS
                    }
                    aux.rightS = ope
                    ope.leftA = aux
                }
            }
            let aux = this.raiz
            while (aux != null) {
                console.log(aux)
                aux = aux.rightS
            }
            this.exp = null
        }

    }
    mostrar() {
        inpP01.value = this.exp

    }
}
var calcu = new Calculadora()
btn01.addEventListener("click", () => {
    calcu.agregar(1)
})
btn02.addEventListener("click", () => {
    calcu.agregar(2)
})
btn03.addEventListener("click", () => {
    calcu.agregar(3)
})
btn04.addEventListener("click", () => {
    calcu.agregar(4)
})
btn05.addEventListener("click", () => {
    calcu.agregar(5)
})
btn06.addEventListener("click", () => {
    calcu.agregar(6)
})

btn07.addEventListener("click", () => {
    calcu.agregar(7)
})

btn08.addEventListener("click", () => {
    calcu.agregar(8)
})

btn09.addEventListener("click", () => {
    calcu.agregar(9)
})
btn00.addEventListener("click", () => {
    calcu.agregar(0)
})
btn0P.addEventListener("click", () => {
    calcu.agregar('.')
})
btnC.addEventListener("click", () => {

})
btnMas.addEventListener("click", () => {
    calcu.agregar('+')
})
btnMenos.addEventListener("click", () => {
    calcu.agregar('-')
})
btnD.addEventListener("click", () => {
    calcu.agregar('/')
})
btnX.addEventListener("click", () => {
    calcu.agregar('*')
})
btnIg.addEventListener("click", () => {
    calcu.gBinatyTree()
})
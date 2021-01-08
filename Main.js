var inpP01 = document.querySelector('#inpPantalla')
class Operacion {
    constructor(numero) {
        this.node = numero
        this.right = null
        this.left = null
        this.siguiente = null
        this.anterior = null
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
            if (this.op == 0 && inpP01.value != 0) {
                this.exp += String(x)
                this.op = 1
                this.punto = 0
                return this.mostrar()
            }
        }
    }
    guardar(x) {
        var ope = new Operacion(x)
        if (this.raiz === null) {
            this.raiz = ope
        } else {
            let aux = this.raiz
            while (aux.siguiente != null) {
                aux = aux.siguiente
            }
            aux.siguiente = ope
            ope.anterior = aux
        }
    }
    generarListaDoble() {
        if (this.exp != null) {//convertir exprecion en lista doble
            let i = 0
            let numEntero = ''
            while (i < this.exp.length) {
                let num = this.exp.charAt(i)
                if (num != '*' && num != '/' && num != '-' && num != '+' && num != '^' && num != 'R') {
                    numEntero += String(num)
                    i++
                } else {
                    this.guardar(Number(numEntero))
                    this.guardar(String(this.exp.charAt(i)))
                    numEntero = ''
                    i++
                }
                if (i === (this.exp.length)) {
                    this.guardar(Number(numEntero))
                    numEntero = ''
                }
            }
            this.inorden()
        }
    }
    chijos(aux) {
        
    }
    inorden() {
        let aux = this.raiz
        while (aux != null) {
            if (aux.node === '+' || aux.node === '-') {
                aux.left = aux.anterior
                aux.right = aux.siguiente

                if(aux.siguiente != null){
                    aux.siguiente = aux.siguiente.siguiente
                    if (aux.siguiente != null)aux.siguiente.anterior = aux
                } 
                if(aux.anterior != null){
                    aux.anterior = aux.anterior.anterior
                    if (aux.anterior != null)aux.anterior.siguiente = aux
                } 
                
                if (aux.left != null) {
                    aux.left.siguiente = null
                    aux.left.anterior = null
                }
                if (aux.right != null) {
                    aux.right.siguiente = null
                    aux.right.anterior = null
                }
                if(aux.anterior === null && aux.siguiente == null) this.raiz = aux
                
                console.log(this.raiz)
            }
            aux = aux.siguiente
        }
        aux = this.raiz
        while (aux != null) {
            if (aux.node === 'R' || aux.node === '^') {
                aux.left = aux.anterior
                aux.right = aux.siguiente

                if(aux.siguiente != null){
                    aux.siguiente = aux.siguiente.siguiente
                    if (aux.siguiente != null)aux.siguiente.anterior = aux
                } 
                if(aux.anterior != null){
                    aux.anterior = aux.anterior.anterior
                    if (aux.anterior != null)aux.anterior.siguiente = aux
                } 
                
                if (aux.left != null) {
                    aux.left.siguiente = null
                    aux.left.anterior = null
                }
                if (aux.right != null) {
                    aux.right.siguiente = null
                    aux.right.anterior = null
                }
                if(aux.anterior === null && aux.siguiente == null) this.raiz = aux
            }
            aux = aux.siguiente
        }
        
        aux = this.raiz
        console.log(aux)
       while (aux != null) {
            if (aux.node === '+' || aux.node === '-') {
                aux.left = aux.anterior
                aux.right = aux.siguiente

                if(aux.siguiente != null){
                    aux.siguiente = aux.siguiente.siguiente
                    if (aux.siguiente != null)aux.siguiente.anterior = aux
                } 
                if(aux.anterior != null){
                    aux.anterior = aux.anterior.anterior
                    if (aux.anterior != null)aux.anterior.siguiente = aux
                } 
                
                if (aux.left != null) {
                    aux.left.siguiente = null
                    aux.left.anterior = null
                }
                if (aux.right != null) {
                    aux.right.siguiente = null
                    aux.right.anterior = null
                }
                if(aux.anterior === null && aux.siguiente == null) this.raiz = aux
                
                console.log(this.raiz)
            }
            aux = aux.siguiente
        }
    }
    borrar() {
        inpP01.value = 0
        this.raiz = null
        this.exp = null
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
    calcu.borrar()
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
btnPot.addEventListener("click", () => {
    calcu.agregar('^')
})
btnRaiz.addEventListener("click", () => {
    calcu.agregar('R')
})
btnIg.addEventListener("click", () => {
    if (inpP01.value != 0) {
        let comp = inpP01.value.charAt(inpP01.value.length - 1)
        if (comp === '*' || comp === '/' || comp === '-' || comp === '+' || comp === '^' || comp === 'R') {
            return alert('Syntaxis Error')
        } else {
            calcu.generarListaDoble()
        }
    }
})
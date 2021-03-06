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
        this.pre = new Array()
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
                if (num != '*' && num != '/' && num != '-' && num != '+' && num != '^') {
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
        aux.left = aux.anterior
        aux.right = aux.siguiente

        if (aux.anterior.anterior === null) this.raiz = aux

        if (aux.siguiente != null) {
            aux.siguiente = aux.siguiente.siguiente
            if (aux.siguiente != null) aux.siguiente.anterior = aux
        }

        if (aux.anterior != null) {
            aux.anterior = aux.anterior.anterior
            if (aux.anterior != null) aux.anterior.siguiente = aux
        }

        aux.left.anterior = null
        aux.right.siguiente = null

        if (aux.anterior === null && aux.siguiente == null) this.raiz = aux

        return aux
    }
    inorden() {
        let aux = this.raiz
        while (aux != null) {
            if (aux.node === '^') {
                aux = this.chijos(aux)
            }
            aux = aux.siguiente
        }
        if (this.raiz.siguiente != null || this.raiz.anterior != null) {
            aux = this.raiz
            while (aux != null) {
                if (aux.node === '*' || aux.node === '/') {
                    aux = this.chijos(aux)
                }
                aux = aux.siguiente
            }
        }
        if (this.raiz.siguiente != null || this.raiz.anterior != null) {
            aux = this.raiz
            while (aux != null) {
                if (aux.node === '+' || aux.node === '-') {
                    aux = this.chijos(aux)
                }
                aux = aux.siguiente
            }
        }
        console.log(this.raiz)
    }
    recorrerIzquierda(aux) {
        while (aux.left != null) {
            this.pre.push(aux.left.node)
            aux = aux.left
        }
        return aux
    }
    preorden() {
        if (this.raiz === null) {
            this.generarListaDoble()
        }
        this.pre = []
        let aux = this.raiz
        this.pre.push(aux.node)
        aux = this.recorrerIzquierda(aux)
        while (aux != null) {
            if (aux.right != null) {
                this.pre.push(aux.right.node)
                if (aux.right.left != null) {
                    aux = this.recorrerIzquierda(aux.right)
                }
            }
            if (aux.siguiente === null) {
                if (aux.anterior === null) aux = aux.anterior
                else aux = aux.anterior.siguiente
            }
            else if (aux.anterior === null) aux = aux.siguiente
        }
        let acum = ''
        for (let i = 0; i < this.pre.length; i++) {
            acum += String(this.pre[i])
        }
        inpP01.value = acum
    }
    recordIz(aux) {
        while (aux.left != null) {
            aux = aux.left
        }
        return aux
    }
    postorden() {
        if (this.raiz === null) {
            this.generarListaDoble()
        }
        let aux = this.raiz
        aux = this.recordIz(aux)
        
        while (aux != null) {
            if (aux.right != null) {
                if (aux.right.left != null) {
                    aux = this.recordIz(aux.right)
                    this.pre.push(aux.node)
                } else {
                    this.pre.push(aux.right.node)
                    this.pre.push(aux.node)
                }
            } else {
                this.pre.push(aux.node)
            }
            if (aux.siguiente === null) {
                if (aux.anterior === null) aux = aux.anterior
                else {
                    this.pre.push(aux.anterior.node)
                    aux = aux.anterior.siguiente

                }
            }
            else if (aux.anterior === null) aux = aux.siguiente
        }
        let acum = ''
        for (let i = 0; i < this.pre.length; i++) {
            acum += String(this.pre[i])
        }
        inpP01.value = acum
    }
    recorrer(i) {
        
        while (i<this.pre.length) {
            this.pre[i-2] = this.pre[i]
            i++
        }
        this.pre.pop()
        this.pre.pop()
       
    }
    resolver() {
        this.generarListaDoble()
        this.postorden()
        let i = 0
        while (this.pre.length != 1) {
            let x, y
            if (this.pre[i] === '*') {
                x = Number(this.pre[i - 2])
                y = Number(this.pre[i - 1])
                this.pre[i] = x * y
                this.recorrer(i)
                i = 0
                console.log(x + '*' + y + this.pre[0] )
            } else if (this.pre[i] === '/') {
                x = Number(this.pre[i - 2])
                y = Number(this.pre[i - 1])
                this.pre[i] = x / y
                this.recorrer(i)
    
                i = 0
            } else if (this.pre[i] === '+') {
                x = Number(this.pre[i - 2])
                y = Number(this.pre[i - 1])
                this.pre[i] = x + y
                this.recorrer(i)
                
                i = 0
            } else if (this.pre[i] === '-') {
                x = Number(this.pre[i - 2])
                y = Number(this.pre[i - 1])
                this.pre[i] = x - y
                this.recorrer(i)
                
                i = 0
            } else if (this.pre[i] === '^') {
                x = Number(this.pre[i - 2])
                y = Number(this.pre[i - 1])
                this.pre[i] = Math.pow(x, y)
                this.recorrer(i)
                
                i = 0
            }
            i++
        }
        let acum = ''
        for ( i = 0; i < this.pre.length; i++) {
            acum += String(this.pre[i])
        }
        inpP01.value = acum
        return console.log('listo')

    }
    borrar() {
        inpP01.value = 0
        this.raiz = null
        this.exp = null
        this.pre = []
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
btnIg.addEventListener("click", () => {
    if (inpP01.value != 0) {
        let comp = inpP01.value.charAt(inpP01.value.length - 1)
        if (comp === '*' || comp === '/' || comp === '-' || comp === '+' || comp === '^') {
            return alert('Syntaxis Error')
        } else {
            calcu.resolver()
        }
    }
})
Pre.addEventListener("click", () => {
    if (inpP01 != 0) {
        let comp = inpP01.value.charAt(inpP01.value.length - 1)
        if (comp === '*' || comp === '/' || comp === '-' || comp === '+' || comp === '^') {
            return alert('Syntaxis Error')
        } else {
            calcu.preorden()
        }
    }
})
pos.addEventListener("click", () => {
    if (inpP01 != 0) {
        let comp = inpP01.value.charAt(inpP01.value.length - 1)
        if (comp === '*' || comp === '/' || comp === '-' || comp === '+' || comp === '^') {
            return alert('Syntaxis Error')
        } else {
            calcu.postorden()
        }
    }
})

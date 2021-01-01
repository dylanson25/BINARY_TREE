var inpP01 = document.querySelector('#inpPantalla')
class Operacion {
    constructor(numero) {
        this.ope = numero
        this.right = null
        this.left = null
    }
}
class Calculadora {
    constructor() {
        this.raiz = null
        this.exp = null
    }
    agregar(x) {
        if (x >= 0 && x < 10 || x == '.') {
            if (this.exp == null){ 
                this.exp = String(x)
            }
            else {
                if( this.exp.indexOf('.') == -1) this.exp += String(x)  
                else if(x != '.') 
                    this.exp += String(x)
            }
            
            return this.mostrar()
        } else{
            this.agregarBT(x)
            return this.mostrar()
        } 
    }
    agregarBT(x){
        let ope = new Operacion(x)
        let cifra = new Operacion(this.exp)
        if(this.raiz == null){
            this.raiz = ope
            this.raiz.left = cifra
        }else if(this.raiz.right == null){
            this.raiz.right = cifra
        }
        
    }
    mostrar() {
        if(this.raiz == null){
            inpP01.value = this.exp
        }else if(this.raiz.right == null){
            inpP01.value = this.raiz.left.ope + this.raiz.ope
        }
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
    calcu.agregar('=')
})
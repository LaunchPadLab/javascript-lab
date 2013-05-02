<script>
var Calculator = function() {
    this.total = 0;
    this.current = 0;
    this.operation = null;
    this.fractionExp = 0;
};

Calculator.prototype = {
    add: function() {
        this.calculate();
        this.operation = function(a, b) {
            return a + b;
        };
        this.setCurrent(0, "");
        this.fractionExp = 0; // decimal fix
    },
    subtract: function() {
        this.calculate();
        this.operation = function(a, b) {
            return a - b;
        };
        this.setCurrent(0, "");
        this.fractionExp = 0; // decimal fix
    },
    multiply: function() {
        this.calculate();
        this.operation = function(a, b) {
            return a * b;
        };
        this.setCurrent(0, "");
        this.fractionExp = 0; // decimal fix
    },
    divide: function() {
        this.calculate();
        this.operation = function(a, b) {
            return a / b;
        };
        this.setCurrent(0, "");
        this.fractionExp = 0; // decimal fix
    },
    clear: function() {
        this.setCurrent(0, "");
        this.fractionExp = 0; // decimal fix
    },
    allClear: function() {
        this.clear();
        this.total = 0;
        this.operation = null;
        console.log("total: " + this.total);
        this.fractionExp = 0; // decimal fix
    },
    calculate: function() {
        if (this.operation) {
            this.total = this.operation(this.total, this.current);
        } else {
            this.total = this.current;
        }
        console.log("total: " + this.total);
    },
    equals: function() {
        this.calculate();
        this.updateDisplay(this.total);
    },
    digit: function(number) {
        // shift current left, add number       
        // this is the key the decimal point
        if (this.fractionExp) {
            // not corrent but close
            this.setCurrent(this.current + (number / Math.pow(10, this.fractionExp)));
            this.fractionExp = this.fractionExp + 1
        } else {            
            this.setCurrent((this.current * 10) + number);
        };
    
    },
    point: function() {
        this.fractionExp = 1;
    },
    setCurrent: function(value, text) {
        this.current = value;
        this.updateDisplay(typeof text == "undefined" ? this.current : text);
        console.log("current: " + this.current);
    },
    updateDisplay: function(value) {
        $("#display").text(value);
    }
};

var calc = new Calculator();

$("li").click(function() {
    var raw = $(this).text()
    number = parseInt(raw, 10);
    if (isNaN(number)) {
        // must be an operator  
        switch (raw) {
        case "C":
            calc.clear();
            break;
        case "AC":
            calc.allClear();
            break;
        case "x":
            calc.multiply();
            break;
        case "/":
            calc.divide();
            break;
        case "+":
            calc.add();
            break;
        case "-":
            calc.subtract();
            break;
        case "=":
            calc.equals();
            break;
        case ".":
            calc.point();
            break;
        }
    } else {
        // its a digit
        calc.digit(number);
    }
});
</script>
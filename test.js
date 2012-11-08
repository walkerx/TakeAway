var ClassA = require('./xxx.js').ClassA;
function ClassB(filename) {
    ClassA.call(this);
    console.log('ClassB constructor called');
    this.className = 'ClassB';
    this.filename = filename;
}
require('util').inherits(ClassB, ClassA);

/*ClassB.prototype.print = function(){
    ClassA.prototype.print.call(this);
    console.log('filename: '+this.filename);
}*/
var x = (new ClassB('foo.js'));
x.print();

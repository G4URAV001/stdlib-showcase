import React, { useState } from 'react';
import * as stdlib from '@stdlib/stdlib';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [lastOperation, setLastOperation] = useState(null);

  const handleNumber = (num) => {
    if (display === '0' || lastOperation === '=') {
      setDisplay(num);
      setLastOperation(null);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperation = (op) => {
    if (lastOperation === '=') {
      setExpression(display + op);
    } else {
      setExpression(expression + display + op);
    }
    setLastOperation(op);
  };

  const handleEquals = () => {
    try {
      const result = stdlib.math.eval(expression + display);
      setDisplay(result.toString());
      setExpression('');
      setLastOperation('=');
    } catch (error) {
      setDisplay('Error');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
    setLastOperation(null);
  };

  const handleScientific = (func) => {
    try {
      const num = parseFloat(display);
      let result;
      
      switch(func) {
        case 'sin':
          result = stdlib.math.sin(num);
          break;
        case 'cos':
          result = stdlib.math.cos(num);
          break;
        case 'tan':
          result = stdlib.math.tan(num);
          break;
        case 'sqrt':
          result = stdlib.math.sqrt(num);
          break;
        case 'log':
          result = stdlib.math.log(num);
          break;
        case 'exp':
          result = stdlib.math.exp(num);
          break;
        default:
          return;
      }
      
      setDisplay(result.toString());
      setLastOperation('=');
    } catch (error) {
      setDisplay('Error');
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="expression">{expression}</div>
        <div className="current">{display}</div>
      </div>
      <div className="buttons">
        <div className="row">
          <button onClick={() => handleScientific('sin')}>sin</button>
          <button onClick={() => handleScientific('cos')}>cos</button>
          <button onClick={() => handleScientific('tan')}>tan</button>
          <button onClick={() => handleScientific('sqrt')}>√</button>
        </div>
        <div className="row">
          <button onClick={() => handleScientific('log')}>log</button>
          <button onClick={() => handleScientific('exp')}>exp</button>
          <button onClick={() => handleOperation('^')}>^</button>
          <button onClick={handleClear}>C</button>
        </div>
        <div className="row">
          <button onClick={() => handleNumber('7')}>7</button>
          <button onClick={() => handleNumber('8')}>8</button>
          <button onClick={() => handleNumber('9')}>9</button>
          <button onClick={() => handleOperation('/')}>/</button>
        </div>
        <div className="row">
          <button onClick={() => handleNumber('4')}>4</button>
          <button onClick={() => handleNumber('5')}>5</button>
          <button onClick={() => handleNumber('6')}>6</button>
          <button onClick={() => handleOperation('*')}>*</button>
        </div>
        <div className="row">
          <button onClick={() => handleNumber('1')}>1</button>
          <button onClick={() => handleNumber('2')}>2</button>
          <button onClick={() => handleNumber('3')}>3</button>
          <button onClick={() => handleOperation('-')}>-</button>
        </div>
        <div className="row">
          <button onClick={() => handleNumber('0')}>0</button>
          <button onClick={() => handleNumber('.')}>.</button>
          <button onClick={handleEquals}>=</button>
          <button onClick={() => handleOperation('+')}>+</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator; 
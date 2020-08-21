import React, {useState} from 'react';
import './App.css';
import ExpanseForm from './components/ExpenseForm'
import ExpanseList from './components/ExpenseList'
import Alert from './components/Alert'
//import uuid from 'uuid/v4'
const { v4: uuid } = require('uuid'); 
const initialExpense = [
  {id:uuid(), charge:"rent", amount:1600},
  {id:uuid(), charge:"car payment", amount:400},
  {id:uuid(), charge:"credit card bill", amount:1200}
];
function App() {
  //*************** state values ***************** */
  // all expenses, add expenses
  const [expenses, setExpenses]  = useState(initialExpense);
  // single expense
  const [charge, setCharge] = useState('');
  //single amount
  const [amount, setAmount] = useState('');
  //alert
  const [alert, setAlert] = useState({show:false});

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  //*************** functionality ***************** */
  const handleCharge = e => {
    console.log(`charge : ${e.target.value}`)
    setCharge(e.target.value);
  };
  const handleAmount = e  => {
    console.log(`amount : ${e.target.value}`)
    setAmount(e.target.value);
  };
  const handleAlert = ({type, text}) =>{
    setAlert({show:true, type, text});
    setTimeout(()=>{
      setAlert({show:false})
    },3000)
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(charge, amount);
    if(charge !== "" && amount > 0) {
      const singleExpense = {id:uuid(), charge, amount};
      setExpenses([...expenses, singleExpense]);
      handleAlert({type:"success", text: "Item added"});
      setCharge("");
      setAmount("");
    }
    else {
      //handle alert call
      handleAlert({type:"danger", text: `charge can't be empty value and amount value has to be bigger than zero`});
    }
  };
  const clearItems = () => {
    setExpenses([]);
    console.log("Cleared all items");
    handleAlert({type:"danger", text: "all iteams deleted"});
  };
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    console.log(tempExpenses);
    setExpenses(tempExpenses);
    handleAlert({type:"danger", text: "iteams deleted"});
  }
  const handleEdit = (id) => {
    let expense = expenses.find(item =>item.id === id);
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
  }
  return <>
    {alert.show && <Alert type={alert.type} text={alert.text}/>}
    <Alert/>
    <h1>Budget Calculator</h1>
    <main className="App">
      <ExpanseForm 
      charge={charge} 
      amount={amount}
      handleAmount={handleAmount} 
      handleCharge={handleCharge}
      handleSubmit={handleSubmit}
      edit={edit}
      />
      
      <ExpanseList 
      expenses ={expenses}
      handleDelete={handleDelete}
      handleEdit={handleEdit}
      clearItems={clearItems}
      />
    </main> 
    <h1>
      total spending: <span className="total">
        ${expenses.reduce((acc, curr)=>{
          return acc += parseInt(curr.amount);
        }, 0)}  
      </span>  
    </h1> 
  </>
}

export default App;

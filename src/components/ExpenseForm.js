import React from 'react'
import { ExpenseItem } from './ExpenseItem';
import {MdSend} from 'react-icons/md';
export const ExpenseForm = ({charge, amount, handleAmount, handleCharge, handleSubmit, edit}) => {
    return <form onSubmit={handleSubmit}>
        <div className="form-center">
            <div className="form-group">
                <label htmlFor="expense">Charge</label>
                <input 
                    type="text" 
                    className="form-control"
                    id="charge"
                    name="charge"
                    placeholder="e.g. rent"
                    value={charge}
                    onChange={handleCharge}
                ></input>
            </div>
            <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <input 
                    type="number" 
                    className="form-control"
                    id="amount"
                    name="amount"
                    placeholder="e.g. 100"
                    value={amount}
                    onChange={handleAmount}
                ></input>
            </div>
        </div>
        <button className="btn">
            {edit?"edit":"submit"}
            <MdSend className="btn-icon"/>
        </button>
    </form>
}
export default ExpenseForm;
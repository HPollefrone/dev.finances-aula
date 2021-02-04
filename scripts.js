const Modal = {
    open(){
        //Abrir modal
        //Adicionar a class active ao model
        document.querySelector('.modal-overlay')
        .classList.add('active')
    },
    close(){
        // fechar o modal
        //remover a class active do model
        document.querySelector('.modal-overlay')
        .classList.remove('active')
    }
}

const Transaction = {
    all: [
        {
        
        description: 'Dividendo',
        amount: 50,
        date: '23/01/2021',
    },
    {
        
        description: 'T-bone ',
        amount: -30000,
        date: '23/01/2021',
    },
    {
        
        description: 'Caipirinha',
        amount: -50000,
        date: '23/01/2021',
    },
    {
        
        description: 'Passeio de Iate',
        amount: -12600,
        date: '23/01/2021',
    },
    ],
    add(transaction){
        Transaction.all.push(transaction)
        
        App.reload()
    },
    remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
    },

    incomes(){
        let income = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount > 0 ){
                income += transaction.amount;
            }
        })

        return income;
    },

    expenses(){
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0 ){
                expense += transaction.amount;
            }
        })
        
        return expense;
    },

    total(){
        return Transaction.incomes() + Transaction.expenses();
    }
}


const DOM = {
    transactionContainer: document.querySelector('#data-table tbody'),
    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction){
        const  CSSclass= transaction.amount  > 0  ? "income" : "expense"
        
        const amount = Utils.formatCurrency(transaction.amount)
        
        const html =` 
        
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover transação">
            </td>
        
    `
    return html

    },

    updateBalance(){
        document
        .getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
        .getElementById('expenseDisplay')
        .innerHTML =  Utils.formatCurrency(Transaction.expenses())
        document
        .getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total())
    },

    ClearTransactions(){
        DOM.transactionContainer.innerHTML = ""
    }
}

const Utils  = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-" : ""
        
        value = String(value).replace(/\D/g,"")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR",{
            style: "currency",
            currency:"BRL"
        })

        return (signal + value)
    }
}

const Form = {
    submit(event){
        event.preventDefault()

        
    }
}

const  App = {
    init(){
        Transaction.all.forEach(transaction =>{
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()
        
       

    },
    reload(){
        DOM.ClearTransactions()
        App.init()
    },

}

App.init()



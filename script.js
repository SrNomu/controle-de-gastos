// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", () => {

    // Captura os elementos do HTML necessários para interação
    const form = document.getElementById("expense-form"); // Formulário de entrada de gastos
    const daySelector = document.getElementById("day-selector"); // Seletor de dia da semana
    const expenseAmount = document.getElementById("expense-amount"); // Campo de valor do gasto
    const dailyExpensesList = document.getElementById("daily-expenses-list"); // Lista visual dos gastos por dia
    const totalExpensesDisplay = document.getElementById("total-expenses"); // Exibição do total da semana
    const averageExpensesDisplay = document.getElementById("average-expenses"); // Exibição da média diária
    const summaryMessage = document.getElementById("summary-message"); // Resumo final com conselho
    const summaryTotal = document.getElementById("summary-total"); // Total exibido no resumo
    const summaryAverage = document.getElementById("summary-average"); // Média exibida no resumo
    const financialAdvice = document.getElementById("financial-advice"); // Conselho financeiro
    const resetButton = document.getElementById("reset-button"); // Botão para reiniciar dados
    const calculateButton = document.getElementById("calculate-button"); // Botão para calcular resultados

    // Cria um array de 7 posições para armazenar os gastos da semana (inicialmente todos com 0)
    let expenses = Array(7).fill(0); // Segunda (0) a Domingo (6)

    // Evento ao enviar o formulário de novo gasto
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita recarregar a página

        const day = parseInt(daySelector.value); // Converte o valor do dia selecionado em número
        const amount = parseFloat(expenseAmount.value); // Converte o valor do gasto em número decimal

        // Verifica se o valor é um número válido e positivo
        if (!isNaN(amount) && amount >= 0) {
            expenses[day] += amount; // Adiciona o valor ao dia correspondente no array
            updateDisplay(); // Atualiza a interface com os novos valores
            expenseAmount.value = ""; // Limpa o campo de entrada
        }
    });

    // Evento ao clicar no botão de calcular resultados
    calculateButton.addEventListener("click", () => {
        const total = expenses.reduce((a, b) => a + b, 0); // Soma todos os gastos da semana
        const daysWithExpense = expenses.filter(val => val > 0).length || 1; // Conta os dias com gasto > 0
        const average = total / daysWithExpense; // Calcula a média por dia com gasto

        // Atualiza os elementos com os valores calculados
        totalExpensesDisplay.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
        averageExpensesDisplay.textContent = `R$ ${average.toFixed(2).replace(".", ",")}`;
        summaryTotal.textContent = `R$ ${total.toFixed(2).replace(".", ",")}`;
        summaryAverage.textContent = `R$ ${average.toFixed(2).replace(".", ",")}`;
        summaryMessage.classList.remove("d-none"); // Exibe o resumo

        // Fornece um conselho financeiro baseado na média de gastos
        if (average > 100) {
            financialAdvice.textContent = "Cuidado! Seus gastos estão bem altos. Considere rever seu orçamento.";
        } else if (average > 50) {
            financialAdvice.textContent = "Você está indo bem, mas sempre dá pra economizar um pouco mais.";
        } else {
            financialAdvice.textContent = "Parabéns! Você está mantendo um ótimo controle dos gastos.";
        }
    });

    // Evento ao clicar no botão de resetar os dados
    resetButton.addEventListener("click", () => {
        expenses = Array(7).fill(0); // Reinicia todos os valores do array de gastos
        updateDisplay(); // Atualiza a interface zerando os valores
        totalExpensesDisplay.textContent = "R$ 0,00"; // Zera total
        averageExpensesDisplay.textContent = "R$ 0,00"; // Zera média
        summaryMessage.classList.add("d-none"); // Oculta o resumo
    });

    // Função para atualizar a exibição da lista de gastos na tela
    function updateDisplay() {
        const listItems = dailyExpensesList.querySelectorAll(".list-group-item"); // Pega todos os itens da lista
        listItems.forEach((item, index) => {
            const valueElement = item.querySelector(".expense-value"); // Encontra o span que mostra o valor
            valueElement.textContent = `R$ ${expenses[index].toFixed(2).replace(".", ",")}`; // Atualiza o valor exibido
        });
    }
});

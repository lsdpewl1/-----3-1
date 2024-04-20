
        import "./styles.css";

        var button = document.getElementById("calculateButton");
        button.onclick = calculate;

        var field = document.getElementById("depositAmount");
        field.oninput = validateInput;

        const depositTypes = {
            "Пополняемый": {"6 месяцев": 20, "1 год": 22, "1,5 года": 15, "2 года": 10},
            "Срочный": {"3 месяца": 20, "6 месяцев": 22, "9 месяцев": 23, "1 год": 24, "1,5 года": 18, "2 года": 15}
        };

        const depositTypeSelect = document.getElementById('depositType');
        const depositTermSelect = document.getElementById('depositTerm');
        const depositAmount = document.getElementById('depositAmount');
        const calculateButton = document.getElementById('calculateButton');

        depositTypeSelect.addEventListener('change', function() {
            const selectedType = this.value;
            const terms = depositTypes[selectedType];

            depositTermSelect.innerHTML = '';
            for (let term in terms) {
                const option = document.createElement('option');
                option.text = term;
                option.value = terms[term];
                depositTermSelect.add(option);
            }
        });

        depositTypeSelect.dispatchEvent(new Event('change'));

        function validateInput() {
            if (depositAmount.value === "" || isNaN(depositAmount.value)) {
                calculateButton.disabled = true;
            } else {
                calculateButton.disabled = false;
            }
        }

        function calculate() {
            const amount = depositAmount.value;
            const rate = depositTermSelect.value;
            const result = amount * (1 + rate / 100);
            
            const depositType = depositTypeSelect.options[depositTypeSelect.selectedIndex].text;
            const depositTerm = depositTermSelect.options[depositTermSelect.selectedIndex].text;
            document.getElementById('result').innerHTML = 'Вид вклада: ' + depositType + '<br>Срок вклада: ' + depositTerm + '<br>Процентная ставка: ' + rate + '%<br>Сумма вклада: ' + amount + '<br>Итоговая сумма в конце срока: ' + result.toFixed(2);
        }
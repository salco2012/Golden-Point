// Функция отвечающая за получения актуального курса валют
async function getExchangeRate() {
  const allСurrencies = []; // Массив содержащий информацию по всем валютам
  const result = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  const response = await result.json();

  for (let key in response.Valute) {
    allСurrencies.push(response.Valute[key]);
  }

  return allСurrencies;
}

getExchangeRate();

// Функция отвечающая за рендеринг валют в таблице
async function displayСurrency() {
  const tbody = document.querySelector('tbody');

  const allСurrencies = await getExchangeRate();
  allСurrencies.forEach((item) => {
    let currencyDifferencePreviousDay; // Разница между курсами

    if (item.Value < item.Previous) {
      currencyDifferencePreviousDay =
        ((item.Previous - item.Value) / item.Value) * 100;
    } else if (item.Value > item.Previous) {
      currencyDifferencePreviousDay =
        ((item.Value - item.Previous) / item.Value) * 100;
    } else {
      currencyDifferencePreviousDay = 0;
    }

    const columnDataСurrencies = `<tr>
               <td>${item.CharCode}</td>
               <td>${item.Value}</td>
               <td>${currencyDifferencePreviousDay.toFixed(2)}</td>
            </tr>`;

    tbody.insertAdjacentHTML('beforeend', columnDataСurrencies);

    console.log(item);
  });
}

displayСurrency();


//    <!-- // Формат вывода - Код валюты, значение в рублях, разница в процентах в сравнении с предыдущим днем. Вывод в виде
// списка. При наведении на элемент списка он должен выделяться и под курсором должно отображаться полное название валюты в
// tooltip.
// // При клике на элемент списка отображается список по данной валюте за 10 дней. -->
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

  const allCurrencies = await getExchangeRate();
  allCurrencies.forEach((item) => {
    let previousDay; // Разница между курсами
    let iconPreviousDay =
      item.Value > item.Previous
        ? "<span class='priceIncrease'>▲</span>"
        : "<span class='priceDrop'>▼</span>";

    if (item.Value < item.Previous) {
      previousDay = ((item.Previous - item.Value) / item.Value) * 100;
    } else if (item.Value > item.Previous) {
      previousDay = ((item.Value - item.Previous) / item.Value) * 100;
    } else {
      previousDay = 0;
    }

    const columnDataCurrencies = `<tr>
               <td>${item.CharCode}</td>
               <td>${item.Value.toFixed(2)} руб.</td>
               <td>${previousDay.toFixed(2)} % ${iconPreviousDay}</td>
            </tr>`;

    tbody.insertAdjacentHTML('beforeend', columnDataCurrencies);
  });

  pointingElement();
}

displayСurrency();

// Функция отвечающая за появление tootlip при наведении на элемент списка
async function pointingElement() {
  const trTable = document.querySelectorAll('tr');
  const allCurrencies = await getExchangeRate();
  trTable.forEach((item) => {
    item.addEventListener('mouseenter', (event) => {
      const currentRowTable = event.target;

      if (!currentRowTable.classList.contains('headlinesTable')) {
        const btnTooltip = document.createElement('button');
        btnTooltip.classList.add('tooltip');

        const currentElementCurrencies = allCurrencies.find(({ CharCode }) => {
          return CharCode === currentRowTable.firstElementChild.textContent;
        }); // Находим элемент который совпадает с нашим кодом валюты.

        btnTooltip.textContent = currentElementCurrencies.Name;

        currentRowTable.insertAdjacentElement('afterend', btnTooltip); // Размещаем tootlip

        currentRowTable.style.border = '2px inset orange'; // Добавляем стили при выделении валюты
      }
    });
    item.addEventListener('mouseleave', (event) => {
      const btnTooltip = document.querySelector('.tooltip');
      event.target.style.border = 'none';
      if (btnTooltip) {
        btnTooltip.remove();
      }
    });
  });
}

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

getExchangeRate()


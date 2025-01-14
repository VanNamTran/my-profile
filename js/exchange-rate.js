document.addEventListener('DOMContentLoaded', function () {
      const data = {
          "items": [
              {"type": "CNY", "imageurl": "https://www.dongabank.com.vn/images/flag/CNY.gif", "muatienmat": "3000", "muack": "3000", "bantienmat": "3250", "banck": "3300"},
              {"type": "XAU", "imageurl": "https://www.dongabank.com.vn/images/flag/XAU.gif", "muatienmat": "7900000", "muack": "7995000", "bantienmat": "8090000", "banck": "7995000"},
              {"type": "AUD", "imageurl": "https://www.dongabank.com.vn/images/flag/AUD.gif", "muatienmat": "16660", "muack": "16760", "bantienmat": "17180", "banck": "17180"},
              {"type": "CAD", "imageurl": "https://www.dongabank.com.vn/images/flag/CAD.gif", "muatienmat": "18180", "muack": "18290", "bantienmat": "18720", "banck": "18720"},
              {"type": "CHF", "imageurl": "https://www.dongabank.com.vn/images/flag/CHF.gif", "muatienmat": "22610", "muack": "29130", "bantienmat": "23080", "banck": "29880"},
              {"type": "EUR", "imageurl": "https://www.dongabank.com.vn/images/flag/EUR.gif", "muatienmat": "27120", "muack": "27240", "bantienmat": "27970", "banck": "27970"},
              {"type": "GBP", "imageurl": "https://www.dongabank.com.vn/images/flag/GBP.gif", "muatienmat": "32310", "muack": "32460", "bantienmat": "33260", "banck": "33260"},
              {"type": "HKD", "imageurl": "https://www.dongabank.com.vn/images/flag/HKD.gif", "muatienmat": "2410", "muack": "2900", "bantienmat": "3060", "banck": "3250"},
              {"type": "USD", "imageurl": "https://www.dongabank.com.vn/images/flag/USD.gif", "muatienmat": "24750", "muack": "24750", "bantienmat": "25050", "banck": "25030"},
              {"type": "THB", "imageurl": "https://www.dongabank.com.vn/images/flag/THB.gif", "muatienmat": "660", "muack": "710", "bantienmat": "740", "banck": "740"},
              {"type": "SGD", "imageurl": "https://www.dongabank.com.vn/images/flag/SGD.gif", "muatienmat": "18740", "muack": "18910", "bantienmat": "19380", "banck": "19380"},
              {"type": "PNJ_DAB", "imageurl": "https://www.dongabank.com.vn/images/flag/PNJ_DAB.gif", "muatienmat": "7740000", "muack": "7740000", "bantienmat": "7863000", "banck": "7863000"},
              {"type": "NZD", "imageurl": "https://www.dongabank.com.vn/images/flag/NZD.gif", "muatienmat": "", "muack": "15460", "bantienmat": "", "banck": "15970"},
              {"type": "JPY", "imageurl": "https://www.dongabank.com.vn/images/flag/JPY.gif", "muatienmat": "167.1", "muack": "170.5", "bantienmat": "174.7", "banck": "174.7"}
          ]
      };
  
      const exchangeRateContainer = document.getElementById('exchange-rate');
  
      data.items.forEach(item => {
          const currencyDiv = document.createElement('div');
          currencyDiv.classList.add('currency');
          currencyDiv.innerHTML = `
              <img src="${item.imageurl}" alt="${item.type}">
              <p><strong>${item.type}</strong></p>
              <p>Mua tiền mặt: ${item.muatienmat}</p>
              <p>Mua CK: ${item.muack}</p>
              <p>Bán tiền mặt: ${item.bantienmat}</p>
              <p>Bán CK: ${item.banck}</p>
          `;
          exchangeRateContainer.appendChild(currencyDiv);
      });
  });
  
async function getUSDtoTL() {
  const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
  const data = await res.json();
  return data.rates.TRY;
}

async function convertPrices() {
  const rate = await getUSDtoTL();

  document.querySelectorAll(
    ".discount_final_price, .game_purchase_price"
  ).forEach(priceEl => {

    if (priceEl.innerText.includes("$")) {
      const usd = parseFloat(
        priceEl.innerText.replace("$", "").replace(",", ".")
      );

      const tl = Math.round(usd * rate);

      if (!priceEl.dataset.tl) {
        priceEl.innerHTML += ` <span class="tl-price">(~${tl}₺)</span>`;
        priceEl.dataset.tl = "true";
      }
    }
  });
}

convertPrices();

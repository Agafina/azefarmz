const axios = require("axios");
const qs = require("querystring");

const request = axios.create({
  baseURL: "https://api-checkout.cinetpay.com/v2",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    "Access-Control-Allow-Origin": "*",
  },
});

class CINETPAY {
  constructor(api_key, site_id, notify_url) {
    if (!api_key) throw new TypeError("api_key is required");
    if (typeof api_key !== "string")
      throw new TypeError("api_key must be a string");

    if (!site_id) throw new TypeError("site_id is required");
    if (typeof site_id !== "number")
      throw new TypeError("site_id must be a number");

    if (!notify_url) throw new TypeError("notify_url is required");
    if (typeof notify_url !== "string")
      throw new TypeError("notify_url must be a string");

    this.api_key = api_key;
    this.site_id = site_id;
    this.notify_url = notify_url;
  }

  async pay(
    cpm_amount,
    cpm_trans_id,
    cpm_currency = "XAF",
    cpm_channels = "ALL",
    cpm_lang = "en",
    cpm_description = "Payment"
  ) {
    if (!cpm_amount || typeof cpm_amount !== "number")
      throw new TypeError("cpm_amount is required and must be a number");
    if (cpm_amount < 100)
      throw new TypeError("cpm_amount must be at least 100");
    if (!cpm_trans_id) throw new TypeError("cpm_trans_id is required");

    const requestBody = {
      apikey: this.api_key,
      site_id: this.site_id,
      notify_url: this.notify_url,
      return_url: this.notify_url,
      amount: cpm_amount,
      lang: cpm_lang,
      transaction_id: cpm_trans_id,
      currency: cpm_currency,
      description: cpm_description,
      channels: cpm_channels
    };

    try {
      const response = await request.post(
        "/payment",
        qs.stringify(requestBody)
      );
      return response.data;
    } catch (err) {
      throw new Error(`Payment request failed: ${err.message}`);
    }
  }

  async checkPayStatus(cpm_trans_id) {
    if (!cpm_trans_id) {
      throw new TypeError("cpm_trans_id is required");
    }

    const requestBody = {
      apikey: this.api_key,
      site_id: this.site_id,
      transaction_id: cpm_trans_id,
    };

    try {
      const response = await request.post(
        "/payment/check",
        qs.stringify(requestBody)
      );
      return response.data;
    } catch (err) {
      throw new Error(`Payment verification failed: ${err}`);
    }
  }
}

module.exports = CINETPAY;
import { createHmac } from 'crypto';

// post data
async function postSecureData(url, data, secret) {
  const dataJSON = JSON.stringify(data);
  const hash = createHmac('sha256', secret).update(dataJSON).digest('base64');

  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'gsi-signature': `gsi=${hash}`,
    },
    body: data,
  });
}

export { postSecureData };

## The Mental Model

Think of it as **4 layers**, each with one job:

```
.env          → WHERE is the server?
api/          → WHAT do I send and receive?
hooks/        → HOW does React manage the state?
screen/       → WHAT does the user see?
```

Each layer only talks to the one directly below it. Screens never touch `api/`, `api/` never touches React.

---

## The Template

**`.env`**
```js
EXPO_PUBLIC_API_URL=http://192.168.1.x:8000
```

**`src/api/client.js`** — write once, never touch again
```js
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const apiClient = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || `HTTP ${response.status}`);
  }

  return response.json();
};
```

**`src/api/[feature].js`** — one file per feature
```js
import { apiClient } from './client';

// One function per endpoint
// No React, no useState, just data in → data out
export const doSomething = (payload) => {
  return apiClient('/your/endpoint', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
};
```

**`src/hooks/use[Feature].js`** — one file per feature
```js
import { useState } from 'react';
import { doSomething } from '../api/[feature]';

export const useFeature = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const run = async (payload) => {
    setLoading(true);
    setError(null);
    try {
      const result = await doSomething(payload);
      setData(result);
      return result;            // return so screen can react to success
    } catch (err) {
      setError(err.message);
      return null;              // return null so screen knows it failed
    } finally {
      setLoading(false);
    }
  };

  return { run, loading, error, data };
};
```

**`src/screens/[Feature]Screen.js`** — the screen is dumb on purpose
```js
import { useFeature } from '../hooks/useFeature';

export default function FeatureScreen({ navigation }) {
  // ✅ hooks at the top, always
  const { run, loading, error } = useFeature();

  const handleAction = async () => {
    const result = await run({ someKey: 'someValue' });
    if (result) navigation.navigate('NextScreen'); // only on success
  };

  return (
    // your JSX — show loading, error, button
  );
}
```

---

## Real Example — Delivery feature

**`src/api/delivery.js`**
```js
import { apiClient } from './client';

export const sendDeliveryRequest = (destination) => {
  return apiClient('/delivery/request', {
    method: 'POST',
    body: JSON.stringify({ destination }),
  });
};
```

**`src/hooks/useDelivery.js`**
```js
import { useState } from 'react';
import { sendDeliveryRequest } from '../api/delivery';

export const useDelivery = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (destination) => {
    setLoading(true);
    setError(null);
    try {
      const result = await sendDeliveryRequest(destination);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error };
};
```

**`src/screens/DeliveryScreen.js`** — only the changed parts:
```js
import { useDelivery } from '../hooks/useDelivery'; // ← add this

export default function DeliveryScreen({ navigation }) {
  // existing state
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [destinationOpen, setDestinationOpen] = useState(false);

  // ✅ hook called here, at the top of the component
  const { sendRequest, loading, error } = useDelivery();

  const handleSendRequest = async () => {
    const result = await sendRequest(selectedDestination);
    if (result) navigation.navigate('Animation');
  };

  // in your JSX, update the button:
  // disabled={!selectedDestination || loading}
  // onPress={handleSendRequest}
  // show error && <Text>{error}</Text> somewhere below the button
}
```

---

## The checklist for every new API you add

```
□ Does the endpoint exist in api/[feature].js?
□ Is there a hook in hooks/use[Feature].js managing loading/error?
□ Are ALL hooks at the TOP of the component?
□ Does the screen only call the hook, never fetch directly?
□ Is the base URL still coming from .env?
```

Save that checklist in your repo alongside the template. Every new screen is just filling in the blanks.
## Install test deps
This assumes a CRA/Vite + Jest setup with React Testing Library:
```bash
npm i -D @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

## Usage
```jsx
import React from 'react';
import { FormValidation } from './src/components/FormValidation';

export default function App() {
  return <FormValidation />;
}
```

## Run tests
```bash
npm test
```

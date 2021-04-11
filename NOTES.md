# Notes

## Tasks

- [] Hello

## Testing

// "@testing-library/jest-dom": "^4.2.4",
// "@testing-library/react": "^9.5.0",
// "@testing-library/user-event": "^7.2.1",

"test": "run-s test:unit test:lint test:build",
"test:build": "run-s build",
"test:lint": "eslint .",
"test:unit": "cross-env CI=1 react-scripts test --env=jsdom",
"test:watch": "react-scripts test --env=jsdom",

"@testing-library/jest-dom": "link:../node_modules/@testing-library/jest-dom",
"@testing-library/react": "link:../node_modules/@testing-library/react",
"@testing-library/user-event": "link:../node_modules/@testing-library/user-event",
"@types/jest": "link:../node_modules/@types/jest",
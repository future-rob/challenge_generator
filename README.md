# Random Spinner App with Topic Management

## Stream Challenge Utility


## About

A Simple 3D Spinner App with Topic Management, built using React and `three.js`. The application allows users to add, update, and delete topics, which are displayed as cylinders in a 3D scene. The spinner can be spun to select a random topic.

### **Key Features**
The spinner leverages ray tracing to detect intersections and determine the selected topic dynamically, providing an engaging and visually interactive experience.


---

## Features

### Core Functionality
- **3D Spinner Visualization**:
  - A dynamic 3D spinner with topic cylinders arranged in a circular layout.
  - Topics can be clicked to display their details in a styled overlay.

- **Topic Management**:
  - Add, update, and delete topics with customizable names and colors.
  - Changes persist using `localStorage`.

- **Smooth Animations**:
  - Implements eased spinning animations for the 3D scene.

---

## File Structure
### **Key Components**
- **`App.tsx`**:
  - Manages topics state and handles topic CRUD operations.
  - Integrates the `Scene` component for 3D rendering.

- **`Scene.tsx`**:
  - Handles 3D visualization using `@react-three/fiber`.
  - Features a spinning cube and circularly arranged cylinders representing topics.

### **Public Folder**
- Includes essential assets (`favicon.ico`, `logo192.png`, etc.) and configuration files (`manifest.json`, `robots.txt`).

### **Styles**
- Custom styles for both the app and the 3D scene are defined in `App.css` and `index.css`.

---

## Installation

### Prerequisites
- Node.js (>= 14.x recommended)
- npm (>= 6.x)

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   - The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

### `npm start`
Runs the application in development mode.

### `npm test`
Launches the test runner in watch mode.

### `npm run build`
Builds the app for production, generating an optimized static bundle.

### `npm run eject`
Ejects the configuration for advanced customization.

---

## Technologies Used

- **React**: Core library for building the user interface.
- **TypeScript**: Ensures type safety and better developer experience.
- **@react-three/fiber**: React renderer for `three.js`, used for the 3D scene.
- **three.js**: Handles 3D rendering and animations.
- **CSS**: Custom styles for the app and components.

---

## Customization

### Topic Management
- Add default topics in `App.tsx` under the `defaultData` array.
- Customize topic properties (e.g., color, name).

### 3D Scene
- Modify the spinner or layout by editing `Scene.tsx`.
- Adjust animation speeds and easing logic in the `Spinner` component.

---

## Contributing
Feel free to submit issues or pull requests for improvements or feature additions.

---

## License
This project is licensed under the [MIT License](LICENSE).

# Number Picker

A dynamic web application for generating random numbers with customizable settings and an interactive spinning wheel interface. Features a responsive design with collapsible panels and user authentication.

## Features

### User Authentication
- Simple login system with session storage.
- Welcome message display for logged-in users.
- Logout functionality.
- Default credentials:  
  **Username**: `admin`  
  **Password**: `admin`

### Random Number Generation
#### Two Input Modes:
1. **Random Numbers**: Generate numbers within a specified range.  
2. **Random Digits**: Generate multi-digit numbers (2-6 digits).

#### Random Numbers Mode
1. **By Range**:
   - Configurable minimum and maximum values.
   - Customizable interval steps.
   - Exclude specific numbers using a comma-separated list.
2. **By Formula**:
   - Support for complex number patterns.
   - Range syntax: `(min:max)` or `(min:interval:max)`.
   - Multiple ranges using commas.
   - Supports both ascending and descending intervals.

#### Random Digits Mode
- Flexible digit selection (2-6 digits).
- Individual control for each digit position:
  - Customizable range (0-9) for each digit.
  - Visual display of selected digits.
  - Sequential digit selection.
- Reset functionality to clear selections.

### Interactive Wheel Interface
- Visual spinning wheel animation.
- Customizable settings:
  - Wheel speed levels (1-10).
  - Adjustable spin duration (3-20 seconds).
  - Multiple color themes (6 preset color schemes).
  - Customizable background colors.
- Collapsible input panel for better space utilization.

### History and Results
- Tracks generation history.
- Modal display for results.
- History view with numbered entries.
- Copy functionality for previous results.

### Wheel Customization
#### Configurable Wheel Properties:
- Wheel name.
- Title.
- Description.

#### Visual Settings:
- 6 preset color schemes with 4 colors each.
- 6 background color options.
- Automatic text color adjustment for readability.

---

## Technical Implementation

### Core Components
- **`components.js`**: DOM element references and core UI components.
- **`vars.js`**: Global variables and configuration settings.
- **`user.js`**: User authentication and session management.
- **`inputs.js`**: Input handling and validation.
- **`wheel.js`**: Wheel rendering and animation.
- **`settings.js`**: Settings management and UI.
- **`history.js`**: History tracking and display.
- **`inputs-box.js`**: Input panel behavior and interactions.

### Constants
```javascript
MAX_OPTIONS_ALLOWED = 1000;
RANDOM_NUMBERS = 0;
RANDOM_DIGITS = 1;
BY_RANGE = 0;
BY_FORMULA = 1;

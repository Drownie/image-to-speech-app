# Image To Speech Application

This application allows users to scan text and convert it into audible forms. It also enables users to give speech commands to navigate the application, making it particularly useful for people with visual impairments.

## Features

- **Text to Speech:** Convert scanned text into audible speech.
- **Speech Commands:** Navigate the application using voice commands.
- **Camera Integration:** Snap a picture of the text you want to convert.
- **User-Friendly Interface:** Easy to use for individuals with visual impairments.

## Dependencies

- axios ^1.3.5
- expo ~48.0.10
- expo-av ^13.2.1
- expo-camera ^13.2.1
- expo-image-picker ~14.1.1
- expo-speech ~11.1.1
- expo-status-bar ~1.4.4
- react 18.2.0
- react-dom ^18.2.0
- react-native 0.71.8
- react-native-vector-icons ^9.2.0
- react-native-web ~0.18.11
- @react-native-async-storage/async-storage 1.17.11

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/image-to-speech-app.git
   cd image-to-speech-app
   ```

2. **Install Dependencies:**

   ```bash
   npx expo install
   ```

3. **Run the Application:**

   ```bash
   npx expo start
   ```

## Usage

1. **Start the Backend Server:**

   To run the app, you need to start the backend server. You can find the backend server [here](https://github.com/Drownie/image-to-speech-backend.git).

   ```bash
   git clone https://github.com/Drownie/image-to-speech-backend.git
   cd image-to-speech-backend
   npm install
   npm start
   ```

2. **Launch the App:**

   Use the Expo Go app on your mobile device to scan the QR code displayed after running `npx expo start`.

3. **Scan Text:**

   Use the camera to snap a picture of the text you want to convert to speech.

4. **Listen to the Text:**

   The app will process the image, extract the text, and read it aloud.

5. **Voice Commands:**

   Navigate through the app using voice commands for a hands-free experience.

## Future Improvements

- **Offline OCR Capability:** Enhance the app to detect text directly on the device, making it capable of working offline.
- **Improved Detection Accuracy:** Implement advanced algorithms to improve the accuracy of text detection.
- **Enhanced User Interface:** Further refine the user interface for a better user experience.

## Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](https://choosealicense.com/licenses/mit/) file for details.

## Contact

For any questions or suggestions, please reach out to [abrahammahanaim02@gmail.com](mailto:abrahammahanaim02@gmail.com).

# Visual LegalRuleML Editor with Auto-completion
A P4P Engineering research project at The University of Auckland. To address LegalRuleML’s usability issues and complexity, this research project investigates the research and development of a visual LegalRuleML editor built with a deep learning model trained on legal clauses to automate manual translation tasks with intelligent auto-completion.

## 💾 Development
This frontend uses:
- [React.js](https://react.dev) & [Vite](https://vitejs.dev) for the front-end and server tooling
- [Blockly](https://developers.google.com/blockly) to integrate the visual editor
- [CodeMirror](https://codemirror.net/) for code editor components
- [MUI](https://mui.com/) to integrate built-components easily

## 🔧 Visual Editor Set-Up
After cloning your fork of this repository and navigating to the `lrml-visual-editor` directory, use these commands to run the application in your desktop

```sh
# Change to project directory
cd <project-name>

# Change to lrml-visual-editor directory
cd lrml-visual-editor

# To install required dependencies
npm install

# Locally run the production build
npm run dev

# Create a build & preview
npm run build
npm run preview
```
> [!NOTE]
> Looking to set up the backend to run the deep learning mode?, Click [here](https://github.com/tpo920/COMPSYS-SOFT700-Project74/blob/main/model/README.md) for instructions.

## 🌟 Acknowledgements
- [Mr. Stefan Fuchs](https://github.com/stefan-1992/phd-thesis-supplementary-material) for aiding and providing a deep learning model relevant to this project
- Dr. Robert Amor for his guidance and input for the research project
- [Waipapa Taumata Rau](https://www.auckland.ac.nz) (University of Auckland); The development of this repository is for the course [SOFTENG&nbsp;700](https://courseoutline.auckland.ac.nz/dco/course/SOFTENG/700A) *Research Project*.



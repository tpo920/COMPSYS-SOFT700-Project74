# Backend - Deep Learning Model
Model developed by Stefan Fuchs from School of Computer Science.

## Pre-requisites

- Python (Tested with 3.9 and 3.10)
  - https://www.python.org/downloads/
- Pip (Included by default with Python 3.4 and later)
- GNU/Linux or macOS as currently the model does not seem to work with Windows after testing
  -   [Visual Studio Code WSL](https://code.visualstudio.com/docs/remote/wsl) enables Windows Subsystem for Linux (WSL) to develop and run the model with VS Code, a popular Linux Distro would be to use [Ubuntu](https://ubuntu.com/desktop/wsl)

 ## Model Setup
 - Install the model folder into the Linux subsystem and move into the directory (Can just copy and paste the folder from Windows -> Linux)
 - Create Virtual Environment and install packages. - Example with venv
   
**GNU/Linux**
```sh
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
![image](https://github.com/user-attachments/assets/f1a0882d-2d9c-4af9-8c86-ca828c2c3d1b)

## Running
- To get the model's API running, flask must be utilised & must be in the venv
```sh
flask --app lrml_model run
```
![image](https://github.com/user-attachments/assets/53811387-6324-48f3-a560-38294b48970c)

## Calling API
API: http://127.0.0.1:5000/predict

The API takes in a POST request where
- method: "POST"
- body: {text, lrml} (text is the natural clause input, lrml is the structure input e.g `if` or `and` etc)
- headers: { "Content-Type": "application/x-www-form-urlencoded" }

An example is attached below where lrml is currently hardcoded with `if`:
![image](https://github.com/user-attachments/assets/33ea20bc-ec1a-48ce-8cd0-1215ef3b007c)

A further example can be found in [Stefan's editor](https://github.com/stefan-1992/lrml-editor/blob/main/editor/src/model/backend.js)

Postman can also be used to simulate an API call to check if the model is up and running


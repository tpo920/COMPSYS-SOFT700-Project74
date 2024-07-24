import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import { Controlled as TextEditor } from 'react-codemirror2';

export default function TextBox({ value }) {

    return (
        <div className="editor-container">
            <TextEditor
                value={value}
                className="code-mirror-wrapper"
                options={{
                    lineWrapping: true,
                    lineNumbers: true,
                }}
            />
        </div>
    );
}
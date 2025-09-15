import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';

interface RichEditorProps {
    name: string;       // name for the hidden input
    value: string;
    height?: number;
}

export default function RichEditor({ name, value, height = 400 }: RichEditorProps) {
    const editorRef = useRef<never>(null);
    const [content, setContent] = useState(value);

    return (
        <>
            <Editor
                apiKey="k2g2nkyoyi4kj44qizp8ln8ynev9y605ggflm5syhf026qxa"
                onInit={(_, editor) => (editorRef.current = editor)}
                value={content} // controlled value
                onEditorChange={(newContent) => setContent(newContent)}
                init={{
                    height: height,
                    menubar: false,
                    skin:
                        document.documentElement.style.colorScheme === 'dark'
                            ? 'oxide-dark'
                            : 'oxide',
                    plugins: 'code table lists',
                    toolbar:
                        'undo redo | fontsize formatselect | hr bold italic | alignleft aligncenter alignright | indent outdent | bullist numlist | code | table',
                }}
            />

            {/* Hidden input makes it behave like a native form field */}
            <input type="hidden" name={name} value={content} />
        </>
    );
}

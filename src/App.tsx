import React, { useCallback, useState } from "react";
import { OnChangeHTML, OnChangeJSON } from "@remirror/react";
import { WysiwygEditor } from "@remirror/react-editors/wysiwyg";
import { RemirrorJSON } from "remirror";

const STORAGE_KEY = "remirror-editor-content";

interface Props {
  onChangeJson: (json: RemirrorJSON) => void;
  onChangeHtml: (html: string) => void;
}

function MyEditor({ onChangeJson, onChangeHtml }: Props) {
  return (
    <div style={{ padding: 16 }}>
      <WysiwygEditor placeholder="Enter text]...">
        <OnChangeHTML onChange={onChangeHtml} />
        <OnChangeJSON onChange={onChangeJson} />
      </WysiwygEditor>
    </div>
  );
}

export default function App() {
  const [changeHtml, setChangeHtml] = useState<string | any>();
  const [changeJson, setChangeJson] = useState<RemirrorJSON>();

  const handleEditorChangeHTML = useCallback((html: string) => {
    setChangeHtml(html);
  }, []);

  const handleEditorChangeJson = useCallback((json: RemirrorJSON) => {
    setChangeJson(json);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
  }, []);

  return (
    <>
      <MyEditor
        onChangeHtml={handleEditorChangeHTML}
        onChangeJson={handleEditorChangeJson}
      />
      <div dangerouslySetInnerHTML={{ __html: changeHtml }}></div>
    </>
  );
}

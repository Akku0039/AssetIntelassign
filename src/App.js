
import React, { useState ,useCallback} from 'react';

import RichTextEditor from './components/RichTextEditor';
import Title from './components/Title';
import Button from './components/Button';
import './App.css';



const App = () => {
  const [editorState, setEditorState] = useState(RichTextEditor.createEmpty()); // Update this line

  // Define a useCallback to memoize the handleLoad function
  const handleLoad = useCallback((contentStateJSON) => {
    if (contentStateJSON) {
      try {
        const contentState = RichTextEditor.convertFromJSON(contentStateJSON);
        setEditorState(RichTextEditor.createWithContent(contentState));
      } catch (error) {
        console.error("Error loading content from localStorage:", error);
      }
    }
  }, []);

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
  };


  return (
    <div className="App">
      <div className="header">
        <div className="title"><Title /></div>
        <div className="spacer"></div>
        <div className="button">  <Button editorState={editorState} onLoad={handleLoad} /></div>
      </div>
      <div className="editor-container">
      <RichTextEditor editorState={editorState} onChange={handleChange} />

      </div>
    </div>
  );
}

export default App;


import React, { useEffect } from 'react';
//import { EditorState } from 'draft-js';
//import RichTextEditor from './RichTextEditor'; 
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import './Button.css';


const Button = ({ editorState, onChange }) => {
  const handleSave = () => {
    const contentState = editorState.getCurrentContent();
    const contentStateJSON = JSON.stringify(convertToRaw(contentState));
    localStorage.setItem('draftContent', contentStateJSON);
    alert("Content saved successfully!");
  };

  useEffect(() => {
    const savedContent = localStorage.getItem('draftContent');
    if (savedContent && typeof onChange === 'function') {
      try {
        const contentState = convertFromRaw(JSON.parse(savedContent));
        const newEditorState = EditorState.createWithContent(contentState);
        onChange(newEditorState);
      } catch (error) {
        console.error("Error loading content from localStorage:", error);
      }
    }
  }, [onChange]); // Include onChange in the dependency array


  return (
    <div className="button-container">
      <button className="custom-button" onClick={handleSave}>Save</button>
    </div>
  );
};

export default Button;
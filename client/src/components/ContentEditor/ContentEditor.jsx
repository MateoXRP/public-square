import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class ContentEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: ''
    };
  }

  componentDidMount() {
    this.setState({
      editorState: EditorState.createEmpty()
    });
  }

  onEditorStateChange = editorState => {
    const currentContent = this.state.editorState.getCurrentContent();
    const newContent = editorState.getCurrentContent();
    // console.log('equal: ', currentContent === newContent);
    if (currentContent === newContent) return;

    this.setState({
      editorState
    });
  };

  onContentStateChange = contentState => {
    const htmlContent = draftToHtml(contentState);

    this.props.onChange(htmlContent);
  };

  render() {
    const { editorState } = this.state;

    return (
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName='content-editor-wrapper'
          editorClassName='content-editor'
          onEditorStateChange={this.onEditorStateChange}
          onContentStateChange={this.onContentStateChange}
          toolbar={{
            options: [
              'inline',
              'blockType',
              'fontSize',
              'fontFamily',
              'list',
              'textAlign',
              'colorPicker',
              'link',
              'emoji',
              'image',
              'remove',
              'history'
            ],
            inline: {
              options: ['bold', 'italic', 'underline']
            },
            image: {
              popupClassName: 'content-editor-img-popup',
              urlEnabled: true,
              uploadEnabled: false,
              alignmentEnabled: true,
              alt: { present: false, mandatory: false }
            }
          }}
        />
      </div>
    );
  }
}

export default ContentEditor;

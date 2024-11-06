import React from 'react';

function HtmlViewer({ src }) {
  return (
    <div className="html-viewer">
      <iframe
        src={src}
        title="HTML Viewer"
        width="100%"
        height="600px"
        style={{ border: 'none' }}
      />
    </div>
  );
}

export default HtmlViewer;

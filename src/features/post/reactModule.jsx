const ReactModule = () => {
  return (
    <>
      {/* 첫 번째 줄 */}
      <div className="ql-toolbar-row">
        <div className="ql-formats">
          <select className="ql-header" defaultValue="7">
            <option value="1">Header 1</option>
            <option value="2">Header 2</option>
            <option value="3">Header 3</option>
            <option value="4">Header 4</option>
            <option value="5">Header 5</option>
            <option value="6">Header 6</option>
            <option value="7">Normal</option>
          </select>
          <select className="ql-size" defaultValue="medium">
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
            <option value="huge">Huge</option>
          </select>
          <select className="ql-font" defaultValue="sans-serif" />
          <button className="ql-indent" value="-1" />
          <button className="ql-indent" value="+1" />
        </div>
      </div>
      {/* 두 번째 줄 */}
      <div className="ql-toolbar-row">
        <div className="ql-formats">
          <button className="ql-bold" />
          <button className="ql-italic" />
          <button className="ql-underline" />
          <button className="ql-strike" />
          <button className="ql-blockquote" />
          <button className="ql-list" value="ordered" />
          <button className="ql-list" value="bullet" />

          <select className="ql-color" />
          <select className="ql-background" />
          <select className="ql-align" />
          <button className="ql-code-block" />
          <button className="ql-link" />
          <button className="ql-image" />
        </div>
      </div>
    </>
  );
};

export default ReactModule;

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
// SyntaxHighlighter.registerLanguage('javascript', js);
 
const CodeBlock = ({ codeString }) => {
  return (
    <SyntaxHighlighter language="javascript" style={a11yDark} showLineNumbers="true" wrapLongLines="true">
        {codeString}      
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
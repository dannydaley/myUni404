import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
// import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
// SyntaxHighlighter.registerLanguage('javascript', js);
 
const CodeBlock = ({ codeString }) => {
  return (
    <SyntaxHighlighter language="java" style={docco} showLineNumbers="true">
        {codeString}      
    </SyntaxHighlighter>
  );
};

export default CodeBlock;